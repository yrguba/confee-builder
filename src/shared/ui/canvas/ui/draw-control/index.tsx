import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../hooks';
import { blobLocalPath } from '../../../../lib/file-converter';
import Box from '../../../box';
import Icons from '../../../icons';
import { Dropdown, Title } from '../../../index';
import Slider from '../../../slider';
import { DrawControlProps } from '../../types';

const DrawControl = forwardRef((props: DrawControlProps, ref: any) => {
    const { strokeWidth, imageUrl, color, onClose, getResult, tool, undoLength, redoLength, redo, undo } = props;

    const visibleTools = useEasyState(false);
    const visibleWidthSlider = useEasyState(false);

    const done = () => {
        if (ref.current) {
            const canvas = ref.current as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            if (imageUrl && ctx) {
                const canvasImg = canvas.toDataURL();
                const img1 = new Image();
                img1.src = imageUrl;
                img1.onload = () => {
                    const img2 = new Image();
                    img2.src = canvasImg;
                    img2.onload = () => {
                        ctx.drawImage(img1, 0, 0, img1.naturalWidth, img1.naturalHeight);
                        ctx.drawImage(img2, 0, 0, img2.naturalWidth, img2.naturalHeight);
                        canvas.toBlob((b) => {
                            if (!b) return null;
                            const url = blobLocalPath(b);
                            const file = new File([b], 'image.jpg', { type: 'image/jpeg' });
                            getResult({ url, file });
                        });
                    };
                };
            }
        }
    };

    const toolsItems = [
        {
            id: 'rect',
            icon: <Icons.Canvas variant="rect" />,
        },
        {
            id: 'circle',
            icon: <Icons.Canvas variant="circle" />,
        },
        {
            id: 'arrow',
            icon: <Icons.Canvas variant="arrow" />,
        },
        {
            id: 'pencil',
            icon: <Icons.Canvas variant="pencil" />,
        },
    ];

    const items = [
        {
            id: 1,
            element: (
                <div className={styles.tool} onClick={visibleTools.toggle}>
                    <Box.Animated visible={visibleTools.value} className={styles.tools} onMouseLeave={() => visibleTools.set(false)}>
                        {toolsItems.map(
                            (i) =>
                                i.id !== tool?.value && (
                                    <div
                                        key={i.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            tool?.set(i.id as any);
                                        }}
                                    >
                                        <Icons.Canvas variant={i.id as any} />
                                    </div>
                                )
                        )}
                    </Box.Animated>
                    <Icons.Canvas active variant={tool?.value as any} />
                </div>
            ),
        },
        {
            id: 2,
            element: (
                <div className={styles.widthSlider}>
                    <Box.Animated visible={visibleWidthSlider.value} className={styles.slider} onMouseLeave={() => visibleWidthSlider.set(false)}>
                        <Title variant="caption2M" textAlign="center" active>
                            {strokeWidth?.value}
                        </Title>
                        <Slider
                            vertical
                            className={styles.sliderWidth}
                            max={100}
                            min={1}
                            step={1}
                            defaultValue={12}
                            value={strokeWidth?.value}
                            handleStyle={{
                                width: 12,
                                height: 12,
                                // marginLeft: 0,
                                backgroundColor: 'var(--control-primary)',
                                border: '3px solid var(--control-primary)',
                                cursor: 'pointer',
                                opacity: 1,
                                boxShadow: 'none',
                            }}
                            onChange={(value) => {
                                if (typeof value === 'number') {
                                    strokeWidth?.set(value);
                                }
                            }}
                        />
                    </Box.Animated>
                    <div className={styles.icon} onClick={visibleWidthSlider.toggle}>
                        <div className={styles.dot} />
                        <Title variant="caption2M" textAlign="center" active>
                            {strokeWidth?.value}
                        </Title>
                    </div>
                </div>
            ),
        },
        {
            id: 3,
            element: (
                <div className={styles.colorPiker}>
                    <Icons.Canvas variant="color" />
                    <input className={styles.colorPiker_input} type="color" onChange={(e) => color.set(e.target.value)} />
                </div>
            ),
        },
        {
            id: 4,
            element: <Icons.Canvas active={undoLength} variant="undo" />,
            onClick: undo,
        },
        {
            id: 5,
            element: <Icons.Canvas active={redoLength} variant="redo" />,
            onClick: redo,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.title} onClick={onClose}>
                Отмена
            </div>
            <div className={styles.container}>
                {items.map((i) => (
                    <div key={i.id} className={styles.item} onClick={i.onClick}>
                        {i?.element}
                    </div>
                ))}
            </div>
            <div style={{ color: 'var(--text-action)' }} className={styles.title} onClick={done}>
                Готово
            </div>
        </div>
    );
});

export default DrawControl;
