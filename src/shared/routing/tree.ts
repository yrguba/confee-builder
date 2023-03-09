const routing_tree = {
    auth: {
        base: '/auth',
    },
    main: {
        base: '/main',
        company: {
            base: 'company',
            messages: 'messages',
            favorites: 'favorites',
            tasks: 'tasks',
            info: 'info',
        },
        chats: {
            base: 'chats',
        },
        tasks: {
            base: 'tasks',
        },
    },
};

export default routing_tree;
