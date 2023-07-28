import React from 'react';

import { AppService } from 'entities/app';
import { BaseTypes } from 'shared/types';
import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { Viewer } from '../../model/types';

type Props = {
    viewer: Viewer | BaseTypes.Empty;
    onClick?: () => void;
};

function ViewerCardView(props: Props) {
    const { viewer, onClick } = props;

    return (
        <div className={styles.wrapper} onClick={onClick}>
            <div className={styles.name}>{viewer?.first_name}</div>
            <div className={styles.name}>
                <Avatar img={viewer?.avatar.path} withUrl name={viewer?.first_name} size={31} />
            </div>
        </div>
    );
}

export default ViewerCardView;
