from project.modules.project_builder.mirror import Mirror
from bin.settings_workers import SettingsWorkers
from bin.validators import git_url_validate
from project.ui.styles import label_status_error_style, label_status_success_style
from bin.fake_loading import FakeLoading

class ProjectBuilder():
    def __init__(self, parent):
        super().__init__()
        self.parent = parent
        self.ui = parent.ui

        self.settings_workers = SettingsWorkers()

        self.fake_loading = FakeLoading(3)
        self.fake_loading.process.connect(self.loading)

        self.mirror = Mirror()
        self.mirror.process.connect(self.get_mirror_process)

        self.ui.input_project_repo.setText(self.settings_workers.get(self.settings_workers.key_project_repo))
        self.ui.input_project_repo.textChanged.connect(lambda: self.set_project_repo_name())

        self.ui.input_builder_repo.setText(self.settings_workers.get(self.settings_workers.key_builder_repo))
        self.ui.input_builder_repo.textChanged.connect(lambda: self.set_builder_repo())

        self.ui.btn_start_build.clicked.connect(lambda: self.start_build_click())

    def set_project_repo_name(self):
        text = self.ui.input_project_repo.text()
        self.settings_workers.set(self.settings_workers.key_project_repo, text)

    def set_builder_repo(self):
        print('t')
        text = self.ui.input_builder_repo.text()
        self.settings_workers.set(self.settings_workers.key_builder_repo, text)

    def get_mirror_process(self, value):
        self.ui.lebel_build_status.setText(value[1])
        if value[0] == 'error':
            self.ui.lebel_build_status.setStyleSheet(label_status_error_style)
        if value[0] == 'success':
            self.ui.lebel_build_status.setStyleSheet(label_status_success_style)

    def loading(self, value):
        self.ui.buil_progress.setValue(value)

    def start_build_click(self):
        value_input_project_repo = self.ui.input_project_repo.text()
        value_input_builder_repo = self.ui.input_builder_repo.text()
        valid_project_repo = git_url_validate(value_input_project_repo)
        valid_builder_repo = git_url_validate(value_input_builder_repo)
        if valid_builder_repo and valid_project_repo:
            self.ui.lebel_build_status.setText('Начало сборки')
            self.ui.lebel_build_status.setStyleSheet(label_status_success_style)
            self.fake_loading.start()
            self.mirror.start()
        else:
            self.ui.lebel_build_status.setText('невалидный url репозитория')
            self.ui.lebel_build_status.setStyleSheet(label_status_error_style)
