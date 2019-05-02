// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Instruments
import Scheduler from './../../components/Scheduler';
import Spinner from './../../components/Spinner'

@hot(module)
export default class App extends Component {
    render () {
        return (
            <>
                <Spinner />
                <Scheduler />
            </>
        );
    }
}
