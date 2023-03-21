from PyQt5.QtCore import QThread, pyqtSignal, pyqtSlot
import os, time, subprocess
from bin.settings_workers import SettingsWorkers
from bin.dir_workers import delete_dir


class Mirror(QThread):
    def __init__(self):
        super().__init__()
        self.settings_workers = SettingsWorkers()

    process = pyqtSignal(list)

    @pyqtSlot()
    def run(self):
        project_repo_name = self.settings_workers.get(self.settings_workers.key_project_repo)
        builder_repo_name = self.settings_workers.get(self.settings_workers.key_builder_repo)
        dir_name = project_repo_name.split('/')[-1]
        delete_dir(dir_name)
        try:
            self.process.emit(['pending', 'клонирование'])
            os.system("git clone --mirror " + project_repo_name)
            os.chdir(dir_name)
        except:
            self.process.emit(['error', 'ошибка клонирования'])
            return
        try:
            self.process.emit(['pending', 'копирование'])
            os.system("git remote add new " + builder_repo_name)
        except:
            self.process.emit(['error', 'ошибка копирования'])
            return
        try:
            os.system("git push --mirror new")
            os.chdir('..')
            delete_dir(dir_name)
            self.process.emit(['success', 'сборка приложения'])
        except:
            self.process.emit(['error', 'ошибка копирования'])
            return