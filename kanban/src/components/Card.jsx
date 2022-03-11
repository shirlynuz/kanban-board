import React, { useRef } from 'react';
import ITEM_TYPE from "./Types";
import {useDrag, useDrop} from "react-dnd";
const Card = ({card, index, moveItem, deleteCard}) => {
    const ref = useRef(null);
    const [,drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor){
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // if hover over same card, then don't do anything
            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            // if want to move down but mouse position is less than half of the hovered card, don't do anything
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // if want to move up but mouse position is more than half of the hovered card, don't do anything
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex, item.cardType);
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