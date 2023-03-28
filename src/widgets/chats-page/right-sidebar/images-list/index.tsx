import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { ChatImagesList } from 'features/chat';

function ImagesListFromChatsPage() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return <ChatImagesList gap={3} imgSize={97} hardGrid />;
}

export default ImagesListFromChatsPage;
