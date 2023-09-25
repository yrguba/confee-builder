import { appApi } from 'entities/app';
import { getUniqueArr } from 'shared/lib';

import employeeProxy from './emloyee-proxy';
import userProxy from '../../user/lib/proxy';
import { User } from '../../user/model/types';
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

    getEmployeeFromCardList(employee: Employee) {
        const proxy = employeeProxy(employee);
        return proxy
            ? {
                  id: String(proxy.id),
                  img: proxy.avatar,
                  name: proxy?.full_name || '',
                  title: proxy?.full_name || '',
                  subtitle: proxy?.position || '',
                  payload: proxy,
              }
            : null;
    }
}

export default new CompanyService();
