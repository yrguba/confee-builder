import os
from bin.dir_workers import delete_dir
print('---git mirroring---')

from_where = input('from: ')
to_where = input('to: ')
dir_name = from_where.split('/')[-1]

delete_dir(dir_name)
os.system("git clone --mirror " + from_where)
os.chdir(dir_name)
os.system("git remote add new " + to_where)
os.system("git push --mirror new")

os.chdir('../.')
delete_dir(dir_name)
