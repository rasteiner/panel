<template>

  <kirby-view class="kirby-user-view">

    <kirby-header icon="users" label="User List" link="/users" :breadcrumb="breadcrumb" :pagination="pagination">

      {{ headline }}

      <kirby-image v-if="user.image" class="kirby-user-view-image" ratio="1/1" :src="user.image.url" />

      <template slot="buttons-left">
        <kirby-dropdown>
          <kirby-button @click="$refs.picture.toggle()" icon="image">Picture</kirby-button>
          <kirby-dropdown-content ref="picture" :dark="true">
            <template v-if="user.image">
              <kirby-dropdown-item icon="upload" :upload="true">Change</kirby-dropdown-item>
              <kirby-dropdown-item icon="trash" @click="action('picture.delete')">{{ $t("delete") }}</kirby-dropdown-item>
            </template>
            <template v-else>
              <kirby-dropdown-item icon="upload" :upload="true">Upload</kirby-dropdown-item>
              <kirby-dropdown-item icon="import" @click="action('picture.import')">Import</kirby-dropdown-item>
            </template>
          </kirby-dropdown-content>
        </kirby-dropdown>
        <kirby-button icon="bolt" @click="action('role')">Role</kirby-button>
        <kirby-button icon="key" @click="action('password')">Password</kirby-button>
        <kirby-button icon="trash" @click="$refs.remove.open(user.email)">{{ $t("delete") }}</kirby-button>
      </template>

    </kirby-header>

    <kirby-fieldset :fields="fields" :values="user" @input="input" />

    <kirby-user-password-dialog ref="password" />
    <kirby-user-remove-dialog ref="remove" />

  </kirby-view>

</template>

<script>

// api
import UserQuery from 'App/Api/UserQuery.js';

export default {
  props: ['email'],
  data () {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        language: '',
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
    fields() {
      return [
        {
          name: 'firstName',
          label: this.$t('users.form.firstname.label'),
          type: 'text',
          width: '1/2'
        },
        {
          name: 'lastName',
          label: this.$t('users.form.lastname.label'),
          type: 'text',
          width: '1/2'
        },
        {
          name: 'email',
          label: this.$t('fields.email.label'),
          type: 'email'
        },
        {
          name: 'website',
          label: 'Website',
          type: 'url'
        },
        {
          name: 'language',
          label: this.$t('users.form.language.label') + ' (testing i18n)',
          type: 'text'
        }
      ]
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
      this.user.language = data.language;
      console.log(data.language);
      this.$store.dispatch('language', data.language);
    },
    action (action) {
      switch (action) {
        case 'picture.delete':
          this.$store.dispatch('success', 'The image has been deleted');
          this.user.image = false;
          break;
        case 'password':
          this.$refs.password.open(this.user.email);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
          break;
      }
    }
  },
  created () {
    UserQuery(this.email).then((user) => {
      this.user = user;
    });
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
