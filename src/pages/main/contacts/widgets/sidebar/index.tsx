import React from 'react';

import { ContactsList, AddContactModal } from 'features/contact';
import { useHeightMediaQuery } from 'shared/hooks';
import { Button, Icons, Modal, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Sidebar() {
    const miniSearch = useHeightMediaQuery().to('sm');
    const addContactModal = Modal.use();

    return (
        <>
            <AddContactModal {...addContactModal} />
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <Title variant="H2">Контакты</Title>
                    <div className={styles.icons}>
                        <Button.Circle variant="secondary" onClick={() => addContactModal.open()}>
                            <Icons variant="add-contact" />
                        </Button.Circle>
                        {miniSearch && <Icons variant="search" />}
                    </div>
                </div>
                <div className={styles.list}>
                    <ContactsList />
                </div>
            </div>
        </>
    );
}

export default Sidebar;
