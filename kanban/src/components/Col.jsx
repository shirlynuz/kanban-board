import React from 'react';
const Col = ({ children, isOver}) => {
    const className = isOver ? "colHover" : ""
    
    return ( 
        <div className={`${className}`}>
            {children}
        </div>
     );
}
 
export default Col;