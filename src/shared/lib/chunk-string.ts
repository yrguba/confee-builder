function chunkString(str: string, length: number): string[] {
    const numChunks = Math.ceil(str.length / length);
    const chunks = new Array(numChunks);

    for (let i = 0, o = 0; i < numChunks; ++i, o += length) {
        chunks[i] = str.substr(o, length);
    }

    return chunks;
}

export default chunkString;
