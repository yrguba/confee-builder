import { useState } from 'react';

import { useEasyState } from './index';

type Options<T> = {
    initialArr?: T[];
    multiple?: boolean;
};

function useArray<T extends { id: number | string; [key: string]: any }>({
    initialArr,
    multiple = true,
}: Options<T>): {
    array: T[];
    push: (item: T) => void;
    unshift: (item: T) => void;
    findById: (id: number) => T | null;
    deleteById: (id: number | string) => void;
    deleteByIds: (id: number[] | string[]) => void;
    clear: () => void;
    pushOrDelete: (arr: T) => void;
    replace: (arr: T[]) => void;
    getIds: () => number[] | string[];
} {
    const array = useEasyState<T[]>(initialArr || []);

    const getIds = () => {
        return array.value.map((i) => i.id) as number[] | string[];
    };

    const push = (item: T) => {
        if (!multiple) {
            array.set([]);
        }
        array.set((prev) => {
            prev.push(item);
        });
    };

    const replace = (arr: T[]) => {
        array.set(arr);
    };

    const unshift = (item: T) => {
        if (!multiple) {
            array.set([]);
        }
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

    const deleteByIds = (ids: number[] | string[]) => {
        // @ts-ignore
        array.set((prev) => prev.filter((i) => !ids.includes(i.id)));
    };

    const pushOrDelete = (item: T) => {
        const found = array.value.find((el) => el.id === item.id);
        if (!multiple) array.set([]);
        if (!found) array.set((prev) => [...prev, item]);
        else array.set((prev) => prev.filter((i) => i.id !== found.id));
    };

    const clear = () => {
        array.set([]);
    };

    return { array: array.value, push, unshift, findById, replace, deleteById, deleteByIds, pushOrDelete, clear, getIds };
}

export type UseArrayReturnedType<T extends { [key: string]: any; id: string | number }> = ReturnType<typeof useArray<T>>;
export default useArray;
