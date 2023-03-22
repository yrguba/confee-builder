import os
from pathlib import Path
from scripts import git_pushing

menu_options = {
    1: 'git pushing',
    2: 'git mirroring',
    3: 'Exit',
}


def print_menu():
    for key in menu_options.keys():
        print(key, ')', menu_options[key])


work_dir = Path.cwd()

print(work_dir)
if __name__ == '__main__':
    print('🚀🤙web-py-scripts starting🤙🚀')
    while (True):
        print_menu()
        option = ''
        try:
            option = int(input('Enter your choice: '))
        except:
            print('Wrong input. Please enter a number ...')
        if option == 1:
            git_pushing.start()
        elif option == 2:
            os.chdir(Path('py-scripts/scripts/git_mirroring.py').resolve())
        elif option == 3:
            print('exit from web-py-scripts')
            exit()
        else:
            print('Invalid option. Please enter a number between 1 and 3.')