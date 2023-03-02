import React, { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesNames } from 'shared/enums';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

function NestedPagesTabsWidget() {
    const navigate = useNavigate();

    const [pressedBtn, setPressedBtn] = useState<number | null>(null);

    const [isPending, startTransition] = useTransition();

    const buttons = [
        { id: 0, text: 'Информация', path: RoutesNames.main.info },
        { id: 1, text: 'Сообщения чата', path: RoutesNames.main.chat_messages },
        { id: 2, text: 'Избранное', path: RoutesNames.main.favorites },
        { id: 3, text: 'Календарь', path: RoutesNames.main.calendar },
        { id: 4, text: 'Задачи', path: RoutesNames.main.tasks },
    ];

    const buttonClick = (id: number, path: string) => {
        setPressedBtn(id);
        startTransition(() => navigate(path));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.buttons}>
                {buttons.map((btn) => (
                    <Button isDisabled={isPending} isLoading={isPending && pressedBtn === btn.id} key={btn.id} onClick={() => buttonClick(btn.id, btn.path)}>
                        {btn.text}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default NestedPagesTabsWidget;
