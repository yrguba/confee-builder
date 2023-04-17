import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { UserDossierView, UserApi, useUserStore } from 'entities/user';
import { usePrevious } from 'shared/hooks';

type Props = {
    direction?: 'column' | 'row';
};

function UserDossier(props: Props) {
    const { direction } = props;

    const params = useParams();

    const queryClient = useQueryClient();
    const { data: users, isLoading, isError, refetch } = UserApi.handleGetUsers();

    const user = users?.data?.data.find((i: any) => i.id === Number(params.user_id));

    const prevUser = usePrevious(user);

    // useEffect(() => {
    //     refetch().then();
    // }, [params.user_id]);

    return <UserDossierView user={user || prevUser} loading={false} direction={direction} />;
}

export default UserDossier;
