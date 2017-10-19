<template>

  <kirby-view class="kirby-users-view">

    <kirby-header icon="users" link="/users">

      {{ headline }}

      <template slot="buttons-left">
        <kirby-button icon="add" @click="$refs.create.open()">{{ $t('user.add') }}</kirby-button>
      </template>

      <template slot="buttons-right">
        <kirby-button icon="search">{{ $t('search') }}</kirby-button>
      </template>

    </kirby-header>

    <kirby-users-collection ref="users" :keys="true" :role="role" />
    <kirby-user-create-dialog ref="create" @success="$refs.users.fetch()" />

  </kirby-view>

</template>

<script>

export default {
  computed: {
    role () {
      return this.$route.params.role;
    },
    headline () {
      return !this.role ? this.$t('users') : this.$t('user.role') + ': ' + this.role
    }
  }
}

</script>
