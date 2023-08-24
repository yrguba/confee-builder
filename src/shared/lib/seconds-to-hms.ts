function secondsToHms(sec: number, showH = false, showM = true) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.floor((sec % 3600) % 60);

    return `${showH ? (h < 10 ? `0${h}:` : `${h}:`) : ''}${showM ? (m < 10 ? `0${m}:` : `${m}:`) : ''}${s < 10 ? `0${s}` : s}`;
}

export default secondsToHms;
