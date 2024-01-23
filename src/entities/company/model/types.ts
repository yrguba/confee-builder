import { User, UserProxy } from '../../user/model/types';

export enum EmployeeStatuses {
    'in office' = '#29CC39',
    'home work' = '#8833FF',
    'business trip' = '#33BFFF',
    'vacation' = '#2EE5C9',
    'sick leave' = '#EFF2F7',
    'not available' = '#E62E7B',
}

export type Employee = {
    avatar: string | null;
    companies: Company[];
    created_at: Date;
    departments: Department[];
    email: string | null;
    first_name: string | null;
    id: number;
    last_name: string | null;
    position: string | null;
    status: keyof typeof EmployeeStatuses;
    updated_at: Date;
    user: User;
    nickname: string | null;
};

export type EmployeeProxy = {
    full_name: string;
    userProxy: UserProxy;
    viewer: boolean;
    isDeleted: boolean;
} & Employee;

export type Department = {
    id: number;
    employees: Employee[];
    name: string | null;
    tag: string | null;
    created_at: Date;
    updated_at: Date;
};

export type Company = {
    avatar: string | null;
    id: number;
    departments: Department[];
    name: string | null;
    created_at: Date;
    updated_at: Date;
};

export type CompanyProxy = {} & Company;
