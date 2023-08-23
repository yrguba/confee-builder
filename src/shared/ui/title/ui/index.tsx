import cn from 'classnames';
import cnBind from 'classnames/bind';
import React, { useRef } from 'react';

import styles from './styles.module.scss';
import { useEasyState, useClickAway } from '../../../hooks';
import Box from '../../box';
import Icons from '../../icons';
import { TitleProps } from '../types';

function Title(props: TitleProps) {
    const { children, isError, textWrap, primary = true, variant, textAlign = 'left', updCallback, animateTrigger, active = false } = props;

    const cx = cnBind.bind(styles);
    const isEdit = useEasyState(false);
    const newValue = useEasyState(children);
    const visibleEditIcon = useEasyState(false);
    const ref = useRef(null);
    const classes = cn(
        cx('wrapper', {
            error: isError,
            [variant]: variant,
            primary,
            textWrap,
            active,
            showInput: isEdit.value,
            edited: updCallback,
        })
    );
    useClickAway(ref, () => {
        isEdit.set(false);
        newValue.set(children);
    });
    const shared = {
        style: { textAlign },
        className: classes,
    };

    const clickIcon = () => {
        isEdit.toggle();
        isEdit.value && updCallback && updCallback(newValue.value);
    };

    const mouseEvents = {
        onMouseEnter: () => visibleEditIcon.set(true),
        onMouseLeave: () => visibleEditIcon.set(false),
    };

    return animateTrigger === undefined ? (
        <div ref={ref} {...shared} {...mouseEvents}>
            {!isEdit.value ? children : <input onChange={(e) => newValue.set(e.target.value)} value={newValue.value} />}
            {updCallback && (
                <Box.Animated animationVariant="autoWidth" className={styles.icon} visible={visibleEditIcon.value} onClick={clickIcon}>
                    <Icons variant={isEdit.value ? 'check-circle' : 'edit'} />
                </Box.Animated>
            )}
        </div>
    ) : (
        <Box.Animated ref={ref} key={String(isEdit.value || animateTrigger)} {...shared} {...mouseEvents} visible>
            {!isEdit.value ? children : <input onChange={(e) => newValue.set(e.target.value)} value={newValue.value} />}
            {updCallback && (
                <Box.Animated animationVariant="autoWidth" className={styles.icon} visible={visibleEditIcon.value} onClick={clickIcon}>
                    <Icons variant={isEdit.value ? 'check-circle' : 'edit'} />
                </Box.Animated>
            )}
        </Box.Animated>
    );
}

export default Title;
