const timeConveret = (sec: number) => {
    const h = Math.round(sec / 3600);
    const m = Math.round(sec / 60);
    const checkS = sec - (h * 3600 + m * 60);
    const s = checkS < 0 ? -checkS : checkS;

    return { h: h ? String(h) : '', m: String(String(m < 10 ? `0${m}` : m)), s: String(s < 10 ? `0${s}` : s) };
};

export default timeConveret;
