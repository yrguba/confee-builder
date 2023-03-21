from PyQt5.QtCore import QThread, pyqtSignal, pyqtSlot
import time


class FakeLoading(QThread):
    def __init__(self, delay):
        super().__init__()
        self.delay = delay
        self.threadactive = True

    process = pyqtSignal(int)

    @pyqtSlot()
    def run(self):
        if self.threadactive:
            for step in range(0, 101):
                self.process.emit(step)
                time.sleep(self.delay)

    def stop(self):
        self.threadactive = False
        self.wait()
