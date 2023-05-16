import { BaseTypes } from 'shared/types';

type Type = 'images' | 'audios' | 'videos' | 'documents';

export type ResponsiveMediaContentsProps = {
    list: { url: string; name: string }[];
    type: Type;
    gap?: number;
    imgSize?: number;
    hardGrid?: boolean;
    imgClick: (index: number) => void;
} & BaseTypes.Statuses;
