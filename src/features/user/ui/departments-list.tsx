import React from 'react';

import { DepartmentsListView, userApi } from 'entities/users';

function DepartmentsList() {
    const { data, isLoading, isError } = userApi.handleGetDepartments();
    return <DepartmentsListView list={data?.data} loading={isLoading} error={isError} />;
}

export default DepartmentsList;
