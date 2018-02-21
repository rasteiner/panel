<template>
  <kirby-view key="site-view" class="kirby-site-view">
    <kirby-header :label="$t('page.list')" link="/pages" icon="page">
      {{ site.title }}
      <template slot="buttons-left">
        <kirby-button icon="preview" @click="preview">
          Preview
        </kirby-button>
      </template>

      <template v-if="site.url" slot="buttons-right">
        <kirby-tabs-dropdown v-if="tabs.length > 1" :tabs="tabs" @open="$refs.tabs.open($event)" />
      </template>

    </kirby-header>

    <kirby-tabs key="site-tabs" v-if="site.url" parent="site" :tabs="tabs" ref="tabs" />

  </kirby-view>
</template>

<script>
export default {
  data() {
    return {
      site: {
        title: null,
        url: null
      },
      tabs: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$api.site.get({ view: "panel" }).then(site => {
        this.site = site;
        this.tabs = site.blueprint.tabs;
        this.$store.dispatch("title", "Site");
      });
    },
    preview() {
      window.open(this.site.url);
    }
  }
};
</script>
