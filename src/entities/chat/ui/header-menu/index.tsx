import React, { useRef } from 'react';

import { useClickAway } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Icons, Dropdown } from 'shared/ui';

import styles from './styles.module.scss';
import useChatStore from '../../model/store';

type IconsVar = 'trash' | 'settings';

type Props = {
    items: { id: number; icon: IconsVar; title: string; action: () => void }[];
} & BaseTypes.Statuses;

function ChatHeaderMenuView(props: Props) {
    const { items } = props;

    const setVisibleHeaderMenu = useChatStore.use.setVisibleHeaderMenu();

    const ref = useRef(null);

    useClickAway(ref, () => {
        setVisibleHeaderMenu(false);
    });

    return (
        <div className={styles.wrapper} ref={ref}>
            {items.map((i) => (
                <div key={i.id} className={styles.item} onClick={i.action}>
                    <Icons variants={i.icon} />
                    {i.title}
                </div>
            ))}
        </div>
    );
}

export default ChatHeaderMenuView;
