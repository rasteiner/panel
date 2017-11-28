<template>

  <kirby-view class="kirby-page-view">

    <kirby-header :label="$t('page.list')" link="/pages"
      :icon="icon"
      :breadcrumb="breadcrumb"
      :pagination="pagination"
      @prev="prev"
      @next="next">

      <kirby-fancy-input
        type="headline"
        tag="div"
        :key="page.id + '-title'"
        :value="page.title"
        :placeholder="$t('page.title') + ' …'"
        @input="updateTitle"
        @blur="saveTitle"
        @enter="saveTitle" />

      <template slot="buttons-left">
        <kirby-button icon="preview" @click="action('preview')">
          {{ $t('page.preview') }}
        </kirby-button>
        <kirby-button :icon="status.icon" @click="action('status')">
          {{ status.text }}
        </kirby-button>
        <kirby-dropdown>
          <kirby-button @click="$refs.settings.toggle()" icon="cog">
            {{ $t('settings') }}
          </kirby-button>
          <kirby-dropdown-content ref="settings" :options="options" @action="action" />
        </kirby-dropdown>
      </template>

    </kirby-header>

    <kirby-sections v-if="page" :self="self" :model="page" :values="page.content" :layout="layout" @submit="save" />

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
      page: {
        title: '',
        id: null,
        content: {},
        prev: null,
        next: null,
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
    self () {
      return 'site.find("' + this.page.id + '")';
    },
    options () {
      return window.panel.config.api + '/pages/' + this.page.id + '/options?not=preview,status';
    },
    status () {

      if (this.page.isVisible) {
        return {
          icon: 'toggle-on',
          text: 'Public'
        };
      } else {
        return {
          icon: 'toggle-off',
          text: 'Unlisted'
        };
      }

    },
    pagination () {
      return {
        prev: this.page.prev ? true : false,
        prevLabel: 'Previous page',
        next: this.page.next ? true : false,
        nextLabel: 'Next page'
      };
    }
  },
  methods: {
    fetch() {

      this.$api.page.get(this.path).then((page) => {
        this.$api.page.blueprint(page.id).then((blueprint) => {
          this.page       = page;
          this.page.title = page.content.title;
          this.breadcrumb = this.$api.page.breadcrumb(page);
          this.layout     = blueprint.layout;
          this.$store.dispatch('isLoading', false);
        });
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });

    },
    save (data) {

      // always store the latest title
      data.title = this.page.title;

      this.$api.page.update(this.page.id, data).then(() => {
        this.$store.dispatch('success', 'Saved!');
        this.$events.$emit('page.update');
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });

    },
    updateTitle (title) {
      this.page.title = title;
    },
    saveTitle () {

      if (this.page.title === this.page.content.title) {
        return true;
      }

      this.save({ title: this.page.title });

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

</style>
