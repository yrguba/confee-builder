import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DepartmentsListView, UserApi, UserTypes } from 'entities/user';

function DepartmentsList() {
    const { data, isLoading, isError } = UserApi.handleGetUsers();
    const navigate = useNavigate();

    const departmentClick = (data: string) => {
        navigate(`department/${data}`);
    };

    const divisionClick = (data: any) => {
        navigate(`department/${data.department}/division/${data.division}`);
    };

    const userClick = (data: any) => {
        navigate(`department/${data.department}/division/${data.division}/user/${data.user.id}/name/${data.user.name}/info/images`);
    };

    return (
        <DepartmentsListView
            list={data?.data?.data || []}
            departmentClick={departmentClick}
            divisionClick={divisionClick}
            userClick={userClick}
            loading={isLoading}
            error={isError}
        />
    );
}

export default DepartmentsList;
