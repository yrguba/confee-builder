import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { ViewerDossierView, ViewerApi } from 'entities/viewer';
import { usePrevious } from 'shared/hooks';
import { TokenService } from 'shared/services';

type Props = {
    direction?: 'column' | 'row';
};

function ViewerDossier(props: Props) {
    const { direction } = props;

    const params = useParams();

    const queryClient = useQueryClient();
    // const { data, isLoading, isError, refetch } = UserApi.handleGetUser({ id: params.user_id });

    const users: any = queryClient.getQueryData(['get-users']);
    const user = users?.data.data.find((i: any) => i.id === Number(2));

    const prevUser = usePrevious(user);

    const { mutate: handleLogout } = ViewerApi.handleLogout();

    // useEffect(() => {
    //     refetch().then();
    // }, [params.user_id]);

    const logoutClick = () => {
        handleLogout(null, {
            onSuccess: () => {
                TokenService.remove().then(() => {
                    window.location.reload();
                });
            },
        });
    };

    const replaceAvatarClick = () => {};

    return <ViewerDossierView viewer={user || prevUser} logoutClick={logoutClick} replaceAvatarClick={replaceAvatarClick} />;
}

export default ViewerDossier;
