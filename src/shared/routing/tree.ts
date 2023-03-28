const routing_tree = {
    auth: {
        base: '/auth',
    },
    settings: {
        base: '/settings',
        profile: 'profile',
        privacy: 'privacy',
    },
    main: {
        base: '/main',
        company: {
            base: 'company',
            path: '/info/company',
            department: 'department/:department_name',
            division: 'department/:department_name/division/:division_name',
            user: {
                base: 'department/:department_name/division/:division_name/user/:user_id/name/:user_name',
                messages: 'messages',
                favorites: 'favorites',
                tasks: 'tasks',
                info: {
                    base: 'info',
                    images: 'images',
                    videos: 'videos',
                    files: 'files',
                },
            },
        },
        chats: {
            base: 'chats',
            path: '/info/chats',
            chat: {
                base: 'chats/chat/:chat_id',
                private_chat: {
                    base: 'private_chat/:user_id',
                    images: 'images',
                    videos: 'videos',
                    files: 'files',
                },
                group_chat: {
                    base: 'group_chat/:chat_id',
                    users: 'users',
                    images: 'images',
                    videos: 'videos',
                    files: 'files',
                },
            },
        },
        tasks: {
            base: 'tasks',
            path: '/info/tasks',
        },
    },
};

export default routing_tree;
