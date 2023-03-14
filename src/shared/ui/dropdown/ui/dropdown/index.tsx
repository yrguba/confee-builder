import React, { useEffect, useRef } from 'react';

import { useToggle, useClickAway, useStyles } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { DropdownBaseProps } from '../../types';

function Dropdown(props: DropdownBaseProps) {
    const { children, openCloseTrigger, content, trigger = 'left-click', position = 'left-bottom', animationVariant = 'visible-hidden' } = props;

    const ref = useRef(null);

    const [isOpen, toggle] = useToggle();

    useClickAway(ref, () => {
        isOpen && toggle();
    });

    const classes = useStyles(styles, 'body', {
        [`position-${position}`]: position,
    });

    const click = () => {
        toggle();
    };

    useEffect(() => {
        openCloseTrigger && openCloseTrigger(isOpen);
    }, [isOpen]);

    return (
        <div
            ref={ref}
            className={styles.wrapper}
            onClick={trigger === 'left-click' ? click : undefined}
            onContextMenu={trigger === 'right-click' ? click : undefined}
            onMouseEnter={trigger === 'hover' ? click : undefined}
            onMouseLeave={trigger === 'hover' ? () => click : undefined}
        >
            {children}
            <Box.Animated animationVariant={animationVariant} className={classes} visible={isOpen} presence onClick={(e) => e.stopPropagation()}>
                {content}
            </Box.Animated>
        </div>
    );
}

export default Dropdown;
