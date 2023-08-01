import React, { useEffect, useRef, useState } from 'react';

import { useClickAway, useStyles } from 'shared/hooks';
import { Box } from 'shared/ui/index';

import styles from './styles.module.scss';
import { DropdownBaseProps } from '../types';

function Dropdown(props: DropdownBaseProps) {
    const {
        children,
        visible,
        openCloseTrigger,
        content,
        trigger = 'left-click',
        position = 'left-bottom',
        animationVariant = 'visibleHidden',
        top,
        left,
        dynamicPosition,
        reverseY,
        reverseX,
        closeAfterClick,
        stopPropagation = true,
    } = props;

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useClickAway(wrapperRef, () => {
        isOpen && setIsOpen(false);
    });

    useEffect(() => {
        setIsOpen(!!visible);
    }, [visible]);

    const classes = useStyles(styles, 'body', {
        [`position-${position}`]: position && !dynamicPosition,
        reverseY,
        reverseX,
    });

    const click = (event: any) => {
        if (trigger !== null) {
            event.preventDefault();
            stopPropagation && event.stopPropagation();
            setIsOpen(true);
            if (dynamicPosition && wrapperRef.current) {
                const rect = wrapperRef.current?.getBoundingClientRect();
                setPos({
                    // x: breakpoint === 'sm' || breakpoint === 'md' ? (reverseX ? rect.width : rect.left) : event.clientX - rect.left,
                    x: event.clientX - rect.left,
                    y: reverseY ? -230 : event.clientY - rect.top,
                });
            }
        }
    };

    useEffect(() => {
        openCloseTrigger && openCloseTrigger(isOpen);
    }, [isOpen]);

    return (
        <div
            ref={wrapperRef}
            className={styles.wrapper}
            onClick={trigger === 'left-click' ? click : undefined}
            onContextMenu={trigger === 'right-click' ? click : undefined}
            onMouseEnter={trigger === 'hover' ? click : undefined}
            onMouseLeave={trigger === 'hover' ? () => click : undefined}
        >
            {children}
            <Box.Animated
                animationVariant={animationVariant}
                style={{ position: 'absolute', top: top || pos.y, left: left || pos.x }}
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
