import React from 'react';

import { List, userApi } from 'entities/users';

function UsersList() {
    const { data, isLoading, isError } = userApi.handleGetUsers();
    return <List list={data?.data} loading={isLoading} error={isError} />;
}

export default UsersList;
