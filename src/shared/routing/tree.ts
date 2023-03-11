const routing_tree = {
    auth: {
        base: '/auth',
    },
    main: {
        base: '/main',
        company: {
            base: 'company',
            path: '/main/company',
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
