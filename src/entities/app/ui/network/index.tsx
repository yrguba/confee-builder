import React from 'react';

import { useStyles } from 'shared/hooks';
import { Box, Dropdown, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { NetworkState } from '../../model/types';

type Props = {
    networkState: NetworkState;
};

function NetworkView(props: Props) {
    const { networkState } = props;

    return (
        <Box.Animated visible={!networkState.online} className={styles.wrapper}>
            {/* <Dropdown visible content={<div>wd</div>} trigger="click" /> */}
            <Icons.NetworkIndicator speed={networkState.downlink || 0} size={50} online={networkState.online} />
        </Box.Animated>
    );
}

export default NetworkView;
