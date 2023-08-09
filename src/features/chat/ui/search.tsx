import React from 'react';

import { Input } from '../../../shared/ui';

function SearchChats() {
    const searchInput = Input.use({
        debounceDelay: 1000,
    });

    return <Input {...searchInput} clearIcon prefixIcon="search" placeholder="Поиск" />;
}

export default SearchChats;
