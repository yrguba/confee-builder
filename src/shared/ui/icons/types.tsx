export type BaseIconsProps = {
    variants: 'exit' | 'filter' | 'backArrow' | 'menu';
    color?: string;
    size?: number;
};

export type LogoIconsProps = {
    variants: 'confee' | 'tfn';
    color?: string;
};

export type ArrowAnimatedProps = {
    variants: 'rotate' | 'visible';
    initialDeg?: number;
    animateDeg?: number;
    activeAnimate?: boolean;
    color?: string;
};
