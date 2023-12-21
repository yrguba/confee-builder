import React from 'react';

import { UseEasyStateReturnType, UseArrayReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, Collapse, Avatar, AvatarTypes, Box, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { employeeProxy } from '../../../../company';
import contactProxy from '../../../../contact/lib/proxy';
import { ContactProxy, UseContactsTabsAndListsReturnType } from '../../../../contact/model/types';

type Props = {} & BaseTypes.Statuses;

function JoinMeetModalView(props: Props) {
    // const {  } = props;

    return <div>join</div>;
}

export default JoinMeetModalView;
