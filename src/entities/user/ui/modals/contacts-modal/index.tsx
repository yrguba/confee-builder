import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, LoadingIndicator } from 'shared/ui';

import styles from './styles.module.scss';
import { useStyles } from '../../../../../shared/hooks';
import { ViewerTypes } from '../../../../viewer';
import { User } from '../../../model/types';
import UserStatusView from '../../status';

type Props = {} & BaseTypes.Statuses;

function ContactsModalView(props: Props) {
    // const { user, onClick, loading, direction, error } = props;

    return <div className={styles.wrapper}>ContactsModalView</div>;
}

export default ContactsModalView;
