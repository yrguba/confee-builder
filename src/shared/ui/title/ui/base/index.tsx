import cn from 'classnames';
import cnBind from 'classnames/bind';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import React, { useCallback, useRef } from 'react';

import styles from './styles.module.scss';
import { useEasyState, useClickAway } from '../../../../hooks';
import Box from '../../../box';
import Icons from '../../../icons';
import { BaseTitleProps } from '../../types';

function Title(props: BaseTitleProps) {
    const {
        color = '',
        maxLength,
        children,
        isError,
        textWrap,
        primary = true,
        variant,
        textAlign = 'left',
        updCallback,
        animateTrigger,
        active = false,
        disabled,
        replaceEmoji,
        wordBreak,
    } = props;

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
            [color]: color,
            wordBreak,
        })
    );

    const textClasses = cn(
        cx('text', {
            [variant]: variant,
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

    const clickIconUpdate = (e: any) => {
        e.stopPropagation();

        isEdit.set(false);
        isEdit.value && updCallback && updCallback(newValue.value);
    };

    const mouseEvents = {
        onMouseEnter: () => visibleEditIcon.set(true),
        onMouseLeave: () => visibleEditIcon.set(false),
    };

    const updTextCb = useCallback(() => {
        const content = Array.isArray(children) ? children.join('') : typeof children === 'string' ? children : '';
        return (
            <div className={textClasses}>
                {content?.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)?.map((i, index) => {
                    if (/\p{Emoji_Presentation}/gu.test(i)) {
                        return (
                            <span key={index} className={styles.emojiWrapper}>
                                😁
                                <span className={styles.emoji}>
                                    <Emoji key={index} emojiStyle={EmojiStyle.APPLE} unified={i?.codePointAt(0)?.toString(16) || ''} size={18} />
                                </span>
                            </span>
                        );
                    }
                    return <span key={index}>{i}</span>;
                })}
            </div>
        );
    }, [children]);

    const text = replaceEmoji ? updTextCb() : children;

    return animateTrigger === undefined ? (
        <div ref={ref} {...shared} {...mouseEvents} onClick={() => isEdit.set(!!updCallback)}>
            {!isEdit.value || !updCallback ? (
                text
            ) : (
                <div className={styles.input}>
                    <input autoFocus onChange={(e) => newValue.set(e.target.value)} value={newValue.value} />
                    <Box.Animated animationVariant="autoWidth" className={styles.icon} visible={visibleEditIcon.value} onClick={(e) => clickIconUpdate(e)}>
                        <Icons variant={isEdit.value ? 'check-circle' : 'edit'} />
                    </Box.Animated>
                </div>
            )}
        </div>
    ) : (
        <Box.Animated
            ref={ref}
            key={String(isEdit.value || animateTrigger)}
            {...shared}
            {...mouseEvents}
            visible
            onClick={() => (updCallback ? isEdit.set(true) : '')}
        >
            {!isEdit.value || !updCallback ? (
                text
            ) : (
                <div className={styles.input}>
                    <input maxLength={maxLength} onChange={(e) => newValue.set(e.target.value)} value={newValue.value} />
                    <Box.Animated animationVariant="autoWidth" className={styles.icon} visible={visibleEditIcon.value} onClick={(e) => clickIconUpdate(e)}>
                        <Icons variant={isEdit.value ? 'check-circle' : 'edit'} />
                    </Box.Animated>
                </div>
            )}
        </Box.Animated>
    );
}

export default Title;
