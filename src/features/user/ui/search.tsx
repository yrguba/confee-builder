import React from 'react';

import { Input } from 'shared/ui';

type Props = {
    placeholder?: string;
};

function SearchUsers(props: Props) {
    const { placeholder } = props;

    return <Input placeholder={placeholder} size="m" />;
}

export default SearchUsers;
