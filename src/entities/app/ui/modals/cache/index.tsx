import React from 'react';

import { UseFsTypes } from 'shared/hooks';
import { Button, Icons, Slider, Steps, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { sizeConverter } from '../../../../../shared/lib';

type Categories = UseFsTypes.FileTypes | 'all';

type Props = {
    sizes: { img: number; video: number; audio: number; document: number; system: number; all: number };
    clear: (category: Categories) => void;
    clearing: { id: Categories }[];
};

function CacheView(props: Props) {
    const { sizes, clear, clearing } = props;

    const categories = [
        { id: 0, title: 'Изображения', size: sizes.img, category: 'img' },
        { id: 1, title: 'Видео', size: sizes.video, category: 'video' },
        { id: 2, title: 'Аудио', size: sizes.audio, category: 'audio' },
        { id: 3, title: 'Документы', size: sizes.document, category: 'document' },
        { id: 4, title: 'Системный кэш', size: sizes.system, category: 'json' },
    ];

    const notEmpty = !!Object.values(sizes).find((i) => i);

    return (
        <div className={styles.wrapper}>
            <div>
                <Title textAlign="center" variant="H2">
                    Память устройства
                </Title>
            </div>
            <div className={styles.sizeLimit}>
                <div className={styles.slider}>
                    <Slider
                        borderRadius={0}
                        max={5}
                        step={1}
                        defaultValue={[2, 5]}
                        onChange={(value) => {
                            if (typeof value === 'number') {
                            }
                        }}
                    />
                </div>
            </div>
            <div className={styles.categories}>
                {categories
                    .filter((i) => i.size)
                    .map((i) => {
                        const isClearing = !!clearing.find((c) => c.id === i.category || c.id === 'all');
                        return (
                            <div key={i.id} className={styles.item}>
                                <div className={styles.description}>
                                    <Title variant="H3M">{i.title}</Title>
                                    <Title primary={false} variant="H4R">
                                        {isClearing ? 'Очищаем...' : sizeConverter(i.size)}
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
                <Button disabled={!notEmpty} onClick={() => clear('all')}>
                    {!notEmpty ? 'Нет кэшированных файлов' : `Очистить все  ${sizeConverter(sizes.all)}`}
                </Button>
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
