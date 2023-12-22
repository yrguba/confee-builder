from bin.dir_workers import delete_dir
import os, requests
from pathlib import Path
import platform

if __name__ == '__main__':
    platform = platform.system()
    server_endpoint_name = "http://localhost:5000/api/v1/files/upload_desktop_release"
        # "https://dev.api.confee.ru/api/v2/release"

    project_dir = Path(__file__).parents[2]
    tauri_dir = Path(project_dir, "src-tauri")

    version = ''
    signature = ''
    app = ''
    app_os = ''

    # delete_dir(Path(tauri_dir, "target"))

    if platform == 'Windows':
        path = Path(project_dir, "src-tauri", "target", "release", "bundle", "msi")
        if os.path.isdir(path):
            files = os.listdir(path)
            app_os = 'windows'

            for file in files:
                if file.split('.').pop() == 'sig':
                    version = file.split('_')[1]
                    signature = open(Path(path, file), 'r').read()

                if file.split('.').pop() == 'zip':
                    app = ('file', open(Path(path, file), 'rb'))
        else:
            print('no direct')
            exit()



    try:
        data = {"version": version, "signature": signature, "os": app_os}
        res = requests.post(server_endpoint_name, data=data, files=[app],
                            verify=False)
        print(res)

        # delete_dir(Path(tauri_dir, "target"))
    except:
        print('send error')
