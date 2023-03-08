import React from 'react';

import { UsersList, usersApi } from 'entities/users';

function UsersListFeature() {
    const { data, isLoading } = usersApi.handleGetUsers();

    return <UsersList list={data?.data} loading={isLoading} />;
}

export default UsersListFeature;
