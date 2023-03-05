import React, { ReactNode, ButtonHTMLAttributes, useRef, MouseEvent } from 'react';

import { useToggle, useClickAway, useStyles } from 'shared/hooks';
import { AnimateBox } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    trigger?: 'left-click' | 'right-click' | 'hover';
    position?: 'top-center' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-center' | 'left-bottom' | 'left-center' | 'left-top';
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Dropdown(props: Props) {
    const { children, trigger = 'left-click', position = 'right-center' } = props;

    const ref = useRef(null);

    const [isOpen, toggle] = useToggle();

    useClickAway(ref, () => {
        isOpen && toggle();
    });

    const classes = useStyles('body', {
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
            <AnimateBox className={classes} isVisible={isOpen} presence onClick={(e) => e.stopPropagation()}>
                <div>wdwdadwadawd</div>
            </AnimateBox>
        </div>
    );
}

export default Dropdown;
