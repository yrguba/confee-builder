import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { Button, NavbarTypes, Navbar } from 'shared/ui';

type Routing = keyof typeof routing_tree.main;
type Item = NavbarTypes.ResponsiveItem<Routing, any>;

function MainPageNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const items: Item[] = [
        { id: 0, text: 'Компания', icon: 'company', path: 'company', breakpoint: 500 },
        { id: 1, text: 'Чаты и каналы', icon: 'chats', path: 'chats', breakpoint: 680 },
        { id: 2, text: 'Задачи', icon: 'tasks', path: 'tasks', breakpoint: 730 },
    ];

    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<Item>(items);
    const [isPending, startTransition] = useTransition();

    const item = (item: Item) => (
        <Button.Link
            active={pathname.includes(item.path)}
            disabled={isPending}
            loading={isPending && pathname.includes(item.path)}
            key={item.id}
            onClick={() => startTransition(() => navigate(item.path))}
            prefixIcon={<Icons variants={item.icon} />}
            fontSize={16}
            fontWeight={600}
        >
            {item.text}
        </Button.Link>
    );

    return <Navbar.Responsive itemsInDropdown={itemsInDropdown} itemsInRow={itemsInRow} item={item} columnGap={30} />;
}

export default MainPageNavigation;

type IconsProps = {
    variants: 'company' | 'chats' | 'tasks';
};

function Icons(props: IconsProps) {
    const { variants } = props;

    switch (variants) {
        case 'company': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.83 9.43103C13.772 9.33903 13.776 9.22305 13.829 9.12805C14.264 8.35205 14.511 7.45602 14.511 6.49902C14.511 6.16702 14.4819 5.843 14.424 5.526C14.405 5.422 14.4369 5.314 14.5179 5.245C15.0729 4.774 15.791 4.49902 16.561 4.49902C18.678 4.49902 20.3281 6.54998 19.6281 8.75098C19.3241 9.70598 18.544 10.481 17.587 10.78C16.038 11.264 14.566 10.601 13.83 9.43103ZM18.11 12.28H16.1281C15.8621 12.28 15.725 12.603 15.918 12.787C17.338 14.139 18.001 16.088 18.001 18.02V19.2C18.001 19.366 18.135 19.5 18.301 19.5H22.001C22.277 19.5 22.501 19.276 22.501 19V16.6801C22.5 14.6501 21.35 12.28 18.11 12.28ZM9.00903 10.5C11.215 10.5 13.009 8.706 13.009 6.5C13.009 4.294 11.215 2.5 9.00903 2.5C6.80303 2.5 5.00903 4.294 5.00903 6.5C5.00903 8.706 6.80303 10.5 9.00903 10.5ZM11 12.5H7C2.94 12.5 1.5 15.473 1.5 18.019V21C1.5 21.276 1.724 21.5 2 21.5H16C16.276 21.5 16.5 21.276 16.5 21V18.019C16.5 15.473 15.06 12.5 11 12.5Z" />
                </svg>
            );
        }
        case 'chats': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C10.1074 2.00016 8.25373 2.53734 6.65431 3.54913C5.05488 4.56092 3.77539 6.00578 2.96449 7.71584C2.15359 9.42591 1.84457 11.331 2.07333 13.2097C2.3021 15.0884 3.05926 16.8636 4.25684 18.3291L2.293 20.293C2.15315 20.4328 2.0579 20.611 2.01931 20.805C1.98072 20.9989 2.00051 21.2 2.07619 21.3827C2.15187 21.5654 2.28003 21.7216 2.44447 21.8315C2.60891 21.9414 2.80223 22 3 22H12C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM9 7H15C15.2652 7 15.5196 7.10536 15.7071 7.29289C15.8946 7.48043 16 7.73478 16 8C16 8.26522 15.8946 8.51957 15.7071 8.70711C15.5196 8.89464 15.2652 9 15 9H9C8.73479 9 8.48043 8.89464 8.2929 8.70711C8.10536 8.51957 8 8.26522 8 8C8 7.73478 8.10536 7.48043 8.2929 7.29289C8.48043 7.10536 8.73479 7 9 7ZM15 17H9C8.73479 17 8.48043 16.8946 8.2929 16.7071C8.10536 16.5196 8 16.2652 8 16C8 15.7348 8.10536 15.4804 8.2929 15.2929C8.48043 15.1054 8.73479 15 9 15H15C15.2652 15 15.5196 15.1054 15.7071 15.2929C15.8946 15.4804 16 15.7348 16 16C16 16.2652 15.8946 16.5196 15.7071 16.7071C15.5196 16.8946 15.2652 17 15 17ZM17 13H7C6.73479 13 6.48043 12.8946 6.2929 12.7071C6.10536 12.5196 6 12.2652 6 12C6 11.7348 6.10536 11.4804 6.2929 11.2929C6.48043 11.1054 6.73479 11 7 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12C18 12.2652 17.8946 12.5196 17.7071 12.7071C17.5196 12.8946 17.2652 13 17 13Z" />
                </svg>
            );
        }
        case 'tasks': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 15.5V17C17 17.6 16.6 18 16 18C15.4 18 15 17.6 15 17V15.5H9V17C9 17.6 8.6 18 8 18C7.4 18 7 17.6 7 17V15.5H5C4.3 15.5 3.6 15.3 3 15V19C3 20.7 4.3 22 6 22H18C19.7 22 21 20.7 21 19V15C20.4 15.3 19.7 15.5 19 15.5H17ZM21 6H17V5C17 3.3 15.7 2 14 2H10C8.3 2 7 3.3 7 5V6H3C2.4 6 2 6.4 2 7V11C2 12.7 3.3 14 5 14H19C20.7 14 22 12.7 22 11V7C22 6.4 21.6 6 21 6ZM15 6H9V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V6Z" />
                </svg>
            );
        }
        default:
            return null;
    }
}
