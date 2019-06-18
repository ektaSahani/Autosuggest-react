import { CITIES } from '../CITIES';
const initialState = {
    filterList: CITIES,
    selectedSuggestion: '',
    showList: false,
    key: '',
    cursor: 0
}

const filterOptions = (value) => {
    let options;
    if (value.length > 0) {
        options = CITIES.filter((city) => {
            return city.label.toLowerCase().includes(value.toLowerCase());
        })
    } else if (value.length === 0) {
        options = CITIES;
    }
    return options;
};


const Reducer = (state = initialState, action) => {
    if (action.type === 'FILTER_LIST') {
        const filterList = filterOptions(action.payload);
        return {
            ...state,
            filterList
        }
    }
    if (action.type === 'SHOW_LIST') {
        return {
            ...state,
            showList: action.payload
        }
    }
    if(action.type === 'UPDATE_CURSOR'){
        return {
            ...state,
            cursor: action.payload
        }
    }

    if(action.type === 'SET_SELECTED_KEY'){
        return {
            ...state,
            key: action.payload
        }
    }
}


export default Reducer;