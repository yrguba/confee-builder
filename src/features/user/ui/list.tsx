import React from 'react';

import { List, userApi } from 'entities/users';

function UsersList() {
    const { data, isLoading } = userApi.handleGetUsers();

    return <List list={data?.data} loading={isLoading} />;
}

export default UsersList;
