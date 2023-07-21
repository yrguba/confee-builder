import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Icons } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    toggleVisible: () => void;
};

function Header(props: Props) {
    const { toggleVisible } = props;

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const closeSidebar = () => {
        toggleVisible();
        const path = pathname.split('/');
        path.splice(-3);
        setTimeout(() => navigate(path.join('/')), 400);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Информация</div>
            <div onClick={closeSidebar} className={styles.icon}>
                <Icons variants="exit" />
            </div>
        </div>
    );
}

export default Header;
