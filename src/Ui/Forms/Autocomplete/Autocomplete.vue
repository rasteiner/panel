<template>
  <kirby-dropdown class="kirby-autocomplete">
    <input
      type="text"
      ref="input"
      :id="id"
      v-model="query"
      @keydown.tab="keydown"
      @keydown.enter="keydown"
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
import resolve from "Ui/Helpers/resolveObjectPath.js";

export default {
  props: {
    id: "",
    url: {
      required: true
    },
    value: {},
    icon: {},
    ignore: {
      default: () => {
        return [];
      }
    },
    map: {
      default() {
        return {
          value: "value",
          text: "text",
          icon: false,
          image: false,
          items: false
        };
      }
    },
    limit: {
      default: 5
    },
    matchValues: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      source: [],
      items: [],
      val: this.value,
      selected: -1,
      query: null
    };
  },
  watch: {
    query() {
      this.search(this.query);
    }
  },
  mounted() {
    fetch(this.url)
      .then(response => response.json())
      .then(json => {
        if (this.map.items) {
          json = resolve(json, this.map.items);
        }

        json.forEach(item => {
          let text =
            resolve(item, this.map.text) || resolve(item, this.map.value);

          this.source.push({
            value: resolve(item, this.map.value),
            text: text,
            matched: text,
            icon: resolve(item, this.map.icon),
            image: resolve(item, this.map.image),
            original: item
          });
        });
      });
  },
  methods: {
    search(value) {
      if (value === "") {
        this.items = [];
        this.$refs.items.close();
        return;
      }

      const regex = new RegExp(value, "ig");

      this.items = this.source.filter(item => {
        if (this.ignore.indexOf(item.text) !== -1) {
          return false;
        } else if (item.text.match(regex)) {
          return true;
        } else if (this.matchValues && item.value.match(regex)) {
          return true;
        } else {
          return false;
        }
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
        event.preventDefault();
      } else {
        switch (event.key) {
          case "Enter":
            this.$emit("enter", this.$refs.input.value);
            break;
          case "Tab":
            this.$emit("tab", this.$refs.input.value);
            break;
        }

        this.close();
      }
    },
    select(value) {
      if (value === null && this.items[this.selected]) {
        value = this.items[this.selected].value;
      }

      this.val = value;
      this.$emit("input", value);
      this.$emit("select", this.items.find(item => item.value === value));

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
