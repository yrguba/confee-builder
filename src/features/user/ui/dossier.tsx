import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { UserDossierView, userApi, useUserStore } from 'entities/user';

function UserDossier() {
    const params = useParams();

    if (!params.user_id) return null;
    const { data, isLoading, isError, refetch } = userApi.handleGetUser({ id: params.user_id });

    useEffect(() => {
        refetch().then();
    }, [params.user_id]);

    return <UserDossierView user={data?.data} loading={isLoading} />;
}

export default UserDossier;
