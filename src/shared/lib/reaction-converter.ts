function reactionConverter(reaction: string, returnedFormat: 'html' | 'unicode') {
    const dictionary: Record<string, string> = {
        '&#9940': '1f44d',
        '&#127820': '1f44c',
        '&#128064': '1f49c',
        '&#128076': '1f440',
        '&#128077': '1f4a3',
        '&#128163': '1f4a5',
        '&#128165': '1f34c',
        '&#129505': '26d4',
    };
    if (returnedFormat === 'html') {
        const found = Object.entries(dictionary).find(([key, value]) => value === reaction);
        return found ? found[0] : '';
    }
    return dictionary[reaction];
}

export default reactionConverter;
