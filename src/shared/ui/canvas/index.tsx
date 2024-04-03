import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Draw from './ui/draw';
import DrawControl from './ui/draw-control';
import useDraw from './useDraw';

function Base(props: {}) {
    return null;
}

type CompoundedComponent = ForwardRefExoticComponent<unknown> & {
    Draw: typeof Draw;
    DrawControl: typeof DrawControl;
    useDraw: typeof useDraw;
};

const Canvas = Base as CompoundedComponent;

Canvas.Draw = Draw;
Canvas.DrawControl = DrawControl;
Canvas.useDraw = useDraw;
export { Types };
export default Canvas;
