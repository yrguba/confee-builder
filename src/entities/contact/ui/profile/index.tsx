import React from 'react';

import { UserCardView } from 'entities/user';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, Dropdown, DropdownTypes, Icons, IconsTypes, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { ContactProxy } from '../../model/types';

type Props = {
    contact: ContactProxy | BaseTypes.Empty;
    back: () => void;
    updateName: (name: string | number | undefined) => void;
} & BaseTypes.Statuses;

function ContactProfileView(props: Props) {
    const { contact, back, updateName } = props;

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => '' },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => '' },
        { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => '' },
    ];

    const secondaryInfo: { id: number; title: string; subtitle: string }[] = [
        { id: 0, title: 'Никнейм', subtitle: '' },
        { id: 1, title: 'Номер телефона', subtitle: contact?.phone || '' },
    ];

    const menuItems: DropdownTypes.DropdownMenuItem[] = [
        {
            id: 0,
            title: '',
            icon: <Icons variant="delete" />,
            callback: () => '',
        },
    ];

    return (
        <div className={styles.wrapper}>
            <UserCardView name={contact?.full_name || ''} aboutMe="" avatar="" birth="" phone={contact?.phone || ''} nickname="" />
            {/* <div className={styles.btns}> */}
            {/*    {btns.map((i) => ( */}
            {/*        <Dropdown.Menu visible={false} position="bottom-center" items={menuItems} key={i.id} disabled> */}
            {/*            <Button direction="vertical" prefixIcon={<Icons variant={i.icon} />} onClick={i.callback}> */}
            {/*                {i.title} */}
            {/*            </Button> */}
            {/*        </Dropdown.Menu> */}
            {/*    ))} */}
            {/* </div> */}
        </div>
    );
}

export default ContactProfileView;
