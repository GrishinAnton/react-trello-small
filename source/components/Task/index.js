// Core
import React, { Component } from 'react';
import { func, string, bool } from 'prop-types';

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
        completed:      bool.isRequired,
        favorite:       bool.isRequired,
        id:             string.isRequired,
        message:        string.isRequired,
    }
    // _getTaskShape = ({
    //     id = this.props.id,
    //     completed = this.props.completed,
    //     favorite = this.props.favorite,
    //     message = this.props.message,
    // }) => ({
    //     id,
    //     completed,
    //     favorite,
    //     message,
    // });

    render () {

        const { id,
            completed,
            favorite,
            message,
            _favoriteTask,
            _completedTask } = this.props;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = { '#3B8EF3' }
                        color2 = { 'white' }
                        onClick = { () => _completedTask(id) }
                    />
                    <span>{message }</span>
                    {/* <input type = 'text' /> */}
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        color3 = { '#000' }
                        inlineBlock
                        onClick = { () => _favoriteTask(id) }
                    />
                    <Edit
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        inlineBlock
                    />
                    <Remove
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        color3 = { '#000' }
                        inlineBlock
                    />
                </div>
            </li>
        );
    }
}
