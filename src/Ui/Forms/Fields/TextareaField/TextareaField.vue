<template>
  <kirby-field v-bind="$props">
    <template slot="options" v-if="max">
      <kirby-counter :value="data" :max="max"></kirby-counter>
    </template>

    <kirby-textarea-input ref="input" v-bind="$props" v-model="data" @submit="$emit('submit', $event)" />

    <div v-if="buttons" class="kirby-format-buttons">
      <div class="kirby-format-buttons-group">
        <kirby-dropdown>
          <kirby-button class="kirby-format-button" @click="$refs.headlines.toggle()" icon="title" />
          <kirby-dropdown-content ref="headlines" :dark="true">
            <kirby-dropdown-item @click="prefix('#')" icon="title">Headline 1</kirby-dropdown-item>
            <kirby-dropdown-item @click="prefix('##')" icon="title">Headline 2</kirby-dropdown-item>
            <kirby-dropdown-item @click="prefix('###')" icon="title">Headline 3</kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
        <kirby-button class="kirby-format-button" @click="wrap('**')" icon="bold" />
        <kirby-button class="kirby-format-button" @click="wrap('*')" icon="italic" />
      </div>
      <div class="kirby-format-buttons-group">
        <kirby-button class="kirby-format-button" @click="openLinkModal" icon="chain" />
        <kirby-button class="kirby-format-button" @click="openEmailModal" icon="email" />
        <kirby-button class="kirby-format-button" @click="wrap('`')" icon="code" />
      </div>
      <div class="kirby-format-buttons-group">
        <kirby-button class="kirby-format-button" @click="prefix('-')" icon="list-bullet" />
        <kirby-button class="kirby-format-button" @click="prefix('1.')" icon="list-numbers" />
      </div>

      <kirby-dialog ref="linkModal" button="Insert" @cancel="$refs.input.focus()" @submit="$refs.linkForm.submit()">
        <kirby-form ref="linkForm" @submit="link" :values="linkValue" :fields="[
          {
            name: 'url',
            label: 'Link',
            type: 'text',
            icon: 'chain'
          },
          {
            name: 'text',
            label: 'Link Text',
            type: 'text'
          }
        ]" />
      </kirby-dialog>

      <kirby-dialog ref="emailModal" button="Insert" @cancel="$refs.input.focus()" @submit="$refs.emailForm.submit()">
        <kirby-form ref="emailForm" @submit="email" :values="emailValue" :fields="[
          {
            name: 'email',
            label: 'Email',
            type: 'email'
          },
          {
            name: 'text',
            label: 'Email Link Text',
            type: 'text'
          }
        ]" />
      </kirby-dialog>

      <kirby-upload ref="upload" />

    </div>

  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    label: {
      default: 'Text'
    },
    name: {
      default: 'text'
    },
    max: {
      type: Number
    },
    buttons: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      linkValue: {
        url: null,
        text: null
      },
      emailValue: {
        email: null,
        text: null
      }
    };
  },
  methods: {

    prefix (prefix) {

      const input     = this.$refs.input;
      const selection = input.selection();
      const tag       = prefix + ' ' + input.selection();

      input.insert(tag);

    },
    wrap (token) {
      const input = this.$refs.input;
      const tag   = token + input.selection() + token;

      input.insert(tag);
    },
    openLinkModal () {
      this.linkValue.text = this.$refs.input.selection();
      this.$refs.linkModal.open();
    },
    link () {

      let tag = '(link: ' + this.linkValue.url + ')';

      if (this.linkValue.text.length > 0) {
        tag = '(link: ' + this.linkValue.url + ' text: ' + this.linkValue.text + ')';
      }

      // reset the form
      this.linkValue = {
        url: null,
        text: null
      };

      // insert the link
      this.$refs.input.insert(tag);

      // close the modal
      this.$refs.linkModal.close();

    },
    openEmailModal () {
      this.emailValue.text = this.$refs.input.selection();
      this.$refs.emailModal.open();
    },
    email () {

      let tag = '(email: ' + this.emailValue.email + ')';

      if (this.emailValue.text.length > 0) {
        tag = '(email: ' + this.emailValue.email + ' text: ' + this.emailValue.text + ')';
      }

      // reset the form
      this.emailValue = {
        email: null,
        text: null
      };

      // insert the link
      this.$refs.input.insert(tag);

      // close the modal
      this.$refs.emailModal.close();

    },
    image () {

    }
  }
}

</script>

<style lang="scss">

.kirby-format-buttons {
  padding-top: 1rem;
  padding-bottom: .25rem;
  display: flex;
  opacity: .25;
  transition: opacity .3s;
}
.kirby-input[data-focus] .kirby-format-buttons {
  opacity: 1;
}
.kirby-format-buttons-group {
  margin-right: 1.5rem;
}
.kirby-format-button {
  padding: .5rem;
}

</style>
