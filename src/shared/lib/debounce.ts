const debounce = (fn: (arg?: any) => void, timeout = 5000) => {
    let timer: any;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, timeout);
    };
};
export default debounce;
