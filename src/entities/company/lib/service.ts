import { appApi } from 'entities/app';
import { getUniqueArr } from 'shared/lib';

import employeeProxy from './emloyee-proxy';
import { Employee } from '../model/types';

class CompanyService {
    getUpdatedEmployeesList(employees: any) {
        if (!employees) return null;
        const uniq = getUniqueArr(
            employees?.pages?.reduce((employee: any, page: any) => [...employee, ...[...page.data.data]], []),
            'id'
        );
        return uniq.map((employee: any, index: number) => {
            return employeeProxy(employee);
        });
    }
}

export default new CompanyService();
