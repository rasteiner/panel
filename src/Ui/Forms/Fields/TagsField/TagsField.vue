<template>
  <kirby-field class="kirby-tags-field" v-bind="$props" :id="_uid" @click.native="focus" @blur="change">

    <draggable
      :value="state"
      @input="input"
      :options="{disabled: isDisabled}"
      class="kirby-tags-input">

      <kirby-tag v-for="tag in state"
        :ref="read(tag)"
        :key="read(tag)"
        @blur.native="select(null)"
        @focus.native="select(tag)"
        @keydown.native.left="navigate('prev')"
        @keydown.native.right="navigate('next')"
        @click.native.stop
        @dblclick.native="edit(tag)"
        @remove="remove(tag)"
        :removable="true">
          {{ read(tag, "text") }}
      </kirby-tag>

      <span slot="footer" class="kirby-tags-input-element">
        <kirby-autocomplete-input
          v-if="options.length > 0"
          ref="input"
          :id="_uid"
          :options="options"
          @input="add"
          @left="leaveInput"
          @delete="leaveInput"
        />

        <input
          v-else
          ref="input"
          :id="_uid"
          @keydown.enter.prevent="add($event.target.value)"
          @keydown.tab="add($event.target.value)"
          @keydown.separator.prevent="add($event.target.value)"
          @keydown.left="leaveInput"
          @keydown.delete="leaveInput"
        />
      </span>
    </draggable>

  </kirby-field>
</template>

<script>
import Field from "Ui/Forms/Field/Field.mixin.js";
import draggable from "vuedraggable";

export default {
  mixins: [Field],
  components: {
    draggable
  },
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    separator: {
      type: String,
      default: ","
    }
  },
  data() {
    return {
      state: this.setValue(this.value),
      hasChanged: false,
      selected: null
    };
  },
  computed: {
    isDisabled() {
      return this.state.length === 0;
    },
    stateToValue() {
      if (this.options.length > 0) {
        return this.state.map(tag => tag.value);
      }

      return this.state;
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    select(tag) {
      this.selected = tag;
    },
    index(tag) {
      if (this.options.length > 0) {
        return this.state.findIndex(x => x.value === tag.value);
      }

      return this.state.indexOf(tag);
    },
    read(tag, key = "value") {
      return this.options.length > 0 ? tag[key] : tag;
    },
    add(tag) {
      if (this.options.length === 0) {
        tag = tag.trim();

        if (tag.length === 0) return;
      }

      if (this.index(tag) === -1) {
        this.state.push(tag);
        this.input(this.state);
      }

      if (this.options.length > 0) {
        this.$refs.input.close();
        this.$refs.input.clear();
      } else {
        this.$refs.input.value = "";
      }
    },
    edit(tag) {
      this.$refs.input.value = this.options.length > 0 ? tag.text : tag;
      this.$refs.input.select();
      this.remove(tag);
    },
    remove(tag) {
      var prev = this.get("prev");
      var next = this.get("next");

      this.state.splice(this.index(tag), 1);
      this.input(this.state);

      if (prev) {
        prev.ref.focus();
      } else if (next) {
        this.$nextTick(() => {
          var nextIndex = this.index(next.tag);
          var nextResult = this.get(nextIndex);
          this.selected = nextResult.tag;
          nextResult.ref.focus();
        });
      } else {
        this.$refs.input.focus();
      }
    },
    get(method) {
      switch (method) {
        case "prev":
        case "next":
          if (!this.selected) return;
          var currIndex = this.index(this.selected);
          var nextIndex = method === "prev" ? currIndex - 1 : currIndex + 1;
          break;
        case "first":
          var nextIndex = 0;
        case "last":
          var nextIndex = this.state.length - 1;
          break;
        default:
          var nextIndex = method;
      }

      var nextTag = this.state[nextIndex];

      if (nextTag) {
        var nextRef = this.$refs[
          this.options.length > 0 ? nextTag.value : nextTag
        ];

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
    navigate(method) {
      var result = this.get(method);

      if (result) {
        result.ref.focus();
        this.selected = result.tag;
      } else if (method === "next") {
        this.$refs.input.focus();
        this.selected = null;
      }
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
    setValue(value) {
      var tags = value || [];

      if (typeof tags === "string") {
        var tags = tags.split(this.separator).map(tag => tag.trim());
      }

      if (this.options.length > 0) {
        tags = tags.map(tag => {
          let option = this.options.find(x => x.value === tag);
          return {
            text: option ? option.text : tag,
            value: tag
          };
        });
      }

      return tags;
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
