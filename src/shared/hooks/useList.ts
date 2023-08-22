import { ReactNode } from 'react';

import { useEasyState } from './index';

type Item = {
    id: string;
    element: ReactNode;
};

function useList(items: Item[]) {
    const activeItem = useEasyState<Item>(items[0]);
    const variants = items.map((i) => i.id);

    const setActiveItem = (id: string) => {
        const item = items.find((i) => i.id === id);
        item && activeItem.set(item);
    };

    return { variants, setActiveItem, activeItem: activeItem.value };
}

export type UseListReturnType = ReturnType<typeof useList>;

export default useList;
