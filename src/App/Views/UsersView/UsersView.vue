<template>

  <kirby-view class="kirby-users-view">

    <kirby-header icon="users" link="/users">

      {{ headline }}

      <template slot="buttons-left">
        <kirby-button icon="add" @click="$refs.create.open()">Add new user</kirby-button>
      </template>

      <template slot="buttons-right">
        <kirby-button icon="search">Search</kirby-button>
      </template>

    </kirby-header>

    <kirby-users-collection ref="users" :keys="true" :role="role" />

    <kirby-user-create-dialog ref="create" />

  </kirby-view>

</template>

<script>

export default {
  computed: {
    role() {
      return this.$route.params.role;
    },
    headline() {
      return !this.role ? 'Users' : 'Role: ' + this.role
    }
  }
}

</script>
