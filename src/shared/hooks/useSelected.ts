import { useState } from 'react';

interface IUseSelected {
    multiple: boolean;
    exclude?: string;
    excludeCallback?: (arg: any) => void;
    deleteElement?: boolean;
}

function useSelected({
    multiple,
    exclude,
    excludeCallback,
    deleteElement = true,
}: IUseSelected): [arr: any[], fn: (arg: any) => void, clear: () => void, installAll: (arg: any) => void] {
    const [arr, setArr] = useState<any>([]);

    function fn<T extends { id: any }>(item: any) {
        const itemType = typeof arr[0];
        if (exclude && item[exclude] && excludeCallback) {
            excludeCallback(item);
        } else if (!multiple) {
            setArr([item]);
        } else {
            const foundId = itemType === 'object' ? arr.find((i: T) => i.id === item.id) : arr.find((i: T) => i === item);
            if (foundId || foundId === 0) {
                if (deleteElement) {
                    setArr(arr.filter((i: T) => i !== foundId));
                } else {
                    setArr(arr);
                }
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
