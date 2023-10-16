import * as constants from './lib/constants';
import employeeProxy from './lib/emloyee-proxy';
import companyService from './lib/service';
import companyApi from './model/api';
import * as companyTypes from './model/types';
import BindCompanyView from './ui/bind';
import CompanyCardView from './ui/card';
import EmployeeProfileModalView from './ui/employee/modals/profile';
import EmployeeProfileView from './ui/employee/profile';
import EmployeeStatusView from './ui/employee/status';
import CompanyTagView from './ui/tag';

export {
    companyTypes,
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
};
