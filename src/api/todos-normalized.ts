import DataApiService from './data-api.service';

const url = `/api/todos`;
const normalizeOptions = { normalize: true, entityKey: 'todos' };

const api = new DataApiService(url, normalizeOptions);

export default api;
