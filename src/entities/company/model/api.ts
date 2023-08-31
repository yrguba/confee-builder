import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';

import { Company, Employee } from './types';
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

    handleGetDepartmentEmployees(data: { companyId: string | undefined; departmentId: string | undefined }) {
        return useQuery(
            ['get-department-employees', data.companyId, data.departmentId],
            () => axiosClient.get(`api/v2/companies/${data.companyId}/departments/${data.departmentId}/employees`),
            {
                enabled: !!data.departmentId && !!data.companyId,
                staleTime: Infinity,
                select: (res) => {
                    const updRes = httpHandlers.response<{ data: Employee[] }>(res);
                    return updRes.data?.data;
                },
            }
        );
    }
}

export default new CompanyApi();
