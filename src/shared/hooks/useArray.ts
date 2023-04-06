import { useState } from 'react';

import { uniqueArray } from 'shared/lib';

type Options = {
    multiple?: boolean;
    selfDestruction?: boolean;
    unique?: boolean;
};

function useArray<T extends { id: number; [key: string]: any }>(
    options: Options
): { arr: T[]; push: (item: T) => void; unshift: (item: T) => void; findById: (id: number) => T | null; deleteById: (id: number) => void; clear: () => void } {
    const [arr, setArr] = useState<T[]>([]);

    const push = (item: T) => {
        if (options.multiple) {
            if (options.unique) {
                uniqueArray([...arr, item], 'id');
            }
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
            if (options.unique) {
                uniqueArray([...arr, item], 'id');
            }
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

    const findById = (id: number) => {
        return arr.find((i) => i.id === id) || null;
    };

    const deleteById = (id: number) => {
        setArr((prev) => prev.filter((i) => i.id !== id));
    };

    const clear = () => {
        setArr([]);
    };
    console.log(arr);
    return { arr, push, unshift, findById, deleteById, clear };
}
export default useArray;
