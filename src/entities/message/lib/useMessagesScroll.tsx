import { JitsiMeeting } from '@jitsi/react-sdk';
import { WebviewWindow } from '@tauri-apps/api/window';
import React, { MouseEvent, RefObject, useEffect, useRef, WheelEvent } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState } from 'shared/hooks';

function useMessagesScroll(wrapperRef: RefObject<HTMLDivElement>) {
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

            const { scrollTop, scrollHeight, clientHeight } = wrapper;
            const { height } = wrapper.getBoundingClientRect();
            const viewHeightPercent = Math.ceil((height * 100) / scrollHeight);
            const viewYPercent = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
            sliderY.set(-viewYPercent);
            console.log(viewHeightPercent);
            if (sliderHeight.value !== viewHeightPercent && scrollHeight > height) {
                sliderHeight.set(viewHeightPercent);
            }
        }
    };
    console.log(sliderY.value);
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
                    overflow: 'hidden',
                    zIndex: 100000,
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
                        bottom: `${sliderY.value || 0}%`,
                        transform: ' translateY(0%)',
                    }}
                />
            </div>
        );
    }

    return { onWheel, Scrollbar };
}

export default useMessagesScroll;
