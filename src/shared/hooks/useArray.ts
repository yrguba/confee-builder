import { useState } from 'react';

type Options = {
    multiple?: boolean;
    selfDestruction?: boolean;
};

function useArray<T extends { id: number }>(options: Options): { arr: T[]; push: (arg: T) => void; unshift: (arg: T) => void; clear: () => void } {
    const [arr, setArr] = useState<T[]>([]);

    const push = (item: T) => {
        if (options.multiple) {
            if (options.selfDestruction) {
                if (arr.find((i) => i.id === item.id)) {
                    setArr((prev) => prev.filter((i) => i.id !== item.id));
                } else {
                    setArr((prev) => [...prev, item]);
                }
            } else {
                setArr((prev) => [...prev, item]);
            }
        } else if (options.selfDestruction) {
            if (arr.find((i) => i.id === item.id)) {
                setArr((prev) => prev.filter((i) => i.id !== item.id));
            } else {
                setArr([item]);
            }
        }
    };

    const unshift = (item: T) => {
        if (options.multiple) {
            if (options.selfDestruction) {
                if (arr.find((i) => i.id === item.id)) {
                    setArr((prev) => prev.filter((i) => i.id !== item.id));
                } else {
                    setArr((prev) => [item, ...prev]);
                }
            } else {
                setArr((prev) => [item, ...prev]);
            }
        } else if (options.selfDestruction) {
            if (arr.find((i) => i.id === item.id)) {
                setArr((prev) => prev.filter((i) => i.id !== item.id));
            } else {
                setArr((prev) => [item, ...prev]);
            }
        } else {
            setArr([item]);
        }
    };

    const clear = () => {
        setArr([]);
    };

    return { arr, push, unshift, clear };
}
export default useArray;
