import React, { ReactNode } from 'react';

import { Dropdown } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
};

function MessageMenu(props: Props) {
    const { children } = props;

    return (
        <div>
            <div onClick={() => console.log('wdad')}>{children}</div>
        </div>
    );
}

export default MessageMenu;
