export enum Statuses {
    'IN_OFFICE' = '#29CC39',
    'HOME_WORK' = '#8833FF',
    'BUSINESS_TRIP' = '#33BFFF',
    'VACATION' = '#2EE5C9',
    'SICK_LEAVE' = '#EFF2F7',
    'NOT_AVAILABLE' = '#E62E7B',
    'ONLINE' = '#0000ff',
    'OFFLINE' = '',
}

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
    status: Statuses | null;
    updated_at: Date;
};

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
