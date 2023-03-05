import React, { ReactNode, useRef } from 'react';

import { useToggle, useClickAway, useStyles } from 'shared/hooks';
import { AnimateBox } from 'shared/ui';

import styles from './styles.module.scss';
import { AnimationVariant } from '../animate-box/variants';

export type DropdownProps = {
    children: ReactNode;
    content?: ReactNode;
    trigger?: 'left-click' | 'right-click' | 'hover';
    position?: 'top-center' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-center' | 'left-bottom' | 'left-center' | 'left-top';
    animationVariant?: AnimationVariant;
};

function Dropdown(props: DropdownProps) {
    const { children, content, trigger = 'left-click', position = 'left-bottom', animationVariant = 'visible-hidden' } = props;

    const ref = useRef(null);

    const [isOpen, toggle] = useToggle();

    useClickAway(ref, () => {
        isOpen && toggle();
    });

    const classes = useStyles(styles, 'body', {
        [`position-${position}`]: position,
    });

    const open = () => {
        toggle();
    };

    return (
        <div
            ref={ref}
            className={styles.wrapper}
            onClick={trigger === 'left-click' ? open : undefined}
            onContextMenu={trigger === 'right-click' ? open : undefined}
            onMouseEnter={trigger === 'hover' ? open : undefined}
            onMouseLeave={trigger === 'hover' ? () => toggle() : undefined}
        >
            {children}
            <AnimateBox animationVariant={animationVariant} className={classes} isVisible={isOpen} presence onClick={(e) => e.stopPropagation()}>
                {content}
            </AnimateBox>
        </div>
    );
}

export default Dropdown;
