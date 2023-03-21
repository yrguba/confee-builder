from project.modules.send_to_server.sending import Sending
from bin.settings_workers import SettingsWorkers
from bin.fake_loading import FakeLoading
from project.ui.styles import label_status_error_style, label_status_success_style


class SendToServer():
    def __init__(self, parent):
        super().__init__()
        self.parent = parent
        self.ui = parent.ui

        self.settings_workers = SettingsWorkers()

        self.fake_loading = FakeLoading(0.1)
        self.fake_loading.process.connect(self.loading)

        self.sending = Sending()
        self.sending.process.connect(self.get_sending_process)

        self.ui.input_nickname.setText(
            self.settings_workers.get(self.settings_workers.key_nickname))
        self.ui.input_nickname.textChanged.connect(lambda: self.set_nickname())

        self.ui.input_repo_name.setText(
            self.settings_workers.get(self.settings_workers.key_repo_name))
        self.ui.input_repo_name.textChanged.connect(lambda: self.set_repo_name())

        self.ui.input_server_endpoint.setText(self.settings_workers.get(self.settings_workers.key_server_endpoint))
        self.ui.input_server_endpoint.textChanged.connect(lambda: self.set_back_url())

        self.ui.btn_send_to_back.clicked.connect(lambda: self.start_sending())

    def set_nickname(self):
        text = self.ui.input_nickname.text()
        self.settings_workers.set(self.settings_workers.key_nickname, text)

    def set_repo_name(self):
        text = self.ui.input_repo_name.text()
        self.settings_workers.set(self.settings_workers.key_repo_name, text)

    def set_back_url(self):
        print('t')
        text = self.ui.input_server_endpoint.text()
        self.settings_workers.set(self.settings_workers.key_server_endpoint, text)

    def get_sending_process(self, value):
        self.ui.lebel_send_status_2.setText(value[1])
        if value[0] == 'error':
            self.fake_loading.stop()
            self.ui.send_progress.setValue(100)
            self.ui.lebel_send_status_2.setStyleSheet(label_status_error_style)
        if value[0] == 'success':
            self.fake_loading.stop()
            self.ui.send_progress.setValue(100)
            self.ui.lebel_send_status_2.setStyleSheet(label_status_success_style)

    def loading(self, value):
        self.ui.send_progress.setValue(value)

    def start_sending(self):
        self.fake_loading.start()
        self.sending.start()
