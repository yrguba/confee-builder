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
    };

    const callback = (value: boolean) => {
        cl(value, callbackData.value);
    };

    return { isOpen: openModal.value, open, close, callback };
}

export { use, useConfirm };
