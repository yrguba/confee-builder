import moment from 'moment';
import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Icons, Input, Title, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding } from '../../../../shared/lib';
import { Viewer } from '../../model/types';

type Props = {
    user: Viewer | BaseTypes.Empty;
    selectFile: () => void;
    deleteFile: () => void;
    getScreenshot: (img: string) => void;
    back: () => void;
    inputs: {
        firstName: InputTypes.UseReturnedType;
        lastName: InputTypes.UseReturnedType;
        birth: InputTypes.UseReturnedType;
        nickname: InputTypes.UseReturnedType;
        about: InputTypes.UseReturnedType;
    };
} & BaseTypes.Statuses;

function SettingsProfileView(props: Props) {
    const { inputs, back } = props;
    return (
        <div className={styles.wrapper}>
            <div className={styles.back} onClick={back}>
                <Icons variant="arrow-left" />
                <Title active variant="H3M">
                    Вернуться к личной информации
                </Title>
            </div>

            <div className={styles.item}>
                <Title variant="H2">Введите имя и фамилию</Title>
                <Title primary={false} textWrap variant="H3M">
                    Они будут отображаться другим пользователям приложения
                </Title>
                <Input placeholder="Имя" {...inputs.firstName} clearIcon />
                <Input placeholder="Фамилия" {...inputs.lastName} clearIcon />
            </div>
            <div className={styles.item}>
                <Title variant="H2">Расскажите немного о себе</Title>
                <Title primary={false} textWrap variant="H3M">
                    Эту информацию будут видеть другие пользователи
                </Title>
                <Input placeholder="О себе" {...inputs.about} clearIcon maxLength={100} />
                <Title variant="caption1M">{`Осталось ${100 - inputs.about.value.length} ${getEnding(100 - inputs.about.value.length, [
                    'символ',
                    'символа',
                    'символов',
                ])}`}</Title>
            </div>
            <div className={styles.item}>
                <Title textWrap variant="H2">
                    Введите никнейм
                </Title>
                <Title textWrap primary={false} variant="H3M">
                    Уникальный идентификатор, по которому вас можно найти
                </Title>
                <Input placeholder="nickname" {...inputs.nickname} prefix="@" clearIcon size="m" />
                <Title primary={false} textWrap variant="caption1M">
                    Можно использовать символы a-z, 0-9 и подчёркивания. Минимальная длина − 5 символов, максимальная − 20.
                </Title>
            </div>
            <div className={styles.item}>
                <Title textWrap variant="H2">
                    Укажите дату рождения
                </Title>
                <Input
                    onReset={(e) => {
                        console.log('wed');
                    }}
                    min="1900-01-01"
                    max={moment().format('YYYY-MM-DD')}
                    placeholder="ДД.ММ.ГГГГ"
                    type="date"
                    {...inputs.birth}
                    size="m"
                />
            </div>
        </div>
    );
}

export default SettingsProfileView;
