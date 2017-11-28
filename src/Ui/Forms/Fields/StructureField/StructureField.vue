<template>

  <kirby-field class="kirby-structure-field" v-bind="$props">

    <template slot="options">
      <kirby-button-group>
        <kirby-button icon="add" @click="add">Add</kirby-button>
      </kirby-button-group>
    </template>

    <template slot="content">

      <kirby-table>

        <kirby-table-body>
          <kirby-table-row v-for="(row, index) in value" :key="index">
            <kirby-table-cell v-for="field in fields" :key="field.name">
              {{ row[field.name] }}
            </kirby-table-cell>
            <kirby-table-cell type="button">
              <kirby-button icon="edit" @click="edit(row)" />
            </kirby-table-cell>
            <kirby-table-cell type="button">
              <kirby-button icon="trash" @click="remove(row)" />
            </kirby-table-cell>
          </kirby-table-row>
        </kirby-table-body>

      </kirby-table>

      <kirby-dialog ref="form" size="medium" :button="form.button" state="positive">

        <kirby-button-group v-if="form.pagination" slot="options">
          <kirby-button icon="angle-left" @click="prev"></kirby-button>
          <kirby-button icon="angle-right" @click="next"></kirby-button>
        </kirby-button-group>

        <form>
          <kirby-fieldset :fields="fields" :values="row" />
        </form>

      </kirby-dialog>

      <kirby-dialog ref="remove" button="Delete" state="negative">
        <kirby-txt>
          Do you really want to remove this row?
        </kirby-txt>
      </kirby-dialog>

    </template>

  </kirby-field>

</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    value: {
      type: Array,
      default: []
    },
    name: {
      default: 'structure'
    },
    label: {
      default: 'Items'
    },
    fields: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      row: {},
      form: {},
    };
  },
  methods: {
    prev() {
      let index = this.value.indexOf(this.row);
      if (index > 0) {
        this.edit(this.value[index - 1]);
      } else {
        this.edit(this.value[this.value.length - 1]);
      }
    },
    next() {
      let index = this.value.indexOf(this.row);
      if (index < this.value.length - 1) {
        this.edit(this.value[index + 1]);
      } else {
        this.edit(this.value[0]);
      }
    },
    add() {
      this.row  = {};
      this.form = {
        headline: 'Add a new row',
        button: 'Create',
        pagination: false
      };
      this.$refs.form.open();
    },
    edit(row) {
      this.row  = row;
      this.form = {
        headline: 'Edit table row',
        button: 'Save',
        pagination: true
      };
      this.$refs.form.open();
    },
    remove(row) {
      this.row = row;
      this.$refs.remove.open();
    }
  }
}

</script>

<style lang="scss">


.kirby-table-field {

  .kirby-table-cell {
    vertical-align: top;
  }

  .kirby-table-header {

    .kirby-table-header-cell {
      color: $color-dark-grey;
      border-bottom: 2px solid $color-background;

      &:not([data-type="button"]) {
        [dir="ltr"] & {
          border-left: 1px dashed $color-border;
        }
        [dir="rtl"] & {
          border-right: 1px dashed $color-border;
        }
      }
    }

  }

}

</style>
