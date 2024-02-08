import Slider from 'rc-slider';
import React from 'react';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';
import { useEasyState } from '../../../../hooks';
import { BaseSliderProps } from '../../types';

function BaseSlider(props: BaseSliderProps) {
    const { borderRadius = 22, ...other } = props;

    const focus = useEasyState(false);

    return (
        <div className={styles.wrapper} onMouseEnter={() => focus.set(true)} onMouseLeave={() => focus.set(false)}>
            <Slider
                railStyle={{
                    backgroundColor: 'var(--control-secondary)',
                    borderRadius,
                }}
                trackStyle={{
                    backgroundColor: 'var(--text-action)',
                    borderRadius,
                }}
                handleStyle={{
                    transition: 'opacity .5s',
                    opacity: focus.value ? 1 : 0,
                    backgroundColor: 'var(--text-action)',
                    border: 'none',
                }}
                {...other}
            />
        </div>
    );
}

export default BaseSlider;
