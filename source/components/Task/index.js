// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import Checkbox from './../../theme/assets/Checkbox';
import Star from './../../theme/assets/Star';
import Edit from './../../theme/assets/Edit';
import Remove from './../../theme/assets/Remove';

export default class Task extends Component {
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
                    <Checkbox
                        className = { Styles.toggleTaskCompletedState }
                        color1 = { '#3B8EF3' }
                        color2 = { 'white' }
                    />
                    <span>1111</span>
                    {/* <input type = 'text' /> */}
                </div>
                <div className = { Styles.actions }>
                    <Star
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        color3 = { '#000' }
                        inlineBlock
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
