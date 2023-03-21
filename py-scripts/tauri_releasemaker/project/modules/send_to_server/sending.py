from PyQt5.QtCore import QThread, pyqtSignal, pyqtSlot
import requests, os, mpu.io, json
from bin.settings_workers import SettingsWorkers


class Sending(QThread):
    def __init__(self):
        super().__init__()
        self.threadactive = True
        self.settings_workers = SettingsWorkers()
        self.tag_name = ''
        self.release_name = ''
        self.assets_url = ''
        self.published_at = ''
        self.releases_dir = os.path.abspath(os.curdir) + '/releases/'
        self.msi_file_path = ''
        self.tar_file_path = ''
        self.msi_file_sig = ''
        self.tar_file_sig = ''

    process = pyqtSignal(list)

    @pyqtSlot()
    def run(self):
        nickname = self.settings_workers.get(self.settings_workers.key_nickname)
        repo_name = self.settings_workers.get(self.settings_workers.key_repo_name)
        server_endpoint_name = self.settings_workers.get(self.settings_workers.key_server_endpoint)
        releases_url = 'https://api.github.com/repos/' + nickname + '/' + repo_name + '/releases/latest'
        try:
            self.process.emit(['pending', 'получение данных с githib'])
            response = requests.get(releases_url).json()
            self.tag_name = response["tag_name"]
            self.assets_url = response["assets_url"]
            self.published_at = response["published_at"]
            self.release_name = response["name"]
        except:
            self.process.emit(['error', 'релизы не найдены'])
            return
        try:
            self.process.emit(['pending', 'загрузка на сервер'])
            response = requests.get(self.assets_url).json()
            if not response:
                self.process.emit(['error', 'релизы не найдены'])
                return
            os.chdir('releases')
            if os.path.isdir(self.tag_name):
                self.process.emit(['error', 'последний релиз уже залит на сервер'])
                return
            os.mkdir(self.tag_name)
            current_release_dir = self.releases_dir + self.tag_name + '/'
            for item in response:
                if 'msi.zip.sig' in item['name']:
                    self.msi_file_sig = requests.get(item['browser_download_url']).text
                if 'msi.zip' in item['name'] and ('sig' in item['name']) == False:
                    self.msi_file_path = current_release_dir + item['name']
                    with open(self.msi_file_path, 'wb') as file:
                        response_file = requests.get(item['browser_download_url']).content
                        file.write(response_file)
                if 'tar.gz.sig' in item['name']:
                    self.tar_file_sig = requests.get(item['browser_download_url']).text
                if 'tar.gz' in item['name'] and ('sig' in item['name']) == False:
                    self.tar_file_path = current_release_dir + item['name']
                    with open(self.tar_file_path, 'wb') as file:
                        response_file = requests.get(item['browser_download_url']).content
                        file.write(response_file)
            print(self.msi_file_sig)
            data = {
                'tag_name': self.tag_name,
                'release_name': self.release_name,
                'published_at': self.published_at,
                'msi_file_sig': self.msi_file_sig,
                'tar_file_sig': self.tar_file_sig,
            }

            files = [
                ('file', open(self.tar_file_path, 'rb')), ('file', open(self.msi_file_path, 'rb'))
            ]
            print(files)
            res = requests.post(server_endpoint_name, data=data, files=files,
                                verify=False)
            print(res)
            if res.status_code == 200:
                self.process.emit(['success', 'релиз загружен на сервер'])
                return
            self.process.emit(['error', 'ошибка загрузки на сервер'])

        except:
            self.process.emit(['error', 'ошибка загрузки на сервер'])
            return

    def stop(self):
        self.threadactive = False
        self.wait()
