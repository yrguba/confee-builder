import React from 'react';

import { HeaderForCompanyPage } from '../../../../../widgets/headers';
import { SidebarForCompanyPage } from '../../../../../widgets/sidebars';
import Wrapper from '../../wrapper';

function TasksPage() {
    return <Wrapper sidebar={<SidebarForCompanyPage />} header={<HeaderForCompanyPage />} />;
}

export default TasksPage;
