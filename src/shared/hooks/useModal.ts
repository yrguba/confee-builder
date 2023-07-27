import { useState } from 'react';

import { UseModalReturned } from '../ui/modal/types';

function useModal(): UseModalReturned {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return { isOpen, open, close };
}

export default useModal;
