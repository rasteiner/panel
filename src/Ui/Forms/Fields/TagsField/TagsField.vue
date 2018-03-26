<template>
  <kirby-field class="kirby-tags-field" v-bind="$props" :id="_uid" @click.native="focus">

    <draggable
      :value="state"
      @input="input"
      :options="{disabled: !draggable, forceFallback: true}"
      class="kirby-tags-input">

      <kirby-tag v-for="tag in state"
        :ref="tag.value"
        :key="tag.value"
        @blur.native="select(null)"
        @focus.native="select(tag)"
        @keydown.native.left="navigate('prev')"
        @keydown.native.right="navigate('next')"
        @click.native.stop
        @dblclick.native="edit(tag)"
        @remove="remove(tag)"
        :removable="true">
          {{ tag.text }}
      </kirby-tag>

      <span slot="footer" class="kirby-tags-input-element">
        <kirby-autocomplete-input
          ref="input"
          :id="_uid"
          :options="options"
          :trigger="separator"
          :accept="accept"
          @select="addTag"
          @input="addString"
          @arrowleft="leaveInput"
          @backspace="leaveInput"
        />
      </span>
    </draggable>

  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Mixins/Field.js";
import Label from "Ui/Forms/Field/Mixins/Label.js";
import Help from "Ui/Forms/Field/Mixins/Help.js";
import Icon from "Ui/Forms/Field/Mixins/Icon.js";
import Options from "Ui/Forms/Field/Mixins/Options.js";
import Required from "Ui/Forms/Field/Mixins/Required.js";
import Value from "Ui/Forms/Field/Mixins/Value.js";

import draggable from "vuedraggable";

export default {
  mixins: [Field, Label, Help, Icon, Options, Required, Value],
  components: {
    draggable
  },
  props: {
    separator: {
      type: String,
      default: ","
    },
    accept: {
      type: String,
      default: "all"
    }
  },
  data() {
    return {
      state: this.value,
      hasChanged: false,
      selected: null
    };
  },
  computed: {
    draggable() {
      return this.state !== undefined && this.state.length > 0;
    }
  },
  methods: {
    addString(string) {
      string = string.trim();
      if (string.length === 0) return;

      this.addTag({ text: string, value: string });
    },
    addTag(tag) {
      if (this.index(tag) === -1) {
        this.state.push(tag);
        this.input(this.state);
      }

      this.$refs.input.close();
      this.$refs.input.clear();
    },
    edit(tag) {
      this.$refs.input.fill(tag.text);
      this.$refs.input.select();
      this.remove(tag);
    },
    focus() {
      this.$refs.input.focus();
    },
    get(position) {
      switch (position) {
        case "prev":
        case "next":
          if (!this.selected) return;
          let currIndex = this.index(this.selected);
          var nextIndex = position === "prev" ? currIndex - 1 : currIndex + 1;
          break;

        case "first":
          var nextIndex = 0;
          break;

        case "last":
          var nextIndex = this.state.length - 1;
          break;

        default:
          var nextIndex = position;
          break;
      }

      let nextTag = this.state[nextIndex];

      if (nextTag) {
        let nextRef = this.$refs[nextTag.value];

        if (nextRef && nextRef[0]) {
          return {
            ref: nextRef[0],
            tag: nextTag,
            index: nextIndex
          };
        }
      }

      return false;
    },
    index(tag) {
      return this.state.findIndex(item => item.value === tag.value);
    },
    leaveInput(e) {
      if (
        e.target.selectionStart === 0 &&
        e.target.selectionStart === e.target.selectionEnd
      ) {
        this.navigate("last");
        e.target.blur();
      }
    },
    navigate(position) {
      var result = this.get(position);
      if (result) {
        result.ref.focus();
        this.selected = result.tag;
      } else if (position === "next") {
        this.$refs.input.focus();
        this.selected = null;
      }
    },
    remove(tag) {
      // get neighboring tags
      let prev = this.get("prev");
      let next = this.get("next");

      // remove tag and fire input event
      this.state.splice(this.index(tag), 1);
      this.input(this.state);

      if (prev) {
        prev.ref.focus();
      } else if (next) {
        this.$nextTick(() => {
          // TODO: check if not redundant
          let nextIndex = this.index(next.tag);
          let nextResult = this.get(nextIndex);
          this.selected = nextResult.tag;
          nextResult.ref.focus();
        });
      } else {
        this.$refs.input.focus();
      }
    },
    select(tag) {
      this.selected = tag;
    }
  }
};
</script>


<style lang="scss">
.kirby-tags-field .kirby-input-content {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  cursor: text;

  [dir="ltr"] & {
    padding: 4px 0 0 4px;
  }
  [dir="rtl"] & {
    padding: 4px 4px 0 0;
  }
}
.kirby-tags-field .kirby-tag {
  margin-bottom: 4px;

  [dir="ltr"] & {
    margin-right: 4px;
  }
  [dir="rtl"] & {
    margin-left: 4px;
  }
}
.kirby-tags-field .kirby-tag.sortable-ghost {
  opacity: 0.2;
}
.kirby-tags-input-element input {
  display: inline-block;
  min-width: 4rem;
  padding: 0.4rem;
  flex-grow: 1;
  font: inherit;
  border: 0;
  outline: 0;
  line-height: 1;
  outline: 0;
  margin-bottom: 4px;
  border-radius: 3px;
  background: transparent;

  [dir="ltr"] & {
    margin-right: 4px;
  }
  [dir="rtl"] & {
    margin-left: 4px;
  }
}
</style>
