import React, { useEffect, useState } from 'react';

import { UsersListView, userApi, useUserStore, userTypes } from 'entities/user';

function UsersList() {
    const { data, isLoading, isError } = userApi.handleGetUsers();
    const setSelectedUser = useUserStore.use.setSelectedUsers();
    const selectedUser = useUserStore.use.selectedUsers();

    const pageClick = (page: number) => {
        console.log(page);
    };

    const userCardClick = (user: userTypes.User) => {
        console.log(user);
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUser: any = data?.data?.filter((i, index) => {
            if (index < 20) return i;
        });
        setUsers(getUser);
    }, [data]);

    return (
        <UsersListView
            users={users}
            userCardClick={userCardClick}
            pageClick={pageClick}
            setSelectedUser={setSelectedUser}
            selectedUsersId={selectedUser.map((user) => user.id)}
        />
    );
}

export default UsersList;
