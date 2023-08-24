import React from 'react';
import ReactSlider from 'react-slider';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Box from '../../../box';
import Glare from '../../../loading-indicator/ui/glare';
import { BaseSliderProps } from '../../types';

function BaseSlider(props: BaseSliderProps) {
    const { ...other } = props;

    const classes = useStyles(styles, 'wrapper', {});

    return (
        <ReactSlider
            className={styles.wrapper}
            thumbClassName={styles.thumb}
            trackClassName={styles.track}
            onBeforeChange={(value, index) => console.log(`onBeforeChange: ${JSON.stringify({ value, index })}`)}
            onChange={(value, index) => console.log(`onChange: ${JSON.stringify({ value, index })}`)}
            onAfterChange={(value, index) => console.log(`onAfterChange: ${JSON.stringify({ value, index })}`)}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
    );
}

export default BaseSlider;
