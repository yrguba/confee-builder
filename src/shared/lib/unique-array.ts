function uniqueArray<T>(arr: T[], check: keyof T): T[] {
    const flags = new Set();
    return arr.filter((entry) => {
        if (flags.has(entry[check])) {
            return false;
        }
        flags.add(entry[check]);
        return true;
    });
}

export default uniqueArray;
