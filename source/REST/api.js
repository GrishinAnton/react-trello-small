import { MAIN_URL, TOKEN } from './';

export const api = {

    async fetchTasks () {

        try {
            const response = await fetch(MAIN_URL, {
                method:  'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization:  TOKEN,
                },
            });

            const { data } = await response.json();

            return data;
        } catch (error) {
            console.log(error);
        }

    },

    async createTask (message) {

        try {
            const response = await fetch(MAIN_URL, {
                method:  'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization:  TOKEN,
                },
                body: JSON.stringify({ message }),
            });

            const { data } = await response.json();

            return data;
        } catch (error) {
            console.log(error);

        }

    },

    async updateTask (task) {

        try {
            const response = await fetch(MAIN_URL, {
                method:  'PUT',
                headers: {
                    'Content-type': 'application/json',
                    Authorization:  TOKEN,
                },
                body: JSON.stringify([task]),
            });

            const { data } = await response.json();

            return data;
        } catch (error) {
            console.log(error);

        }

    },

    async completeAllTasks (tasks) {

        try {
            const promises = await tasks.filter((task) => {
                if (!task.completed) {
                    task.completed = true;

                    return this.updateTask(task);
                }
            });

            Promise.all(promises);
        } catch (error) {
            console.log(error);

        }

    },

    async removeTask (id) {
        try {
            await fetch(`${MAIN_URL}/${id}`, {
                method:  'DELETE',
                headers: {
                    Authorization: TOKEN,
                },
            });
        } catch (error) {
            console.log(error);

        }

    },

};
