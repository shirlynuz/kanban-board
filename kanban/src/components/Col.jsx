import React from 'react';
const Col = ({ children, isOver}) => {
    const className = isOver ? "colHover" : ""
    
    return ( 
        <div className={`col${className}`}>
            {children}
        </div>
     );
}
 
export default Col;