<template>
  <kirby-field :label="label" :disabled="disabled" :name="name" :help="help" :error="error">
    <template slot="options">
      <kirby-button icon="add" @click="add">Add</kirby-button>
    </template>
    <template slot="content">
      <kirby-box v-if="items.length === 0">
        <kirby-button @click="add">Click to add the first item …</kirby-button>
      </kirby-box>
      <draggable v-else v-model="items" @input="input" :options="{disabled: disabled, handle: '.kirby-structure-item-handle'}" element="ul" class="kirby-structure" @choose="active = null" @end="change">
        <li class="kirby-structure-item" :data-disabled="disabled" v-for="(item, index) in items" :data-active="isActive(index)">
          <div class="kirby-structure-item-wrapper">
            <kirby-button v-if="!disabled" class="kirby-structure-item-handle" icon="sort" />
            <div class="kirby-structure-item-content">
              <p class="kirby-structure-item-text" :title="field.label" v-for="field in fields" @click="jump(index, field.name)">
                {{ item[field.name] }}
              </p>
            </div>
            <nav v-if="!disabled" class="kirby-structure-item-options">
              <kirby-button @click="toggle(index)" class="kirby-structure-option" :icon="isActive(index) ? 'angle-up' : 'angle-down'" />
              <kirby-button @click="confirmRemove(index)" class="kirby-structure-option" icon="trash" />
            </nav>
          </div>
          <div class="kirby-structure-form" v-if="!disabled" v-show="isActive(index)">
            <kirby-fieldset class="kirby-structure-fieldset" ref="form" :fields="fields" :values="item" @change="change"></kirby-fieldset>
          </div>
        </li>
      </draggable>
      <kirby-dialog v-if="!disabled" ref="remove" button="Delete" state="negative" @submit="remove">
        <kirby-txt>Do you really want to delete this item?</kirby-txt>
      </kirby-dialog>
    </template>
  </kirby-field>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  props: {
    disabled: Boolean,
    fields: Object,
    label: String,
    name: String,
    value: Array,
    error: [Object, Boolean],
    help: String
  },
  data() {
    return {
      items: this.value,
      active: null
    };
  },
  methods: {
    add() {
      let data = {};

      Object.keys(this.fields).forEach(fieldName => {
        const field = this.fields[fieldName];
        data[field.name] = field.default || null;
      });

      this.items.push(data);
      this.active = this.items.length - 1;
      this.change();
    },
    input() {
      this.$emit("input", this.items);
    },
    change() {
      this.$emit("change", this.items);
    },
    toggle(index) {
      this.active = this.active === index ? null : index;
    },
    confirmRemove(index) {
      this.active = index;
      this.$refs.remove.open();
    },
    remove() {
      this.items.splice(this.active, 1);
      this.active = null;
      this.$refs.remove.close();
      this.change();
    },
    jump(index, field) {
      this.active = index;
      this.$refs.form[index].focus(field);
    },
    isActive(index) {
      return this.active === index;
    }
  }
};
</script>

<style lang="scss">
.kirby-structure {
  list-style: none;
}
.kirby-structure-item {
  position: relative;
  margin-bottom: 2px;
  box-shadow: $box-shadow-card;
}
.kirby-structure-item.sortable-ghost {
  background: $color-inset;
  box-shadow: $color-border 0 0 0 1px inset, $box-shadow-inset;
}
.kirby-structure-item.sortable-ghost * {
  visibility: hidden;
}
.kirby-structure-item[data-disabled] {
  border: 1px solid $color-border;
  box-shadow: $box-shadow-inset;
}
.kirby-structure-item[data-disabled] .kirby-structure-item-text {
  background: none;
}

.kirby-structure-item[data-active] {
  margin-bottom: 0;
}
.kirby-structure-item[data-active] .kirby-structure-item-text {
  color: $color-focus;
}
.kirby-structure-item[data-active] .kirby-structure-item-options svg * {
  fill: $color-focus !important;
}
.kirby-structure-item-handle {
  width: 2rem;
  background: $color-white;
  cursor: -webkit-grab;
  flex-shrink: 0;
}
.kirby-structure-item-handle:active {
  cursor: -webkit-grabbing;
}
.kirby-structure-item-handle svg {
  opacity: 0.25;
}
.kirby-structure-item-wrapper {
  display: flex;
}
.kirby-structure-item-content {
  flex-grow: 1;
}
.kirby-structure-item-content {
  display: grid;
  grid-column-gap: 2px;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
}
.kirby-structure-item-text {
  padding: 0.6rem 0.75rem;
  font-size: $font-size-small;
  line-height: 1.5em;
  background: $color-white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kirby-structure-item-text:not(:first-child) {
  display: none;
  padding: 0.7rem 0.75rem;
  font-size: $font-size-tiny;
  color: $color-dark-grey;

  @media screen and (min-width: 45rem) {
    display: block;
  }
}
.kirby-structure-content {
  font-size: $font-size-small;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kirby-structure-item-text:first-child {
  min-width: 100px;
}
.kirby-structure-content,
.kirby-structure-option {
  padding: 0.6rem 0.75rem;
  line-height: 1.5em;
}
.kirby-structure-item-options {
  display: flex;
  background: #fff;
  flex-shrink: 0;
}
.kirby-structure-option {
  width: 2.5rem;
}
.kirby-structure-form {
  position: relative;
  background: $color-inset;
  border-left: 1px solid $color-border;
  border-right: 1px solid $color-border;
  padding: 1rem 2.5rem 3rem;
  box-shadow: $box-shadow-inset;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 2.5rem;
    margin-right: -6px;
    border-top: 6px solid $color-white;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
}
.kirby-structure-item:last-child .kirby-structure-form {
  border-bottom: 1px solid $color-border;
}
</style>
