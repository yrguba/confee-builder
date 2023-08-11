import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';

type Props = {} & BaseTypes.Statuses;

function ConfirmModalView(props: Props) {
    // const { user, isViewer, deleteFile, selectFile, getScreenshot, getChangeModals } = props;

    return <div className={styles.wrapper}>confirm</div>;
}

export default ConfirmModalView;
