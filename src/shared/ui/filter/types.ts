import { HTMLAttributes } from 'react';

import { BaseTypes } from 'shared/types';

type SharedProps = {} & HTMLAttributes<HTMLDivElement> & BaseTypes.Statuses;

export type BaseFilterProps = {
    title: string;
    items?: any;
} & SharedProps;
