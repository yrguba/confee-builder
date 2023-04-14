import React from 'react';

import { ThemesNames } from 'shared/enums';
import { Button, Select, Switch } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';

type KeyofThemes = keyof typeof ThemesNames;

type Props = {
    theme: KeyofThemes;
    onChange: (arg: KeyofThemes) => void;
};

function SwitchThemesView(props: Props) {
    const { theme, onChange } = props;

    const darkVariants: { id: number; title: KeyofThemes }[] = [
        { id: 0, title: ThemesNames.dark_0 },
        { id: 1, title: ThemesNames.dark_1 },
        { id: 2, title: ThemesNames.dark_2 },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.switch}>
                <Switch
                    uncheckedIcon={false}
                    checkedIcon={false}
                    uncheckedHandleIcon={<Icons variants="dark" />}
                    checkedHandleIcon={<Icons variants="light" />}
                    checked={theme === 'light'}
                    onChange={(value) => onChange(!value ? 'dark_0' : 'light')}
                    onColor="#7C98DE"
                    offHandleColor="#7B57C8"
                    width={46}
                    height={28}
                    handleDiameter={24}
                />
            </div>
            {/dark/.test(theme) && (
                <div className={styles.select}>
                    <Select defaultValue={theme} items={darkVariants} onChange={(data: any) => onChange(data.title)} />
                </div>
            )}
        </div>
    );
}

export default SwitchThemesView;
