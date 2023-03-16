import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UsersListView, userApi } from 'entities/user';

function UsersList() {
    const { data, isLoading, isError } = userApi.handleGetUsers();

    const pageClick = (page: number) => {
        console.log(page);
    };

    return <UsersListView users={data?.data} pageClick={pageClick} />;
}

export default UsersList;
