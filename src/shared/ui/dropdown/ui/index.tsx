import React, { useEffect, useRef, useState } from 'react';

import { useClickAway, useStyles } from 'shared/hooks';
import { Box } from 'shared/ui/index';

import styles from './styles.module.scss';
import { BaseDropdownProps } from '../types';

function Dropdown(props: BaseDropdownProps) {
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
        disabled,
        wrapperSize,
        contentWidth,
    } = props;

    const elementRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useClickAway(elementRef, () => {
        isOpen && setIsOpen(false);
    });

    useEffect(() => {
        !disabled && setIsOpen(!!visible);
    }, [visible]);

    const classes = useStyles(styles, 'body', {
        [`position-${position}`]: position && !dynamicPosition,
        reverseY,
        reverseX,
    });

    const click = (event: any) => {
        event.preventDefault();
        stopPropagation && event.stopPropagation();
        if (trigger !== null && !disabled) {
            setIsOpen(true);
            if (dynamicPosition && elementRef.current && wrapperSize) {
                const elementRect = elementRef.current?.getBoundingClientRect();

                const freeDistance = wrapperSize.width - elementRect.width;
                console.log('wrapperSize', wrapperSize);
                console.log('children width', elementRect.width);
                console.log('menu width', contentWidth);
                console.log('freeDistance', freeDistance);
                const getX = () => {
                    return event.clientX - elementRect.left;
                };

                setPos({
                    // x: breakpoint === 'sm' || breakpoint === 'md' ? (reverseX ? rect.width : rect.left) : event.clientX - rect.left,
                    x: getX(),
                    y: reverseY ? -230 : event.clientY - elementRect.top,
                });
            }
        }
    };

    useEffect(() => {
        openCloseTrigger && openCloseTrigger(isOpen);
    }, [isOpen]);

    return (
        <div
            ref={elementRef}
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
