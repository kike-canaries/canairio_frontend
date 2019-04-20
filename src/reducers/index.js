import { combineReducers } from 'redux';
import sensors from "./sensors";
import auth from "./auth";


const sensorApp = combineReducers({
    sensors, auth,
})

export default sensorApp;
