import React from 'react';

import styles from './styles.module.scss';
import { useToggle } from '../../../hooks';
import Icons from '../../icons';
import { Box } from '../../index';
import { CollapseProps } from '../types';

function Collapse(props: CollapseProps) {
    const { title, children, titleClassName, onTitleClick, openByClickingOnArrow, activeAnimate } = props;
    const [visible, toggle] = useToggle();

    const headerClick = () => {
        !openByClickingOnArrow && toggle();
    };

    const titleClick = () => {
        onTitleClick && onTitleClick(title);
    };

    const arrowClick = () => {
        openByClickingOnArrow && toggle();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header} onClick={headerClick}>
                <div className={`${styles.title} ${titleClassName}`} onClick={titleClick}>
                    {title}
                </div>
                <div className={styles.arrow} onClick={arrowClick}>
                    <Icons.ArrowAnimated animateDeg={90} initialDeg={0} activeAnimate={visible} variants="rotate" />
                </div>
            </div>

            <Box.Animated animationVariant="autoHeight" onClick={(e) => e.stopPropagation()} visible={visible}>
                {children}
            </Box.Animated>
        </div>
    );
}

export default Collapse;
