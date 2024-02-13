import React from 'react';

import styles from './styles.module.scss';
import { Button, Title } from '../../../../../shared/ui';

type Props = {
    sizes: { img: string; video: string; audio: string; system: string; all: string };
    clear: (category: 'img' | 'video' | 'audio' | 'system' | 'all') => void;
};

function CacheView(props: Props) {
    const { sizes, clear } = props;

    const categories = [
        { id: 0, title: 'Изображения', size: sizes.img, onClick: () => clear('img') },
        { id: 1, title: 'Видео', size: sizes.video, onClick: () => clear('video') },
        { id: 2, title: 'Аудио', size: sizes.audio, onClick: () => clear('audio') },
        { id: 3, title: 'Системный кэш', size: sizes.system, onClick: () => clear('system') },
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
                {categories
                    .filter((i) => i.size)
                    .map((i) => (
                        <div key={i.id} className={styles.item}>
                            <div className={styles.description}>
                                <Title variant="H3M">{i.title}</Title>
                                <Title primary={false} variant="H4R">
                                    {i.size}
                                </Title>
                            </div>
                            <div className={styles.icon} onClick={i.onClick}>
                                w
                            </div>
                        </div>
                    ))}
            </div>
            <div className={styles.clearAll}>
                <Button onClick={() => clear('all')}>{`Очистить все  ${sizes.all}`}</Button>
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
