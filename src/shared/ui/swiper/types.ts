import { JSX } from 'react';

import { BaseTypes } from 'shared/types';

export type BaseSwiperProps = {
    children: JSX.Element | JSX.Element[];
    visible: boolean;
    closeClick: () => void;
    initialSlide?: number;
} & BaseTypes.Statuses;
