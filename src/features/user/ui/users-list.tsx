import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UsersListView, userApi } from 'entities/user';

function UsersList() {
    const { data, isLoading, isError } = userApi.handleGetUsers();

    return <UsersListView users={data?.data} />;
}

export default UsersList;
