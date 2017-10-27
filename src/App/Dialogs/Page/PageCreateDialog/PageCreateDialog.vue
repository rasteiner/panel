<template>
  <kirby-dialog ref="dialog" size="medium" state="positive" button="Create" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="page" @submit="submit" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import slug from 'App/Helpers/slug.js';

export default {
  mixins: [DialogMixin],
  data () {
    return {
      parent: null,
      options: [],
      page: {
        title: null,
        template: null
      }
    };
  },
  computed: {
    model () {
      return (!this.parent || this.parent === '/') ? 'site' : 'page';
    },
    fields () {

      const fields = [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          icon: 'title'
        },
      ];

      if (this.options.length > 1) {
        fields.push({
          name: 'template',
          label: 'Template',
          type: 'select',
          required: true,
          options: this.options
        });
      }

      return fields;

    }
  },
  methods: {
    open (parent) {

      this.parent = parent;

      this.$api[this.model].blueprints(this.parent).then((blueprints) => {

        if (blueprints.length === 0) {
          this.$store.dispatch('error', 'You are not allowed to add any subpages');
          return;
        }

        this.options = blueprints.map((blueprint) => {
          return {
            value: blueprint.name,
            text: blueprint.title || blueprint.name
          }
        });

        this.$refs.dialog.open();

      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });

    },
    submit () {

      if (!this.page.template) {
        this.page.template = this.options[0].value;
      }

      const data = {
        template: this.page.template,
        slug: slug(this.page.title),
        content: {
          title: this.page.title
        }
      };

      this.$api.page.create(this.parent, data).then((page) => {
        this.$refs.dialog.close();
        this.$router.push('/pages/' + page.id);
        this.$store.dispatch('success', 'The page has been create');
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });

    }
  }
}

</script>
