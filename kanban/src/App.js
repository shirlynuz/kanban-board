import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { UserContext } from './UserContext';
import Select from 'react-select'
import Popup from 'reactjs-popup';
import MessageModal from './components/MessageModel';

function App() {
  const [msg, setMsg] = useState();
  const [boards, setBoards] = useState([]);
  const [boardOptions, setBoardOptions] = useState([]);
  const [currentBoard, setCurrentBoard] = useState();
  const [boardName, setBoardName] = useState();
  const [boardDescription, setBoardDescription] = useState();
  
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
    
    handleBoardDefault(currentBoard)
    setOpenCreate(!openCreate)
  }
  function renameBoard() {
    var oldBoardOptions = boardOptions;
    oldBoardOptions[currentBoard] = { value: currentBoard, label: boardName }
    setBoardOptions(oldBoardOptions);
    var oldBoards = boards;
    oldBoards[currentBoard] = { id: currentBoard, boardName: boardName, boardDescription: boardDescription }
    // var newboard = { id: oldBoards.length, boardName: boardName, boardDescription: boardDescription }
    // setCurrentBoard(newboard.id);
    // oldBoards.push(newboard);
    setBoards(oldBoards);
    
    // handleBoardDefault(currentBoard)
    setOpenRename(!openRename)
  }
  return (
    <React.Fragment>
      <UserContext.Provider value={{ boards, setBoards, currentBoard, setCurrentBoard, msg, setMsg }}>
        <div className='navheader'>
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
            </div>
          {
            boards[currentBoard] &&
            <React.Fragment>
              <h1 className='text-center'>{boards[currentBoard].boardName}</h1>
              <p className='boardDesc'>Description: {boards[currentBoard].boardDescription}</p>
              <button className='blueBtn' onClick={() => setOpenRename(!openRename)}>Rename Board Name and Description</button>
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
        </div>
        <Board currentBoard={currentBoard}></Board>
        {msg && <MessageModal message={msg}></MessageModal>}
      </UserContext.Provider>

    </React.Fragment>
  );
}

export default App;
