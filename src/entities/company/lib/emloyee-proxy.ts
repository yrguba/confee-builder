import { EmployeeProxy, Employee } from '../model/types';

function employeeProxy(employee: Employee | undefined): EmployeeProxy | null {
    if (!employee) return null;
    return new Proxy(employee, {
        get(target, prop: keyof EmployeeProxy, receiver): EmployeeProxy[keyof EmployeeProxy] {
            switch (prop) {
                case 'full_name':
                    return `${target.first_name || ''} ${target.last_name || ''}`;

                default:
                    return target[prop];
            }
        },
    }) as EmployeeProxy;
}

export default employeeProxy;
