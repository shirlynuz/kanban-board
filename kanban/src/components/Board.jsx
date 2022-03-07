import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../UserContext';
const Board = () => {
    const { currentBoard } = useContext(UserContext)
    const [toDoCards, setToDoCards] = useState([]);
    const [cardDesc, setCardDesc] = useState();
    const [showTextField, setShowTextField] = useState(false);
    function addNewCard(cardType){
        setShowTextField(false);
        if (cardDesc != null){
            var newcard = {"boardNo": currentBoard, "description": cardDesc};
            var currentBoardCards = toDoCards;
            if(cardType == "todo"){
                currentBoardCards.push(newcard);
                console.log(toDoCards);
                setToDoCards(currentBoardCards);
            }
        }
    }
    return ( <React.Fragment>
        {currentBoard != null && 
            <div className='board'>
            <div className="col">
                <h2>To Do List</h2>
                <button className='blueBtn' onClick={()=>setShowTextField(!showTextField)}>Create new card</button><br/>
                {toDoCards.filter(currentCard => currentCard.boardNo == currentBoard).map((card, index)=>(
                    <p key={index}>{card.description}</p>
                ))}
                {showTextField && 
                    <textarea placeholder='Enter a description for this card' onBlur={()=>addNewCard("todo")} onChange={(e) => {
                        setCardDesc(e.target.value);
                    }}></textarea>
                }
            </div>
        </div>
        }
        
    </React.Fragment> );
}
 
export default Board;