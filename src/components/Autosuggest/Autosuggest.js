import React from 'react';
import '../Autosuggest/Autosuggest.scss'

const Autosuggest = props => {
  return (
    <input type='text'
      onChange={(e) => { props.onHandleChange(e.target.value) }}
      value={props.selectedSuggestion}
      onFocus={props.onFocus}
      onKeyDown={props.onKeyDown} 
      className='wrapper_input'/>
  );

}

export default Autosuggest;