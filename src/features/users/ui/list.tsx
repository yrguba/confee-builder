import React from 'react';

import { List, usersApi } from 'entities/users';

function UsersList() {
    const { data, isLoading } = usersApi.handleGetUsers();

    return <List list={data?.data} loading={isLoading} />;
}

export default UsersList;
