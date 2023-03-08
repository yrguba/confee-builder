import { useState } from 'react';

function useToggle(defaultValue = false): [isOpen: boolean, toggle: (arg?: boolean) => void] {
    const [value, setValue] = useState<boolean>(defaultValue);

    const toggle = (arg?: boolean) => {
        if (arg) {
            setValue(arg);
        } else {
            setValue((prev) => !prev);
        }
    };

    return [value, toggle];
}

export default useToggle;
