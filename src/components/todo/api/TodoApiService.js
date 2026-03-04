import axios from 'axios';
import {apiClient} from './ApiClient';

export const retriveAllTodosForUsernameApi = (name) => apiClient.get(`users/${name}/todos`);

export const deleteTodoApi = (name, id) => apiClient.delete(`users/${name}/todos/${id}`);

export const retrieveTodoApi = (name, id) => apiClient.get(`users/${name}/todos/${id}`);

export const updateTodoApi = (name, id, todo) => apiClient.put(`users/${name}/todos/${id}`, todo);

export const createTodoApi = (name, todo) => apiClient.post(`users/${name}/todos`, todo);