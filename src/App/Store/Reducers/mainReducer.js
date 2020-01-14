import {combineReducers} from 'redux'

import notes from './notesReducer'
import labels from './labelsReducer'

export default combineReducers({
  notes,
  labels
});