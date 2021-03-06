<template>
  <kirby-button-group class="kirby-pagination" v-if="show" :data-align="align">
    <kirby-button
      :disabled="!hasPrev"
      @click="prev"
      icon="angle-left"
      :alt="prevLabel"
    />

    <kirby-dropdown v-if="details">
      <kirby-button @click="$refs.dropdown.toggle()" :disabled="!hasPages">
        <template v-if="total > 1">{{ detailsText }}</template>{{ total }}
      </kirby-button>

      <kirby-dropdown-content @open="$nextTick(() => $refs.page.focus())" class="kirby-pagination-selector" ref="dropdown">
        <div>
          <label for="kirby-pagination-input">{{ pageLabel }}</label>
          <input id="kirby-pagination-input" ref="page" type="number" :value="currentPage" @input="goTo($event.target.value)" @focus="$event.target.select()" :min="1" :max="pages">
        </div>
      </kirby-dropdown-content>
    </kirby-dropdown>

    <kirby-button
      :disabled="!hasNext"
      @click="next"
      icon="angle-right"
      :alt="nextLabel"
    />
  </kirby-button-group>
</template>

<script>
export default {
  props: {
    align: {
      type: String,
      default: "left"
    },
    details: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    keys: {
      type: Boolean,
      default: false
    },
    pageLabel: {
      type: String,
      default: "Page"
    },
    prevLabel: {
      type: String,
      default: "Previous"
    },
    nextLabel: {
      type: String,
      default: "Next"
    }
  },
  computed: {
    show() {
      return this.pages > 1;
    },
    start() {
      return (this.currentPage - 1) * this.limit + 1;
    },
    end() {
      let value = this.start - 1 + this.limit;

      if (value > this.total) {
        return this.total;
      } else {
        return value;
      }
    },
    detailsText() {
      if (this.limit === 1) {
        return this.start + " / ";
      } else {
        return this.start + "-" + this.end + " / ";
      }
    },
    pages() {
      return Math.ceil(this.total / this.limit);
    },
    hasPrev() {
      return this.start > 1;
    },
    hasNext() {
      return this.end < this.total;
    },
    hasPages() {
      return this.total > this.limit;
    },
    offset() {
      return this.start - 1;
    }
  },
  data() {
    return {
      currentPage: this.page
    };
  },
  methods: {
    goTo(page) {
      if (page < 1) {
        page = 1;
      }

      if (page > this.pages) {
        page = this.pages;
      }

      this.currentPage = page;

      this.$emit("paginate", {
        page: parseInt(this.currentPage),
        start: this.start,
        end: this.end,
        limit: this.limit,
        offset: this.offset
      });
    },
    prev() {
      this.goTo(this.currentPage - 1);
    },
    next() {
      this.goTo(this.currentPage + 1);
    },
    navigate(e) {
      switch (e.code) {
        case "ArrowLeft":
          this.prev();
          break;
        case "ArrowRight":
          this.next();
          break;
      }
    }
  },
  created() {
    if (this.keys === true) {
      window.addEventListener("keydown", this.navigate, false);
    }
  },
  destroyed() {
    window.removeEventListener("keydown", this.navigate, false);
  }
};
</script>

<style lang="scss">
.kirby-pagination {
  user-select: none;
}
.kirby-pagination .kirby-button {
  padding: 1rem !important;
}
.kirby-pagination[data-align="center"] {
  text-align: center;
}
.kirby-pagination[data-align="right"] {
  [dir="ltr"] & {
    text-align: right;
  }
  [dir="rtl"] & {
    text-align: left;
  }
}

.kirby-pagination-selector {
  width: 100%;
  padding: 0 !important;
}
.kirby-pagination-selector > div {
  font-size: 14px;
  display: flex;
  font-family: $font-family-mono;
}
.kirby-pagination-selector > div > label {
  padding: 0.5rem 1rem;

  [dir="ltr"] & {
    border-right: 1px solid rgba(#fff, 0.1);
  }
  [dir="rtl"] & {
    border-left: 1px solid rgba(#fff, 0.1);
  }
}
.kirby-pagination-selector > div > input {
  flex-grow: 1;
  font: inherit;
  border: 0;
  background: 0;
  color: inherit;
  padding: 0.5rem 1rem;
  border-top-right-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
}
.kirby-pagination-selector > div > input:focus {
  outline: 0;
  background: $color-focus;
  color: $color-dark;
}
</style>
