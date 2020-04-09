export const GetAllLabels = state => state.labels.labels
export const GetLabelById = (state,id) => state.labels.labels.find(e=>e._id === id)
export const GetLabelIndex = (state,id) => state.labels.labels.map(e=> e._id).indexOf(id)