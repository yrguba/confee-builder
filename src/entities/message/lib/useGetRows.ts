import { Content } from '../model/types';

type Column = {
    id: number;
    url: string;
    width: string;
    height: string;
};

type Row = {
    id: number;
    columns: Column[];
};

function useGetRows(content: Content[]): Row[] {
    const { length } = content;
    const items: Row[] = [];

    const getOne = (a: number): Column[] => {
        return [{ id: a, url: content[a].url, width: '100%', height: '150px' }];
    };
    const getTwo = (a: number, b: number): Column[] => {
        return [
            { id: a, url: content[a].url, width: '50%', height: '120px' },
            { id: b, url: content[b].url, width: '50%', height: '120px' },
        ];
    };
    const getThree = (a: number, b: number, c: number): Column[] => {
        return [
            { id: a, url: content[a].url, width: '33.3%', height: '100px' },
            { id: b, url: content[b].url, width: '33.3%', height: '100px' },
            { id: c, url: content[c].url, width: '33.3%', height: '100px' },
        ];
    };

    switch (length) {
        case 1:
            items.push({ id: 0, columns: getOne(0) });
            break;
        case 2:
            items.push({ id: 0, columns: getTwo(0, 1) });
            break;
        case 3:
            items.push({ id: 0, columns: getTwo(0, 1) }, { id: 1, columns: getOne(2) });
            break;
        case 4:
            items.push({ id: 0, columns: getThree(0, 1, 2) }, { id: 1, columns: getOne(3) });
            break;
        case 5:
            items.push({ id: 0, columns: getTwo(0, 1) }, { id: 1, columns: getOne(2) }, { id: 2, columns: getTwo(3, 4) });
            break;
        case 6:
            items.push({ id: 0, columns: getThree(0, 1, 2) }, { id: 1, columns: getOne(3) }, { id: 2, columns: getTwo(4, 5) });
            break;
        case 7:
            items.push({ id: 0, columns: getThree(0, 1, 2) }, { id: 1, columns: getOne(3) }, { id: 2, columns: getThree(4, 5, 6) });
            break;
        case 8:
            items.push(
                { id: 0, columns: getThree(0, 1, 2) },
                { id: 1, columns: getOne(3) },
                { id: 2, columns: getThree(4, 5, 6) },
                { id: 3, columns: getOne(7) }
            );
            break;
        case 9:
            items.push(
                { id: 0, columns: getThree(0, 1, 2) },
                { id: 1, columns: getOne(3) },
                { id: 2, columns: getThree(4, 5, 6) },
                { id: 3, columns: getTwo(7, 8) }
            );
            break;
        case 10:
            items.push(
                { id: 0, columns: getThree(0, 1, 2) },
                { id: 1, columns: getOne(3) },
                { id: 2, columns: getThree(4, 5, 6) },
                { id: 3, columns: getOne(7) },
                { id: 4, columns: getTwo(8, 9) }
            );
            break;
    }
    return items;
}

export default useGetRows;
