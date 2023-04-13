import React from 'react';

import { DatePicker } from 'shared/ui';

function FilterByCreationDate() {
    const onChange = (data: any) => {
        console.log(data);
    };

    return <DatePicker title="Дата создания" onChange={onChange} defaultValue="Не задан" />;
}

export default FilterByCreationDate;
