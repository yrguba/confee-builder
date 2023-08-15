const debounce = (fn: (arg?: any) => void, timeout = 5000) => {
    let time;
    return (...args: any) => {
        const fnCallback = () => fn.apply(this, args);
        clearTimeout(timeout);
        time = setTimeout(fnCallback, timeout);
    };
};
export default debounce;
