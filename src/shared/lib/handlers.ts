import { AxiosResponse } from 'axios';

type ResponseReturned<T> = {
    data: T | null;
    status: any;
    error: string;
};

export const response = <T>(data: AxiosResponse): ResponseReturned<T> => {
    const { status } = data;

    if (status >= 200 && status <= 299) {
        return {
            data: data.data,
            status,
            error: '',
        };
    }
    return {
        data: null,
        status,
        error: 'error',
    };
};
