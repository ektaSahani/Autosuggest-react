import React from 'react';
import '../Suggestions/Suggestions.scss'

const Suggestions = (props) => {
    return (
        <div className='suggestion'>
            <ul className= 'suggestion_list'>
                {props.suggestionList && props.suggestionList.map((suggestion, index) => {
                    const selected = props.selectedSuggestionKey === suggestion.value ? 'suggestion_list_item--selected' : '';
                    const active = props.cursor === index ? 'suggestion_list_item--active' : '';
                    return <li key={suggestion.value}  className={`${selected || active} suggestion_list_item `} onClick={() => props.onSuggestionClick(suggestion)}>{suggestion.label}</li>
                })}
            </ul>
        </div>
    )
}

export default Suggestions;