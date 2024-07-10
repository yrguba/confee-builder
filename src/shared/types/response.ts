import { UseQueryResult, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export type QueryResult<T> = UseQueryResult<
    AxiosResponse<{
        data: T;
    }>
>;

export type InfiniteQueryResult<T> = UseInfiniteQueryResult;
