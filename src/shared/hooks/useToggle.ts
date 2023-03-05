import { useState } from 'react';

function useToggle(): [isOpen: boolean, toggle: (arg?: boolean) => void] {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = (arg?: boolean) => {
        if (arg) {
            setIsOpen(arg);
        } else {
            setIsOpen((prev) => !prev);
        }
    };

    return [isOpen, toggle];
}

export default useToggle;
