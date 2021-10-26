import React from 'react';

/**
 * Square component
 * @param {string} className init className of component
 * @param {callback} onClick
 * @param {string} value
 * @return {JSX.Element} 
 */
const Square = ({className, onClick, value}) => (
    <button className={className + " square"} onClick={onClick}>
        {value}
    </button>
)

export default Square