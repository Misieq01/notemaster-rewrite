import {CHANGE_SIDEMENU_DISPLAY} from '../Types'

const initialState = {
    sideMenu: false
}

const others = (state=initialState,action) =>{
    switch (action.type) {
        case CHANGE_SIDEMENU_DISPLAY:
            return {...state,sideMenu: !state.sideMenu}
        default:
            return state
    }
}

export default others