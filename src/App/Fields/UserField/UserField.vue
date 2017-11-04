<template>
  <kirby-field class="kirby-user-field" v-bind="$props">
    <template v-if="user">
      <kirby-button class="kirby-user-field-image" v-if="user.image.exists" @click="clear">
        <kirby-image :cover="true" ratio="1/1" :src="user.image.url" />
      </kirby-button>
      <kirby-text-input class="kirby-user-field-name" :readonly="true" :value="user.content.name || user.id" @click.native="clear" />
    </template>

    <kirby-autocomplete v-else
      ref="input"
      url="http://localhost:8888/api/users"
      :map="{
          value: 'id',
          text: 'id',
          json: 'items'
        }"
      @enter="function(value) { select(value) }"
      @select="function(item) { select(item.value) }">
    </kirby-autocomplete>
  </kirby-field>
</template>

<script>

import Field from 'Ui/Forms/Fields/Field.mixin.js';

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
  data() {
    return {
      user: null
    };
  },
  mounted () {
    console.log(this.value);
    if (this.value) {
      this.select(this.value);
    }
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
  width: 3.2rem;
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

