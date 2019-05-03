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
        searchValue:    '',
        isAllCheck:     false,
    }

    async componentDidMount () {
        await this._fetchTasks();
        await this._checkAllCheckingTasks();
    }

    _checkAllCheckingTasks = () => {
        this.setState({
            isAllCheck: this.state.tasks.every((element) => element.completed),
        });

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

        this._checkAllCheckingTasks();

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

        this._checkAllCheckingTasks();
    };

    _completedAllTasks = async () => {
        const { tasks, isAllCheck } = this.state;

        if (!isAllCheck) {
            const promises = tasks.filter((task) => {
                if (!task.completed) {
                    this._completedTask(task.id);
                }
            });

            await Promise.all(promises);
        }

    }

    _renameTask = async (id, taskName) => {
        this._setTaskFetching(true);

        const task = this.state.tasks.filter((task) => {
            if (task.id === id) {
                task.message = taskName;

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

    _searchValue = (event) => {
        this.setState({
            searchValue: event.target.value.toLowerCase(),
        });
    }

    render () {
        const { tasks, isTaskFetching, searchValue, isAllCheck } = this.state;

        const tasksJSX = sortTasksByGroup(tasks).filter((task) => {
            if (searchValue) {
                if (task.message.toLowerCase().indexOf(searchValue) !== -1) {
                    return task;
                }
            } else {
                return task;
            }

        }).map((task) => {
            return (
                <Task
                    key = { task.id }
                    { ...task }
                    _completedTask = { this._completedTask }
                    _favoriteTask = { this._favoriteTask }
                    _removeTask = { this._removeTask }
                    _renameTask = { this._renameTask }
                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isTaskFetching = { isTaskFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { searchValue }
                            onChange = { this._searchValue }
                        />
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
                            color1 = { '#000' }
                            color2 = { 'white' }
                            onClick = { this._completedAllTasks }
                            checked = { isAllCheck }
                        />
                        <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
                    </footer>

                </main>
            </section>
        );
    }
}
