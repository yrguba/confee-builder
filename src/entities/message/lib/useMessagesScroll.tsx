import { JitsiMeeting } from '@jitsi/react-sdk';
import { WebviewWindow } from '@tauri-apps/api/window';
import React, { MouseEvent, RefObject, useEffect, useRef, WheelEvent } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState, useReverseTimer } from 'shared/hooks';

import { Box } from '../../../shared/ui';

function useMessagesScroll(wrapperRef: RefObject<HTMLDivElement>) {
    const sliderRef = useRef<HTMLDivElement>(null);

    const realHeight = useEasyState(0);
    const sliderHeight = useEasyState(0);
    const sliderY = useEasyState(0);
    const isSliderCapture = useEasyState(false);

    // useEffect(() => {
    //     window.addEventListener('mouseup', () => isSliderCapture.set(false));
    //     return document.removeEventListener('mouseup', () => null);
    // }, []);

    const { isRunning, start } = useReverseTimer({ seconds: 3 });

    const handler = (isScrollUp: boolean, disabled?: boolean) => {
        if (wrapperRef.current) {
            start();
            const { scrollTop, scrollHeight, clientHeight } = wrapperRef.current;
            const step = 50;
            wrapperRef.current.scrollTop = isScrollUp ? scrollTop - step : scrollTop + step;
            const viewHeightPercent = Math.ceil((clientHeight * 100) / scrollHeight);
            const sliderHeightNum = (clientHeight / 100) * viewHeightPercent;
            const realHeightNum = clientHeight - (clientHeight / 100) * viewHeightPercent;
            const viewYPercent = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
            if (scrollHeight > clientHeight) {
                sliderY.set(-viewYPercent);
                if (sliderHeight.value !== sliderHeightNum) {
                    sliderHeight.set(sliderHeightNum);
                }
                realHeight.set(realHeightNum);
            }
        }
    };

    const onWheel = (e: WheelEvent<HTMLDivElement>) => {
        handler(e.deltaY < 0);
    };

    function Scrollbar() {
        return (
            <div
                onMouseDown={() => isSliderCapture.set(true)}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: 6,
                    zIndex: 100000,
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    opacity: isRunning ? 1 : 0,
                    transition: 'opacity 0.5s',
                    // backgroundColor: 'var(--control-tertiary)',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: realHeight.value,
                        position: 'relative',
                        // backgroundColor: 'var(--control-tertiary)',
                    }}
                >
                    <div
                        ref={sliderRef}
                        style={{
                            cursor: 'pointer',
                            width: '100%',
                            height: sliderHeight.value,
                            backgroundColor: 'var(--control-primary)',
                            borderRadius: 22,
                            position: 'absolute',
                            left: 0,
                            bottom: `${sliderY.value || 0}%`,
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
