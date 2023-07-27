import React from 'react';

import { Button, Select, Switch } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { ThemesNames } from '../../model/enums';

type KeyofThemes = keyof typeof ThemesNames;

type Props = {
    theme: KeyofThemes;
    onChange: (arg: KeyofThemes) => void;
};

function SwitchThemesView(props: Props) {
    const { theme, onChange } = props;

    const darkVariants: { id: number; title: KeyofThemes; action: () => void }[] = [{ id: 0, title: ThemesNames.dark, action: () => '' }];

    return (
        <div className={styles.wrapper}>
            <div className={styles.switch}>
                <Switch
                    uncheckedIcon={false}
                    checkedIcon={false}
                    uncheckedHandleIcon={<Icons variants="dark" />}
                    checkedHandleIcon={<Icons variants="light" />}
                    checked={theme === 'light'}
                    onChange={(value) => onChange(!value ? 'dark' : 'light')}
                    onColor="#7C98DE"
                    offHandleColor="#7B57C8"
                    width={46}
                    height={28}
                    handleDiameter={24}
                />
            </div>
            {/dark/.test(theme) && (
                <div className={styles.select}>
                    <Select defaultValue={theme} items={darkVariants} />
                </div>
            )}
        </div>
    );
}

export default SwitchThemesView;
