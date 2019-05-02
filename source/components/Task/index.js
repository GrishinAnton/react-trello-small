// Core
import React, { PureComponent } from 'react';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
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

    render () {
        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <div className = { Styles.toggleTaskCompletedState } />
                    <span>1111</span>
                    <input type = 'text' />
                </div>
                <div className = { Styles.actions }>
                    <div className = { Styles.toggleTaskFavoriteState } />
                    <div className = { Styles.updateTaskMessageOnClick } />
                </div>
            </li>
        );
    }
}
