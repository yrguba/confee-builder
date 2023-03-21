import os
import mpu.io


class SettingsWorkers():
    key_project_repo = 'project_repo_name'
    key_builder_repo = 'builder_repo_name'
    key_repo_name = 'repo_name'
    key_nickname = 'nickname'
    key_server_endpoint = 'server_endpoint_name'

    def __init__(self):
        super().__init__()
        self.dir = os.path.abspath(os.curdir)
        self.json_path = self.dir + '/settings/base_settings.json'
        self.json = mpu.io.read(self.json_path)

    def set(self, key, value):
        self.json[key] = value
        mpu.io.write(self.json_path, self.json)

    def get(self, key):
        return self.json[key]
