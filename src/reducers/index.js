import { CITIES } from '../CITIES';

const initialState = {
    filterList: CITIES,
    selectedSuggestion: '',
    showList: false,
    key: '',
    cursor: 0,
    list:[]
}
const list =[];

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
//Confusion spotted 
const onChipsDelete=(value)=>
  {
     const updatedList = list.filter((chip)=>chip!==value);
     return{updatedList};
  }

const onChipsAdd=(selectedSuggestion)=>{
        const  list = [...list, selectedSuggestion ];
        return {list};
}

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

    if(action.type === 'DELETE_CHIPS'){
        const updatedList = onChipsDelete(action.payload)
        return{
            ...state,
            updatedList
        }
    }

    if(action.type === 'ADD_CHIPS'){
        const list = onChipsAdd(action.payload)
        return{
            ...state,
            list
        }
    }
}


export default Reducer;