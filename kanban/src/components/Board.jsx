import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import uuid from 'react-uuid';
import DropWrapper from './DropWrapper';
import Card from './Card';
import Col from './Col';
import { retrieveFromLocalStorage } from '../Utils';

const Board = () => {
    const { currentBoard, setMsg, maxCards } = useContext(UserContext)
    const [allCards, setAllCards] = useState(retrieveFromLocalStorage("allCards"));
    const [cardDesc, setCardDesc] = useState();
    const [showToDoTextField, setShowToDoTextField] = useState(false);
    const [showProgressTextField, setShowProgressTextField] = useState(false);
    const [showDoneTextField, setShowDoneTextField] = useState(false);

    const onDrop = (item, monitor, cardType) =>{
        var existingCardsInCol = allCards.filter(card => card.cardType == cardType && card.boardNo == currentBoard)

        // check if number of cards in the column is < max card allowed in the column. if drag within the same column, return true regardless of the number of cards in the column
        if (existingCardsInCol.length < maxCards || item.cardType == cardType){
            var draggedCardIndex = allCards.findIndex(currentCard => currentCard.id == item.id);
            item.cardType = cardType;
            var tempData = allCards.filter(card => card.id != item.id);
            tempData.splice(draggedCardIndex, 0, item);
            setAllCards(tempData);
            localStorage.setItem('allCards', JSON.stringify(tempData));
        } else {
            setMsg("Max Cards for that column reached");
        }
      }
    
      const moveItem = (dragIndex, hoverIndex, cardType) => {
        
        var draggedCard = allCards.filter(currentCard => currentCard.boardNo == currentBoard && currentCard.cardType == cardType)[dragIndex]
        var hoverCard = allCards.filter(currentCard => currentCard.boardNo == currentBoard && currentCard.cardType == cardType)[hoverIndex]
        var hoverCardIndex = allCards.findIndex(currentCard => currentCard.id == hoverCard.id);
        var newCards = allCards.filter(card => card.id != draggedCard.id);
        newCards.splice(hoverCardIndex, 0, draggedCard);
        setAllCards(newCards);
        localStorage.setItem('allCards', JSON.stringify(newCards));

    };


    function addNewCard(cardType) {
        setShowToDoTextField(false);
        setShowProgressTextField(false);
        setShowDoneTextField(false);
        if (cardDesc != null) {
            var filteredCards = allCards.filter(currentCard => currentCard.boardNo == currentBoard && currentCard.cardType == cardType)
            if (filteredCards.length < maxCards){
                var newcard = {"id": uuid(), "boardNo": currentBoard, "description": cardDesc, "cardType": cardType };
                var currentCards = allCards;
                currentCards.push(newcard);
                setAllCards(currentCards);
                localStorage.setItem('allCards', JSON.stringify(currentCards));
                setCardDesc(null);
            } else {
                setMsg("Max Cards for that column reached");
            }
        }
    }
    function deleteCard(cardId) {
        var newAllCards = allCards.filter(currentCard => currentCard.id != cardId);
        setAllCards(newAllCards);
        localStorage.setItem('allCards', JSON.stringify(newAllCards));
    }

    return (<React.Fragment>
        {currentBoard != null &&
        <DndProvider backend={HTML5Backend}>
            <div className='board'>
                <div className="boardcard">
                    <h2>To Do</h2>    
                    <DropWrapper onDrop={onDrop} cardType="todo">
                    <Col>
                    {allCards.filter(currentCard=>currentCard.boardNo == currentBoard && currentCard.cardType == "todo").map((card,index)=>
                        <Card key={index} card={card} index={index} moveItem={moveItem} cardType={card.cardType} deleteCard={deleteCard}></Card>
                    )}
                    {showToDoTextField &&
                        <React.Fragment>
                            <textarea autoFocus className='cardtextinput' placeholder='Enter a description for this card' onBlur={() => addNewCard("todo")} onChange={(e) => {
                                setCardDesc(e.target.value);
                            }}></textarea><br />
                            <button className='blueBtn' onClick={() => addNewCard("todo")}>Save</button><br />
                        </React.Fragment>
                    }
                    <br />
                    </Col>
                </DropWrapper>
                <button className='blueBtn' onClick={() => setShowToDoTextField(!showToDoTextField)}>Create new card{showToDoTextField}</button><br />
                </div>
                
                <div className="boardcard">
                    <h2>In Progress</h2>
                    <DropWrapper onDrop={onDrop} cardType="progress">
                        <Col>
                        {allCards.filter(currentCard=>currentCard.boardNo == currentBoard && currentCard.cardType == "progress").map((card,index)=>
                            <Card key={index} card={card} index={index} moveItem={moveItem} cardType={card.cardType} deleteCard={deleteCard}></Card>
                        )}
                        {showProgressTextField &&
                            <React.Fragment>
                                <textarea autoFocus className='cardtextinput' placeholder='Enter a description for this card' onBlur={() => addNewCard("progress")} onChange={(e) => {
                                    setCardDesc(e.target.value);
                                }}></textarea><br />
                                <button className='blueBtn' onClick={() => addNewCard("progress")}>Save</button><br />
                            </React.Fragment>
                        }
                        <br />
                        </Col>
                    </DropWrapper>
                    <button className='blueBtn' onClick={() => setShowProgressTextField(!showProgressTextField)}>Create new card</button><br />
                </div>

                <div className="boardcard">
                <h2>Done</h2>
                    <DropWrapper onDrop={onDrop} cardType="done">
                        <Col>
                        {allCards.filter(currentCard=>currentCard.boardNo == currentBoard && currentCard.cardType == "done").map((card,index)=>
                            <Card key={index} card={card} index={index} moveItem={moveItem} cardType={card.cardType} deleteCard={deleteCard}></Card>
                        )}
                        {showDoneTextField &&
                            <React.Fragment>
                                <textarea autoFocus className='cardtextinput' placeholder='Enter a description for this card' onBlur={() => addNewCard("done")} onChange={(e) => {
                                    setCardDesc(e.target.value);
                                }}></textarea><br />
                                <button className='blueBtn' onClick={() => addNewCard("done")}>Save</button><br />
                            </React.Fragment>
                        }
                        <br />
                        </Col>
                    </DropWrapper>
                    <button className='blueBtn' onClick={() => setShowDoneTextField(!showDoneTextField)}>Create new card</button><br />
                </div>
            </div>
            </DndProvider>   
        }
    </React.Fragment>);
}

export default Board;