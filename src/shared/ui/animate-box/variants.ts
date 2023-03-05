export type AnimationVariant = 'visible-hidden' | 'auto-height';

export const visibleHidden = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const autoHeight = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { type: 'tween' },
};
