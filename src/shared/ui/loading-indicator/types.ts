type Shared = {
    visible: boolean;
};

export type SpinnerProps = {
    size?: number;
    primary?: boolean;
} & Shared;

export type DownloadedProps = {
    size?: number;
    primary?: boolean;
} & Shared;

export type GlareProps = {} & Shared;
