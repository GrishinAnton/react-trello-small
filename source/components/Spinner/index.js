// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

export default class Spinner extends Component {
    render () {
        const { isTaskFetching } = this.props;

        return isTaskFetching ? <div className = { Styles.spinner } /> : null;
    }
}
