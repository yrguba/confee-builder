import { useEffect, useState } from 'react';

import { useSize } from './index';

interface IItems {
    id: number;
    breakpoint: number;
    [propName: string]: any;
}

function useRowAndDropdown<T>(tabs: IItems[]): { itemsInDropdown: T[]; itemsInRow: T[] } {
    const [itemsInDropdown, setItemsInDropdown] = useState<any[]>([]);
    const [itemsInRow, setItemsInRow] = useState<any[]>([]);

    const { width } = useSize();

    useEffect(() => {
        const check = (item: IItems, arr: IItems[]) => {
            return !!arr.find((i) => i.id === item.id);
        };
        if (width !== 0) {
            if (!itemsInDropdown.length && !itemsInRow.length) {
                if (tabs[tabs.length - 1].breakpoint < width) {
                    setItemsInRow(tabs);
                    return;
                }
                if (tabs[0].breakpoint > width) {
                    setItemsInDropdown(tabs);
                    return;
                }
            }
            tabs.forEach((tab) => {
                if (tab.breakpoint > width) {
                    if (!check(tab, itemsInDropdown)) {
                        setItemsInDropdown([tab, ...itemsInDropdown]);
                        setItemsInRow(itemsInRow.filter((i: any) => i.id !== tab.id));
                    }
                } else if (!check(tab, itemsInRow)) {
                    setItemsInRow([...itemsInRow, tab]);
                    setItemsInDropdown(itemsInDropdown.filter((i: any) => i.id !== tab.id));
                }
            });
        }
    }, [width, itemsInDropdown.length, itemsInRow.length]);

    return { itemsInDropdown, itemsInRow };
}

export default useRowAndDropdown;
