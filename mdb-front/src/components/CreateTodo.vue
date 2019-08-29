<template>
  <div id="container" class="container mt-5">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="alert alert-warning" v-show="showError">
          <button type="button" class="close" @click="showError = false">X</button>
          <strong>Error!</strong>
        </div>
        <h3 class="font-weight-bold">Create a Todo</h3>
        <mdb-input v-model="todo.name" label="Todo name" />
        <mdb-btn color="primary" @click.native="createTodo">Create</mdb-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbInput, mdbBtn } from 'mdbvue'

export default {
  name: "CreateToDo",
  components: {
    mdbInput,
    mdbBtn
  },
  data() {
    return {
      showError: false,
      todo: {}
    }
  },
  methods: {
    createTodo() {
      this.$emit('createTodo', this.todo)
    }
  }
};
</script>
<style scoped>
</style>