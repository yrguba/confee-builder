import React, { Fragment, useState } from 'react';

import { useSelected } from 'shared/hooks';
import { baseTypes } from 'shared/types';
import { Box } from 'shared/ui';

type Props = {
    list: any;
} & baseTypes.Statuses;

function List(props: Props) {
    const { list, loading, error } = props;

    const item = {
        name: 'awdwad',
        lastMsg: 'awdwad',
    };

    const [openTabs, setOpenTabs] = useSelected({ multiple: true });

    const arr: any = [
        { id: 0, name: 'chats', items: [item, item, item, item] },
        { id: 1, name: 'chanel', items: [item, item, item, item] },
        { id: 2, name: 'users', items: [item, item, item, item] },
    ];

    const click = (i: any) => {
        setOpenTabs(i.id);
    };

    return (
        <div>
            {arr.map((i: any) => (
                <Fragment key={i.id}>
                    <div onClick={() => click(i)}>{i.name}</div>
                    <Box.Animated animationVariant="autoHeight" visible={openTabs.includes(i.id)}>
                        {i.items.map((b: any, index: number) => (
                            <div key={index}>{b.name}</div>
                        ))}
                    </Box.Animated>
                </Fragment>
            ))}
        </div>
    );
}

export default List;
