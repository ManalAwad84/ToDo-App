import axios from 'axios';
import { ToDoItem } from '../models/ToDoItem';

const todoService = {
    getAllTasks: function () {
        return axios.get('http://localhost:5018/api/todoapi')
            .then((response) => response.data.filter((item: ToDoItem) => item.statusId != 1))
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    },

    addTask: function (task: ToDoItem) {

        return axios.post('http://localhost:5018/api/todoapi/', task)
            .then((response) => response.data)
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    },

    deleteTask: function (id: number) {

        return axios.delete('http://localhost:5018/api/todoapi/' + id)
            .then((response) => response.data)
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    },

    markDone: function (id: number) {

        return axios.put('http://localhost:5018/api/todoapi/' + id)
            .then((response) => response.data)
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    },
}

export default todoService;