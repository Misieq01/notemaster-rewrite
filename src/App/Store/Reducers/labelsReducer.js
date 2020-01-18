import {FETCH_LABELS,ADD_LABEL,UPDATE_LABEL,DELETE_LABEL} from '../Types'

const initialState = {
    labels: [],
    error:'',
    loading: true
}

const labels = (state=initialState,action) =>{
    switch (action.type) {
        case FETCH_LABELS.SUCCESS:
            return {...state,labels: action.labels, loading: false}
        case FETCH_LABELS.FAILED:
            return {...state,error: 'Loading labels failed'}
        case ADD_LABEL.SUCCESS:
            return {...state,labels: action.labels}
        case ADD_LABEL.FAILED:
            return {...state,error: 'Failed to add label'}
        case UPDATE_LABEL.SUCCESS:
            return {...state,labels: action.labels}
        case UPDATE_LABEL.FAILED:
            return {...state,error: 'Failed to update label'}
        case DELETE_LABEL.SUCCESS:
            return {...state,labels: action.labels}
        case DELETE_LABEL.FAILED:
            return {...state,error: 'Failed to delete label'}
        default:
            return state;
    }
}

export default labels