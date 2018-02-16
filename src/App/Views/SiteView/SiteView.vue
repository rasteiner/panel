<template>
  <kirby-view key="site-view" class="kirby-site-view">
    <kirby-header :label="$t('page.list')" link="/pages" icon="page">
      {{ site.title }}
      <template slot="buttons-left">
        <kirby-button icon="preview" @click="preview">
          Preview
        </kirby-button>
      </template>

      <template v-if="isLoading === false" slot="buttons-right">
        <kirby-tabs-dropdown v-if="tabs.length > 1" :tabs="tabs" @open="$refs.tabs.open($event)" />
      </template>

    </kirby-header>

    <kirby-tabs key="site-tabs" v-if="isLoading === false" parent="site" :tabs="tabs" ref="tabs" />

  </kirby-view>
</template>

<script>

export default {
  data () {
    return {
      site: {
        id: null,
        title: null,
      },
      tabs: [],
      isLoading: true
    }
  },
  created () {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$api.site.get({view: 'panel'}).then((site) => {
        this.site = site;
        this.tabs = site.blueprint.tabs;
        this.isLoading = false;
        this.$store.dispatch('isLoading', false);
      });
    },
    preview () {
      window.open(this.site.url);
    }
  }
}

</script>
