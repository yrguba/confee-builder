function useGrid(wrapperWidth: number, itemsLength: number, elementMaxWidth = 200): { column: number; row: number } {
    const maxColumn = 7;
    const minColumn = 3;
    let column = Math.ceil(wrapperWidth / elementMaxWidth);
    let row = Math.ceil(itemsLength / column);
    if (column > maxColumn) {
        column = maxColumn;
        row = Math.ceil(itemsLength / maxColumn);
    }
    if (column < minColumn) {
        column = minColumn;
        row = Math.ceil(itemsLength / minColumn);
    }
    return { column, row };
}

export default useGrid;
