<template>

  <kirby-view class="kirby-user-view">

    <kirby-header icon="users" label="User List" link="/users" :breadcrumb="breadcrumb" :pagination="pagination" @paginate="paginate">

      {{ headline }}

      <kirby-image v-if="user.image" class="kirby-user-view-image" ratio="1/1" :src="user.image.url" />

      <template slot="buttons-left">
        <kirby-dropdown>
          <kirby-button @click="$refs.picture.toggle()" icon="image">
            {{ $t('user.image') }}
          </kirby-button>
          <kirby-dropdown-content ref="picture" :dark="true">
            <template v-if="user.image">
              <kirby-dropdown-item icon="upload" :upload="true">
                {{ $t('change') }}
              </kirby-dropdown-item>
              <kirby-dropdown-item icon="trash" @click="action('picture.delete')">
                {{ $t('delete') }}
              </kirby-dropdown-item>
            </template>
            <template v-else>
              <kirby-dropdown-item icon="upload" :upload="true">
                {{ $t('upload') }}
              </kirby-dropdown-item>
              <kirby-dropdown-item icon="import" @click="action('picture.import')">
                {{ $t('import') }}
              </kirby-dropdown-item>
            </template>
          </kirby-dropdown-content>
        </kirby-dropdown>
        <kirby-button icon="bolt" @click="action('role')">
          {{ $t('user.role') }}
        </kirby-button>
        <kirby-button icon="key" @click="action('password')">
          {{ $t('password') }}
        </kirby-button>
        <kirby-button icon="trash" @click="$refs.remove.open(user.email)">
          {{ $t('delete') }}
        </kirby-button>
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
import UsersQuery from 'App/Api/UsersQuery.js';

export default {
  props: {
    email: {
      type: String
    }
  },
  data () {
    return {
      id: this.email,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        language: 'en',
        website: '',
        role: '',
        image: {
          url: ''
        }
      }
    }
  },
  created () {
    this.fetch()
  },
  watch: {
    $route () {
      this.fetch();
    }
  },
  computed: {
    breadcrumb () {
      return [
        {
          link: '/users/role/' + this.user.role,
          label: this.$t('user.role') + ': ' + this.user.role
        }
      ];
    },
    headline () {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    fields() {
      return [
        {
          name: 'firstName',
          label: this.$t('user.firstname'),
          type: 'text',
          width: '1/2'
        },
        {
          name: 'lastName',
          label: this.$t('user.lastname'),
          type: 'text',
          width: '1/2'
        },
        {
          name: 'email',
          label: this.$t('email'),
          type: 'email',
          placeholder: this.$t('email.placeholder')
        },
        {
          name: 'website',
          label: this.$t('website'),
          type: 'url'
        },
        {
          name: 'language',
          label: this.$t('user.language'),
          type: 'language'
        }
      ]
    },
    pagination () {
      return {
        page: 1,
        limit: 1,
        total: 5,
        pageLabel: this.$t('user'),
        prevLabel: this.$t('user.previous'),
        nextLabel: this.$t('user.next')
      };
    }
  },
  methods: {
    input (data) {
      this.user.firstName = data.firstName;
      this.user.lastName  = data.lastName;
      this.user.email     = data.email;
      this.user.language  = data.language;

      // if current panel user, switch language
      if(data.language && this.$store.state.user.email === this.user.email) {
        this.$store.dispatch('language', data.language);
      }
    },
    action (action) {
      switch (action) {
        case 'picture.delete':
          this.$store.dispatch('success', this.$t('notification.image.deleted'));
          this.user.image = false;
          break;
        case 'password':
          this.$refs.password.open(this.user.email);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
          break;
      }
    },
    paginate (pagination) {
      UsersQuery({
        pagination: pagination
      }).then((response) => {
        this.id = response.users[0].email;
      });
    },
    fetch () {
      UserQuery(this.id).then((user) => {
        this.user = user;
      });
    }
  }
}

</script>

<style lang="scss">

.kirby-headline {
  position: relative;
}

.kirby-user-view-image {
  display: inline-block;
  position: absolute;
  top: 50%;
  width: 3rem;
  margin-top: -1.5rem;
  border-radius: 50%;
  overflow: hidden;

  [dir="ltr"] & {
    right: 0;
    margin-right: -.2rem;
  }
  [dir="rtl"] & {
    left: 0;
    margin-left: -.2rem;
  }
}

</style>
