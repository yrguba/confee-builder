import os, stat, shutil


def delete_dir(dir_name):
    def remove_readonly(fn, path, _):
        try:
            os.chmod(path, stat.S_IWRITE)
            fn(path)
        except Exception as exc:
            print("Skipped:", path, "because:\n", exc)

    check_dir = os.path.isdir(dir_name)
    if check_dir:
        shutil.rmtree(dir_name, onerror=remove_readonly)
