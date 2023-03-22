import os

def start():
    print('---git pushing---')
    commit = input('commit: ')
    branch = input('branch: ')
    os.system("git add . ")
    os.system("git commit -m " + commit)
    os.system("git push origin " + branch)


