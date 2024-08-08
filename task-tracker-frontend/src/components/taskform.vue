<template>
  <div>
    <form @submit.prevent="addTask">
      <input v-model="title" placeholder="Title" required />
      <input v-model="description" placeholder="Description" />
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    async addTask() {
      try {
        const token = localStorage.getItem('token');
        await axios.post('YOUR_BACKEND_URL/task', {
          title: this.title,
          description: this.description,
        }, {
          headers: { Authorization: Bearer ${token} },
        });
        this.$emit('taskAdded');
        this.title = '';
        this.description = '';
      } catch (error) {
        console.error('Failed to add task', error);
      }
    },
  },
};
</script>