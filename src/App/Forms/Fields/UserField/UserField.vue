<template>

  <kirby-field
    class="kirby-user-field"
    ref="field"
    v-bind="fieldProps"
    :icon="button">

    <template v-if="user">
      <kirby-button class="kirby-user-field-image" v-if="user.image.exists">
        <kirby-image
          :cover="true"
          ratio="1/1"
          :src="user.image.url"
        />
      </kirby-button>
      <kirby-text-input
        class="kirby-user-field-name"
        :readonly="true"
        :value="user.content.name || user.id"
        @keydown.native.delete="clear"
      />
    </template>

    <kirby-autocomplete v-else
      ref="input"
      :url="api"
      :map="{
          items: 'items',
          value: 'id',
          text: 'content.name',
          image: 'image.url'
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
    label: {
      default: 'User'
    },
    name: {
      default: 'user'
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
        this.$emit('input', user.id);
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
  width: 3.15rem;
  cursor: default;
}

.kirby-input-content > .kirby-user-field-name {
  display: inline-block;
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

