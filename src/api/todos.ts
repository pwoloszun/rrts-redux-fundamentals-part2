import DataApiService from './data-api.service';
import { Todo } from '../features/24-redux-todos-normalized/models/todo';

const url = `/api/todos`;

const api = new DataApiService<Todo>(url);

export default api;
