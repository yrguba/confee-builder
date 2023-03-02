declare type PropsWithChildren<T = {}> = import('react').PropsWithChildren<T>;

declare type PropsWithClassName = {
    className?: string;
};

declare type Callback = () => void;

declare type Nullable<T> = T | null;

declare type Component<P = any> = (props?: P) => JSX.Element;

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

declare global {
    interface Window {
        __TAURI__: any;
    }
}
