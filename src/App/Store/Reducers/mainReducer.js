import {combineReducers} from 'redux'

import notes from './notesReducer'
import labels from './labelsReducer'
import others from './othersReducer'

export default combineReducers({
  notes,
  labels,
  others
});