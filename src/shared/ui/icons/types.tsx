export type BaseIconsProps = {
    variants: 'arrow-right' | 'arrow-down';
    rotate?: number;
    color?: string;
    active?: boolean;
};

export type LogoIconsProps = {
    variants: 'confee' | 'tfn';
};

export type ArrowAnimatedProps = {
    variants: 'rotate' | 'visible';
    initialDeg?: number;
    animateDeg?: number;
    color?: string;
};
