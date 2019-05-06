// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import Task from './../Task';
import Checkbox from './../../theme/assets/Checkbox';
import Spinner from './../../components/Spinner';
import { sortTasksByGroup } from './../../instruments';

export default class Scheduler extends Component {
    state = {
        tasks:           [],
        isTasksFetching: false,
        tasksFilter:     '',
        isAllCheck:      false,
        newTaskMessage:  '',
    }

    async componentDidMount () {
        await this._fetchTasksAsync();
        this._checkAllCheckingTasks();
    }

    _updateNewTaskMessage = (event) => {
        this.setState({
            newTaskMessage: event.target.value,
        });
    }

    _getAllCompleted = () => {
        const { tasks } = this.state;

        return tasks.every((element) => element.completed);
    }

    _checkAllCheckingTasks = () => {

        this.setState({
            isAllCheck: this._getAllCompleted(),
        });

    }

    _setTasksFetchingState = (state) => {
        this.setState({
            isTasksFetching: state,
        });
    }

    _fetchTasksAsync = async () => {
        this._setTasksFetchingState(true);

        const data = await api.fetchTasks();

        this.setState({
            tasks: data,
        });

        this._setTasksFetchingState(false);
    }

    _createTaskAsync = async (event) => {

        const { newTaskMessage } = this.state;

        if (!newTaskMessage) {
            return null;
        }

        event.preventDefault();

        this._setTasksFetchingState(true);

        const data = await api.createTask(newTaskMessage);

        this.setState(({ tasks }) => ({
            tasks:          [...tasks, data],
            newTaskMessage: '',
        }));

        this._checkAllCheckingTasks();
        this._setTasksFetchingState(false);
    }

    _updateTaskAsync = async (task) => {
        this._setTasksFetchingState(true);

        const response = await api.updateTask(task);

        const [newTask] = Array.from(response);

        this.setState(({ tasks }) => ({
            tasks: tasks.map((task) => task.id === newTask.id ? newTask : task),
        }));

        this._setTasksFetchingState(false);
        this._checkAllCheckingTasks();
    }

    _completeAllTasksAsync = async () => {

        const { tasks } = this.state;

        if (this._getAllCompleted()) {
            return null;
        }

        this._setTasksFetchingState(true);

        await api.completeAllTasks(tasks);

        this.setState(({ tasks }) => ({
            tasks: tasks.map((task) => {
                task.completed = true;

                return task;
            }),
        }));

        this._checkAllCheckingTasks();

        this._setTasksFetchingState(false);

    }

    _removeTaskAsync = async (id) => {

        this._setTasksFetchingState(true);

        await api.removeTask(id);

        this.setState(({ tasks }) => ({
            tasks: tasks.filter((task) => task.id !== id),
        }));

        this._setTasksFetchingState(false);

    };

    _updateTasksFilter = (event) => {
        this.setState({
            tasksFilter: event.target.value.toLowerCase(),
        });
    }

    render () {
        const { tasks, isTasksFetching, tasksFilter, isAllCheck, newTaskMessage } = this.state;

        const tasksJSX = sortTasksByGroup(tasks).filter((task) => {
            if (tasksFilter) {
                if (task.message.toLowerCase().indexOf(tasksFilter) !== -1) {
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
                    _removeTaskAsync = { this._removeTaskAsync }
                    _updateTaskAsync = { this._updateTaskAsync }
                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>

                    <section>
                        <form onSubmit = { this._createTaskAsync }>
                            <input
                                maxLength = { 50 }
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                                onKeyUp = { this._submitOnEnter }
                            />
                            <button>Добавить задачу</button>
                        </form>
                        <ul>
                            {tasksJSX }
                        </ul>
                    </section>

                    <footer>
                        <Checkbox
                            className = { Styles.toggleTaskCompletedState }
                            color1 = { '#000' }
                            color2 = { '#fff' }
                            onClick = { this._completeAllTasksAsync }
                            checked = { isAllCheck }
                        />
                        <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
                    </footer>

                </main>
            </section>
        );
    }
}
