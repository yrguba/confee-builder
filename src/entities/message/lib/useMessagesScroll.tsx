import { JitsiMeeting } from '@jitsi/react-sdk';
import { WebviewWindow } from '@tauri-apps/api/window';
import React, { MouseEvent, RefObject, useEffect, useRef, WheelEvent } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState } from 'shared/hooks';

function useMessagesScroll(wrapperRef: RefObject<HTMLDivElement>) {
    const sliderRef = useRef<HTMLDivElement>(null);

    const realHeight = useEasyState(0);
    const sliderHeight = useEasyState(0);
    const sliderY = useEasyState(0);
    const isSliderCapture = useEasyState(false);

    useEffect(() => {
        window.addEventListener('mouseup', () => isSliderCapture.set(false));
        return document.removeEventListener('mouseup', () => null);
    }, []);

    const handler = (isScrollUp: boolean, disabled?: boolean) => {
        console.log(disabled);
        if (wrapperRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current;
            const step = 50;
            wrapperRef.current.scrollTop = isScrollUp ? scrollTop - step : scrollTop + step;
            const viewHeightPercent = Math.ceil((clientHeight * 100) / scrollHeight);
            if (scrollHeight > clientHeight) {
                if (sliderHeight.value !== viewHeightPercent) {
                    sliderHeight.set(viewHeightPercent);
                }
                if (sliderRef.current) {
                    realHeight.set(clientHeight - sliderRef.current.clientHeight);
                }
            }
        }
    };

    useEffect(() => {
        if (wrapperRef.current) {
            if (isSliderCapture.value) {
                wrapperRef.current.onmousemove = (e) => {
                    handler(e.movementY < 0);
                };
            } else {
                wrapperRef.current.onmousemove = null;
            }
        }
    }, [isSliderCapture.value]);

    const onWheel = (e: WheelEvent<HTMLDivElement>) => {
        const wrapper = e.currentTarget;
        if (wrapper) {
            const isScrollUp = e.deltaY < 0;
            handler(isScrollUp);
        }
    };

    function Scrollbar() {
        return (
            <div
                onMouseDown={() => isSliderCapture.set(true)}
                style={{
                    position: 'absolute',
                    top: -8,
                    right: 0,
                    height: '100%',
                    width: 12,
                    zIndex: 100000,
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    // backgroundColor: 'var(--control-tertiary)',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: realHeight.value,
                        position: 'relative',
                        backgroundColor: 'var(--control-tertiary)',
                    }}
                >
                    <div
                        ref={sliderRef}
                        style={{
                            cursor: 'pointer',
                            width: '100%',
                            height: `${sliderHeight.value}%`,
                            backgroundColor: 'var(--control-primary)',
                            borderRadius: 22,
                            position: 'absolute',
                            left: 0,
                            bottom: `${sliderY.value}%`,
                            transform: ' translateY(50%)',
                        }}
                    />
                </div>
            </div>
        );
    }

    return { onWheel, Scrollbar };
}

export default useMessagesScroll;
