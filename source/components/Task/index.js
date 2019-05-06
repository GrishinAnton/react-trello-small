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
        _updateTaskAsync: func.isRequired,
        completed:        bool.isRequired,
        favorite:         bool.isRequired,
        id:               string.isRequired,
        message:          string.isRequired,
    }

    state = {
        isTaskEditing: false,
        newMessage:    this.props.message,
    }

    taskInput = React.createRef();

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _setTaskEditingState = (boolean) => {
        this.setState({
            isTaskEditing: boolean,
        }, () => boolean ? this.taskInput.current.focus() : null);

    }

    _updateNewTaskMessage = (event) => {
        this.setState({
            newMessage: event.target.value,
        });
    }

    _updateTask = () => {
        const { message, _updateTaskAsync } = this.props;
        const { newMessage } = this.state;

        if (!newMessage) {
            return null;
        }

        if (newMessage === message) {
            this._setTaskEditingState(false);

            return null;
        }

        this._setTaskEditingState(false);

        const task = this._getTaskShape(this.props);

        task.message = newMessage;
        _updateTaskAsync(task);

    }

    _updateTaskMessageOnClick = () => {
        const { isTaskEditing } = this.state;

        if (isTaskEditing) {
            this._updateTask();

            return null;
        }
        this._setTaskEditingState(true);
    }

    _updateTaskMessageOnKeyDown = (event) => {
        const enterKey = event.key === 'Enter';
        const escKey = event.key === 'Escape';
        const { newMessage } = this.state;

        if (!newMessage) {
            return null;
        }

        if (enterKey) {
            this._updateTask();
        }

        if (escKey) {
            this._cancelUpdatingTaskMessage();
        }

    }

    _cancelUpdatingTaskMessage = () => {
        this._setTaskEditingState(false);
        this.setState({
            newMessage: this.props.message,
        });
    }

    _toggleTaskCompletedState = () => {
        const { completed, _updateTaskAsync } = this.props;

        const task = this._getTaskShape({ completed: !completed });

        _updateTaskAsync(task);
    }

    _toggleTaskFavoriteState = () => {
        const { favorite, _updateTaskAsync } = this.props;

        const task = this._getTaskShape({ favorite: !favorite });

        _updateTaskAsync(task);
    }

    _removeTask = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    }

    _getActiveTask = () => {
        const { completed } = this.props;

        return cx(Styles.task, {
            [Styles.completed]: completed,
        });
    }

    render () {

        const { isTaskEditing, newMessage } = this.state;

        const {
            completed,
            favorite } = this.props;

        const activeTask = this._getActiveTask();

        return (
            <li className = { activeTask }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = { '#3B8EF3' }
                        color2 = { '#FFF' }
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { !isTaskEditing }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { newMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }

                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
