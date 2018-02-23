<template>
  <kirby-dropdown class="kirby-autocomplete-input">
    <input
      ref="input"
      type="text"
      :id="id"
      v-model="query"
      @keydown="keydown"
    />
    <kirby-dropdown-content ref="items">
      <kirby-dropdown-item v-for="(item, index) in items"
        tabindex="-1"
        :key="index"
        :icon="item.icon"
        :image="item.image"
        :class="(selected === index) ? 'is-selected' : ''"
        @click="select(item.value)">
        <span v-html="item.matched"></span>
      </kirby-dropdown-item>
    </kirby-dropdown-content>
  </kirby-dropdown>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    options: [Array, Object],
    limit: {
      type: Number,
      default: 5
    },
    separator: String
  },
  data() {
    return {
      items: [],
      query: null,
      selected: -1
    };
  },
  watch: {
    query() {
      // on every input change search through items
      this.search(this.query);
    }
  },
  methods: {
    clear() {
      this.query = null;
    },
    close() {
      this.$refs.items.close();
      this.selected = -1;
    },
    focus() {
      this.$refs.input.focus();
    },
    highlight() {
      // highlight query in matching items
      const regex = new RegExp(`(${this.query})`, "i");
      this.items.forEach(item => {
        item.matched = item.text.replace(regex, "<b>$1</b>");
      });
    },
    keydown(event) {
      switch (event.key) {
        case "Enter":
        case "Tab":
        case this.separator:
          // item in dropdown is selected
          if (this.items[this.selected]) {
            this.select(null);

            // value other than an autocomplete item in input
          } else {
            this.$emit("enter", this.$refs.input.value);
            this.close();
          }

          // make sure to allow tab out of the input
          if (event.key !== "Tab") {
            event.preventDefault();
          }
          break;

        case "ArrowUp":
          this.navigate(-1);
          event.preventDefault();
          break;
        case "ArrowDown":
          this.navigate(1);
          event.preventDefault();
          break;

        case "ArrowLeft":
        case "Backspace":
          this.$emit("left", event);
          this.close();
          break;
      }
    },
    navigate(direction) {
      this.selected = this.selected + direction;

      // top of dropdown list
      if (this.selected <= -1) {
        return this.close();
      }

      // bottom of dropdown list
      if (this.selected > this.items.length - 1) {
        this.selected = this.items.length - 1;
      }
    },
    search(query) {
      if (query === "") {
        this.items = [];
        this.$refs.items.close();
        return;
      }

      // Filter options by query to retrieve items (no more than this.limit)
      const regex = new RegExp(query, "ig");

      this.items = this.options
        .filter(item => item.text.match(regex) !== null)
        .slice(0, this.limit);
      this.highlight();
      this.$refs.items.open();
    },
    select(value) {
      // use currently selected item
      if (value === null && this.items[this.selected]) {
        value = this.items[this.selected].value;
      }

      // make sure input events includes whole option object
      this.$emit("input", this.options.find(x => x.value === value));
      this.close();
    }
  }
};
</script>

<style lang="scss">
.kirby-dropdown-item.is-selected {
  background: $color-focus;
  color: #fff !important;
}

.kirby-autocomplete-input .kirby-dropdown-item b {
  color: #fff !important;
}
</style>
