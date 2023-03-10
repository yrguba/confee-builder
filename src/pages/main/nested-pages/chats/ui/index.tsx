import React from 'react';

import { HeaderForChatsPage } from 'widgets/headers';
import { SidebarForChatsPage } from 'widgets/sidebars';

import Wrapper from '../../wrapper';

function ChatsPage() {
    return <Wrapper sidebar={<SidebarForChatsPage />} header={<HeaderForChatsPage />} />;
}

export default ChatsPage;
