import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import List from './ui/list';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseDocumentProps> & {
    List: typeof List;
};

const Document = Base as CompoundedComponent;

Document.List = List;

export { Types };
export default Document;
