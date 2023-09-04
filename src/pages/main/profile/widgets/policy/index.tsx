import React from 'react';

import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Policy() {
    const items = [
        {
            id: 0,
            title: 'Политика конфиденциальности Confee',
            subtitle:
                'Настоящая политика конфиденциальности описывает, как мы собираем, используем и защищаем информацию, которая может быть связана с вами или другими пользователями нашего сайта или наших услуг.',
        },
        {
            id: 1,
            title: 'Сбор и использование информации',
            subtitle:
                'Мы собираем информацию о вас в тех случаях, когда вы регистрируетесь на нашем сайте, подписываетесь на нашу рассылку, оставляете комментарии или связываетесь с нами по электронной почте. Мы можем использовать эту информацию для связи с вами, предоставления наших услуг, анализа данных и улучшения функционирования нашего сайта.',
            more: 'Мы также можем собирать информацию о вашем использовании нашего сайта с помощью файлов cookie и подобных технологий. Эта информация может включать ваше местоположение, тип браузера, устройства, а также данные о ваших взаимодействиях с нашим сайтом.',
        },
    ];

    return (
        <Box.Animated visible className={styles.wrapper}>
            {items.map((i) => (
                <div key={i.id} className={styles.item}>
                    <Title textWrap variant="H3B">
                        {i.title}
                    </Title>
                    <Title textWrap primary={false} variant="H3M">
                        {i.subtitle}
                    </Title>

                    {i.more && (
                        <Title textWrap primary={false} variant="H3M">
                            {i.subtitle}
                        </Title>
                    )}
                </div>
            ))}
        </Box.Animated>
    );
}

export default Policy;
