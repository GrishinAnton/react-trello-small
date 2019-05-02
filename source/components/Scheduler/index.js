// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import Task from './../Task';
import Checkbox from './../../theme/assets/Checkbox';
import { BaseTaskModel } from './../../instruments';

export default class Scheduler extends Component {
    state = {
        tasks: [new BaseTaskModel(), new BaseTaskModel(), new BaseTaskModel()],
    }

    _favoriteTask = (id) => {
        const newTask = this.state.tasks.map((task) => {
            if (task.id === id) {
                task.favorite = !task.favorite;
            }

            return task;
        });

        this.setState({
            tasks: newTask,
        });
    };

    _completedTask = (id) => {
        const newTask = this.state.tasks.map((task) => {
            if (task.id === id) {
                task.completed = !task.completed;
            }

            return task;
        });

        this.setState({
            tasks: newTask,
        });
    };

    render () {
        // console.log(new BaseTaskModel());
        const { tasks } = this.state;
        const tasksJSX = tasks.map((task) => {
            return (
                <Task
                    key = { task.id }
                    { ...task }
                    _completedTask = { this._completedTask }
                    _favoriteTask = { this._favoriteTask }

                />
            );
        });

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input placeholder = 'Поиск' type = 'search' />
                    </header>

                    <section>
                        <form>
                            <input placeholder = 'Описание моей новой задачи' type = 'text' />
                            <button>Добавить задачу</button>
                        </form>

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
