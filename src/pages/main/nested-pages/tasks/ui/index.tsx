import React from 'react';

import { HeaderForTasksPage } from '../../../../../widgets/headers';
import { SidebarForTasksPage } from '../../../../../widgets/sidebars';
import Wrapper from '../../wrapper';

function TasksPage() {
    return <Wrapper sidebar={<SidebarForTasksPage />} header={<HeaderForTasksPage />} />;
}

export default TasksPage;
