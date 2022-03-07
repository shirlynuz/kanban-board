import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { UserContext } from './UserContext';
import Select from 'react-select'
import Popup from 'reactjs-popup';

function App() {
  const [boards, setBoards] = useState([]);
  const [boardOptions, setBoardOptions] = useState([]);
  const [currentBoard, setCurrentBoard] = useState();
  const [boardName, setBoardName] = useState();
  const [boardDescription, setBoardDescription] = useState();
  const [showTextField, setShowTextField] = useState(false);
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
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
    setShowTextField(!showTextField)
    handleBoardDefault(currentBoard)
    setOpen(!open)
  }
  
  return (
    <React.Fragment>
      <UserContext.Provider value={{ boards, setBoards, currentBoard, setCurrentBoard }}>
        <div className='navheader'>
          <div className='navleft'>
          <button className='blueBtn' onClick={() => setOpen(!open)}>Create new board</button>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
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
            <h1 className='text-center'>{boards[currentBoard].boardName}</h1>
          }
        </div>
        <Board currentBoard={currentBoard}></Board>
      </UserContext.Provider>

    </React.Fragment>
  );
}

export default App;
