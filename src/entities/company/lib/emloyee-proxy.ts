import { userProxy } from '../../user';
import { viewerService } from '../../viewer';
import { EmployeeProxy, Employee } from '../model/types';

function employeeProxy(employee: Employee | undefined | null): EmployeeProxy | null {
    if (!employee) return null;
    const viewerId = viewerService.getId();
    return new Proxy(employee, {
        get(target, prop: keyof EmployeeProxy, receiver): EmployeeProxy[keyof EmployeeProxy] {
            switch (prop) {
                case 'viewer':
                    return viewerId === target?.user?.id;

                case 'full_name':
                    return `${target.first_name || ''} ${target.last_name || ''}`;

                case 'userProxy':
                    return userProxy(target.user);

                case 'isDeleted':
                    return !!target?.user?.deleted_at;

                default:
                    return target[prop];
            }
        },
    }) as EmployeeProxy;
}

export default employeeProxy;
