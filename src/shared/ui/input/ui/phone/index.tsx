import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import countries from './countries';
import styles from './styles.module.scss';
import { useEasyState } from '../../../../hooks';
import Box from '../../../box';
import { Dropdown, Icons } from '../../../index';
import { PhoneInputProps } from '../../model/types';

const InputPhone = forwardRef<HTMLInputElement, PhoneInputProps>((props, ref) => {
    const { value, onChange, callbackPhone, onFocus: inputFocus, errorTitle } = props;

    const [activeItem, setActiveItem] = useState(0);
    const [openDropdown, setSetOpenDropdown] = useState(false);
    const [focused, setFocused] = React.useState(false);
    const inputRef = useRef<any>(null);
    const visibleDropdown = useEasyState(false);
    const click = (payload: { code: string; id: number }) => {
        setActiveItem(payload.id);
    };
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    useEffect(() => {
        if (typeof value === 'string' || typeof value === 'number') {
            callbackPhone && callbackPhone(countries[activeItem].payload.code + value);
        }
    }, [value]);

    useEffect(() => {
        setFocused(openDropdown);
    }, [openDropdown]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.row} onFocus={onFocus} onBlur={onBlur}>
                <div className={styles.code}>
                    <Dropdown
                        visible={visibleDropdown.value}
                        openCloseTrigger={setSetOpenDropdown}
                        position="bottom-center"
                        content={
                            <div className={styles.contentDropdown}>
                                <div className={styles.body}>
                                    {countries.map((country) => (
                                        <div className={styles.item} key={country.id} onClick={() => click(country.payload)}>
                                            <div className={styles.left}>
                                                <Icons.Countries variant={country.icon} />
                                                <div>{country.title}</div>
                                            </div>
                                            <Box.Animated visible={activeItem === country.id}>
                                                <Icons variant="check" />
                                            </Box.Animated>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    />
                    <div className={`${styles.inputCode} ${focused ? styles.input_focused : ''}`}>
                        {countries.map(
                            (i) =>
                                i.id === activeItem && (
                                    <div className={styles.inputCode__body} key={i.id}>
                                        <div className={styles.inputCode__body_left}>
                                            <Icons.Countries variant={i.icon} />
                                            {i.payload.code}
                                        </div>

                                        <Icons.ArrowAnimated activeAnimate={openDropdown} initialDeg={0} animateDeg={90} variant="rotate" />
                                    </div>
                                )
                        )}
                    </div>
                </div>
                <div className={`${styles.input} ${focused ? styles.input_focused : ''}`}>
                    <input
                        type="number"
                        onFocus={inputFocus}
                        ref={mergeRefs([inputRef, ref])}
                        maxLength={10}
                        placeholder="(999) 000-00-00"
                        value={value}
                        onChange={(e) => {
                            onChange && String(e.target.value).length < 11 ? onChange(e) : '';
                        }}
                    />
                </div>
            </div>
            <Box.Animated animationVariant="autoHeight" visible={!!errorTitle} className={styles.errorTitle}>
                {errorTitle}
            </Box.Animated>
        </div>
    );
});

export default InputPhone;
