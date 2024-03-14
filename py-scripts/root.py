from pathlib import Path
from scripts import git_mirroring, build_and_send_release, build_and_send_debug, send_release_from_github, update_web

menu_options = {
    1: 'git mirroring',
    2: 'build and send debug',
    3: 'build and send release',
    4: 'send release from github',
    5: 'update web',
    6: 'Exit',
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
            git_mirroring.start()
        elif option == 2:
            build_and_send_debug.start()
        elif option == 3:
            build_and_send_release.start()
        elif option == 4:
            send_release_from_github.start()
        elif option == 5:
            update_web.start()
        elif option == 6:
            print('exit from web-py-scripts')
            exit()
        else:
            print('Invalid option. Please enter a number between 1 and 3.')
