import React from 'react';

import { List, userApi } from 'entities/users';

function UsersList() {
    const { data, isLoading, error } = userApi.handleGetUsers();
    return <List list={data?.data} loading={isLoading} error={error ? 'error' : ''} />;
}

export default UsersList;
