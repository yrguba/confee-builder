import { ReactNode } from 'react';

import { useArray, useEasyState } from './index';

type Item<T> = {
    id: string;
    payload: T;
    element: ReactNode;
};

function useList<T>(initial: Item<T>[]) {
    const items = useEasyState<Item<T>[]>(initial);
    const activeItem = useEasyState<Item<T>>(initial[0]);

    const variants = items.value.map((i) => String(i.id));

    const setActiveItem = (id: string) => {
        const item = items.value.find((i) => i.id === id);
        item && activeItem.set(item);
    };

    const push = (item: Item<any>, setActive = true) => {
        items.set((prev) => [item, ...prev]);
        if (setActive) {
            setActiveItem(item.id);
        }
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
