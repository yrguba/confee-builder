function useList<T extends { id: string; [key: string]: any }>(items: T[]) {
    const variants = items.map((i) => i.id);
    return variants;
}

export type Return = ReturnType<typeof useList>;

export default useList;
