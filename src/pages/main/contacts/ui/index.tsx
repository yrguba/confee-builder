import React from 'react';
import { Outlet } from 'react-router-dom';

import { useWidthMediaQuery, useRouter } from 'shared/hooks';
import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { Sidebar } from '../widgets';

function ContactsPage() {
    const { params } = useRouter();

    const { to } = useWidthMediaQuery();

    const isVisibleSidebar = () => {
        if (to('sm')) {
            return !params.contact_id;
        }
        return true;
    };

    const isVisibleOutlet = () => {
        if (to('sm')) {
            return !!params.contact_id;
        }
        return true;
    };

    return (
        <Box.Animated visible className={styles.wrapper}>
            {isVisibleSidebar() && (
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
            )}
            {isVisibleOutlet() && (
                <div className={styles.outlet}>
                    {!params.contact_id && !params.employee_id && (
                        <Title textWrap primary={false} textAlign="center" variant="H2">
                            Выберите контакт
                        </Title>
                    )}
                    <Outlet />
                </div>
            )}
        </Box.Animated>
    );
}

export default ContactsPage;
