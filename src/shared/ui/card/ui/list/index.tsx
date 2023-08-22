import React from 'react';

import styles from './styles.module.scss';
import { Box, Card, Icons } from '../../../index';
import { CardListProps } from '../../types';

function CardList(props: CardListProps) {
    const { items, selected } = props;

    return (
        <div className={styles.wrapper}>
            {items?.map((i) => (
                <div key={i.id} className={styles.item} onClick={() => selected.pushOrDelete(i)}>
                    <div className={styles.info}>
                        <Card onClick={() => ''} key={i.id} name={i?.name || ''} title={i?.title || ''} img={i?.img || ''} subtitle={i?.subtitle || ' '} />
                    </div>

                    <div className={styles.selectIndicator}>
                        <Box.Animated visible={!!selected.findById(i.id)}>
                            <Icons variant="check" />
                        </Box.Animated>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardList;
