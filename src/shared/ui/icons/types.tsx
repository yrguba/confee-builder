export type BaseIconsProps = {
    variants:
        | 'trash'
        | 'settings'
        | 'dots'
        | 'photo'
        | 'plus'
        | 'exit'
        | 'filter'
        | 'backArrow'
        | 'backArrow2'
        | 'menu'
        | 'check'
        | 'doubleCheck'
        | 'clock'
        | 'addContact'
        | 'downArrow'
        | 'rightArrow'
        | 'leftArrow';

    color?: string;
    size?: number;
};

export type LogoIconsProps = {
    variants: 'confee' | 'tfn';
    color?: string;
};

export type CountriesIconsProps = {
    variants: 'search' | 'clear' | 'armenia' | 'belarus' | 'kazakhstan' | 'kyrgyzstan' | 'russia' | 'uzbekistan';
};

export type ArrowAnimatedProps = {
    variants: 'rotate' | 'visible';
    initialDeg?: number;
    animateDeg?: number;
    activeAnimate?: boolean;
    color?: string;
};
