import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';

import { Company } from './types';
import { httpHandlers } from '../../../shared/lib';

class CompanyApi {
    handleGetCompanies() {
        return useQuery(['get-companies'], () => axiosClient.get(`api/v2/companies`), {
            staleTime: Infinity,
            select: (res) => {
                const updRes = httpHandlers.response<{ data: Company[] }>(res);
                return updRes.data?.data;
            },
        });
    }
}

export default new CompanyApi();
