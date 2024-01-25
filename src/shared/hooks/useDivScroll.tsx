import { JitsiMeeting } from '@jitsi/react-sdk';
import { WebviewWindow } from '@tauri-apps/api/window';
import React, { RefObject, useEffect, useRef, WheelEvent } from 'react';

export type ScrollbarProps = {
    wrapperRef: RefObject<HTMLDivElement>;
};
function useDivScroll(props: ScrollbarProps) {
    const { wrapperRef } = props;

    const thumbRef = useRef<HTMLDivElement>(null);

    const onWheel = (e: WheelEvent<HTMLDivElement>) => {
        if (wrapperRef?.current) {
            const isScrollUp = e.deltaY < 0;
            const step = 50;
            const currentY = wrapperRef.current.scrollTop;
            wrapperRef.current.scrollTop = isScrollUp ? currentY - step : currentY + step;

            if (thumbRef.current) {
                const { scrollTop, scrollHeight } = wrapperRef.current;
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
                    backgroundColor: 'var(--control-tertiary)',
                }}
            >
                <div
                    ref={thumbRef}
                    style={{
                        width: '100%',
                        minHeight: 50,
                        backgroundColor: 'var(--control-primary)',
                        borderRadius: 22,
                    }}
                />
            </div>
        );
    }

    return { onWheel, Scrollbar };
}

export default useDivScroll;
