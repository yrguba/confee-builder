import React from 'react';

import { DatePicker } from 'shared/ui';

function FilterByDeadLine() {
    const onChange = (data: any) => {
        console.log(data);
    };

    return <DatePicker title="Срок выполнения" onChange={onChange} defaultValue="Не задан" />;
}

export default FilterByDeadLine;
