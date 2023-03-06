import { useState } from 'react';

export type ModalHookReturnedType = { isOpen: boolean; open: () => void; close: () => void };

function useModal(): ModalHookReturnedType {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, open, close };
}

export default useModal;
