import React, { memo, useEffect, useTransition } from 'react';

import styles from './styles.module.scss';
import { useEasyState, useToggle } from '../../../hooks';
import Icons from '../../icons';
import { Box, Title } from '../../index';
import { CollapseProps } from '../types';

function Collapse(props: CollapseProps) {
    const { title, children, subtitle, headerStyle, isOpen, onTitleClick, openByClickingOnArrow, openClose, loading } = props;

    const visible = useEasyState(!!isOpen);

    const headerClick = () => {
        openClose && openClose(!visible.value);
        !openByClickingOnArrow && visible.toggle();
    };

    const titleClick = (e: any) => {
        onTitleClick && onTitleClick(title);
    };

    const arrowClick = (e: any) => {
        openClose && openClose(!visible.value);
        openByClickingOnArrow && visible.toggle();
    };

    useEffect(() => {
        openClose && openClose(!!isOpen);
        visible.set(!!isOpen);
    }, [isOpen]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header} style={headerStyle} onClick={headerClick}>
                <div className={styles.title} onClick={titleClick}>
                    <div className={styles.caption}>
                        <Title primary variant="H4S">
                            {title}
                        </Title>
                        <Title primary={false} variant="H4M">
                            {subtitle}
                        </Title>
                    </div>
                </div>
                <div className={styles.arrow} onClick={arrowClick}>
                    <Icons.ArrowAnimated animateDeg={90} initialDeg={0} activeAnimate={visible.value} variant="rotate" />
                </div>
            </div>

            <Box.Animated animationVariant="autoHeight" onClick={(e) => e.stopPropagation()} visible={visible.value}>
                {children}
            </Box.Animated>
        </div>
    );
}

export default Collapse;
