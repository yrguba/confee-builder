import os, requests
from pathlib import Path
import platform
import json
import os, stat, shutil


def remove_readonly(fn, path, _):
    try:
        os.chmod(path, stat.S_IWRITE)
        fn(path)
    except Exception as exc:
        print("Skipped:", path, "because:\n", exc)


def delete_dir(dir_name):
    check_dir = os.path.isdir(dir_name)
    print(check_dir)
    if check_dir:
        shutil.rmtree(dir_name, onerror=remove_readonly)


if __name__ == '__main__':
    platform = platform.system()
    server_endpoint_name = ''
    domain = 'https://dev.chat.softworks.ru/'

    project_dir = Path(__file__).parents[2]
    tauri_dir = Path(project_dir, "src-tauri")

    delete_dir(Path(tauri_dir, "target"))

    os.system("npm run tauri build -- --debug")

    if platform == 'Windows':
        server_endpoint_name = domain + "api/v1/files/upload_debug_windows"
        path = Path(project_dir, "src-tauri", "target", "debug", "bundle", "msi")
        if os.path.isdir(path):
            files = os.listdir(path)
            for file in files:
                if file.split('.').pop() == 'sig':
                    signature = open(Path(path, file), 'r').read()
                if file.split('.').pop() == 'zip':
                    file = ('file', open(Path(path, file), 'rb'))
                    try:
                        res = requests.post(server_endpoint_name, files=[file], verify=False)
                        print(res)
                        print('success')
                    except:
                        print('send error')

        else:
            print('no direct')
            exit()

    if platform == 'Darwin':
        server_endpoint_name = domain + "api/v1/files/upload_debug_mac"
        path = Path(project_dir, "src-tauri", "target", "debug", "bundle", "macos")
        if os.path.isdir(path):
            files = os.listdir(path)
            for file in files:
                if file.split('.').pop() == 'dmg':
                    file = ('file', open(Path(path, file), 'rb'))
                    try:
                        res = requests.post(server_endpoint_name, files=[file], verify=False)
                        print(res)
                        print('success')
                    except:
                        print('send error')
        else:
            print('no direct')
            exit()
