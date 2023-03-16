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
        base: '/info',
        company: {
            base: 'company',
            path: '/info/company',
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
            path: '/info/chats',
        },
        tasks: {
            base: 'tasks',
            path: '/info/tasks',
        },
    },
};

export default routing_tree;
