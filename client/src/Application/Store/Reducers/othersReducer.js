import {CHANGE_SIDEMENU_DISPLAY,UPDATE_SEARCH_VALUE} from '../Types'

const initialState = {
    sideMenu: false,
    searchValue: ''
}

const others = (state=initialState,action) =>{
    switch (action.type) {
        case CHANGE_SIDEMENU_DISPLAY:
            return {...state,sideMenu: !state.sideMenu}
        case UPDATE_SEARCH_VALUE:
            return {...state,searchValue: action.value}
        default:
            return state
    }
}

export default others