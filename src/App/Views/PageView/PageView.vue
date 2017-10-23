<template>

  <kirby-view class="kirby-page-view">

    <kirby-header :label="$t('page.list')" link="/pages"
      :icon="icon"
      :breadcrumb="breadcrumb"
      :pagination="pagination"
      @prev="prev"
      @next="next">

      <kirby-fancy-input v-if="site === false"
        class="kirby-page-title"
        :key="page.id + '-title'"
        :value="page.title"
        :placeholder="$t('page.title') + ' …'"
        tag="div"
        @blur="updateTitle($event.target.innerText)"
        @enter="$event.target.blur()" />
      <div v-else class="kirby-page-title">{{ page.title }}</div>

      <template slot="buttons-left">
        <kirby-button icon="preview" @click="action('preview')">
          {{ $t('page.preview') }}
        </kirby-button>
        <kirby-button v-if="!site" icon="toggle-on" @click="action('status')">
          {{ status }}
        </kirby-button>
        <kirby-dropdown v-if="!site">
          <kirby-button @click="$refs.settings.toggle()" icon="cog">
            {{ $t('settings') }}
          </kirby-button>
          <kirby-dropdown-content :dark="true" ref="settings" :options="options" @action="action" />
        </kirby-dropdown>
      </template>

      <template slot="buttons-right">
        <kirby-translations></kirby-translations>
      </template>

    </kirby-header>

    <kirby-grid class="kirby-sections" v-if="page" gutter="large">
      <kirby-column v-for="(column, columnIndex) in layout" :key="page.id + '-column-' + columnIndex" :width="column.width">
        <component
          v-for="(section, sectionIndex) in column.sections"
          :key="page.id + '-section-' + sectionIndex"
          :is="'kirby-' + section.type + '-section'"
          :page="page"
          v-bind="section" />
      </kirby-column>
    </kirby-grid>

    <kirby-page-status-dialog ref="status" @success="fetch"></kirby-page-status-dialog>
    <kirby-page-url-dialog ref="url"></kirby-page-url-dialog>
    <kirby-page-remove-dialog ref="remove"></kirby-page-remove-dialog>

  </kirby-view>

</template>

<script>

export default {
  props: ['path'],
  data () {
    return {
      site: false,
      page: {
        title: '',
        id: '',
        prev: null,
        next: null
      },
      icon: 'page',
      breadcrumb: [],
      layout: [],
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
  computed: {
    status () {
      return this.page.isVisible ? 'Public' : 'Unlisted';
    },
    pagination () {

      if (this.site === true) {
        return false;
      }

      return {
        prev: this.page.prev ? true : false,
        prevLabel: 'Previous page',
        next: this.page.next ? true : false,
        nextLabel: 'Next page'
      };

    },
    options () {
      return window.panel.config.api + '/pages/' + this.page.id + '/options?not=preview,status';
    }
  },
  methods: {
    fetch() {

      if (!this.path || this.path === '/') {

        this.$api.site.get().then((site) => {
          this.$api.blueprint.get('site').then((blueprint) => {
            this.site       = true;
            this.page       = {id: '_site', title: site.title, url: site.url};
            this.breadcrumb = [];
            this.layout     = blueprint.layout;
          });
        });

        return true;

      }

      this.$api.page.get(this.path).then((page) => {
        this.$api.blueprint.get(page.template, page).then((blueprint) => {
          this.site       = false;
          this.page       = page;
          this.page.title = page.content.title;
          this.breadcrumb = this.$api.page.breadcrumb(page);
          this.layout     = blueprint.layout;
        });
      }).catch(() => {
        this.$store.dispatch('error', 'The page could not be found');
        this.$router.push('../');
      });

    },
    updateTitle (title) {
      if (title !== this.page.title) {

        this.$api.page.update(this.page.id, {title: title}).then((page) => {
          this.page.title = title;
          this.$store.dispatch('success', 'The page title has been updated');
        });

      }
    },
    prev () {
      this.$router.push('/pages/' + this.page.prev);
    },
    next () {
      this.$router.push('/pages/' + this.page.next);
    },
    action (action) {
      switch (action) {
        case 'preview':
          window.open(this.page.url);
          break;
        case 'status':
          this.$refs.status.open(this.page.id);
          break;
        case 'url':
          this.$refs.url.open(this.page.id);
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

</style>
