<template>
  <div class="container mt-5">
    <h3 class="font-weight-bold">Todos</h3>
    <mdb-tbl striped bordered>
      <mdb-tbl-head>
        <tr>
          <th width="60px">#</th>
          <th>Name</th>
          <th width="120px">Actions</th>
        </tr>
      </mdb-tbl-head>
      <mdb-tbl-body>
        <tr v-for="(todo, key) in liveTodos" :key="key">
          <td width="60px">{{key + 1}}</td>
          <td>{{todo.name}}</td>
          <td width="120px">
            <mdb-btn color="danger" size="sm" icon="times" @click.native="deleteTodo(todo)" />
          </td>
        </tr>
      </mdb-tbl-body>
    </mdb-tbl>
  </div>
</template>
<script>
import { mdbTbl, mdbTblHead, mdbTblBody, mdbBtn } from 'mdbvue'

export default {
  name: 'ListTodo',
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbBtn
  },
  props: {
    todos: Array
  },
  computed: {
    liveTodos() {
      return this.todos
    }
  },
  methods: {
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo)
    }
  }
};
</script>

<style scoped>
</style>