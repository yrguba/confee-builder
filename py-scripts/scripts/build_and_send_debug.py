import requests
from pathlib import Path
import platform
import os
from bin.dir_workers import delete_dir
from bin.vars import back_domain

platform = platform.system()


def start():
    print(platform)

    project_dir = Path(__file__).parents[2]
    tauri_dir = Path(project_dir, "src-tauri")

    delete_dir(Path(tauri_dir, "target"))

    os.system("npm run tauri build -- --debug")

    if platform == 'Windows':
        back_endpoint = back_domain + "api/v1/files/upload_debug_windows"
        path = Path(project_dir, "src-tauri", "target", "debug", "bundle", "msi")
        if os.path.isdir(path):
            files = os.listdir(path)
            for file in files:
                if file.split('.').pop() == 'sig':
                    signature = open(Path(path, file), 'r').read()
                if file.split('.').pop() == 'zip':
                    file = ('file', open(Path(path, file), 'rb'))
                    try:
                        res = requests.post(back_endpoint, files=[file], verify=False)
                        print(res)
                        print('success')
                    except:
                        print('send error')

        else:
            print('no direct')
            exit()

    if platform == 'Darwin':
        back_endpoint = back_domain + "api/v1/files/upload_debug_mac"
        path = Path(project_dir, "src-tauri", "target", "debug", "bundle", "dmg")
        if os.path.isdir(path):
            files = os.listdir(path)
            for file in files:
                if file.split('.').pop() == 'dmg':
                    file = ('file', open(Path(path, file), 'rb'))
                    try:
                        res = requests.post(back_endpoint, files=[file], verify=False)
                        print(res)
                        print('success')
                    except:
                        print('send error')
        else:
            print('no direct')
            exit()
