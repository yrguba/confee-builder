import * as constants from './lib/constants';
import employeeProxy from './lib/emloyee-proxy';
import companyService from './lib/service';
import companyApi from './model/api';
import companyStore, { CompanySoreTypes } from './model/store';
import * as companyTypes from './model/types';
import BindCompanyView from './ui/bind';
import CompanyCardView from './ui/card';
import EmployeeProfileModalView from './ui/employee/modals/profile';
import EmployeeProfileView from './ui/employee/profile';
import EmployeeStatusView from './ui/employee/status';
import ConfirmDeleteCorpAccModalView from './ui/modals/confirm-delete';
import CompanyTagView from './ui/tag';

export type { CompanySoreTypes };
export {
    companyTypes,
    companyStore,
    employeeProxy,
    companyApi,
    EmployeeProfileView,
    companyService,
    constants,
    CompanyCardView,
    EmployeeStatusView,
    BindCompanyView,
    CompanyTagView,
    EmployeeProfileModalView,
    ConfirmDeleteCorpAccModalView,
};
