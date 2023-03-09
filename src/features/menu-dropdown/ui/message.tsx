import React from 'react';

import { menuDropdownTypes, DropdownMenu } from 'entities/menu-dropdown';
import { DropdownProps, Dropdown } from 'shared/ui';

type Props = {} & DropdownProps;

function MessageDropdownMenu(props: Props) {
    const { children } = props;

    const items: menuDropdownTypes.MenuItem[] = [
        { id: 0, title: '11111111' },
        { id: 1, title: '22222222' },
        { id: 2, title: '22222222' },
        { id: 3, title: '22222222' },
        { id: 4, title: '22222222' },
        { id: 5, title: '22222222' },
        { id: 6, title: '22222222' },
    ];

    return (
        <Dropdown animationVariant="auto-height" trigger="left-click" position="top-center" content={<DropdownMenu items={items} />}>
            {children}
        </Dropdown>
    );
}

export default MessageDropdownMenu;
