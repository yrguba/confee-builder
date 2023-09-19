import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { companyApi, employeeProxy, EmployeeProfileView, companyService } from 'entities/company';
import { useRouter } from 'shared/hooks';

import { createMemo } from '../../../../shared/hooks';

const memoEmployees = createMemo(companyService.getUpdatedEmployeesList);
function EmployeeProfile() {
    const { params, navigate } = useRouter();

    const { data: employeeData } = companyApi.handleGetEmployee({ employeeId: params.employee_id });

    return <EmployeeProfileView back={() => navigate(-1)} employee={employeeProxy(employeeData)} />;
}

export default EmployeeProfile;
