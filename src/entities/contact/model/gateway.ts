import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { useEffect } from 'react';

import { useRouter, useWebSocket } from 'shared/hooks';

function contactGateway() {
    const queryClient = useQueryClient();
    const { params } = useRouter();
    useEffect(() => {}, []);
}

export default contactGateway;
