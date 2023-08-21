function generateItems<T>(item: T, count: number): T[] {
    const arr = [];

    for (let i = 0; i <= count; i++) {
        arr.push({ id: i, ...item });
    }
    return arr;
}
export default generateItems;
