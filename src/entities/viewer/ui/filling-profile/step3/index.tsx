import React from 'react';

import { ViewerTypes } from 'entities/viewer';
import { BaseTypes } from 'shared/types';
import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    viewer: ViewerTypes.Viewer | BaseTypes.Empty;
    onClick?: () => void;
};

function FillingProfileStep3View(props: Props) {
    const { viewer, onClick } = props;

    return (
        <div className={styles.wrapper} onClick={onClick}>
            step3
        </div>
    );
}

export default FillingProfileStep3View;
