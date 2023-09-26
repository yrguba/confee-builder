import React from 'react';

import { companyApi, employeeProxy, EmployeeProfileView } from 'entities/company';
import { useRouter } from 'shared/hooks';

function EmployeeProfile() {
    const { params, navigate } = useRouter();

    const { data: employeeData, isLoading } = companyApi.handleGetEmployee({ employeeId: params.employee_id });
    console.log(employeeData);
    return <EmployeeProfileView back={() => navigate(-1)} employee={employeeProxy(employeeData)} loading={isLoading} />;
}

export default EmployeeProfile;
