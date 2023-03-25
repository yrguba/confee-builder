import React from 'react';

import { baseTypes } from 'shared/types';
import { Reactions } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { MessageMenuItem } from '../../model/types';

type Props = {
    reactionClick: (arg: string) => void;
    items: MessageMenuItem[];
} & baseTypes.Statuses;

function MessageMenuView(props: Props) {
    const { items, reactionClick } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.reactions}>
                <Reactions.List onClick={reactionClick} />
            </div>
            <div className={styles.list}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <div className={styles.content}>
                            <Icons variants={item.icon} />
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MessageMenuView;
