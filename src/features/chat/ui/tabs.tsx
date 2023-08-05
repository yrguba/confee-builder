import React from 'react';

import { TabBar, TabBarTypes } from 'shared/ui';

function TabsChats() {
    const tabs: TabBarTypes.TabBarItem[] = [
        { id: 0, title: 'Все', callback: () => console.log('Все') },
        { id: 1, title: 'Все', callback: () => console.log('Все') },
        { id: 2, title: 'Все', callback: () => console.log('Все') },
        { id: 3, title: 'Все', callback: () => console.log('Все') },
        { id: 4, title: 'Все', callback: () => console.log('Все') },
        { id: 5, title: 'Все', callback: () => console.log('Все') },
        { id: 6, title: 'Все', callback: () => console.log('Все') },
        { id: 7, title: 'Все', callback: () => console.log('Все') },
        { id: 8, title: 'Все', callback: () => console.log('Все') },
        { id: 9, title: 'Все', callback: () => console.log('Все') },
        { id: 10, title: 'Все', callback: () => console.log('Все') },
        { id: 11, title: 'Все', callback: () => console.log('Все') },
        { id: 21, title: 'Все', callback: () => console.log('Все') },
        { id: 31, title: 'Все', callback: () => console.log('Все') },
        { id: 42, title: 'Все', callback: () => console.log('Все') },
        { id: 53, title: 'Все', callback: () => console.log('Все') },
        { id: 61, title: 'Все', callback: () => console.log('Все') },
        { id: 72, title: 'Все', callback: () => console.log('Все') },
        { id: 82, title: 'Все', callback: () => console.log('Все') },
        { id: 93, title: 'Все', callback: () => console.log('Все') },
    ];

    return <TabBar items={tabs} activeItemId={1} />;
}

export default TabsChats;
