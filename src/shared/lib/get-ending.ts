function getEnding(num: number, dec: string[]): string {
    if (num > 100) num %= 100;
    if (num <= 20 && num >= 10) return dec[2];
    if (num > 20) num %= 10;
    return num === 1 ? dec[0] : num > 1 && num < 5 ? dec[1] : dec[2];
}

export default getEnding;
