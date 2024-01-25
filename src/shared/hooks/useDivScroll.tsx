import { JitsiMeeting } from '@jitsi/react-sdk';
import { WebviewWindow } from '@tauri-apps/api/window';
import React, { RefObject, useEffect, useRef, WheelEvent } from 'react';

import useEasyState from './useEasyState';

function useDivScroll() {
    const thumbRef = useRef<HTMLDivElement>(null);
    const thumbHeight = useEasyState(0);
    const thumbY = useEasyState(0);

    const onWheel = (e: WheelEvent<HTMLDivElement>) => {
        const wrapper = e.currentTarget;
        if (wrapper) {
            const isScrollUp = e.deltaY < 0;
            const step = 50;
            const currentY = wrapper.scrollTop;
            wrapper.scrollTop = isScrollUp ? currentY - step : currentY + step;

            if (thumbRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = wrapper;
                const { width } = wrapper.getBoundingClientRect();
                const viewHeightPercent = Math.ceil((width * 100) / scrollHeight);
                const viewYPercent = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
                thumbY.set(-viewYPercent);
                if (thumbHeight.value !== viewHeightPercent) {
                    thumbHeight.set(viewHeightPercent);
                }
            }
        }
    };

    function Scrollbar() {
        return (
            <div
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
                        width: '100%',
                        height: `${thumbHeight.value}%`,
                        backgroundColor: 'var(--control-primary)',
                        borderRadius: 22,
                        position: 'absolute',
                        bottom: `${thumbY.value}%`,
                    }}
                />
            </div>
        );
    }

    return { onWheel, Scrollbar };
}

export default useDivScroll;
