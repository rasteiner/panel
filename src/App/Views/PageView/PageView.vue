<template>

  <kirby-view class="kirby-page-view">

    <kirby-header :label="$t('page.list')" link="/pages"
      :icon="icon"
      :breadcrumb="breadcrumb"
      :pagination="pagination">

      <kirby-fancy-input
        ref="title"
        class="kirby-page-title"
        :key="page.id + '-title'"
        :value="page.title"
        :placeholder="$t('page.title') + ' …'"
        tag="div"
        @blur="updateTitle($event.target.innerText)"
        @enter="$event.target.blur()" />


      <template slot="buttons-left" v-if="!task">
        <kirby-button icon="preview" @click="action('preview')">
          {{ $t('page.preview') }}
        </kirby-button>
        <kirby-button v-if="!site" icon="toggle-on" @click="action('status')">
          Draft
        </kirby-button>
        <kirby-dropdown v-if="!site">
          <kirby-button @click="$refs.settings.toggle()" icon="cog">
            {{ $t('settings') }}
          </kirby-button>
          <kirby-dropdown-content :dark="true" ref="settings">
            <kirby-dropdown-item icon="copy" @click="action('copy')">
              {{ $t('copy') }}
            </kirby-dropdown-item>
            <kirby-dropdown-item icon="code" @click="action('template')">
              {{ $t('page.template.change') }}
            </kirby-dropdown-item>
            <kirby-dropdown-item icon="chain" @click="action('url')">
              {{ $t("page.url.change") }}
            </kirby-dropdown-item>
            <kirby-dropdown-item icon="trash" @click="action('remove')">
              {{ $t("delete") }}
            </kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
      </template>

      <template slot="buttons-left" v-if="task">
        <div class="kirby-page-task">{{ task }}</div>
      </template>

      <template slot="buttons-right" v-if="!task">
        <kirby-translations></kirby-translations>
      </template>

      <template slot="buttons-right" v-if="!template.current">
        <kirby-button icon="check" state="positive" @click="updateTemplate" v-if="template.selected">Confirm</kirby-button>
        <kirby-button icon="edit" @click="template.selected = ''" v-if="template.selected">Re-select</kirby-button>
        <kirby-button icon="cancel" @click="cancelTemplate">Cancel</kirby-button>
      </template>

    </kirby-header>

    <kirby-grid class="kirby-sections" v-if="page && template.current" gutter="large">
      <kirby-column v-for="(column, columnIndex) in layout" :key="page.id + '-column-' + columnIndex" :width="column.width">
        <component
          v-for="(section, sectionIndex) in column.sections"
          :key="page.id + '-section-' + sectionIndex"
          :is="'kirby-' + section.type + '-section'"
          :page="page"
          v-bind="section" />
      </kirby-column>
    </kirby-grid>


    <kirby-page-template-selector
      v-if="!template.current && !template.selected"
      @select="selectTemplate">
    </kirby-page-template-selector>

    <kirby-page-template-review
      v-if="!template.current && template.selected"
      :page="page"
      :template="template.selected">
    </kirby-page-template-review>


    <kirby-page-url-dialog ref="url"></kirby-page-url-dialog>
    <kirby-page-remove-dialog ref="remove"></kirby-page-remove-dialog>

  </kirby-view>

</template>

<script>

import slugify from 'slugify';
import PageQuery from 'App/Api/PageQuery.js';
import CreatePage from 'App/Api/CreatePage.js';
import UpdatePage from 'App/Api/UpdatePage.js';
import LayoutQuery from 'App/Api/LayoutQuery.js';

export default {
  props: ['path', 'initial'],
  data () {
    return {
      site: false,
      page: {
        title: '',
        id: ''
      },
      icon: 'page',
      breadcrumb: [],
      pagination: {},
      template: {
        current: '',
        selected: ''
      },
      layout: []
    }
  },
  computed: {
    task () {
      if (!this.page.title) {
        return 'Please enter a page title…'
      }

      if (!this.template.current) {
        if (!this.template.selected) {
          return 'Select a  template…';
        }
        return 'Review and confirm changes…';
      }
    }
  },
  created () {
    this.fetch();
  },
  watch: {
    $route () {
      this.fetch();
    }
  },
  methods: {
    fetch() {

      // Prepare adding a new page
      if (this.initial) {
        // Reset to initial data since component is reused
        Object.assign(this.$data, this.$options.data.call(this));
        // Focus on empty title
        this.$nextTick(() => {
          this.$el.querySelector('.kirby-page-title').focus()
        })
        return false;
      }


      // Load site
      if (!this.path || this.path === '/') {
        this.site             = true;
        this.page             = {id: '_site', title: 'Site', url: '/'};
        this.breadcrumb       = [];
        this.template.current = 'site';
        this.layout           = LayoutQuery('site');
        return true;
      }

      // Load page
      PageQuery(this.path).then((page) => {
        this.site             = false;
        this.page             = page;
        this.breadcrumb       = page.breadcrumb;
        this.template.current = page.template;
        this.layout           = LayoutQuery(this.page.template, this.page);
      });
    },
    create (template) {

      // Error for empty title
      if (!this.page.title) {
        this.$el.querySelector('.kirby-page-title').focus()
        this.$store.dispatch('error', 'Please set a page title');
        return false;
      }

      // Create path/id
      let path = this.path + '/' + slugify(this.page.title).toLowerCase();

      // Create page through API call
      CreatePage({
        id: path,
        template: template,
        content: [
          {
            key: 'title',
            value: this.page.title
          }
        ]
      }).then(() => {
        this.$store.dispatch('success', 'The page has been created');
        // Go to newly created page
        this.$router.push({
          name: 'Page',
          params: { path: path }
        })
      });
    },
    updateTitle (title) {
      if (title === this.page.title) {
        return false;
      }

      this.page.title = title;

      if (this.page.id) {
        UpdatePage({
        id: this.page.id,
        content: [
          {
            key: 'title',
            value: title
          }
        ]
      }).then((page) => {
        this.$store.dispatch('success', 'The page title has been updated');
      });
      }
    },
    selectTemplate (item) {
      if (!this.page.id) {
        this.create(item.id)
      } else {
        this.template.selected = item.id
      }
    },
    updateTemplate () {
      this.page.template    = this.template.selected;
      this.template.current = this.template.selected;
      this.layout           = LayoutQuery(this.page.template, this.page);
    },
    cancelTemplate () {
      // Cancel creating page
      if (this.initial) {
        this.$router.push({
          name: 'Page',
          params: { path: this.path }
        })

      // Cancel switching template
      } else {
        this.template.current = this.page.template
      }
    },
    action (action) {
      switch (action) {
        case 'preview':
          window.open(this.page.url);
          break;
        case 'url':
          this.$refs.url.open(this.page.id);
          break;
        case 'template':
          this.template = {
            current:  '',
            selected: ''
          };
          break;
        case 'remove':
          this.$refs.remove.open(this.page.id);
          break;
        default:
          this.$store.dispatch('error', 'Not yet implemented');
          break;
      }
    }
  }
}

</script>

<style lang="scss">

.kirby-page-view .kirby-column section:not(:last-child) {
  margin-bottom: 1.5rem;
}

.kirby-page-view .kirby-page-title {
  padding-left: .5rem;
  padding-right: .5rem;
  width: calc(100% + 1rem);

  [dir="ltr"] & {
    margin-left: -.5rem;
  }
  [dir="rtl"] & {
    margin-right: -.5rem;
  }
}

.kirby-page-view .kirby-page-title:focus {
  @include focus-ring;
  background: #fff;
}

.kirby-page-task {
  position:    relative;
  padding:     1rem;
  font-size:   $font-size-small;
  font-family: $font-family-mono;
  line-height: inherit;
  color:       $color-dark-grey;
}

</style>
