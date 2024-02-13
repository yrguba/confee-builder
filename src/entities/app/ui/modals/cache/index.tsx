import React from 'react';

import styles from './styles.module.scss';
import { Button, Icons, Title } from '../../../../../shared/ui';

type Categories = 'img' | 'video' | 'audio' | 'system' | 'all';

type Props = {
    sizes: { img: string; video: string; audio: string; system: string; all: string };
    clear: (category: Categories) => void;
    clearing: { id: Categories }[];
};

function CacheView(props: Props) {
    const { sizes, clear, clearing } = props;

    const categories = [
        { id: 0, title: 'Изображения', size: sizes.img, category: 'img' },
        { id: 1, title: 'Видео', size: sizes.video, category: 'video' },
        { id: 2, title: 'Аудио', size: sizes.audio, category: 'audio' },
        { id: 3, title: 'Системный кэш', size: sizes.system, category: 'system' },
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
                    .map((i) => {
                        const isClearing = !!clearing.find((c) => c.id === i.category);
                        return (
                            <div key={i.id} className={styles.item}>
                                <div className={styles.description}>
                                    <Title variant="H3M">{i.title}</Title>
                                    <Title primary={false} variant="H4R">
                                        {i.size}
                                    </Title>
                                </div>
                                <Button.Circle disabled={isClearing} variant="inherit" className={styles.icon} onClick={() => clear(i.category as Categories)}>
                                    <Icons.BroomAnimated activeAnimate={isClearing} />
                                </Button.Circle>
                            </div>
                        );
                    })}
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
