import React, { forwardRef, useEffect, useRef, useState } from 'react';

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
    const wrapperClickPosition = useEasyState<{ x: number; y: number }>({ x: 0, y: 0 });

    const updateX = (contentRect: any, wrapperRect: any, padding: any) => {
        if (reverseX) {
            if (wrapperClickPosition.value.x - padding < contentRect.width) {
                return positionState.set((prev) => {
                    prev.x = padding;
                });
            }
        } else if (wrapperRect.width - wrapperClickPosition.value.x - padding < contentRect.width) {
            return positionState.set((prev) => {
                prev.x = wrapperRect.width - contentRect.width - padding;
            });
        }
        positionState.set((prev) => {
            prev.x = reverseX ? wrapperClickPosition.value.x - contentRect.width : wrapperClickPosition.value.x;
        });
    };

    const updateY = (contentRect: any, wrapperRect: any, padding: any) => {
        if (reverseY) {
            if (wrapperClickPosition.value.y < contentRect.height) {
                return positionState.set((prev) => {
                    prev.y = padding;
                });
            }
        } else if (wrapperRef.current.scrollHeight - wrapperClickPosition.value.y < contentRect.width) {
            return positionState.set((prev) => {
                prev.y = wrapperRef.current.scrollHeight - padding - contentRect.height;
            });
        }
        positionState.set((prev) => {
            prev.y = reverseY ? wrapperClickPosition.value.y - contentRect.height : wrapperClickPosition.value.y;
        });
    };

    const contentRef = useCallbackRef<HTMLDivElement>((element) => {
        if (element) {
            const wrapperRect = wrapperRef.current?.getBoundingClientRect();
            const contentRect = element?.getBoundingClientRect();
            const padding = 8;
            if (contentRect) {
                updateX(contentRect, wrapperRect, padding);
                updateY(contentRect, wrapperRect, padding);
            }
        }
    });

    useEffect(() => {
        wrapperRef.current.style.position = 'relative';
        const wrapperRect = wrapperRef.current?.getBoundingClientRect();
        wrapperRef?.current?.addEventListener('contextmenu', (e: MouseEvent) => {
            wrapperClickPosition.set({
                x: e.clientX - wrapperRect.left,
                y: e.pageY - wrapperRect.top + wrapperRef.current.scrollTop,
            });
        });
        // return () => wrapperRef.current && wrapperRef?.current?.removeListener('contextmenu', null);
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
            setIsOpen(true);
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
