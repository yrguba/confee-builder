import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DepartmentsListView, userApi, userTypes } from 'entities/user';

function DepartmentsList() {
    const { data, isLoading, isError } = userApi.handleGetDepartments();

    const navigate = useNavigate();

    const departmentClick = (data: string) => {
        navigate(`department/${data}`);
    };

    const divisionClick = (data: any) => {
        navigate(`department/${data.department}/division/${data.division}`);
    };

    const userClick = (data: any) => {
        navigate(`department/${data.department}/division/${data.division}/user/${data.user.id}/name/${data.user.name}/info`);
    };

    return (
        <DepartmentsListView
            list={data?.data}
            departmentClick={departmentClick}
            divisionClick={divisionClick}
            userClick={userClick}
            loading={isLoading}
            error={isError}
        />
    );
}

export default DepartmentsList;
