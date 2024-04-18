import { useCallback } from 'react';

import { useEasyState } from '../../../hooks';

function use<T = any>() {
    const openModal = useEasyState(false);
    const payload = useEasyState<T | null>(null);
    const scrollPosition = useEasyState({ top: 0, bottom: 0, left: 0, right: 0 });

    const open = (data?: T) => {
        openModal.set(true);
        data && payload.set(data);
    };

    const close = () => {
        openModal.set(false);
    };

    const isOpen = openModal.value;

    return { isOpen, open, close, payload: payload.value, scrollPosition: scrollPosition.value, setScrollPosition: scrollPosition.set };
}

function useConfirm<T = null | undefined>(cl: (value: boolean, callbackData: T | null | undefined) => void) {
    const openModal = useEasyState(false);
    const callbackData = useEasyState<T | null | undefined>(null);
    const btnText = useEasyState<{ okText?: string; closeText?: string; title?: string; subtitle?: string } | null | undefined>(null);

    const open = (payload?: T, text?: { okText?: string; closeText?: string; title?: string; subtitle?: string }) => {
        callbackData.set(payload);
        openModal.set(true);
        btnText.set(text);
    };

    const close = () => {
        openModal.set(false);
        callbackData.set(null);
    };

    const callback = useCallback(
        (value: boolean) => {
            cl(value, callbackData.value);
        },
        [callbackData]
    );

    return { isOpen: openModal.value, open, close, callback, callbackData, ...btnText.value };
}

export { use, useConfirm };
