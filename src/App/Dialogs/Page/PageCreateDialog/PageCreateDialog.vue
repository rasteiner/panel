<template>
  <kirby-dialog ref="dialog" headline="Create a new page" state="positive" button="Create" @submit="submit">
    <kirby-fieldset :fields="[
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        required: true,
        icon: 'title'
      },
      {
        name: 'uid',
        label: 'URL appendix',
        type: 'text',
        required: true,
        icon: 'chain'
      },
      {
        name: 'template',
        label: 'Template',
        type: 'select',
        required: true,
        options: [
          {value: 'default', text: 'Default Page'},
          {value: 'article', text: 'Article'},
          {value: 'project', text: 'Project'}
        ]
      }
    ]" :values="values" @input="slugify" />
  </kirby-dialog>
</template>

<script>

import slugify from 'slugify';
import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import PageQuery from 'App/Api/PageQuery.js';
import CreatePage from 'App/Api/CreatePage.js';

export default {
  mixins: [DialogMixin],
  data() {
    return {
      page: {},
      values: {
        title: '',
        uid: '',
        template: ''
      }
    };
  },
  methods: {
    open (id) {
      PageQuery(id).then((page) => {
        this.page = page;
        this.$refs.dialog.open();
      });
    },
    slugify (values) {
      this.values.uid = slugify(this.values.title).toLowerCase();
    },
    submit () {

      CreatePage({
        id: this.page.id + '/' + this.values.uid,
        template: this.values.template || 'default',
        content: [
          {
            key: 'title',
            value: this.values.title
          }
        ]
      }).then(() => {
        this.$store.dispatch('success', 'The page has been created');
        this.$emit('success');
      });

    }
  }
}

</script>
