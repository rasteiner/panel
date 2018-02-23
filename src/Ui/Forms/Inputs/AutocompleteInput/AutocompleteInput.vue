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
      const regex = new RegExp(`(${this.query})`, "i");
      this.items.forEach(item => {
        item.matched = item.text.replace(regex, "<b>$1</b>");
      });
    },
    keydown(event) {
      if (this.items[this.selected]) {
        this.select(null);
        event.preventDefault();
      } else {
        switch (event.key) {
          case "Enter":
          case this.separator:
            this.$emit("enter", this.$refs.input.value);
            this.close();
            event.preventDefault();
            break;
          case "Tab":
            this.$emit("tab", this.$refs.input.value);
            this.close();
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
      }
    },
    navigate(direction) {
      this.selected = this.selected + direction;

      if (this.selected <= -1) {
        return this.close();
      }

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

      const regex = new RegExp(query, "ig");

      this.items = this.options.filter(item => {
        if (item.text.match(regex)) {
          return true;
        }

        return false;
      });

      this.items = this.items.slice(0, this.limit);
      this.highlight();
      this.$refs.items.open();
    },
    select(value) {
      if (value === null && this.items[this.selected]) {
        value = this.items[this.selected].value;
      }

      this.$emit("input", this.items.find(x => x.value === value));
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
