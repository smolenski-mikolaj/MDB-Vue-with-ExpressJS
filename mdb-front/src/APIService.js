import axios from 'axios';
const API_URL = 'http://localhost:4000';

export class APIService {
  getTodos() {
    this.url = `${API_URL}/api/todos/`;
    return axios.get(this.url).then(response => response.data);
  }
  deleteTodo(todo) {
    this.url = `${API_URL}/api/todos/delete/${todo._id}`;
    return axios.delete(this.url);
  }
  createTodo(todo) {
    this.url = `${API_URL}/api/todos/create/`;
    return axios.post(this.url, todo);
  }
}
