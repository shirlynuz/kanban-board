import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import uuid from 'react-uuid';

const Board = () => {
    const { currentBoard, setMsg } = useContext(UserContext)
    const [allCards, setAllCards] = useState([]);
    const [maxCards, setMaxCards] = useState(2);

    const [cardDesc, setCardDesc] = useState();
    const [showToDoTextField, setShowToDoTextField] = useState(false);
    const [showProgressTextField, setShowProgressTextField] = useState(false);

    const [showDoneTextField, setShowDoneTextField] = useState(false);
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
                <div className="boardcard">
                    <h2>To Do</h2>
                    {allCards.filter(currentCard => currentCard.boardNo == currentBoard && currentCard.cardType == "todo").map((card, index) => (
                        <div key={index} className='cardtext'>
                            <p>{card.description}</p>
                            <button className='cardtextdelete' onClick={()=>{deleteCard(card.id)}}>x</button>
                        </div>
                    ))}
                    {showToDoTextField &&
                        <React.Fragment>
                            <textarea autoFocus className='cardtextinput' placeholder='Enter a description for this card' onBlur={() => addNewCard("todo")} onChange={(e) => {
                                setCardDesc(e.target.value);
                            }}></textarea><br />
                            <button className='blueBtn' onClick={() => addNewCard("todo")}>Save</button><br />
                        </React.Fragment>
                    }
                    <br />
                    <button className='blueBtn' onClick={() => setShowToDoTextField(!showToDoTextField)}>Create new card</button><br />
                </div>
                <div className="boardcard">
                    <h2>In Progress</h2>

                    {allCards.filter(currentCard => currentCard.boardNo == currentBoard && currentCard.cardType == "progress").map((card, index) => (
                        <div key={index} className='cardtext'>
                            <p>{card.description}</p>
                            <button className='cardtextdelete' onClick={()=>{deleteCard(card.id)}}>x</button>
                        </div>
                    ))}

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
                </div>
                <div className="boardcard">
                    <h2>Done</h2>

                    {allCards.filter(currentCard => currentCard.boardNo == currentBoard && currentCard.cardType == "done").map((card, index) => (
                        <div key={index} className='cardtext'>
                        <p>{card.description}</p>
                        <button className='cardtextdelete' onClick={()=>{deleteCard(card.id)}}>x</button>
                    </div>
                    ))}

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
                </div>
            </div>
        }

    </React.Fragment>);
}

export default Board;