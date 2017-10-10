<template>

  <kirby-view class="kirby-user-view">

    <kirby-header icon="users" label="User List" link="/users" :breadcrumb="breadcrumb" :pagination="pagination" @prev="prev" @next="next">

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

    <form @submit.prevent="save" method="POST">
      <kirby-fieldset :fields="fields" :values="user" @input="input" @submit="save" />
      <input type="submit" v-show="false">
    </form>

    <kirby-user-role-dialog ref="role" @success="fetch" />
    <kirby-user-password-dialog ref="password" />
    <kirby-user-remove-dialog ref="remove" />

  </kirby-view>

</template>

<script>

// api
import User from 'App/Api/User.js';

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
        firstname: '',
        lastname: '',
        email: '',
        language: 'en',
        website: '',
        role: '',
        image: {
          url: ''
        },
        prev: null,
        next: null
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
      if (this.user.firstname) {
        return `${this.user.firstname} ${this.user.lastname}`;
      } else {
        return this.user.email;
      }
    },
    fields() {
      return [
        {
          name: 'firstname',
          label: this.$t('user.firstname'),
          type: 'text',
          width: '1/2'
        },
        {
          name: 'lastname',
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
        prev: this.user.prev ? true : false,
        prevLabel: this.$t('user.previous'),
        next: this.user.next ? true : false,
        nextLabel: this.$t('user.next')
      };
    }
  },
  methods: {
    input (data) {

      // if current panel user, switch language
      if(data.language && this.$store.state.user.email === this.user.email) {
        this.$store.dispatch('language', data.language);
      }
    },
    save () {
      User.update(this.id, this.user).then(() => {
        this.$store.dispatch('success', 'Saved!');
      });
    },
    action (action) {
      switch (action) {
        case 'picture.delete':
          this.$store.dispatch('success', this.$t('notification.image.deleted'));
          this.user.image = false;
          break;
        case 'role':
          this.$refs.role.open(this.user.email);
          break;
        case 'password':
          this.$refs.password.open(this.user.email);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
          break;
      }
    },
    prev () {
      this.$router.push('/users/' + this.user.prev);
    },
    next () {
      this.$router.push('/users/' + this.user.next);
    },
    fetch () {
      User.get(this.email).then((user) => {
        this.user = user.data;
        this.user.role  = user.role;
        this.user.image = user.image;
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
