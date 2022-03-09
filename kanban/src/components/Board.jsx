import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import uuid from 'react-uuid';
import DropWrapper from './DropWrapper';
import Card from './Card';
import Col from './Col';

const Board = () => {
    const { currentBoard, setMsg, maxCards } = useContext(UserContext)
    const [allCards, setAllCards] = useState([]);
    

    const [cardDesc, setCardDesc] = useState();
    const [showToDoTextField, setShowToDoTextField] = useState(false);
    const [showProgressTextField, setShowProgressTextField] = useState(false);

    const [showDoneTextField, setShowDoneTextField] = useState(false);

    const onDrop = (item, monitor, cardType) =>{
        var existingCardsInCol = allCards.filter(card => card.cardType == cardType && card.boardNo == currentBoard)
        if (existingCardsInCol.length < maxCards){
            var newAllCards = allCards.filter(card => card.id != item.id).concat({...item, cardType})
            setAllCards(newAllCards);
        } else {
            setMsg("Max Cards for that column reached");
        }
      }
    
      const moveItem = (dragIndex, hoverIndex)=>{
        const item = allCards[dragIndex];
        setAllCards(prevState =>{
          const newItems = prevState.filter((i,idx)=>idx!=dragIndex);
          newItems.splice(hoverIndex, 0, item);
          return[...newItems];
        })
      }

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
                setCardDesc(null);
            } else {
                setMsg("Max Cards for that column reached");
            }
        }
    }
    function deleteCard(cardId) {
        var newAllCards = allCards.filter(currentCard => currentCard.id != cardId);
        setAllCards(newAllCards);
    }
    return (<React.Fragment>
        {currentBoard != null &&
            <div className='board'>
                <DropWrapper onDrop={onDrop} cardType="todo">
                    <Col>
                    <h2>To Do</h2>
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
                    <button className='blueBtn' onClick={() => setShowToDoTextField(!showToDoTextField)}>Create new card{showToDoTextField}</button><br />
                    </Col>
                </DropWrapper>
                <DropWrapper onDrop={onDrop} cardType="progress">
                    <Col>
                    <h2>In Progress</h2>
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
                    <button className='blueBtn' onClick={() => setShowProgressTextField(!showProgressTextField)}>Create new card</button><br />
                    </Col>
                </DropWrapper>
                <DropWrapper onDrop={onDrop} cardType="done">
                    <Col>
                    <h2>Done</h2>
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
                    <button className='blueBtn' onClick={() => setShowDoneTextField(!showDoneTextField)}>Create new card</button><br />
                    </Col>
                </DropWrapper>
                
            </div>
        }

    </React.Fragment>);
}

export default Board;