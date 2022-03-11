
import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import { UserContext } from './UserContext';
import Select from 'react-select'
import Popup from 'reactjs-popup';
import MessageModal from './components/MessageModel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { retrieveFromLocalStorage } from './Utils';

function App() {
  const [msg, setMsg] = useState();
  const [boards, setBoards] = useState(retrieveFromLocalStorage("boards"));
  const [boardOptions, setBoardOptions] = useState(retrieveFromLocalStorage("boardOptions"));
  const [currentBoard, setCurrentBoard] = useState();
  const [boardName, setBoardName] = useState();
  const [boardDescription, setBoardDescription] = useState();
  const [maxCards, setMaxCards] = useState(5);
  const [editMaxCard, setEditMaxCard] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openRename, setOpenRename] = useState(false);

  const closeModal = () => {
    setOpenCreate(false);
    setOpenRename(false);
  };

  function handleBoardDefault(value) {
    return boardOptions[value];
  }
  function handleBoardSelect(value) {
    setCurrentBoard(value.value);
    setBoardName(boards[value.value].boardName);
    setBoardDescription(boards[value.value].boardDescription);
}
  function createNewBoard() {
    var oldBoardOptions = boardOptions;
    oldBoardOptions.push({ value: oldBoardOptions.length, label: boardName });
    setBoardOptions(oldBoardOptions);
    var oldBoards = boards;
    var newboard = { id: oldBoards.length, boardName: boardName, boardDescription: boardDescription }
    setCurrentBoard(newboard.id);
    oldBoards.push(newboard);
    setBoards(oldBoards);
    localStorage.setItem('boards', JSON.stringify(oldBoards));
    localStorage.setItem('boardOptions', JSON.stringify(oldBoardOptions));

    handleBoardDefault(currentBoard)
    setOpenCreate(!openCreate)
  }
  function renameBoard() {
    var oldBoardOptions = boardOptions;
    oldBoardOptions[currentBoard] = { value: currentBoard, label: boardName }
    setBoardOptions(oldBoardOptions);
    var oldBoards = boards;
    oldBoards[currentBoard] = { id: currentBoard, boardName: boardName, boardDescription: boardDescription }
    setBoards(oldBoards);
    localStorage.setItem('boards', JSON.stringify(oldBoards));
    localStorage.setItem('boardOptions', JSON.stringify(oldBoardOptions));
    setOpenRename(!openRename)
  }
  useEffect(() => {
    if (boardOptions.length > 0){
      setCurrentBoard(boardOptions[0].value);
      setBoardName(boards[boardOptions[0].value].boardName);
      setBoardDescription(boards[boardOptions[0].value].boardDescription);
    }
  },[boardOptions]);
  return (
    
      <UserContext.Provider value={{ boards, setBoards, currentBoard, setCurrentBoard, msg, setMsg, maxCards, setMaxCards }}>
        <div className='navheader'>
        {
            boards[currentBoard] &&
            <React.Fragment>
              <button className='blueBtn' onClick={() => setOpenRename(!openRename)}><FontAwesomeIcon icon={faEdit} /> Board</button>
              <h1 className='boardTitle'>{boards[currentBoard].boardName}</h1>
              
            </React.Fragment>
              
              
        }
          <div className='navleft'>
          <button className='blueBtn' onClick={() => setOpenCreate(!openCreate)}>Create new board</button>
          <Popup open={openCreate} closeOnDocumentClick onClose={closeModal}>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
            <h1 className='text-center'>Create New Board</h1>
            <label>Board Name: </label><input name="boardName" placeholder='Board Name' onChange={(e) => { setBoardName(e.target.value); }}></input><br /><br/>
            <label>Board Description: </label><input name="boardDescription" placeholder='Board Description' onChange={(e) => { setBoardDescription(e.target.value); }}></input><br />
            <button className='blueBtn' onClick={() => createNewBoard()}>Create board</button>          
            </Popup>
          <Select options={boardOptions} placeholder="Select Board" value={handleBoardDefault(currentBoard)} onChange={handleBoardSelect}/>
          {!editMaxCard && <React.Fragment>
            <p className='boardDesc'>Max Card: {maxCards}</p>
            <button className='blueBtn' onClick={()=>setEditMaxCard(!editMaxCard)}><FontAwesomeIcon icon={faEdit} /></button>
            </React.Fragment> }
          {editMaxCard && <React.Fragment>
            <label className='boardDesc'>Max Card: </label><input type="number" name="maxCard" placeholder='maxCard' defaultValue={maxCards} onChange={(e) => { setMaxCards(e.target.value); }}></input><button className='blueBtn' onClick={()=>setEditMaxCard(!editMaxCard)}>Save</button>
          </React.Fragment>}
          
            </div>
          
        </div>
        {
            boards[currentBoard] &&
            <React.Fragment>
              <p className='boardDesc'>Description: {boards[currentBoard].boardDescription}</p>
              <Popup open={openRename} closeOnDocumentClick onClose={closeModal}>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
            <h1 className='text-center'>Rename Current Board</h1>
            <label>Board Name: </label><input name="boardName" placeholder='Board Name' onChange={(e) => { setBoardName(e.target.value); }} defaultValue={boards[currentBoard].boardName}></input><br /><br/>
            <label>Board Description: </label><input name="boardDescription" placeholder='Board Description' onChange={(e) => { setBoardDescription(e.target.value); }} defaultValue={boards[currentBoard].boardDescription}></input><br />
            <button className='blueBtn' onClick={() => renameBoard()}>Rename board</button>
            </Popup>
            </React.Fragment>
          }
        <Board currentBoard={currentBoard}></Board>          

        {msg && <MessageModal message={msg}></MessageModal>}
      </UserContext.Provider>

  );
}

export default App;
