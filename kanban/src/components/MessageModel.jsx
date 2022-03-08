import React, {useState, useEffect, useContext} from 'react';
import Popup from 'reactjs-popup';
import { UserContext } from '../UserContext';

const MessageModal = (props) => {
    const { setMsg } = useContext(UserContext)

  const [open, setOpen] = useState(true);
  const closeModal = () => {
      setOpen(false);
      setMsg(null);
    };

    return ( <React.Fragment>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
            <p className='text-center'>{props.message}</p>
            </Popup>
    </React.Fragment> );
}
 
export default MessageModal;