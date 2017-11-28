<template>
  <kirby-field class="kirby-textarea-field" v-bind="$props" :data-fullscreen="fullscreen">
    <template slot="options" v-if="max">
      <kirby-counter :value="data" :max="max"></kirby-counter>
    </template>

    <kirby-textarea-input ref="input" v-bind="$props" @focus="addShortcuts" @blur="removeShortcuts" v-model="data" @submit="$emit('submit', $event)" />

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
        <kirby-button class="kirby-format-button" @click="bold" icon="bold" />
        <kirby-button class="kirby-format-button" @click="italic" icon="italic" />
      </div>
      <div class="kirby-format-buttons-group">
        <kirby-button class="kirby-format-button" @click="openLinkModal" icon="chain" />
        <kirby-button class="kirby-format-button" @click="openEmailModal" icon="email" />
        <kirby-button class="kirby-format-button" @click="wrap('`')" icon="code" />
      </div>
      <div class="kirby-format-buttons-group">
        <kirby-button class="kirby-format-button" @click="list('ul')" icon="list-bullet" />
        <kirby-button class="kirby-format-button" @click="list('ol')" icon="list-numbers" />
      </div>
      <div class="kirby-format-buttons-group">
        <kirby-button class="kirby-format-button" @click="toggle()" :icon="fullscreen ? 'collapse' : 'expand'" />
      </div>

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
      fullscreen: false,
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
    list (type) {

      const input     = this.$refs.input;
      const selection = input.selection();

      let html = '';

      selection.split('\n').forEach((line, index) => {

        let prefix = '-';

        if (type === 'ol') {
          prefix = (index + 1) + '.';
        }

        html += prefix + ' ' + line + '\n';

      });

      input.insert(html);

    },
    wrap (token) {
      const input = this.$refs.input;
      const tag   = token + input.selection() + token;

      input.insert(tag);
    },
    bold () {
      this.wrap('**');
    },
    italic () {
      this.wrap('*');
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
    toggle () {
      this.fullscreen = !this.fullscreen;
      this.$nextTick(() => {
        this.$refs.input.resize();
        this.$refs.input.focus();
      });
    },
    addShortcuts () {
      this.$events.$on('key.cmd+b', this.bold);
      this.$events.$on('key.cmd+i', this.italic);
      this.$events.$on('key.cmd+u', this.openLinkModal);
      this.$events.$on('key.cmd+e', this.openEmailModal);
    },
    removeShortcuts () {
      this.$events.$off('key.cmd+b', this.bold);
      this.$events.$off('key.cmd+i', this.italic);
      this.$events.$off('key.cmd+u', this.openLinkModal);
      this.$events.$off('key.cmd+e', this.openEmailModal);
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

.kirby-textarea-field[data-fullscreen] {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: z-index(focusmode);
  background: $color-white;
  padding: 3rem;
  overflow: auto;
}
.kirby-textarea-field[data-fullscreen] > .kirby-field-header {
  display: none;
}
.kirby-textarea-field[data-fullscreen] > .kirby-input {
  max-width: 40rem;
  margin: 3rem auto;
  border: 0;
  box-shadow: none;
}
.kirby-textarea-field[data-fullscreen] > .kirby-input .kirby-format-buttons {
  position: fixed;
  top: 0;
}



</style>
