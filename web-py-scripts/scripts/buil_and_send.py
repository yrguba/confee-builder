from bin.dir_workers import delete_dir
import os, requests
from pathlib import Path
import platform

if __name__ == '__main__':
    platform = platform.system()
    server_endpoint_name = "http://localhost:5000/api/v1/files/upload_desktop_release"

    project_dir = Path(__file__).parents[2]

    version = ''
    signature = ''
    app = ''
    app_os = ''

    if platform == 'Windows':
        path = Path(project_dir, "src-tauri", "target", "release", "bundle", "msi")
        files = os.listdir(path)
        app_os = 'windows'
        for file in files:
            if file.split('.').pop() == 'sig':
                version = file.split('_')[1]
                signature = open(Path(path, file), 'r').read()

            if file.split('.').pop() == 'zip':
                app = ('file', open(Path(path, file), 'rb'))

    try:
        data = {"version": version, "signature": signature, "os": app_os}
        res = requests.post(server_endpoint_name, data=data, files=[app],
                            verify=False)
        print(res)

    except:
        print('dd')

