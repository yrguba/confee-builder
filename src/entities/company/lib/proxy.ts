import { Company, CompanyProxy } from '../model/types';

function companyProxy(company: Company | undefined): any {
    if (!company) return null;
    return new Proxy(company, {
        get(target, prop: keyof CompanyProxy, receiver): CompanyProxy[keyof CompanyProxy] {
            switch (prop) {
                default:
                    return target[prop];
            }
        },
    });
}

export default companyProxy;
