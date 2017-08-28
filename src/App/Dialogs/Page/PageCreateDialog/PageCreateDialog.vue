<template>
  <kirby-dialog ref="dialog" headline="Create a new page" state="positive" button="Create">
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
    ]" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Dialogs/Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin]
}

</script>
