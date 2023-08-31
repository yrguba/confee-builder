import { userTypes } from 'entities/user';

export type Employee = {
    avatar: string | null;
    companies: Company[];
    created_at: Date;
    departments: Department[];
    email: string | null;
    first_name: string | null;
    id: 580;
    last_name: string | null;
    position: string | null;
    status: userTypes.Statuses;
    updated_at: Date;
};

export type EmployeeProxy = {
    full_name: string;
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
