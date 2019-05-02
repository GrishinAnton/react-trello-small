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
    }

    _getActiveTask = () => {
        const { completed } = this.props;

        return cx(Styles.task, {
            [Styles.completed]: completed,
        });
    }

    _taskEdit = () => {
        this.setState({
            taskEdit: !this.state.taskEdit,
        });
    }

    _updateComment = () => {
        console.log('131312');

    }

    render () {

        const { taskEdit } = this.state;

        const { id,
            completed,
            favorite,
            message,
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
                        type = 'text'
                        value = { message }
                        onChange = { this._updateComment }
                        // onKeyPress = { this._submitOnKey }
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
