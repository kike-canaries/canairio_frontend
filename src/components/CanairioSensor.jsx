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
        let note = this.props.sensors[id];
        this.setState({text: note.text, updateSensorId: id});
    }

    submitNote = (e) => {
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

                <h3>Add new note</h3>
                <form onSubmit={this.submitNote}>
                    <input
                        value={this.state.text}
                        placeholder="Enter note here..."
                        onChange={(e) => this.setState({text: e.target.value})}
                        required />
                    <button onClick={this.resetForm}>Reset</button>
                    <input type="submit" value="Save Note" />
                </form>

                <h3>Notes</h3>
                <table>
                    <tbody>
                        {this.props.sensors.map((note, id) => (
                            <tr key={`note_${note.id}`}>
                                <td>{note.text}</td>
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
