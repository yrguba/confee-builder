import { ReactNode, useEffect } from 'react';

import { useEasyState } from './index';

type Item<T> = {
    id: string;
    payload: T;
    element: ReactNode;
    hidden?: boolean;
};

function useList<T>(initial: Item<T>[], callback?: (data: Item<T>) => void, deps?: any[]) {
    const items = useEasyState<Item<T>[]>(initial);
    const activeItem = useEasyState<Item<T>>(items.value[0]);

    useEffect(() => {
        const filtered = initial.filter((i) => !i.hidden);
        items.set(filtered);
        activeItem.set(filtered[0]);
    }, [deps]);

    const variants = items.value.filter((i) => !i.hidden).map((i) => String(i.id));

    const setActiveItem = (id: string) => {
        const item = items.value.find((i) => i.id === id);
        if (item) {
            activeItem.set(item);
            callback && callback(item);
        }
    };

    const push = (item: Item<any>, setActive = true) => {
        items.set(
            (prev) => [item, ...prev],
            () => {
                setActive && activeItem.set(item);
            }
        );
    };

    const updateElement = (id: string, element: ReactNode) => {
        if (items.value.length) {
            items.set((prev) => {
                const foundIndex = prev.findIndex((i) => i.id === id);
                if (foundIndex !== -1) {
                    prev.splice(foundIndex, 1, { ...prev[foundIndex], element });
                }
            });
        }
    };

    return { variants, setActiveItem, push, activeItem: activeItem.value, updateElement };
}

export type UseListReturnType = ReturnType<typeof useList>;

export default useList;
