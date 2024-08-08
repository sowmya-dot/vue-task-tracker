  <template>
    <div>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('YOUR_BACKEND_URL/user/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token);
          this.$router.push('/tasks');
        } catch (error) {
          console.error('Login failed', error);
        }
      },
    },
  };
  </script>
  