from PyQt5.QtWidgets import QApplication

from project.root import Root


class App(Root):
    def __init__(self):
        super().__init__()
        Root()


if __name__ == '__main__':
    import sys

    app = QApplication(sys.argv)
    win = App()
    win.show()
    sys.exit(app.exec_())
