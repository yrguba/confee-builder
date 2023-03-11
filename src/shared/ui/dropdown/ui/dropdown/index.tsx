import React, { useRef } from 'react';

import { useToggle, useClickAway, useStyles } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { DropdownBaseProps } from '../../types';
import Menu from '../menu';

function Dropdown(props: DropdownBaseProps) {
    const { children, content, items, trigger = 'left-click', position = 'left-bottom', animationVariant = 'visible-hidden' } = props;

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
            <Box.Animate
                animationVariant={animationVariant}
                className={classes}
                isVisible={isOpen}
                presence
                onClick={(e) => e.stopPropagation()}
                style={{ padding: items ? 0 : 12 }}
            >
                {items ? <Menu items={items} /> : content}
            </Box.Animate>
        </div>
    );
}

export default Dropdown;
