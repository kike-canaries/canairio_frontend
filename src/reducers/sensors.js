const initialState = [];


export default function sensors(state=initialState, action) {
    let sensorList = state.slice();

    switch (action.type) {

        case 'FETCH_SENSORS':
            return [...state, ...action.sensors];

        case 'ADD_SENSOR':
            return [...state, action.note];

        case 'UPDATE_SENSOR':
            let noteToUpdate = sensorList[action.index]
            noteToUpdate.text = action.note.text;
            sensorList.splice(action.index, 1, noteToUpdate);
            return sensorList;

        case 'DELETE_SENSOR':
            sensorList.splice(action.index, 1);
            return sensorList;

        default:
            return state;
    }
}
