import React, { useState } from 'react';

import { MessageDropdownMenu } from 'features/menu-dropdown';
import { Button, Counter, Select, Icons, SelectTypes } from 'shared/ui';

import styles from './styles.module.scss';

type Title = '12121';

function MessagesPage() {
    const [a, seta] = useState<number>(500);

    const items = [
        { id: 0, title: '12121' },
        { id: 1, title: '12121' },
        { id: 2, title: '12121' },
        { id: 3, title: '12121' },
        { id: 4, title: '12121' },
    ];

    return (
        <div className={styles.page}>
            {/* <Button onClick={() => seta(a + 1)}>up</Button> */}
            {/* <Button onClick={() => seta(a - 1)}>down</Button> */}
            {/* <Counter height={26} maxVisibleNumber={500}> */}
            {/*    {a} */}
            {/* </Counter> */}
            <Select items={items} />
            {/* <MessageDropdownMenu>dwa</MessageDropdownMenu> */}
        </div>
    );
}

export default MessagesPage;
