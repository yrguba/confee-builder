import React from 'react';

import styles from './styles.module.scss';
import { Button, Title } from '../../../../../shared/ui';

type Props = {};

function CacheView(props: Props) {
    // const { } = props;

    const categories = [
        { id: 0, title: 'Изображения', size: '1' },
        { id: 1, title: 'Видео', size: '1' },
        { id: 2, title: 'Аудио', size: '1' },
        { id: 3, title: 'Системный кэш', size: '1' },
    ];

    return (
        <div className={styles.wrapper}>
            <div>
                <Title textAlign="center" variant="H2">
                    Память устройства
                </Title>
            </div>
            <div className={styles.sizeLimit}>sizeLimit</div>
            <div className={styles.categories}>
                {categories.map((i) => (
                    <div className={styles.item}>
                        <div className={styles.description}>
                            <Title variant="H3M">{i.title}</Title>
                            <Title primary={false} variant="H4R">
                                {i.size}
                            </Title>
                        </div>
                        <div className={styles.icon}>w</div>
                    </div>
                ))}
            </div>
            <div className={styles.clearAll}>
                <Button>{`Очистить все  ${1}`}</Button>
            </div>
            <div className={styles.info}>
                <Title textWrap textAlign="center" variant="H4M" primary={false}>
                    При достижении максимального выбранного объема памяти, система автоматически освобождает пространство, удаляя наименее актуальные данные из
                    кэша и заменяя их новой информацией.
                </Title>
            </div>
        </div>
    );
}

export default CacheView;
