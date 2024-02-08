import React, { memo, useState } from 'react';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../../hooks';
import { ImagesListProps } from '../../types';
import Image from '../base';
import Swiper from '../swiper';

function ImageList(props: ImagesListProps) {
    const { visibleDropdown = true, items, style } = props;

    const visibleSwiper = useEasyState({ visible: false, init: 0 });

    return (
        <>
            <Swiper
                items={items}
                visible={visibleSwiper.value.visible}
                initialSlide={visibleSwiper.value.init}
                closeClick={() => visibleSwiper.set({ visible: false, init: 0 })}
            />
            <div className={styles.wrapper} style={style}>
                {items?.map((i, index) => (
                    <Image
                        visibleDropdown={visibleDropdown}
                        name={i.name}
                        onClick={() => visibleSwiper.set({ visible: true, init: index })}
                        key={i.id}
                        {...i}
                        borderRadius={false}
                    />
                ))}
            </div>
        </>
    );
}
export default ImageList;
