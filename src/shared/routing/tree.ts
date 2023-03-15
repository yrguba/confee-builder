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
            path: '/main/company',
            department: 'department',
            division: 'division',
            user: 'user',
            messages: 'messages',
            favorites: 'favorites',
            tasks: 'tasks',
            info: 'info',
        },
        chats: {
            base: 'chats',
            path: '/main/chats',
        },
        tasks: {
            base: 'tasks',
            path: '/main/tasks',
        },
    },
};

export default routing_tree;
