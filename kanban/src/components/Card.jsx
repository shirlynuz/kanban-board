import React, { useState, useRef } from 'react';
import ITEM_TYPE from "./Types";
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
const Card = ({ card, index, moveItem, deleteCard, editCard }) => {
    const [openRename, setOpenRename] = useState(false);
    const closeModal = () => {
        setOpenRename(false);
      };
    const [cardDesc, setCardDesc] = useState(card.description);

    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item, monitor) {
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
    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPE, ...card, index },
        type: ITEM_TYPE,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })
    drag(drop(ref));
    return (
        <React.Fragment>
            <div ref={ref} className='cardtext' onClick={() => setOpenRename(!openRename)}>
                <p>{card.description}</p>
                <button className='cardtextdelete' onClick={() => { deleteCard(card.id) }}><FontAwesomeIcon icon={faTrash} /></button>
            </div>

            <Popup open={openRename} closeOnDocumentClick onClose={closeModal}>
                <a className="close" onClick={closeModal}>
                    &times;
                </a>
                <h1 className='text-center'>Edit Card Description</h1>
                <label>Card Description: </label><input name="cardDescription" onChange={(e) => { setCardDesc(e.target.value); }} defaultValue={card.description}></input><br /><br/>
                <button className='blueBtn blueBtnNoMargin' onClick={() => {editCard(card, cardDesc); closeModal()}}>Save</button>
            </Popup></React.Fragment>


    );
}

export default Card;