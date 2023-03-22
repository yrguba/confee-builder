import React, { useEffect, useState } from 'react';

import { UsersListView, userApi, useUserStore } from 'entities/user';

function UsersList() {
    const { data, isLoading, isError } = userApi.handleGetUsers();
    const setSelectedUser = useUserStore.use.setSelectedUsers();
    const selectedUser = useUserStore.use.selectedUsers();

    const pageClick = (page: number) => {
        console.log(page);
    };
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUser: any = data?.data?.filter((i, index) => {
            if (index < 20) return i;
        });
        setUsers(getUser);
    }, [data]);

    return <UsersListView users={users} pageClick={pageClick} setSelectedUser={setSelectedUser} selectedUsersId={selectedUser.map((user) => user.id)} />;
}

export default UsersList;
