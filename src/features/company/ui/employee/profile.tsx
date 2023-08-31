import React from 'react';

import { companyApi, employeeProxy, EmployeeProfileView } from 'entities/company';
import { useRouter } from 'shared/hooks';

function EmployeeProfile() {
    const { params, navigate } = useRouter();

    const { data: employeesData } = companyApi.handleGetDepartmentEmployees({ companyId: params.company_id, departmentId: params.department_id });

    const employee = employeesData?.find((i) => i.id === Number(params.employee_id));
    return <EmployeeProfileView back={() => navigate(-1)} employee={employeeProxy(employee)} />;
}

export default EmployeeProfile;
