<template>
  <kirby-field class="kirby-textarea-field" v-bind="$props">

    <template slot="options" v-if="maxLength || minLength">
      <kirby-counter
        :value="state"
        :min="minLength"
        :max="maxLength"
      />
    </template>

    <textarea
      class="kirby-textarea-input"
      ref="input"
      :id="name"
      :placeholder="placeholder"
      spellcheck="false"
      v-model="state"
      @input="input($event.target.value)"
      @change="$emit('change', $event.target.value)"
      @focus="removeShortcuts"
      @blur="$emit('blur')"
      @keydown.delete="remove($event)"
      @keydown.enter="enter($event)"
      @submit="$emit('submit', $event)">
    </textarea>

    <div v-if="buttons" class="kirby-format-buttons">
      <div class="kirby-format-buttons-group">
        <kirby-dropdown>
          <kirby-button
            class="kirby-format-button"
            @click="$refs.headlines.toggle()"
            icon="title"
          />
          <kirby-dropdown-content ref="headlines">
            <kirby-dropdown-item @click="prefix('#')" icon="title">Headline 1</kirby-dropdown-item>
            <kirby-dropdown-item @click="prefix('##')" icon="title">Headline 2</kirby-dropdown-item>
            <kirby-dropdown-item @click="prefix('###')" icon="title">Headline 3</kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
        <kirby-button
          class="kirby-format-button"
          @click="bold"
          icon="bold"
        />
        <kirby-button
          class="kirby-format-button"
          @click="italic"
          icon="italic"
        />
      </div>
      <div class="kirby-format-buttons-group">
        <kirby-button
          class="kirby-format-button"
          @click="openLinkModal"
          icon="chain"
        />
        <kirby-button
          class="kirby-format-button"
          @click="openEmailModal"
          icon="email"
        />
        <kirby-button
          class="kirby-format-button"
          @click="wrap('`')"
          icon="code"
        />
      </div>
      <div class="kirby-format-buttons-group">
        <kirby-button
          class="kirby-format-button"
          @click="list('ul')"
          icon="list-bullet"
        />
        <kirby-button
          class="kirby-format-button"
          @click="list('ol')"
          icon="list-numbers"
        />
      </div>
    </div>

    <kirby-dialog
      ref="linkModal"
      button="Insert"
      @cancel="$refs.input.focus()"
      @submit="$refs.linkForm.submit()">
      <kirby-form
        ref="linkForm"
        @submit="link"
        :values="linkValue"
        :fields="[
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
        ]"
      />
    </kirby-dialog>

    <kirby-dialog
      ref="emailModal"
      button="Insert"
      @cancel="$refs.input.focus()"
      @submit="$refs.emailForm.submit()">
      <kirby-form
        ref="emailForm"
        @submit="email"
        :values="emailValue"
        :fields="[
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
        ]"
      />
    </kirby-dialog>

    <kirby-upload ref="upload" />

  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";
import autosize from "./Textarea.autosize.js";

export default {
  mixins: [Field],
  props: {
    maxLength: Number,
    minLength: Number,
    buttons: {
      type: Boolean,
      default: true
    },
    placeholder: String,
    autosize: {
      type: Boolean,
      default: true
    },
    multiline: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      state: this.value,
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
  mounted() {
    this.$nextTick(() => {
      autosize(this.$refs.input);
    });
  },
  methods: {
    prefix(prefix) {
      const tag = prefix + " " + this.selection();

      this.insert(tag);
    },
    list(type) {
      let html = "";
      const selection = this.selection();

      selection.split("\n").forEach((line, index) => {
        let prefix = "-";

        if (type === "ol") {
          prefix = index + 1 + ".";
        }

        html += prefix + " " + line + "\n";
      });

      this.insert(html);
    },
    wrap(token) {
      const tag = token + this.selection() + token;

      this.insert(tag);
    },
    bold() {
      this.wrap("**");
    },
    italic() {
      this.wrap("*");
    },
    openLinkModal() {
      this.linkValue.text = this.selection();
      this.$refs.linkModal.open();
    },
    link() {
      let tag = "(link: " + this.linkValue.url + ")";

      if (this.linkValue.text.length > 0) {
        tag =
          "(link: " +
          this.linkValue.url +
          " text: " +
          this.linkValue.text +
          ")";
      }

      // reset the form
      this.linkValue = {
        url: null,
        text: null
      };

      // insert the link
      this.insert(tag);

      // close the modal
      this.$refs.linkModal.close();
    },
    openEmailModal() {
      this.emailValue.text = this.selection();
      this.$refs.emailModal.open();
    },
    email() {
      let tag = "(email: " + this.emailValue.email + ")";

      if (this.emailValue.text.length > 0) {
        tag =
          "(email: " +
          this.emailValue.email +
          " text: " +
          this.emailValue.text +
          ")";
      }

      // reset the form
      this.emailValue = {
        email: null,
        text: null
      };

      // insert the link
      this.insert(tag);

      // close the modal
      this.$refs.emailModal.close();
    },
    addShortcuts() {
      this.$events.$on("key.cmd+b", this.bold);
      this.$events.$on("key.cmd+i", this.italic);
      this.$events.$on("key.cmd+u", this.openLinkModal);
      this.$events.$on("key.cmd+e", this.openEmailModal);
    },
    removeShortcuts() {
      this.$events.$off("key.cmd+b", this.bold);
      this.$events.$off("key.cmd+i", this.italic);
      this.$events.$off("key.cmd+u", this.openLinkModal);
      this.$events.$off("key.cmd+e", this.openEmailModal);
    },
    focus() {
      this.$refs.input.focus();
    },
    insert(text) {
      const area = this.$refs.input;

      area.focus();

      document.execCommand("insertText", false, text);

      this.resize();
    },
    resize() {
      autosize.update(this.$refs.input);
    },
    selection() {
      const area = this.$refs.input;
      const start = area.selectionStart;
      const end = area.selectionEnd;

      return area.value.substring(start, end);
    },
    enter(e) {
      this.$emit("enter", e);

      if (this.multiline === false) {
        e.preventDefault();
      }

      if (e.metaKey || e.ctrlKey) {
        this.$emit("submit", e);
      }
    },
    remove(e) {
      if (e.target.selectionStart === 0 && e.target.value.length === 0) {
        this.$emit("empty");
        e.preventDefault();
      }

      this.$emit("remove", e);
    }
  }
};
</script>

<style lang="scss">
.kirby-format-buttons {
  padding-top: 1rem;
  padding-bottom: 0.25rem;
  display: flex;
  opacity: 0.25;
  transition: opacity 0.3s;
}
.kirby-input[data-focus] .kirby-format-buttons {
  opacity: 1;
}
.kirby-format-buttons-group {
  margin-right: 1.5rem;
}

.kirby-format-button {
  padding: 0.5rem;
}

.kirby-textarea-input {
  font: inherit;
  line-height: 1.5em;
  resize: none;
  width: 100%;
  background: none;
  border: 0;
}
.kirby-textarea-input:focus {
  outline: 0;
  max-height: none;
}

@media screen and (max-width: $breakpoint-medium) {
  .kirby-textarea-input {
    max-height: 2rem;
  }
}
</style>
