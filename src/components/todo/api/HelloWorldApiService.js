import axios from 'axios';
import {apiClient} from './ApiClient';

export const retrieveHelloWorldBean = () => apiClient.get(`hello-world`);

export const retrieveHelloWorldBeanPathVariable = (name, token) => apiClient.get(`hello-world/path-variable/${name}`, {headers:{Authorization: token}});
