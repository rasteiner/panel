<template>

  <kirby-view class="kirby-template-view">

    <kirby-header :label="$t('page.list')" link="/pages"
      icon="page"
      :breadcrumb="breadcrumb">

      <div class="kirby-page-title">
        Template for <span>{{ page.title }}</span>
      </div>

      <template slot="buttons-left">
        <div class="kirby-page-task">{{ task }}</div>
      </template>

      <template slot="buttons-right">
        <kirby-button icon="check" state="positive" @click="confirm" v-if="template">Confirm</kirby-button>
        <kirby-button icon="edit" @click="template = ''" v-if="template">Re-select</kirby-button>
        <kirby-button icon="cancel" @click="$router.push('/pages/' + path)">Cancel</kirby-button>
      </template>
    </kirby-header>


    <kirby-collection layout="cards" :items="blueprints" @click="select" />


    <kirby-grid v-if="template" class="kirby-sections" gutter="small">
      <kirby-column width="1/3">
        <kirby-collection layout="cards" @click="select" :items="preview"></kirby-collection>
      </kirby-column>

      <kirby-column width="2/3">
        <kirby-input>
          <kirby-table>
            <kirby-table-header>
              <kirby-table-header-cell>
                Field
              </kirby-table-header-cell>
              <kirby-table-header-cell>
                Type
              </kirby-table-header-cell>
              <kirby-table-header-cell>
                Old value
              </kirby-table-header-cell>
              <kirby-table-header-cell>
                New value
              </kirby-table-header-cell>
            </kirby-table-header>

            <kirby-table-body>
              <kirby-table-row v-for="change in changes" :key="change.name">
                <kirby-table-cell v-html="change.name" :state="change.state"></kirby-table-cell>
                <kirby-table-cell :state="!change.type ? 'faded' : null" v-html="change.type || '–'"></kirby-table-cell>
                <kirby-table-cell :state="!change.oldValue ? 'faded' : null" v-html="change.oldValue || '–'"></kirby-table-cell>
                <kirby-table-cell :state="!change.newValue ? 'faded' : null" v-html="change.newValue || '–'"></kirby-table-cell>
              </kirby-table-row>
            </kirby-table-body>
          </kirby-table>
        </kirby-input>
      </kirby-column>
    </kirby-grid>

  </kirby-view>

</template>

<script>

export default {
  props: ['path'],
  data () {
    return {
      page: {
        title: ''
      },
      breadcrumb: [],
      template: '',
      blueprints: [],
      changes: []
    }
  },
  created () {
    this.fetch();
  },
  computed: {
    task () {
      return !this.template ? 'Select a  template…' : 'Review and confirm changes…'
    },
    preview () {
      return [{
        id:   this.template,
        text: 'New template: ' + this.template,
        info: 'Old template: ' + this.page.template,
        image: {
          url: image(this.template)
        }
      }];
    }
  },
  watch: {
    template () {
      this.changes = [
        {
          name: 'category',
          state: 'notice',
          type: 'tags &rarr; select',
          oldValue: 'elephant, tiger',
          newValue: ''
        },
        {
          name: 'client',
          state: 'positive',
          type: 'text',
          oldValue: '',
          newValue: 'Apple'
        },
        {
          name: 'deadline',
          state: 'negative',
          type: '',
          oldValue: '2017-12-31',
          newValue: ''
        }
      ];
    }
  },
  methods: {
    image (blueprint) {
      return window.panel.config.index + '/assets/blueprints/' + blueprint + '.png';
    },
    select (item) {
      this.template = item.id;
    },
    confirm () {
      // TODO: Update template
      this.$store.dispatch('success', 'The template has been chanced');
      this.cancel();
    },
    fetch () {
      this.$api.page.get(this.path).then((page) => {
        this.page       = page;
        this.breadcrumb = this.$api.page.breadcrumb(page);

        this.$api.page.blueprints(this.page.parent).then((blueprints) => {

          if (blueprints.length <= 1) {
            this.$router.push('/pages/' + this.path );
            this.$store.dispatch('error', 'You are not allowed to change the template');
            return
          }

          this.blueprints = blueprints.map((blueprint) => {
            return {
              id:   blueprint.name,
              text: blueprint.title || item.name,
              info: blueprint.description || '',
              image: {
                url: this.image(blueprint.name)
              }
            }
          });

        });
      });
    }

  }
}

</script>

<style lang="scss">

.kirby-template-view .kirby-page-title {
  font-weight: 100;

  > span {
    font-weight: 500;
  }
}

.kirby-template-view .kirby-page-task {
  position:    relative;
  padding:     1rem;
  font-size:   $font-size-small;
  font-family: $font-family-mono;
  line-height: inherit;
  color:       $color-dark-grey;
}

.kirby-template-view .kirby-card {
  cursor: pointer;
}

</style>
