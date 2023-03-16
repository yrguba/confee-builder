import React from 'react';

import { SelectedUsersView, userApi, useUserStore } from 'entities/user';

function SelectedUsers() {
    const { data, isLoading, isError } = userApi.handleGetUsers();
    const setSelectedUser = useUserStore.use.setSelectedUsers();
    const clearSelectedUsers = useUserStore.use.clearSelectedUsers();
    const selectedUsers = useUserStore.use.selectedUsers();

    const createConference = (page: number) => {
        console.log(page);
    };

    const sendMessages = (page: number) => {
        console.log(page);
    };

    return <SelectedUsersView users={selectedUsers} deleteUser={setSelectedUser} clearSelectedUsers={clearSelectedUsers} />;
}

export default SelectedUsers;
