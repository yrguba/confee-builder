import { JitsiMeeting } from '@jitsi/react-sdk';
import { WebviewWindow } from '@tauri-apps/api/window';
import React, { MouseEvent, RefObject, useEffect, useRef, WheelEvent } from 'react';
import { useUpdateEffect } from 'react-use';

import useEasyState from './useEasyState';

function useDivScroll(wrapperRef: RefObject<HTMLDivElement>) {
    const thumbRef = useRef<HTMLDivElement>(null);
    const sliderHeight = useEasyState(0);
    const sliderY = useEasyState(0);
    const isSliderCapture = useEasyState(false);

    const onWheel = (e: WheelEvent<HTMLDivElement>) => {
        const wrapper = e.currentTarget;
        if (wrapper) {
            const isScrollUp = e.deltaY < 0;
            const step = 50;
            const currentY = wrapper.scrollTop;

            wrapper.scrollTop = isScrollUp ? currentY - step : currentY + step;
            if (thumbRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = wrapper;
                const { height } = wrapper.getBoundingClientRect();
                const viewHeightPercent = Math.ceil((height * 100) / scrollHeight);
                const viewYPercent = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
                sliderY.set(-viewYPercent);

                if (sliderHeight.value !== viewHeightPercent && scrollHeight > height) {
                    sliderHeight.set(viewHeightPercent);
                }
            }
        }
    };

    useEffect(() => {
        const mousemove = (e: globalThis.MouseEvent) => {
            console.log(e);
        };
        if (isSliderCapture.value) {
            window.addEventListener('mousemove', mousemove);
            window.addEventListener('mouseup', () => isSliderCapture.set(false));
        } else {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', () => null);
        }
        return () => {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', () => null);
        };
    }, [isSliderCapture.value]);

    console.log(isSliderCapture.value);
    function Scrollbar() {
        return (
            <div
                onMouseDown={() => isSliderCapture.set(true)}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: 12,
                    // backgroundColor: 'var(--control-tertiary)',
                }}
            >
                <div
                    ref={thumbRef}
                    style={{
                        cursor: 'pointer',
                        width: '100%',
                        height: `${sliderHeight.value}%`,
                        backgroundColor: 'var(--control-primary)',
                        borderRadius: 22,
                        position: 'absolute',
                        bottom: `${sliderY.value}%`,
                    }}
                />
            </div>
        );
    }

    return { onWheel, Scrollbar };
}

export default useDivScroll;
