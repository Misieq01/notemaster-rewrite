import {FETCH_LABELS,ADD_LABEL,UPDATE_LABEL,DELETE_LABEL} from '../Types'

const initialState = {
    labels: [],
    error:'',
    loading: true
}

const labels = (state=initialState,action) =>{
    const labels = [...state.labels]
    switch (action.type) {
        case FETCH_LABELS.SUCCESS:
            return {...state,labels: action.labels, loading: false}
        case FETCH_LABELS.FAILED:
            return {...state,error: 'Loading labels failed'}
        case ADD_LABEL.SUCCESS:
            labels.push(action.label)
            return {...state,labels: labels}
        case ADD_LABEL.FAILED:
            return {...state,error: 'Failed to add label'}
        case UPDATE_LABEL.SUCCESS:
            labels[labels.findIndex(e=>e._id === action.label._id)] = action.label
            return {...state,labels: labels}
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