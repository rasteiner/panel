<template>

  <kirby-view class="kirby-user-view">

    <kirby-header icon="user" label="User List" link="/users" :breadcrumb="breadcrumb" :pagination="pagination">

      {{ headline }}
      <kirby-image class="kirby-user-view-image" ratio="1/1" :src="user.image.url" />

      <template slot="buttons-left">
        <kirby-dropdown>
          <kirby-button @click="$refs.picture.toggle()" icon="image">Picture</kirby-button>
          <kirby-dropdown-content ref="picture" :dark="true">
            <kirby-dropdown-item icon="upload" :upload="true">Change</kirby-dropdown-item>
            <kirby-dropdown-item icon="trash">Delete</kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
        <kirby-button icon="bolt">Role</kirby-button>
        <kirby-button icon="key">Password</kirby-button>
        <kirby-button icon="trash" @click="$refs.remove.open(user.email)">Delete</kirby-button>
      </template>

    </kirby-header>

    <kirby-fieldset :fields="[
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        width: '1/2'
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        width: '1/2'
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email'
      },
      {
        name: 'website',
        label: 'Website',
        type: 'url'
      }
    ]" :values="user" @input="input" />

    <kirby-user-remove-dialog ref="remove" />

  </kirby-view>

</template>

<script>

// api
import UserQuery from '@/Api/UserQuery.js';

export default {
  data () {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        website: '',
        role: '',
        image: {
          url: ''
        }
      }
    }
  },
  computed: {
    breadcrumb() {
      return [
        {
          link: '/users/role/' + this.user.role,
          label: 'role: ' + this.user.role
        }
      ];
    },
    headline() {
      return this.user.firstName + ' ' + this.user.lastName;
    },
    pagination() {
      return {
        page: 1,
        limit: 1,
        total: 5,
        pageLabel: 'User',
        prevLabel: 'Previous User',
        nextLabel: 'Next User'
      };
    }
  },
  methods: {
    input (data) {
      this.user.firstName = data.firstName;
      this.user.lastName = data.lastName;
      this.user.email = data.email;
    }
  },
  created () {
    UserQuery(this.$route.params.email).then(function (user) {
      this.user = user;
    }.bind(this));
  }
}

</script>

<style lang="scss">

.kirby-headline {
  position: relative;
}

.kirby-user-view-image {
  position: absolute;
  width: 3rem;
  right: 0;
  top: 50%;
  margin-top: -1.5rem;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  margin-right: -.2rem;
}

</style>
