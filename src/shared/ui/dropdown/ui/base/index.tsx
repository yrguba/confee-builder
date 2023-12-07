import React, { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { useClickAway, useReverseTimer, useStyles } from 'shared/hooks';
import { Box } from 'shared/ui/index';

import styles from './styles.module.scss';
import { BaseDropdownProps } from '../../types';

function Dropdown(props: BaseDropdownProps) {
    const {
        children,
        visible,
        openCloseTrigger,
        content,
        trigger = 'left-click',
        position = 'left-bottom',
        closeAfterClick,
        animationVariant = 'visibleHidden',
        disabled,
        top,
        left,
        style,
    } = props;

    const elementRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const timeout = useRef<any>(null);

    useClickAway(elementRef, () => {
        isOpen && setIsOpen(false);
    });

    useEffect(() => {
        !disabled && setIsOpen(!!visible);
    }, [visible]);

    const classes = useStyles(styles, 'body', {
        [`position-${position}`]: position,
    });

    const click = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        if (trigger !== null && !disabled) {
            if (trigger === 'hover') {
                if (timeout.current) timeout.current = null;
                timeout.current = setTimeout(() => setIsOpen(true), 200);
            } else {
                setIsOpen(true);
            }
        }
    };

    const mouseLeave = () => {
        setIsOpen(false);
        if (timeout.current) clearTimeout(timeout.current);
    };

    useEffect(() => {
        openCloseTrigger && openCloseTrigger(isOpen);
    }, [isOpen]);

    return (
        <div
            style={style}
            ref={elementRef}
            className={styles.wrapper}
            onClick={trigger === 'left-click' ? click : undefined}
            onContextMenu={trigger === 'right-click' ? click : undefined}
            onMouseEnter={trigger === 'hover' ? click : undefined}
            onMouseLeave={trigger === 'hover' ? () => mouseLeave() : undefined}
        >
            {children}
            <Box.Animated
                animationVariant={animationVariant}
                style={{ position: 'absolute', top, left }}
                className={classes}
                visible={visible || isOpen}
                presence
                onClick={(e) => {
                    closeAfterClick && setIsOpen(false);
                    e.stopPropagation();
                }}
            >
                {content}
            </Box.Animated>
        </div>
    );
}

export default Dropdown;
