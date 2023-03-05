import { useState } from 'react';

import { Modal } from '../model/types';

export type ModalHookReturned = { isOpen: boolean; toggle: () => void; name: Modal };

function useModal(modal: Modal): ModalHookReturned {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggle() {
        setIsOpen(!isOpen);
    }

    return { isOpen, toggle, name: modal };
}

export default useModal;
