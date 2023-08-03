import React, { useEffect } from 'react';

import styles from './styles.module.scss';
import { useToggle } from '../../../hooks';
import Icons from '../../icons';
import { Box, Title } from '../../index';
import { CollapseProps } from '../types';

function Collapse(props: CollapseProps) {
    const { title, children, subtitle, titleClassName, isOpen, headerClassName, onTitleClick, openByClickingOnArrow, createAction } = props;
    const [visible, toggle] = useToggle();

    const headerClick = () => {
        !openByClickingOnArrow && toggle();
    };

    const titleClick = (e: any) => {
        onTitleClick && onTitleClick(title);
    };

    const arrowClick = (e: any) => {
        openByClickingOnArrow && toggle();
    };

    useEffect(() => {
        toggle(!!isOpen);
    }, [isOpen]);

    const plusClick = (e: any) => {
        e.stopPropagation();
        createAction && createAction(title);
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.header} ${headerClassName}`} onClick={headerClick}>
                <div className={`${styles.title} ${titleClassName}`} onClick={titleClick}>
                    <div className={styles.caption}>
                        <Title primary variant="H4S">
                            {title}
                        </Title>
                        <Title primary={false} variant="H4M">
                            {subtitle}
                        </Title>
                    </div>

                    {createAction && (
                        <div onClick={plusClick} className={styles.plus}>
                            <Icons variant="add" />
                        </div>
                    )}
                </div>
                <div className={styles.arrow} onClick={arrowClick}>
                    <Icons.ArrowAnimated animateDeg={90} initialDeg={0} activeAnimate={visible} variant="rotate" />
                </div>
            </div>

            <Box.Animated animationVariant="autoHeight" onClick={(e) => e.stopPropagation()} visible={visible}>
                {children}
            </Box.Animated>
        </div>
    );
}

export default Collapse;
