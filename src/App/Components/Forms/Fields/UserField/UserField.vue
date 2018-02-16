<template>

  <kirby-field
    class="kirby-user-field"
    ref="field"
    v-bind="$props"
    :icon="button">

    <template v-if="user">
      <kirby-button class="kirby-user-field-image" v-if="user.avatar.exists">
        <kirby-image
          :cover="true"
          ratio="1/1"
          :src="user.avatar.url"
        />
      </kirby-button>

      <span class="kirby-user-name">{{ display }}</span>

    </template>

    <kirby-autocomplete v-else
      ref="input"
      :url="api"
      :map="{
          items: 'data',
          value: 'id',
          text: 'name',
          image: 'avatar.url'
        }"
      @enter="function(value) { select(value) }"
      @select="function(item) { select(item.value) }"
    />

  </kirby-field>

</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    name: {
      default: 'user'
    },
    label: {
      default: 'User'
    },
    icon: {
      default: 'user'
    },
    role: {
      type: String
    }
  },
  data () {
    return {
      user: null
    };
  },
  computed: {
    api () {
      return window.panel.config.api + '/users'
    },
    button () {
      return this.user ? 'cancel' : this.icon;
    },
    display () {
      return this.user.name;
    }
  },
  mounted () {
    if (this.value) {
      this.select(this.value);
    }
    this.$el.querySelector('.kirby-input-icon').addEventListener("click", this.clear, false);
  },
  methods: {
    select (id) {
      this.$api.user.get(id).then((user) => {
        this.user = user
        this.$emit('input', user.email);
      })
    },
    clear () {
      this.user = null;
      this.$emit('input', null);
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  }
}

</script>

<style lang="scss">

.kirby-user-field .kirby-input-content {
  position: relative;
  display: flex;
}

.kirby-input-content > .kirby-user-field-image {
  display: inline-block;
  width: 2.8rem;
  cursor: default;
}

.kirby-input-content > .kirby-user-name {
  display: flex;
  align-items: center;
  padding: .45rem
}

.kirby-user-field .kirby-autocomplete > input {
    border: 0;
    font: inherit;
    line-height: 1.5em;
    padding: .5rem;
    width: 100%;
    resize: none;
    background: none;

    &:focus {
      outline: none;
    }
}

</style>

