// Core
import React, { Component } from 'react';
import { func, string, bool } from 'prop-types';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';
import Checkbox from './../../theme/assets/Checkbox';
import Star from './../../theme/assets/Star';
import Edit from './../../theme/assets/Edit';
import Remove from './../../theme/assets/Remove';

export default class Task extends Component {
    static propTypes = {
        _removeTaskAsync: func.isRequired,
        completed:        bool.isRequired,
        favorite:         bool.isRequired,
        id:               string.isRequired,
        message:          string.isRequired,
        updateTask:       func.isRequired,
    }

    state = {
        isTaskEditing:  false,
        newTaskMessage: this.props.message,
    }

    taskInput = React.createRef();

    _getActiveTask = () => {
        const { completed } = this.props;

        return cx(Styles.task, {
            [Styles.completed]: completed,
        });
    }

    _setTaskEditingState = () => {
        this.setState({
            isTaskEditing: !this.state.isTaskEditing,
        }, () => this.taskInput.current.focus());

        this._submitTaskName();
    }

    _updateTaskName = (event) => {
        this.setState({
            newTaskMessage: event.target.value,
        });
    }

    _submitTaskName = () => {
        const { message, _updateNewTaskMessage, id } = this.props;
        const { newTaskMessage } = this.state;

        if (message !== newTaskMessage) {
            _updateNewTaskMessage(id, newTaskMessage);
        }
    }

    _updateTaskMessageOnKeyDown = (event) => {
        const enterKey = event.key === 'Enter';
        const escKey = event.keyCode === 27;

        if (enterKey) {
            event.preventDefault();
            this._setTaskEditingState();
        }

        if (escKey) {

            event.preventDefault();
            this.setState({
                isTaskEditing:  !this.state.isTaskEditing,
                newTaskMessage: this.props.message,
            });
        }
    }

    render () {

        const { isTaskEditing, newTaskMessage } = this.state;

        const { id,
            completed,
            favorite,
            updateTask,
            _removeTaskAsync } = this.props;

        const activeTask = this._getActiveTask();

        return (
            <li className = { activeTask }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = { '#3B8EF3' }
                        color2 = { 'white' }
                        onClick = { () => updateTask(id, 'complited') }
                    />
                    <input
                        disabled = { !isTaskEditing }
                        maxLength = '50'
                        onChange = { this._updateTaskName }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { newTaskMessage }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        color3 = { '#000' }
                        onClick = { () => updateTask(id, 'favorite') }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        onClick = { this._setTaskEditingState }
                    />
                    <Remove
                        inlineBlock
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        color3 = { '#000' }
                        onClick = { () => _removeTaskAsync(id) }
                    />
                </div>
            </li>
        );
    }
}
