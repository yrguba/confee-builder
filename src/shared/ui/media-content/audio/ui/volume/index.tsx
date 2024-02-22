import React, { useRef } from 'react';

import { useEasyState } from 'shared/hooks';

import styles from './styles.module.scss';
import { Box, Icons, Slider } from '../../../..';

type Props = {
    volume: number;
    setVolume: (value: number) => void;
    sliderPosition: 'top' | 'bottom';
};

function Volume(props: Props) {
    const { volume, setVolume, sliderPosition } = props;

    const iconRef = useRef(null);
    const visibleVolume = useEasyState(false);

    const clickIcon = () => {
        setVolume(volume ? 0 : 1);
    };

    return (
        <div className={styles.wrapper} onMouseLeave={() => visibleVolume.set(false)} onMouseEnter={() => visibleVolume.set(true)}>
            <div ref={iconRef} onClick={clickIcon}>
                <Icons.Player variant={volume === 0 ? 'mute' : 'unmute'} />
            </div>
            <Box.Animated visible={visibleVolume.value} className={styles.volume} style={{ transform: sliderPosition === 'top' ? 'translateY(-130%)' : '' }}>
                <Slider
                    vertical
                    className={styles.sliderVolume}
                    max={1}
                    step={0.01}
                    defaultValue={volume}
                    handleStyle={{
                        width: 20,
                        height: 20,
                        marginLeft: -8,
                        backgroundColor: 'white',
                        border: '4px solid var(--control-primary)',
                        cursor: 'pointer',
                        opacity: 1,
                    }}
                    onChange={(value) => {
                        if (typeof value === 'number') {
                            setVolume(value);
                        }
                    }}
                />
            </Box.Animated>
        </div>
    );
}

export default Volume;
