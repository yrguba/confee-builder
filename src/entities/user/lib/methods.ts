import { useQueryClient } from '@tanstack/react-query';

export const getUserById = (id: string | number | undefined) => {
    const queryClient = useQueryClient();
    console.log(queryClient.getQueryData(['get-users']));
};
