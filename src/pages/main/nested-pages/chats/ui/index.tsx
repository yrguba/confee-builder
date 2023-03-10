import React from 'react';

import { HeaderForCompanyPage } from '../../../../../widgets/headers';
import { SidebarForCompanyPage } from '../../../../../widgets/sidebars';
import Wrapper from '../../wrapper';

function ChatsPage() {
    return <Wrapper sidebar={<SidebarForCompanyPage />} header={<HeaderForCompanyPage />} />;
}

export default ChatsPage;
