import React, { useEffect, useState } from 'react';

import { UsersListView, UserApi, useUserStore, userTypes } from 'entities/user';

function UsersList() {
    const { data, isLoading, isError } = UserApi.handleGetUsers();
    const setSelectedUser = useUserStore.use.setSelectedUsers();
    const selectedUser = useUserStore.use.selectedUsers();

    const pageClick = (page: number) => {
        console.log(page);
    };

    const clickOnUserCard = (user: userTypes.User) => {
        console.log(user);
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUser: any = data?.data?.data.filter((i, index) => {
            if (i.name) return i;
        });
        setUsers(getUser);
    }, [data]);

    return (
        <UsersListView
            users={users}
            userCardClick={clickOnUserCard}
            pageClick={pageClick}
            setSelectedUser={setSelectedUser}
            selectedUsersId={selectedUser.map((user) => user.id)}
        />
    );
}

export default UsersList;
