import React from 'react';

import { useRouter } from 'shared/hooks';

import styles from './styles.module.scss';

function Profile() {
    const { params } = useRouter();

    return <div className={styles.wrapper}>Profile</div>;
}

export default Profile;
