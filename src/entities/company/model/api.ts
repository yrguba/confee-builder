import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { axiosClient } from 'shared/configs';

import { Company, Employee } from './types';
import { httpHandlers } from '../../../shared/lib';
import { Contact } from '../../contact/model/types';

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

    handleSearchEmployeesAndContacts(data: { name: string }) {
        return useQuery(['search-employees-and-contacts', data.name], () => axiosClient.get(`api/v2/search/employees-contacts/${data.name}`), {
            enabled: !!data.name,
            staleTime: Infinity,
            select: (res) => {
                const updRes = httpHandlers.response<{ data: { employees: Employee[]; contacts: Contact[] } }>(res);
                return updRes.data?.data;
            },
        });
    }

    handleGetDepartmentEmployees(data: { companyId: number | undefined | null; departmentId: number | undefined | null }) {
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

    handleGetCompanyEmployees(data: { companyId: string | undefined }) {
        return useQuery(
            ['get-company-employees', data.companyId],
            () =>
                axiosClient.get(`api/v2/companies/${data.companyId}/employees`, {
                    params: {
                        sort_by: 'first_name',
                    },
                }),
            {
                enabled: !!data.companyId,
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
