import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { UserDossierView, userApi, useUserStore } from 'entities/user';
import { usePrevious } from 'shared/hooks';

function UserDossier() {
    const params = useParams();

    if (!params.user_id) return null;
    const { data, isLoading, isError, refetch } = userApi.handleGetUser({ id: params.user_id });
    const prevUser = usePrevious(data?.data);

    useEffect(() => {
        refetch().then();
    }, [params.user_id]);

    return <UserDossierView user={data?.data || prevUser} loading={isLoading} />;
}

export default UserDossier;
