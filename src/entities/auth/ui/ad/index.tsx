import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';

type Props = {} & BaseTypes.Statuses;

function AuthAdView(props: Props) {
    // const { } = props;

    return <div className={styles.wrapper}>AuthAdView</div>;
}

export default AuthAdView;
