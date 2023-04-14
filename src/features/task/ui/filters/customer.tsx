import React from 'react';

import { DatePicker, Select } from 'shared/ui';

function FilterByCustomer() {
    const onChange = (data: any) => {
        console.log(data);
    };

    const items = [
        { id: 0, title: 'Не задан' },
        { id: 1, title: '111' },
        { id: 2, title: '222' },
        { id: 3, title: '333' },
    ];

    return <DatePicker title="Заказчик" onChange={onChange} defaultValue="Не задан" />;
}

export default FilterByCustomer;
