import React, { forwardRef, ReactNode, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { useDebounce } from '../../../../hooks';
import Box from '../../../box';
import { Dropdown, Icons } from '../../../index';
import { BaseInputProps, CountriesInputProps } from '../../model/types';

const InputCountries = forwardRef<HTMLInputElement, CountriesInputProps>((props, ref) => {
    const { getCode } = props;

    const inputRef = useRef<any>(null);

    const [activeItem, setActiveItem] = useState(0);
    const [openDropdown, setSetOpenDropdown] = useState(false);

    const click = (code: string, id: number) => {
        getCode(code);
        setActiveItem(id);
    };

    const countries: { id: number; icon: any; title: string; code: string; action: () => void }[] = [
        { id: 0, icon: 'russia', title: 'Россия +7', code: '+7', action: () => click('+7', 0) },
        { id: 1, icon: 'armenia', title: 'Армения +374', code: '+374', action: () => click('+374', 1) },
        { id: 2, icon: 'belarus', title: 'Беларусь +375', code: '+375', action: () => click('+375', 2) },
        { id: 3, icon: 'kazakhstan', title: 'Казахстан +7', code: '+7', action: () => click('+7', 3) },
        { id: 4, icon: 'kyrgyzstan', title: 'Киргизия +9', code: '+9', action: () => click('+9', 4) },
        { id: 5, icon: 'uzbekistan', title: 'uzbekistan +998', code: '+998', action: () => click('+ 998', 5) },
    ];

    return (
        <div className={styles.wrapper}>
            <Dropdown
                openCloseTrigger={setSetOpenDropdown}
                top={70}
                left={186}
                closeAfterClick
                position="bottom-center"
                content={
                    <div className={styles.contentDropdown}>
                        <div className={styles.body}>
                            {countries.map((country) => (
                                <div className={styles.item} key={country.id} onClick={country.action}>
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
            >
                <div className={styles.input}>
                    {countries.map(
                        (i) =>
                            i.id === activeItem && (
                                <div className={styles.input__body} key={i.id}>
                                    <div className={styles.input__body_left}>
                                        <Icons.Countries variant={i.icon} />
                                        {i.code}
                                    </div>

                                    <Icons.ArrowAnimated activeAnimate={openDropdown} initialDeg={90} animateDeg={270} variant="rotate" />
                                </div>
                            )
                    )}
                </div>
            </Dropdown>
        </div>
    );
});

export default InputCountries;
