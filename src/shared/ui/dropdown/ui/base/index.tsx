import React, { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { useClickAway, useReverseTimer, useStyles, useWindowMouseClick } from 'shared/hooks';
import { Box } from 'shared/ui/index';

import styles from './styles.module.scss';
import { BaseDropdownProps } from '../../types';

function Dropdown(props: BaseDropdownProps) {
    const {
        visible,
        openCloseTrigger,
        content,

        position = 'left-bottom',
        onClick,
        animationVariant = 'visibleHidden',
        disabled,
        clickAway,
    } = props;

    const elementRef = useRef<HTMLDivElement>(null);
    const clickCoord = useWindowMouseClick();
    useClickAway(elementRef, () => {
        clickAway && clickAway();
    });

    const classes = useStyles(styles, 'body', {
        [`position-${position}`]: position,
    });

    return (
        <Box.Animated
            animationVariant={animationVariant}
            style={{ top: clickCoord.y, left: clickCoord.x }}
            className={classes}
            visible={visible}
            presence
            onClick={(e) => {
                onClick && onClick();
                e.stopPropagation();
            }}
        >
            {content}
        </Box.Animated>
    );
}

export default Dropdown;
