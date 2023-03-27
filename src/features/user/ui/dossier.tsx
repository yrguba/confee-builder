import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { UserDossierView, UserApi, useUserStore } from 'entities/user';
import { usePrevious } from 'shared/hooks';

function UserDossier() {
    const params = useParams();

    if (!params.user_id) return null;

    const queryClient = useQueryClient();
    // const { data, isLoading, isError, refetch } = UserApi.handleGetUser({ id: params.user_id });

    const users: any = queryClient.getQueryData(['get-users']);
    const user = users?.data.data.find((i: any) => i.id === Number(params.user_id));

    const prevUser = usePrevious(user);

    // useEffect(() => {
    //     refetch().then();
    // }, [params.user_id]);

    return <UserDossierView user={user || prevUser} loading={false} />;
}

export default UserDossier;
