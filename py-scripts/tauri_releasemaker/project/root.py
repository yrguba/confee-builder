from project.modules.main_interface import Interface
from project.modules.project_builder.interface import ProjectBuilder
from project.modules.send_to_server.interface import SendToServer


class Root(Interface):
    def __init__(self):
        super().__init__()
        self.project_builder = ProjectBuilder(self)
        self.sent_to_server = SendToServer(self)
