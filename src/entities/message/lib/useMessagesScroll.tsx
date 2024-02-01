import React, { MouseEvent, RefObject, useEffect, useRef, WheelEvent } from 'react';

import { useEasyState, useReverseTimer, useDebounce, useThrottle } from 'shared/hooks';

function useMessagesScroll(wrapperRef: RefObject<HTMLDivElement>) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const realRef = useRef<HTMLDivElement>(null);

    const realHeight = useEasyState(0);
    const sliderHeight = useEasyState(0);
    const sliderY = useEasyState(0);
    const isSliderCapture = useEasyState(false);
    const visible = useEasyState(false);

    const speed = useRef(15);

    useDebounce(() => visible.set(false), 2000, [sliderY]);

    const onWheel = (e: WheelEvent<HTMLDivElement>) => {
        const { deltaY } = e;
        if (deltaY >= 100 || deltaY <= -100) {
            speed.current = 60;
        } else {
            speed.current = e.deltaY < 0 ? -e.deltaY * 4 : e.deltaY * 4;
        }

        const wrapper = e.currentTarget;
        visible.set(true);

        const { scrollTop, scrollHeight, clientHeight } = wrapper;
        const step = speed.current;
        wrapper.scrollTop = e.deltaY < 0 ? scrollTop - step : scrollTop + step;
        const viewHeightPercent = Math.ceil((clientHeight * 100) / scrollHeight);
        const sliderHeightNum = (clientHeight / 100) * viewHeightPercent;
        const realHeightNum = clientHeight - (clientHeight / 100) * viewHeightPercent;
        const viewYPercent = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
        if (scrollHeight > clientHeight) {
            sliderY.set(-viewYPercent);
            sliderHeight.set(sliderHeightNum);
            realHeight.set(realHeightNum);
        }
    };

    const onMouseMove = (e: globalThis.MouseEvent) => {
        if (wrapperRef.current && realRef.current) {
            visible.set(true);
            const { scrollTop, clientHeight, scrollHeight } = wrapperRef.current;

            const mouseY = Math.ceil(clientHeight - e.clientY) + 68;
            const mouseYPercent = Math.ceil((mouseY / clientHeight) * 10000) / 100;
            if (mouseYPercent >= 0 || mouseYPercent <= 100) {
                const viewHeightPercent = Math.ceil((clientHeight * 100) / scrollHeight);
                const sliderHeightNum = (clientHeight / 100) * viewHeightPercent;
                const realHeightNum = clientHeight - (clientHeight / 100) * viewHeightPercent;
                const mp = mouseYPercent > 99.5 ? 100 : mouseYPercent;
                const wrapperY = ((scrollHeight - clientHeight) / 100) * mp;
                sliderY.set(mouseYPercent);
                sliderHeight.set(sliderHeightNum);
                realHeight.set(realHeightNum);
                wrapperRef.current.scrollTop = -wrapperY;
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', () => isSliderCapture.set(false));
        if (wrapperRef.current) {
            if (isSliderCapture.value) {
                wrapperRef.current.onmousemove = onMouseMove;
            } else {
                wrapperRef.current.onmousemove = null;
            }
        }
        return document.removeEventListener('mouseup', () => null);
    }, [isSliderCapture.value]);

    function Scrollbar() {
        return (
            <div
                onMouseMoveCapture={() => visible.set(true)}
                onMouseDown={() => isSliderCapture.set(true)}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: '100%',
                    width: 6,
                    zIndex: 100000,
                    display: 'flex',
                    opacity: visible.value ? 1 : 0,
                    alignItems: 'center',
                    overflow: 'hidden',

                    // backgroundColor: 'var(--control-tertiary)',
                }}
            >
                <div
                    ref={realRef}
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
                            backgroundColor: 'var(--bg-quaternary)',
                            borderRadius: 22,
                            position: 'absolute',
                            left: 0,
                            bottom: `${sliderY.value < 0 ? 0 : sliderY.value > 100 ? 100 : sliderY.value}%`,
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
