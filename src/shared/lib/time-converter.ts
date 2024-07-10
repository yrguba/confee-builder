const timeConverter = (sec: number) => {
    const h = Math.round(sec / 3600);

    return new Date(sec * 1000).toISOString().slice(h ? 11 : 14, 19);
};

export default timeConverter;
