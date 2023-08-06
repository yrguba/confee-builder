import { freeze, produce } from 'immer';
import React, { forwardRef, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { useClickAway, useEasyState, useStyles, useCallbackRef } from 'shared/hooks';
import { Box } from 'shared/ui/index';

import styles from './styles.module.scss';
import { DynamicDropdownProps } from '../../types';

const DynamicDropdown = forwardRef<any, DynamicDropdownProps>((props, wrapperRef: any) => {
    const {
        children,
        visible,
        openCloseTrigger,
        content,
        reverseX,
        reverseY,
        trigger = 'left-click',
        animationVariant = 'visibleHidden',
        closeAfterClick,
        disabled,
    } = props;

    const childrenRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const positionState = useEasyState<{ x: number; y: number }>({ x: 0, y: 0 });
    const itemClickPosition = useEasyState<{ x: number; y: number }>({ x: 0, y: 0 });
    const wrapperClickPosition = useEasyState<{ x: number; y: number }>({ x: 0, y: 0 });

    const contentRef = useCallbackRef<HTMLDivElement>((element) => {
        if (element) {
            const wrapperRect = wrapperRef.current?.getBoundingClientRect();
            const contentRect = element?.getBoundingClientRect();
            const childrenRect = childrenRef.current?.getBoundingClientRect();

            if (contentRect) {
                // console.log('wrapperRect', wrapperRect);
                // console.log('contentRect', contentRect);
                // if (wrapperClickPosition.value.x < contentRect.width) {
                //     console.log(wrapperRect.left);
                //     const hiddenNum = wrapperClickPosition.value.x - contentRect.width;
                //     return positionState.set({
                //         x: wrapperClickPosition.value.x,
                //         y: wrapperClickPosition.value.y,
                //     });
                // }
                positionState.set({
                    x: reverseX ? wrapperClickPosition.value.x - contentRect.width : wrapperClickPosition.value.x,
                    y: wrapperClickPosition.value.y,
                });
            }
            if (!isOpen) {
                wrapperRef.current.addEventListener('contextmenu', null);
            }
        }
    });

    useEffect(() => {
        const wrapperRect = wrapperRef.current?.getBoundingClientRect();
        wrapperRef.current.addEventListener('contextmenu', (e: MouseEvent) => {
            wrapperClickPosition.set({
                x: e.clientX - wrapperRect.left,
                y: e.pageY - wrapperRect.top + wrapperRef.current.scrollTop,
            });
        });
        return () => wrapperRef.current.addEventListener('contextmenu', null);
    }, []);

    useClickAway(childrenRef, () => {
        isOpen && setIsOpen(false);
    });

    useEffect(() => {
        !disabled && setIsOpen(!!visible);
    }, [visible]);

    const classes = useStyles(styles, 'content', {});

    const click = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        if (trigger !== null && !disabled) {
            const childrenRect = childrenRef.current?.getBoundingClientRect();
            setIsOpen(true);
            // if (!childrenRect) return;
            // itemClickPosition.set({
            //     x: reverseX ? event.clientX - childrenRect.left : event.clientX - childrenRect.left,
            //     y: event.clientY - childrenRect.top,
            // });
        }
    };

    useEffect(() => {
        openCloseTrigger && openCloseTrigger(isOpen);
    }, [isOpen]);

    return (
        <div
            ref={childrenRef}
            className={styles.wrapper}
            onClick={trigger === 'left-click' ? click : undefined}
            onContextMenu={trigger === 'right-click' ? click : undefined}
            onMouseEnter={trigger === 'hover' ? click : undefined}
            onMouseLeave={trigger === 'hover' ? () => click : undefined}
        >
            {children}
            <Box.Animated
                ref={contentRef}
                animationVariant={animationVariant}
                className={classes}
                visible={visible || isOpen}
                style={{ top: positionState.value.y, left: positionState.value.x }}
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

function isHidden(element: any, wrapper: any) {
    const elementRect = element.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    console.log('elementRect', elementRect);
    console.log('wrapperRect', wrapperRect);
    const elementHidesUp = elementRect.top < 0;
    const elementHidesLeft = elementRect.left < 0;
    const elementHidesDown = elementRect.bottom > wrapperRect.innerHeight;
    const elementHidesRight = elementRect.right > wrapperRect.innerWidth;
    const elementHides = elementHidesUp || elementHidesLeft || elementHidesDown || elementHidesRight;
    return elementHides;
}
