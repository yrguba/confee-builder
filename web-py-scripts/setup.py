import os, json
from pathlib import Path
from bin.dir_workers import delete_dir

work_dir = Path.cwd()

os.chdir("web-py-scripts")

os.remove("README.md")
os.remove(".gitignore")
delete_dir('.git')

os.chdir(work_dir)

json_file_name = 'package.json'

with open(json_file_name, 'r') as f:
    data = json.load(f)
    scripts = data['scripts']
    scripts["web-py-scripts"] = "python ./web-py-scripts/root.py"

os.remove(json_file_name)
with open(json_file_name, 'w') as f:
    json.dump(data, f, indent=4)
