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
        _completedTask: func.isRequired,
        _favoriteTask:  func.isRequired,
        _removeTask:    func.isRequired,
        completed:      bool.isRequired,
        favorite:       bool.isRequired,
        id:             string.isRequired,
        message:        string.isRequired,
    }

    state = {
        taskEdit: false,
        taskName: this.props.message,
    }

    textInput = React.createRef();

    _getActiveTask = () => {
        const { completed } = this.props;

        return cx(Styles.task, {
            [Styles.completed]: completed,
        });
    }

    _taskEdit = () => {
        this.setState({
            taskEdit: !this.state.taskEdit,
        }, () => this.textInput.current.focus());

        this._submitTaskName();
    }

    _updateTaskName = (event) => {
        this.setState({
            taskName: event.target.value,
        });
    }

    _submitTaskName = () => {
        const { message, _renameTask, id } = this.props;
        const { taskName } = this.state;

        if (message !== taskName) {
            _renameTask(id, taskName);
        }
    }

    _submitOnKey = (event) => {
        const enterKey = event.key === 'Enter';
        const escKey = event.keyCode === 27;

        if (enterKey) {
            event.preventDefault();
            this._taskEdit();
        }

        if (escKey) {

            event.preventDefault();
            this.setState({
                taskEdit: !this.state.taskEdit,
                taskName: this.props.message,
            });
        }
    }

    render () {

        const { taskEdit, taskName } = this.state;

        const { id,
            completed,
            favorite,
            _favoriteTask,
            _completedTask,
            _removeTask } = this.props;

        const activeTask = this._getActiveTask();

        return (
            <li className = { activeTask }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = { '#3B8EF3' }
                        color2 = { 'white' }
                        onClick = { () => _completedTask(id) }
                    />
                    <input
                        disabled = { !taskEdit }
                        maxLength = '50'
                        onChange = { this._updateTaskName }
                        onKeyDown = { this._submitOnKey }
                        ref = { this.textInput }
                        type = 'text'
                        value = { taskName }
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
                        onClick = { () => _favoriteTask(id) }
                    />
                    <Edit
                        inlineBlock
                        checked = { taskEdit }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        onClick = { this._taskEdit }
                    />
                    <Remove
                        inlineBlock
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        color3 = { '#000' }
                        onClick = { () => _removeTask(id) }
                    />
                </div>
            </li>
        );
    }
}
