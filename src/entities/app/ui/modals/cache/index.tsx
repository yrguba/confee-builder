import React from 'react';

import { UseEasyStateReturnType, UseFsTypes } from 'shared/hooks';
import { Button, Icons, Slider, Steps, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { sizeConverter } from '../../../../../shared/lib';

type Categories = UseFsTypes.FileTypes | 'all';

type Props = {
    sizes: { img: number; video: number; audio: number; document: number; system: number; all: number };
    clear: (category: Categories) => void;
    clearing: { id: Categories }[];
    maxSize: UseEasyStateReturnType<number>;
};

function CacheView(props: Props) {
    const { sizes, clear, clearing, maxSize } = props;

    const categories = [
        { id: 0, title: 'Изображения', size: sizes.img, category: 'img' },
        { id: 1, title: 'Видео', size: sizes.video, category: 'video' },
        { id: 2, title: 'Аудио', size: sizes.audio, category: 'audio' },
        { id: 3, title: 'Документы', size: sizes.document, category: 'document' },
        { id: 4, title: 'Системный кэш', size: sizes.system, category: 'json' },
    ];

    const notEmpty = !!Object.values(sizes).find((i) => i);

    const sizeDictionary: any = {
        1: 1,
        2: 5,
        3: 10,
        4: 20,
        5: 0,
    };

    const marks = () => {
        const obj: any = {};
        Object.entries(sizeDictionary).forEach(([key, value]) => {
            obj[key] = {
                style: {
                    marginLeft: value === 1 ? 9 : value === 0 ? -9 : 0,
                    marginTop: 6,
                    color: 'var(--text-inactive)',
                    fontWeight: 500,
                },
                label: value === 0 ? 'НЕТ' : `${value} GB`,
            };
        });
        return obj;
    };

    return (
        <div className={styles.wrapper}>
            <div>
                <Title textAlign="center" variant="H2">
                    Память устройства
                </Title>
            </div>
            <div className={styles.sizeLimit}>
                <div className={styles.size}>
                    <Title variant="H3M">Общее ограничение по размеру</Title>
                    <div>
                        <Title textAlign="right" active variant="H3M">
                            {maxSize.value === 0 ? 'НЕТ' : `${maxSize.value}GB`}
                        </Title>
                    </div>
                </div>
                <div className={styles.slider}>
                    <Slider
                        marks={marks()}
                        dots
                        dotStyle={{
                            width: 3,
                            height: 12,
                            marginBottom: -2,
                            border: '2px solid var(--control-secondary)',
                            borderRadius: 0,
                        }}
                        activeDotStyle={{
                            border: '2px solid var(--control-primary)',
                            width: 3,
                            height: 12,
                        }}
                        handleStyle={{
                            opacity: 1,
                            width: 24,
                            height: 24,
                            backgroundColor: 'var(--control-primary)',
                            marginTop: -9,
                            border: 'none',
                        }}
                        borderRadius={0}
                        max={5}
                        min={1}
                        step={1}
                        defaultValue={Object.keys(sizeDictionary).find((key) => sizeDictionary[key] === maxSize.value) as any}
                        onChange={(value) => {
                            if (typeof value === 'number') {
                                maxSize.set(sizeDictionary[value]);
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
                <Title textWrap variant="H4M" primary={false}>
                    При достижении максимального выбранного объема памяти, система автоматически освобождает пространство, удаляя наименее актуальные данные из
                    кэша и заменяя их новой информацией.
                </Title>
            </div>
        </div>
    );
}

export default CacheView;
