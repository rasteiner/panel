<template>

  <kirby-field class="kirby-table-field" v-bind="$props">

    <template slot="options">
      <kirby-button-group>
        <kirby-button icon="plus-circle" @click="add()">Add</kirby-button>
      </kirby-button-group>
    </template>

    <template slot="content">

      <kirby-input>
        
        <kirby-table>
          <kirby-table-header>
            <kirby-table-header-cell v-for="field in fields" :key="field.name" v-if="field.hidden !== true">
              {{ field.label }}
            </kirby-table-header-cell>
            <kirby-table-header-cell type="button"></kirby-table-header-cell>
            <kirby-table-header-cell type="button"></kirby-table-header-cell>
          </kirby-table-header>

          <kirby-table-body>
            <kirby-table-row v-for="(row, index) in value" :key="index">
              <kirby-table-cell v-for="field in fields" :key="field.name" v-if="field.hidden !== true">
                {{ row[field.name] }}
              </kirby-table-cell>
              <kirby-table-cell type="button">
                <kirby-button icon="pencil" @click="edit(row)" />
              </kirby-table-cell>
              <kirby-table-cell type="button">
                <kirby-button icon="trash-o" @click="remove(row)" />
              </kirby-table-cell>
            </kirby-table-row>
          </kirby-table-body>

        </kirby-table>

      </kirby-input>

      <kirby-dialog ref="form" size="medium" :headline="form.headline" :button="form.button" state="positive">

        <kirby-button-group v-if="form.pagination" slot="options">
          <kirby-button icon="angle-left" @click="prev"></kirby-button>
          <kirby-button icon="angle-right" @click="next"></kirby-button>
        </kirby-button-group>

        <form>
          <kirby-fieldset :fields="fields" :values="row" />
        </form>
      
      </kirby-dialog>
  
      <kirby-dialog ref="remove" headline="Delete table row" button="Delete" state="negative">
        <kirby-txt>
          Do you really want to remove this row?
        </kirby-txt>
      </kirby-dialog>

    </template>

  </kirby-field>  

</template>

<script>

import Field from '../../Field/Field.vue';
import Fieldset from '../../Fieldset/Fieldset.vue';
import Input from '../../Input/Input.vue';
import Button from '../../../Buttons/Button/Button.vue';
import ButtonGroup from '../../../Buttons/ButtonGroup/ButtonGroup.vue';
import Table from '../../../Layout/Table/Table.vue';
import TableRow from '../../../Layout/Table/TableRow.vue';
import TableBody from '../../../Layout/Table/TableBody.vue';
import TableHeader from '../../../Layout/Table/TableHeader.vue';
import TableHeaderCell from '../../../Layout/Table/TableHeaderCell.vue';
import TableCell from '../../../Layout/Table/TableCell.vue';
import Dialog from '../../../Dialogs/Dialog/Dialog.vue';
import Txt from '../../../Text/Txt/Txt.vue';

export default {
  components: {
    'kirby-field': Field,
    'kirby-fieldset': Fieldset,
    'kirby-input': Input,
    'kirby-button': Button,
    'kirby-button-group': ButtonGroup,
    'kirby-table': Table,
    'kirby-table-header': TableHeader,
    'kirby-table-header-cell': TableHeaderCell,
    'kirby-table-body': TableBody,
    'kirby-table-row': TableRow,
    'kirby-table-cell': TableCell,
    'kirby-dialog': Dialog,
    'kirby-txt': Txt
  },  
  data() {
    return {
      row: {},
      form: {},
    };
  },
  props: {
    label: {
      type: String,
      default: 'Table'
    },
    required: {
      type: Boolean,
      default: false
    },
    fields: {},
    value: {}
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

.kirby-dialog {

  .kirby-fieldset {
    margin-bottom: -3rem;
  }

  .kirby-dialog-header .kirby-icon {
    color: #fff;
  }
  
  .kirby-dialog-header .kirby-button-group .kirby-button:last-child {
    padding-right: 1.5rem;
  }

}

.kirby-table-field {

  .kirby-table-cell {
    vertical-align: top;
  }
  
  .kirby-table-header {

    .kirby-table-header-cell {
      color: $color-dark-grey;
      border-bottom: 2px solid $color-background;
      border-left: 1px dashed $color-border;
    }

    .kirby-table-header-cell[data-type="button"] {
      border-left: none;
    }

  }

}

</style>