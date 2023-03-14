import React, { ReactNode } from 'react';

import { DropdownTypes, Dropdown } from 'shared/ui';

import Icons from './icons';

type Props = {
    children: ReactNode;
};

function MessageDropdownMenu(props: Props) {
    const { children } = props;

    const items: any = [
        { id: 0, title: 'Ответить в обсуждении', onclick: () => console.log('wdad'), icon: <Icons variants="leftArrow" /> },
        { id: 1, title: 'Редактировать задачу', onclick: () => console.log('wdad'), icon: <Icons variants="leftArrow" /> },
        { id: 2, title: 'Упомянуть автора', onclick: () => console.log('wdad'), icon: <Icons variants="@" /> },
    ];

    return (
        <Dropdown animationVariant="auto-height" trigger="left-click" position="top-center" content={<div>s</div>}>
            {children}
        </Dropdown>
    );
}

export default MessageDropdownMenu;
