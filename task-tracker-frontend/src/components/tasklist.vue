<template>
  <div>
    <h1>Tasks</h1>
    <ul>
      <li v-for="task in tasks" :key="task._id">
        {{ task.title }} - {{ task.description }}
      </li>
    </ul>
    <TaskForm @taskAdded="fetchTasks" />
  </div>
</template>

<script>
import axios from 'axios';
import TaskForm from './TaskForm.vue';

export default {
  components: {
    TaskForm,
  },
  data() {
    return {
      tasks: [],
    };
  },
  async created() {
    await this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('YOUR_BACKEND_URL/task', {
          headers: { Authorization: Bearer ${token} },
        });
        this.tasks = response.data;
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    },
  },
};
</script>