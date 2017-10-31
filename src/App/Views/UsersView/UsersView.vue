<template>

  <kirby-view class="kirby-users-view">

    <kirby-header icon="users" link="/users">

      <template v-if="role">
        {{ $t('user.role')}}: <kirby-select-input class="kirby-users-role-select" :options="roles" :value="role" @input="$router.push('/users/role/' + $event)" />
      </template>
      <template v-else>
        {{ $t('users') }}
      </template>

      <template slot="buttons-left">
        <kirby-button icon="add" @click="$refs.create.open()">{{ $t('user.add') }}</kirby-button>
        <kirby-button v-if="!role" icon="funnel" @click="$router.push('/users/role/admin')">Filter by role</kirby-button>
      </template>

      <template slot="buttons-right">
        <kirby-button icon="search" @click="$store.dispatch('error', 'Not yet implemented')">{{ $t('search') }}</kirby-button>
      </template>

    </kirby-header>

    <kirby-users-collection ref="users" :keys="true" :role="role" />
    <kirby-user-create-dialog ref="create" @success="$refs.users.fetch()" />

  </kirby-view>

</template>

<script>

export default {
  created () {
    this.$store.dispatch('isLoading', false);
  },
  watch: {
    $route () {
      this.$store.dispatch('isLoading', false);
    }
  },
  computed: {
    role () {
      return this.$route.params.role;
    },
    roles () {
      // TODO: get actual roles from API
      return [
        { value: 'admin', text: 'admin' },
        { value: 'editor', text: 'editor' },
        { value: 'visitor', text: 'visitor' }
      ];
    }
  }
}

</script>

<style lang="scss">

  .kirby-users-role-select {
    display: inline-block;
  }

  .kirby-users-role-select > label {
    color: $color-dark-grey;
  }

</style>
