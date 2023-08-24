import Slider from 'rc-slider';
import React from 'react';

import 'rc-slider/assets/index.css';

import { BaseSliderProps } from '../../types';

function BaseSlider(props: BaseSliderProps) {
    const { visibleDot, ...other } = props;

    return (
        <Slider
            railStyle={{
                backgroundColor: 'var(--text-primary)',
            }}
            trackStyle={{
                backgroundColor: 'var(--text-action)',
            }}
            handleStyle={{
                opacity: visibleDot ? 1 : 0,
                backgroundColor: 'var(--text-action)',
                border: 'none',
            }}
            {...other}
        />
    );
}

export default BaseSlider;
