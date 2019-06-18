import React from 'react';
import '../Chips/Chips.scss';

const Chips = (props) => {    
    const chips = props.list.map((chip,i) =>
        <span className='chips' key={i}>{chip} <span onClick={()=>props.onChipsDelete(i)}>x</span></span>);

    return (
        <div className='chipsConatiner'>
            {chips}
        </div>
    );
};

export default Chips;