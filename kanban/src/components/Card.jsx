import React, { useRef } from 'react';
import ITEM_TYPE from "./Types";
import {useDrag, useDrop} from "react-dnd";
const Card = ({card, index, moveItem, deleteCard}) => {
    const ref = useRef(null);
    const [,drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor){
            if (!ref.current){
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index; 
            if (dragIndex == hoverIndex){
                return;
            }
            const hoverRect = ref.current.getBoundClientRect();
            const hoverMidddleY = (hoverRect.bottom - hoverRect.top)/2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoverRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMidddleY){
                return
            }
            if (dragIndex > hoverIndex && hoverClientY < hoverMidddleY){
                return
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })
    const [{isDragging}, drag] = useDrag({
        item: {type: ITEM_TYPE, ...card, index},
        type: ITEM_TYPE,
        collect: monitor =>({
            isDragging: monitor.isDragging()
        })
    })
    drag(drop(ref));
    return ( 
        <div ref={ref} className='cardtext'>
                            <p>{card.description}</p>
                            <button className='cardtextdelete' onClick={()=>{deleteCard(card.id)}}>x</button>
                        </div>
     );
}
 
export default Card;