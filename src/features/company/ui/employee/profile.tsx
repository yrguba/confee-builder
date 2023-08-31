import React from 'react';

import { companyApi, employeeProxy, EmployeeProfileView } from 'entities/company';
import { useRouter } from 'shared/hooks';

function EmployeeProfile() {
    const { params, navigate } = useRouter();

    const { data: companiesData } = companyApi.handleGetCompanies();
    console.log(companiesData);
    return <EmployeeProfileView back={() => navigate('/contacts')} employee={null} />;
}

export default EmployeeProfile;
