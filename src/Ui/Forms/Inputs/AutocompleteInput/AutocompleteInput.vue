<template>
  <kirby-dropdown class="kirby-autocomplete-input">
    <input
      type="text"
      ref="input"
      :id="id"
      v-model="query"
      @keydown.tab.prevent="keydown"
      @keydown.enter.prevent="keydown"
      @keydown.up.prevent="navigate(-1)"
      @keydown.down.prevent="navigate(1)" />
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
    value: {},
    options: [Array, Object],
    limit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      state: this.value,
      items: [],
      query: null,
      selected: -1
    };
  },
  watch: {
    query() {
      this.search(this.query);
    },
    value(state) {
      this.state = state;
    }
  },
  methods: {
    input(state) {
      this.state = state;
      this.$emit("input", this.state);
    },
    search(query) {
      if (query === "") {
        this.items = [];
        this.$refs.items.close();
        return;
      }

      const regex = new RegExp(query, "ig");

      this.items = this.options.filter(item => {
        if (item.text.match(regex) || item.value.match(regex)) {
          return true;
        }

        return false;
      });

      this.items = this.items.slice(0, this.limit);
      this.highlight();
      this.$refs.items.open();
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
      } else {
        this.close();
      }
    },
    select(value) {
      if (value === null && this.items[this.selected]) {
        value = this.items[this.selected].value;
      }

      this.input(this.items.find(x => x.value === value));
      this.close();
    },
    clear() {
      this.$refs.input.value = "";
    },
    close() {
      this.$refs.items.close();
      this.selected = -1;
    },
    focus() {
      this.$refs.input.focus();
    },
    navigate(direction) {
      this.selected = this.selected + direction;

      if (this.selected <= -1) {
        return this.close();
      }

      if (this.selected > this.items.length - 1) {
        this.selected = this.items.length - 1;
      }
    }
  }
};
</script>

<style lang="scss">
.kirby-dropdown-item.is-selected {
  background: $color-focus;
  color: #fff !important;
}
</style>
