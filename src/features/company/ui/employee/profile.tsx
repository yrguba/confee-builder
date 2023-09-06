import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { companyApi, employeeProxy, EmployeeProfileView, companyService } from 'entities/company';
import { useRouter } from 'shared/hooks';

import { createMemo } from '../../../../shared/hooks';

const memoEmployees = createMemo(companyService.getUpdatedEmployeesList);
function EmployeeProfile() {
    const { params, navigate } = useRouter();

    const queryClient = useQueryClient();

    const data = queryClient.getQueryData(['get-department-employees', Number(params.company_id), Number(params.department_id)]);
    const employees = memoEmployees(data);
    const employee = employees?.find((i) => i.id === Number(params.employee_id));

    return <EmployeeProfileView back={() => navigate(-1)} employee={employee} />;
}

export default EmployeeProfile;
