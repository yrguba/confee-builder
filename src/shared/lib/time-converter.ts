const timeConverter = (sec: number) => {
    const h = Math.round(sec / 3600);
    const m = Math.round(sec / 60);
    const checkS = sec - (h * 3600 + m * 60);
    const s = checkS < 0 ? -checkS : checkS;
    const updS = Math.round(s);
    const times = { h: h ? String(h) : '', m: String(String(m < 10 ? `0${m}` : m)), s: String(updS < 10 ? `0${updS}` : updS) };
    return `${h ? `${times.h}:` : ''}${m ? `${times.m}:` : '00:'}${times.s || ''}`;
};

export default timeConverter;
