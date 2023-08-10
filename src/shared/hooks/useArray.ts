import { useState } from 'react';

import { useEasyState } from './index';

type Options = {};

function useArray<T extends { id: number | string; [key: string]: any }>(
    options: Options
): {
    array: T[];
    getUniqueArr: (arr: T[], check: keyof T) => T[];
    push: (item: T) => void;
    unshift: (item: T) => void;
    findById: (id: number) => T | null;
    deleteById: (id: number) => void;
    clear: () => void;
} {
    const array = useEasyState<T[]>([]);

    function getUniqueArr<T>(arr: T[], check: keyof T): T[] {
        const flags = new Set();
        return arr.filter((entry) => {
            if (flags.has(entry[check])) {
                return false;
            }
            flags.add(entry[check]);
            return true;
        });
    }

    const push = (item: T) => {
        array.set((prev) => {
            prev.push(item);
        });
    };

    const unshift = (item: T) => {
        array.set((prev) => {
            prev.unshift(item);
        });
    };

    const findById = (id: number) => {
        if (array.value.length) {
            return array.value.find((i) => i.id === id) || null;
        }
        return null;
    };

    const deleteById = (id: number | string) => {
        array.set((prev) => prev.filter((i) => i.id !== id));
    };

    const clear = () => {
        array.set([]);
    };

    return { array: array.value, getUniqueArr, push, unshift, findById, deleteById, clear };
}
export default useArray;
