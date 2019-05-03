import { MAIN_URL, TOKEN } from './';

export const api = {

    async fetchTasks () {

        const response = await fetch(MAIN_URL, {
            method:  'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization:  TOKEN,
            },
        });

        const { data } =  await response.json();

        return data;
    },

    async createTask (message) {

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

    },

    async removeTask (id) {

        await fetch(`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });
    },
};