import React from 'react';

import { Input, InputTypes } from 'shared/ui';

type Props = {} & InputTypes.SearchInputProps;

function SearchMessages(props: Props) {
    return <Input {...props} size="m" placeholder="Поиск по сообщениям" />;
}

export default SearchMessages;
