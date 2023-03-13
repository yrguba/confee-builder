import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { authApi } from 'entities/auth';
import { routing_tree } from 'shared/routing';
import { TokenService } from 'shared/services';
import { Button, Navbar, NavbarTypes, ModalTypes, useModal, Modal } from 'shared/ui';

import Icons from './icons';

type Routing = '/' | keyof typeof routing_tree.settings;
type Item = NavbarTypes.BaseItem<Routing, any>;

function SettingsPageNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isPending, startTransition] = useTransition();
    const confirmModal = useModal();

    const { mutate: handleLogout } = authApi.handleLogout();

    const items: Item[] = [
        { id: 0, text: 'Профиль', icon: 'company', path: 'profile' },
        { id: 1, text: 'Настройки приватности', icon: 'chats', path: 'privacy' },
        { id: 2, text: 'Выход из учетной записи', icon: 'tasks', path: '/' },
    ];

    const logout = () => {
        handleLogout(null, {
            onSuccess: () => {
                TokenService.remove().then((res) => {
                    window.location.reload();
                });
            },
        });
    };

    const onClick = (item: Item) => {
        if (item.path === '/') {
            confirmModal.open();
        } else {
            startTransition(() => navigate(item.path));
        }
    };

    const item = (item: Item) => (
        <Button.Link
            active={pathname.includes(item.path) && item.path !== '/'}
            disabled={isPending}
            loading={isPending && pathname.includes(item.path)}
            key={item.id}
            onClick={() => onClick(item)}
            prefixIcon={<Icons variants={item.icon} />}
            fontSize={16}
            fontWeight={600}
        >
            {item.text}
        </Button.Link>
    );

    return (
        <>
            <Modal onOk={logout} width={319} {...confirmModal}>
                Вы уверены, что хотите выйти из аккаунта?
            </Modal>
            <Navbar items={items} item={item} direction="column" gap={24} />
        </>
    );
}

export default SettingsPageNavigation;
