import React, { forwardRef, RefObject, useEffect, useRef, useState } from 'react';

import { useClickAway, useStyles } from 'shared/hooks';
import { Box } from 'shared/ui/index';

import styles from './styles.module.scss';
import { BaseDropdownProps } from '../../types';

const DynamicDropdown = forwardRef<any, BaseDropdownProps>((props, wrapperRef: any) => {
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
        closeAfterClick,
        disabled,
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
        // [`position-${position}`]: position && !dynamicPosition,
        // reverseY,
        // reverseX,
    });

    const click = (event: any) => {
        // event.preventDefault();
        // stopPropagation && event.stopPropagation();
        // if (trigger !== null && !disabled) {
        //     setIsOpen(true);
        //     if (dynamicPosition && wrapperRef?.current && elementRef.current) {
        //         const childRect = elementRef.current?.getBoundingClientRect();
        //         const parentRect = wrapperRef.current?.getBoundingClientRect();
        //         // const mouseClickX = event.clientX - childRect.left;
        //         // console.log(parentRect);
        //         //
        //         const getX = () => {
        //             // const x = parentRect.left >= mouseClickX;
        //             //
        //             // const a = parentRect.left >= childRect.right || parentRect.right <= childRect.left;
        //             // console.log('out', x);
        //             return event.clientX - childRect.left;
        //         };
        //
        //         setPos({
        //             // x: breakpoint === 'sm' || breakpoint === 'md' ? (reverseX ? rect.width : rect.left) : event.clientX - rect.left,
        //             x: getX(),
        //             y: reverseY ? -230 : event.clientY - childRect.top,
        //         });
        //     }
        // }
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
});

export default DynamicDropdown;