// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN, MAIN_URL } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import Task from './../Task';
import Checkbox from './../../theme/assets/Checkbox';
import Composer from '../Composer';
import Spinner from './../../components/Spinner';
import { sortTasksByGroup } from './../../instruments';

export default class Scheduler extends Component {
    state = {
        tasks:          [],
        isTaskFetching: false,
    }

    componentDidMount () {
        this._fetchTasks();
    }

    _setTaskFetching = (state) => {
        this.setState({
            isTaskFetching: state,
        });
    }

    _fetchTasks = async () => {
        this._setTaskFetching(true);

        const response = await fetch(MAIN_URL, {
            method:  'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization:  TOKEN,
            },
        });

        const { data } = await response.json();

        this.setState({
            tasks:          data,
            isTaskFetching: false,
        });
    }

    _addTask = async (message) => {

        this._setTaskFetching(true);

        const response = await fetch(MAIN_URL, {
            method:  'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ message }),
        });

        const { data } = await response.json();

        this.setState(({ tasks }) => ({
            tasks:          [...tasks, data],
            isTaskFetching: false,
        }));

    }

    _favoriteTask = async (id) => {
        this._setTaskFetching(true);

        const task = this.state.tasks.filter((task) => {
            if (task.id === id) {
                task.favorite = !task.favorite;

                return task;
            }
        });

        const response = await fetch(MAIN_URL, {
            method:  'PUT',
            headers: {
                'Content-type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify(task),
        });

        const { data: [newTask] } = await response.json();

        this.setState(({ tasks }) => ({
            tasks:          tasks.map((task) => task.id === newTask.id ? newTask : task),
            isTaskFetching: false,
        }));

    };

    _completedTask = async (id) => {
        this._setTaskFetching(true);

        const task = this.state.tasks.filter((task) => {
            if (task.id === id) {
                task.completed = !task.completed;

                return task;
            }
        });

        const response = await fetch(MAIN_URL, {
            method:  'PUT',
            headers: {
                'Content-type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify(task),
        });

        const { data: [newTask] } = await response.json();

        this.setState(({ tasks }) => ({
            tasks:          tasks.map((task) => task.id === newTask.id ? newTask : task),
            isTaskFetching: false,
        }));
    };

    _removeTask = async (id) => {
        this._setTaskFetching(true);

        await fetch(`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ tasks }) => ({
            tasks:          tasks.filter((task) => task.id !== id),
            isTaskFetching: false,
        }));
    };

    render () {
        const { tasks, isTaskFetching } = this.state;

        const tasksJSX = sortTasksByGroup(tasks).map((task) => {
            return (
                <Task
                    key = { task.id }
                    { ...task }
                    _completedTask = { this._completedTask }
                    _favoriteTask = { this._favoriteTask }
                    _removeTask = { this._removeTask }
                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isTaskFetching = { isTaskFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>

                    <section>
                        <Composer _addTask = { this._addTask } />
                        <ul>
                            {tasksJSX }
                        </ul>
                    </section>

                    <footer>
                        <Checkbox
                            className = { Styles.toggleTaskCompletedState }
                            color1 = { '#3B8EF3' }
                            color2 = { 'white' }
                        />
                        <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
                    </footer>

                </main>
            </section>
        );
    }
}
