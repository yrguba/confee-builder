import { useCallback } from 'react';

import { useEasyState } from '../../../hooks';

function use() {
    const openModal = useEasyState(false);

    const open = () => {
        openModal.set(true);
    };

    const close = () => {
        openModal.set(false);
    };

    const isOpen = openModal.value;

    return { isOpen, open, close };
}

function useConfirm<T = null | undefined>(cl: (value: boolean, callbackData: T | null | undefined) => void) {
    const openModal = useEasyState(false);
    const callbackData = useEasyState<T | null | undefined>(null);

    const open = (payload?: T) => {
        callbackData.set(payload);
        openModal.set(true);
    };

    const close = () => {
        openModal.set(false);
        callbackData.set(null);
    };

    const callback = useCallback(
        (value: boolean) => {
            callbackData.value && cl(value, callbackData.value);
        },
        [callbackData]
    );

    return { isOpen: openModal.value, open, close, callback, callbackData };
}

export { use, useConfirm };
