export const visibleHidden = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const autoHeight = {
    initial: { height: 0, opacity: 0, overflowY: 'hidden' },
    animate: { height: 'auto', opacity: 1, overflowY: 'hidden' },
    exit: { height: 0, opacity: 0, overflowY: 'hidden' },
    transition: { type: 'tween' },
};

export const autoWidth = {
    initial: { width: 0, opacity: 0, overflowX: 'hidden' },
    animate: { width: 'auto', opacity: 1, overflowX: 'hidden' },
    exit: { width: 0, opacity: 0, overflowX: 'hidden' },
    transition: { type: 'tween' },
};

export const hiddenTop = {
    initial: { y: 200, opacity: 0, overflowY: 'hidden' },
    animate: { y: 0, opacity: 1, overflowY: 'hidden' },
    exit: { y: -200, opacity: 0, overflowY: 'hidden' },
    transition: { type: 'tween' },
};

export const hiddenBottom: any = {
    initial: { y: -100, opacity: 0, overflowY: 'hidden' },
    animate: { y: 0, opacity: 1, overflowY: 'hidden' },
    exit: { y: 100, opacity: 0, overflowY: 'hidden' },
    transition: { type: 'tween', duration: 0.1 },
};
