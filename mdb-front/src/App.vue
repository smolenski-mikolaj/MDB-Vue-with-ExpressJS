<template>
  <div id="app">
    <mdb-container>
      <div class="text-center mb-4">
        <h1 class="font-weight-bold mb-4">MDB Vue Todo Demo App</h1>
        <img src="./assets/logo-mdb-vue-small.png" width="100px" height="auto"> + <img src="./assets/express.png" width="100px" height="auto"> + <img src="./assets/mongo.png" width="100px" height="auto"><br>
      </div>
      <mdb-row>
        <mdb-col md="6">
          <CreateToDo @createTodo="createTodo" />
        </mdb-col>
        <mdb-col md="6">
          <ListToDo :todos="todos" @deleteTodo="deleteTodo" />
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import CreateToDo from './components/CreateTodo'
import ListToDo from './components/ListTodo'

import { APIService } from './APIService'
const API_URL = 'http://localhost:4000'
const apiService = new APIService()

import { mdbContainer, mdbRow, mdbCol } from 'mdbvue'

export default {
  name: 'App',
  components: {
    CreateToDo,
    ListToDo,
    mdbContainer,
    mdbRow,
    mdbCol
  },
  data() {
    return {
      todos: []
    }
  },
  methods: {
    getTodos() {
      apiService.getTodos().then(response => {
        console.log(response.message)
        this.todos = response.data
      })
    },
    createTodo(todo) {
      apiService.createTodo(todo).then(
        request => {
          console.log(request.data.message)
          this.getTodos()
        }
      );
    },
    deleteTodo(todo) {
      apiService.deleteTodo(todo).then(response => {
        if (response.status === 200) {
          console.log(response.data.message)
          this.getTodos()
        }
      })
    }
  },
  mounted() {
    this.getTodos()
  }
}
</script>

<style>
#app {
  margin-top: 100px;
}
</style>
