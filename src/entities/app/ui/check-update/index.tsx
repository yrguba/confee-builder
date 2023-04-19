import React from 'react';

import { project } from 'shared/constanst';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    items: { id: number; title: string; value: string; onClick: () => void }[];
};

function CheckUpdateView(props: Props) {
    const { items } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Версии</div>
            <div className={styles.body}>
                {items.map((i) => (
                    <div key={i.id} className={styles.item}>
                        <div className={styles.item_title}>{i.title}</div>
                        <div className={styles.item_value}>
                            <Button.Link onClick={i.onClick} active>
                                {i.value}
                            </Button.Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CheckUpdateView;
