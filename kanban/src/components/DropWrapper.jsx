import React from 'react';
import { useDrop } from 'react-dnd';
import ITEM_TYPE from './Types';
const DropWrapper = ({onDrop, children, cardType}) => {
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item, monitor) => {
            onDrop(item, monitor, cardType);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });
    return ( 
        <div ref={drop}>
            {React.cloneElement(children, {isOver})}
            </div>
     );
}
 
export default DropWrapper;