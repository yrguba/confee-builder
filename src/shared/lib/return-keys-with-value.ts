function returnKeysWithValue(obj: object) {
    const updObj: any = { ...obj };
    Object.entries(obj).forEach(([key, value]) => {
        if (!value) {
            delete updObj[key];
        }
    });
    return updObj;
}

export default returnKeysWithValue;
