import React from 'react';

import { SelectedUsersView, useUserStore } from 'entities/user';

function SelectedUsers() {
    const setSelectedUser = useUserStore.use.setSelectedUsers();
    const clearSelectedUsers = useUserStore.use.clearSelectedUsers();
    const selectedUsers = useUserStore.use.selectedUsers();

    const createConference = (page: number) => {};

    const sendMessages = (page: number) => {};

    return <SelectedUsersView users={selectedUsers} deleteUser={setSelectedUser} clearSelectedUsers={clearSelectedUsers} />;
}

export default SelectedUsers;
