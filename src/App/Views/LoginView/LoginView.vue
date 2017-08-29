<template>
  <div v-if="!loading" class="kirby-login-view">
    <form @submit.prevent="login">
      <kirby-fieldset :fields="[
        {
          name: 'email',
          label: 'Email',
          type: 'email'
        },
        {
          name: 'password',
          label: 'Password',
          type: 'text',
          icon: 'key',
          placeholder: 'Password …'
        }
      ]" />
      <kirby-button type="submit" icon="check">Login</kirby-button>
    </form>
  </div>
  <kirby-loader v-else position="center" theme="dark" />
</template>

<script>

export default {
  data () {
    return {
      loading: false
    };
  },
  methods: {
    login () {

      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch('login');
        this.$store.dispatch('success', 'Welcome ' + this.$store.state.user.firstName);
        this.$router.push('/');
      }, 2000);
    }
  }
}

</script>

<style>

.kirby-login-view {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
}
.kirby-login-view .kirby-field-header {
  display: none;
}
.kirby-login-view .kirby-button {
  display: block;
  margin-top: 1.5rem;
}

</style>
