import {FETCH_NOTES,CHANGE_NOTE_FIELD_VALUE,COPY_NOTE,DELETE_NOTE,POST_UPDATED_NOTE,ADD_NOTE,CHANGE_NOTE_COLOR,ADD_LABEL_TO_NOTE,DELETE_LABEL_FROM_NOTE} from '../Types'

const initialState = {
    notes: [],
    error: '',
    loading: true
}

const notes = (state=initialState,action) =>{
    switch(action.type){
        case FETCH_NOTES.SUCCESS:
            return {...state,notes:action.payload,loading:false}
        case FETCH_NOTES.FAILED:
            return {...state,error: 'We couldnt get your notes'}
        case CHANGE_NOTE_FIELD_VALUE:
            return {...state,notes:action.notes}
        case COPY_NOTE.SUCCESS:
            return {...state,notes:action.notes}
        case COPY_NOTE.FAILED:
            return {...state,error: 'Failed to copy note'}
        case DELETE_NOTE.SUCCESS:
            return {...state,notes: action.notes}
        case DELETE_NOTE.FAILED:
            return {...state,error: 'Failed to delete note'}
        case POST_UPDATED_NOTE.SUCCESS:
            return state;
        case POST_UPDATED_NOTE.FAILED:
            return {...state,error: 'We have problem with saving your note on server'}
        case ADD_NOTE.SUCCESS:
            return {...state,notes:action.notes}
        case ADD_NOTE.FAILED:
            return {...state,error: 'Something went wrong with adding your note '}
        case CHANGE_NOTE_COLOR.SUCCESS:
            return {...state,notes: action.notes}
        case CHANGE_NOTE_COLOR.FAILED:
            return {...state,error:'Changing color failed'}
        case ADD_LABEL_TO_NOTE.SUCCESS:
            return{...state,notes:action.notes}
        case ADD_LABEL_TO_NOTE.FAILED:
            return {...state,error:'We couldnt add label to your note'}
        case DELETE_LABEL_FROM_NOTE.SUCCESS:
            return{...state,notes:action.notes}
        case DELETE_LABEL_FROM_NOTE.FAILED:
            return {...state,error:'We couldnt delete label from your note'}
        default:
            return state
    }
}

export default notes