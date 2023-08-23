import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import { ArrowAnimated } from './ui/animated';
import Base from './ui/base';
import Countries from './ui/countries';
import Document from './ui/document';
import Logo from './ui/logo';
import Player from './ui/player';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseIconsProps> & {
    Logo: typeof Logo;
    ArrowAnimated: typeof ArrowAnimated;
    Countries: typeof Countries;
    Player: typeof Player;
    Document: typeof Document;
};

const Icons = Base as CompoundedComponent;

Icons.Countries = Countries;
Icons.Logo = Logo;
Icons.Player = Player;
Icons.Document = Document;
Icons.ArrowAnimated = ArrowAnimated;

export { Types };
export default Icons;
