import React, { useState } from 'react';

import { MessageDropdownMenu } from 'features/menu-dropdown';
import { Button, Counter } from 'shared/ui';

import styles from './styles.module.scss';

function MessagesPage() {
    const [a, seta] = useState<number>(500);

    return (
        <div className={styles.page}>
            <Button onClick={() => seta(a + 1)}>up</Button>
            <Button onClick={() => seta(a - 1)}>down</Button>
            <Counter height={26} maxVisibleNumber={500}>
                {a}
            </Counter>
            {/* <MessageDropdownMenu>dwa</MessageDropdownMenu> */}
        </div>
    );
}

export default MessagesPage;
