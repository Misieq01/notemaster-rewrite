import {CHANGE_SIDEMENU_DISPLAY,UPDATE_SEARCH_VALUE} from '../Types'

export const ChangeDisplaySideMenu = () =>{
    return{
        type: CHANGE_SIDEMENU_DISPLAY,
    }
}

export const updateSearchValue = value =>{
    return{
        type:UPDATE_SEARCH_VALUE,
        value: value.toLowerCase()
    }
}