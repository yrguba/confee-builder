import React, { useState } from 'react';

import { MessageDropdownMenu } from 'features/menu-dropdown';
import { MessageMenu } from 'features/message';
import { Reactions, Button, Counter, Select, Icons, SelectTypes, Dropdown } from 'shared/ui';

import styles from './styles.module.scss';

type Title = '12121';

function MessagesPage() {
    const [a, seta] = useState<number>(500);

    const items = [
        { name: 'aaaa', avatar: 'https://i.postimg.cc/W4Zh77jn/3440x1440.jpg' },
        { name: 'aaaa', avatar: 'https://i.postimg.cc/W4Zh77jn/3440x1440.jpg' },
        { name: 'aaaa', avatar: 'https://i.postimg.cc/W4Zh77jn/3440x1440.jpg' },

        // { name: 'aaaa', avatar: 'https://postimg.cc/kVnJJK26' },
    ];

    const item = {
        name: 'aaaa',
        avatar: 'https://postimg.cc/kVnJJK26',
    };

    return (
        <div className={styles.page}>
            {/* <Button onClick={() => seta(a + 1)}>up</Button> */}
            {/* <Button onClick={() => seta(a - 1)}>down</Button> */}
            {/* <Counter height={26} maxVisibleNumber={500}> */}
            {/*    {a} */}
            {/* </Counter> */}
            {/* <MessageMenu>wdad</MessageMenu> */}
            <Reactions.Counter maxAvatars={3} emoji="1f423" items={items} onClick={(data) => console.log(data)} />
            {/* <Select items={items} /> */}
            {/* <MessageDropdownMenu>dwa</MessageDropdownMenu> */}
        </div>
    );
}

export default MessagesPage;
