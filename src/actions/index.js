export const filterList = (value) => {
    return {
        type: 'FILTER_LIST',
        payload: value
    };
};

export const showList = (value) => {
    return {
        type:'SHOW_LIST',
        payload:value
    }
}

export const updateCursor = (value) => {
    return{
        type:'UPDATE_CURSOR',
        payload:value
    }
}

export const setSelectedKey = (value) => {
    return{
        type:'SET_SELECTED_KEY',
        payload:value
    }
}

export const deleteChips = (value)=>{
    return{
        type:'DELETE_CHIPS',
        payload:value
    }
}

