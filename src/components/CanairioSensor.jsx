import React, { Component } from 'react';
import {connect} from 'react-redux';

import {sensors, auth} from "../actions";



class CanairioSensor extends Component {

    componentDidMount() {
        this.props.fetchSensors();
    }

    state = {
        text: "",
        updateSensorId: null,
    }

    resetForm = () => {
        this.setState({text: "", updateSensorId: null});
    }

    selectForEdit = (id) => {
        let sensor = this.props.sensors[id];
        this.setState({text: sensor.text, updateSensorId: id});
    }

    submitsensor = (e) => {
        e.preventDefault();
        if (this.state.updateSensorId === null) {
            this.props.addSensor(this.state.text).then(this.resetForm)
        } else {
            this.props.updateSensor(this.state.updateSensorId, this.state.text).then(this.resetForm);
        }
    }

    render() {
        return (
            <div>
                <h2>Welcome to CanairioSensor!</h2>
                <hr />
                <div style={{textAlign: "right"}}>
                    {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
                </div>

                <h3>Add new sensor</h3>
                <form onSubmit={this.submitsensor}>
                    <input
                        value={this.state.text}
                        placeholder="Enter sensor here..."
                        onChange={(e) => this.setState({text: e.target.value})}
                        required />
                    <button onClick={this.resetForm}>Reset</button>
                    <input type="submit" value="Save sensor" />
                </form>

                <h3>sensors</h3>
                <table>
                    <tbody>
                        {this.props.sensors.map((sensor, id) => (
                            <tr key={`sensor_${sensor.id}`}>
                                <td>{sensor.text}</td>
                                <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                                <td><button onClick={() => this.props.deleteSensor(id)}>delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        sensors: state.sensors,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSensors: () => {
            dispatch(sensors.fetchSensors());
        },
        addSensor: (text) => {
            return dispatch(sensors.addSensor(text));
        },
        updateSensor: (id, text) => {
            return dispatch(sensors.updateSensor(id, text));
        },
        deleteSensor: (id) => {
            dispatch(sensors.deleteSensor(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CanairioSensor);
