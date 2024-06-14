import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import produce from 'immer';

import { axiosClient } from 'shared/configs';

import { Company, Department, Employee } from './types';
import contacts from '../../../pages/main/contacts';
import { httpHandlers } from '../../../shared/lib';
import { Chat } from '../../chat/model/types';
import { Contact } from '../../contact/model/types';
import { employee_limit } from '../lib/constants';

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

    handleSendCode() {
        return useMutation((data: { identifier: string }) => {
            return axiosClient.post(`api/v2/ldap/send-activation-code`, data);
        });
    }

    handleBind() {
        const queryClient = useQueryClient();
        return useMutation(
            (data: { identifier: string; code: string }) => {
                return axiosClient.post(`api/v2/ldap/bind`, data);
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['get-viewer']);
                },
            }
        );
    }

    handleUnbind() {
        const queryClient = useQueryClient();
        return useMutation((data: { company_id: string | number }) => {
            return axiosClient.delete(`/api/v2/user/unbind-from-company`, { data });
        });
    }

    handleSearchEmployeesAndContacts(data: { name: string; registered: boolean }) {
        return useQuery(
            ['search-employees-and-contacts', data.name],
            () => axiosClient.get(`api/v2/search/employees-contacts/${data.name}`, { params: { registered: data.registered ? 1 : 0 } }),
            {
                enabled: !!data.name,
                staleTime: Infinity,
                select: (res) => {
                    const updRes = httpHandlers.response<{ data: { employees: Employee[]; contacts: Contact[] } }>(res);
                    return { ...updRes.data?.data, contacts: updRes.data?.data.contacts.filter((i) => i.user) };
                },
            }
        );
    }

    handleGetDepartmentEmployees(data: {
        initialPage?: number | undefined;
        companyId: number | string | undefined | null;
        departmentId: number | undefined | null;
        registered?: boolean;
    }) {
        return useInfiniteQuery(
            ['get-department-employees', data.companyId, data.departmentId, data.registered],

            ({ pageParam }) => {
                return axiosClient.get(`api/v2/companies/${data.companyId}/departments/${data.departmentId}/employees`, {
                    params: {
                        registered: data.registered ? 1 : 0,
                        page: pageParam || data.initialPage || 0,
                        per_page: employee_limit,
                    },
                });
            },
            {
                enabled: !!data.departmentId && !!data.companyId,
                staleTime: Infinity,
                getPreviousPageParam: (lastPage, pages) => {
                    const { current_page } = lastPage?.data.meta;
                    return current_page > 1 ? current_page - 1 : undefined;
                },
                getNextPageParam: (lastPage, pages) => {
                    const { current_page, last_page } = lastPage?.data.meta;
                    return current_page < last_page ? current_page + 1 : undefined;
                },
                select: (data: any) => {
                    return {
                        pages: data.pages,
                        pageParams: [...data.pageParams],
                    };
                },
            }
        );
    }

    handleGetDepartments(data: { companyId: number | string | undefined | null; registered: boolean }) {
        return useQuery(
            ['get-departments', data.companyId],
            () =>
                axiosClient.get(`/api/v2/companies/${data.companyId}/departments/without-employees`, {
                    params: {
                        registered: data.registered ? 1 : 0,
                    },
                }),
            {
                enabled: !!data.companyId,
                staleTime: Infinity,
                select: (res) => {
                    const updRes = httpHandlers.response<{ data: Department[] }>(res);
                    return updRes.data?.data;
                },
            }
        );
    }

    handleGetEmployee(data: { employeeId: string | undefined }) {
        return useQuery(
            ['get-employee', data.employeeId],
            () =>
                axiosClient.get(`api/v2/employee/${data.employeeId}`, {
                    params: {
                        sort_by: 'first_name',
                    },
                }),
            {
                enabled: !!data.employeeId,
                staleTime: Infinity,
                select: (res) => {
                    const updRes = httpHandlers.response<{ data: Employee }>(res);
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
