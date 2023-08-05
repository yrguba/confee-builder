import React from 'react';

import { useEasyState } from 'shared/hooks';
import { TabBar, TabBarTypes } from 'shared/ui';

function TabsChats() {
    const tabsState = useEasyState<TabBarTypes.TabBarItem[]>([{ id: 0, title: 'Все', callback: () => '' }]);

    return <TabBar items={tabsState.value} activeItemId={1} />;
}

export default TabsChats;
