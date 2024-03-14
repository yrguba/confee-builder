import os
from bin.dir_workers import delete_dir

def start():
    os.system("scp -r build/* root@94.139.253.41:/var/www/messanger")

