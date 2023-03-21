from PyQt5.QtWidgets import QMainWindow
from project.ui.main import Ui_MainWindow
from PyQt5.QtCore import Qt


class Interface(QMainWindow):
    def __init__(self):
        super().__init__()

        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)

        self.setWindowFlag(Qt.FramelessWindowHint)
        self.setAttribute(Qt.WA_TranslucentBackground)

        self.old_pos = None
        self.ui.btn_close_app.clicked.connect(lambda: self.close())
        self.ui.btn_hidden_app.clicked.connect(lambda: self.showMinimized())

    def mousePressEvent(self, event):
        if event.button() == Qt.LeftButton:
            self.old_pos = event.pos()

    def mouseReleaseEvent(self, event):
        if event.button() == Qt.LeftButton:
            self.old_pos = None

    def mouseMoveEvent(self, event):
        if not self.old_pos:
            return

        delta = event.pos() - self.old_pos
        self.move(self.pos() + delta)
