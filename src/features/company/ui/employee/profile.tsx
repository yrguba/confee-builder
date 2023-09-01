import React from 'react';

import { companyApi, employeeProxy, EmployeeProfileView } from 'entities/company';
import { useRouter } from 'shared/hooks';

function EmployeeProfile() {
    const { params, navigate } = useRouter();

    const { data: employeesData } = companyApi.handleGetDepartmentEmployees({
        companyId: Number(params.company_id),
        departmentId: Number(params.department_id),
    });

    const employee = null;
    return <EmployeeProfileView back={() => navigate(-1)} employee={null} />;
}

export default EmployeeProfile;
