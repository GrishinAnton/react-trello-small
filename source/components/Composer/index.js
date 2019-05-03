// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

// Instruments

export default class extends Component {
    static propTypes = {
        _addTask: func.isRequired,
    }

    state = {
        comment: '',
    }

    _updateComment = (event) => {
        this.setState({
            comment: event.target.value,
        });
    }

    _handleFormSubmit = (event) => {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment = () => {
        const { _addTask } = this.props;
        const { comment } = this.state;
        const maxCommentLength = 50;

        if (!comment) {
            return null;
        }

        if (comment) {
            if (comment.length > maxCommentLength) {
                return null;
            }
        }

        _addTask(comment);

        this.setState({
            comment: '',
        });
    }

    _submitOnEnter = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._submitComment();
        }

    }

    render () {

        const { comment } = this.state;

        return (
            <form onSubmit = { this._handleFormSubmit }>
                <input
                    maxLength = '50'
                    placeholder = 'Описание моей новой задачи'
                    type = 'text'
                    value = { comment }
                    onChange = { this._updateComment }
                    onKeyUp = { this._submitOnEnter }
                />
                <button>Добавить задачу</button>
            </form>
        );
    }
}
