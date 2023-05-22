import React, { useEffect, useState, useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { Button, NavbarTypes, Navbar, Counter } from 'shared/ui';

type Routing = keyof typeof routing_tree.main.company.user | keyof typeof routing_tree.main.chats.chat.group_chat;
type Item = NavbarTypes.ResponsiveItem<Routing, any>;

type Props = {
    withUsers?: boolean;
};

function ChatContentNav(props: Props) {
    const { withUsers } = props;

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [items, setItems] = useState<Item[]>([
        { id: 0, text: 'Изображения', path: 'images', breakpoint: 610 },
        { id: 1, text: 'Видео', path: 'videos', breakpoint: 730 },
        { id: 2, text: 'Файлы', path: 'files', breakpoint: 750 },
    ]);

    const onClick = (item: Item) => {
        navigate(item.path);
    };

    const activeBtnId = items.find((i) => i.path === pathname.split('/').pop())?.id || 0;

    useEffect(() => {
        if (withUsers) {
            setItems((prev) => [{ id: 3, text: 'Участники', path: 'users', breakpoint: 750 }, ...prev]);
        }
    }, []);

    const item = (item: Item) => (
        <Button.Link
            key={item.id}
            active={activeBtnId === item.id}
            onClick={() => onClick(item)}
            // suffixIcon={<Counter height={20}>{32}</Counter>}
            fontSize={16}
            fontWeight={600}
        >
            {item.text}
        </Button.Link>
    );

    return <Navbar.WithLine gap={20} activeItemId={activeBtnId} item={item} items={items} layoutId="ChatContentNav" />;
}

export default ChatContentNav;
