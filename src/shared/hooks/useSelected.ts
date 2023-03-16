import { useState } from 'react';

interface IUseSelected {
    multiple: boolean;
    exclude?: string;
    excludeCallback?: (arg: any) => void;
}

function useSelected({
    multiple,
    exclude,
    excludeCallback,
}: IUseSelected): [arr: any[], fn: (arg: any) => void, clear: () => void, installAll: (arg: any) => void] {
    const [arr, setArr] = useState<any>([]);

    function fn<T extends { id: any }>(item: any) {
        const itemType = typeof arr[0];
        console.log(itemType);
        if (exclude && item[exclude] && excludeCallback) {
            excludeCallback(item);
        } else if (!multiple) {
            setArr([item]);
        } else {
            console.log('item', item);
            const foundId = itemType === 'object' ? arr.find((i: T) => i.id === item.id) : arr.find((i: T) => i === item);
            if (foundId || foundId === 0) {
                setArr(arr.filter((i: T) => i !== foundId));
            } else {
                setArr([...arr, item]);
            }
        }
    }

    const installAll = (array: any[]) => {
        setArr(array);
    };

    function clear() {
        setArr([]);
    }

    return [arr, fn, clear, installAll];
}
export default useSelected;
