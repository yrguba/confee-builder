import React from 'react';

import { DatePicker } from 'shared/ui';

function FilterByPriority() {
    const onChange = (data: any) => {
        console.log(data);
    };

    return <DatePicker title="Приоритет" onChange={onChange} defaultValue="Не задан" />;
}

export default FilterByPriority;
