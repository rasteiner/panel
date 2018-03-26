<template>
  <kirby-view key="site-view" class="kirby-site-view">
    <kirby-header>
      {{ site.title }}
      <template slot="buttons-left">
        <kirby-button icon="open" @click="preview">
          Open
        </kirby-button>
        <kirby-tabs-dropdown v-if="tabs.length > 1" :tabs="tabs" @open="$refs.tabs.open($event)" />
      </template>

      <template v-if="site.url" slot="buttons-right">
          <kirby-form-buttons id="site" />
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
        this.$store.commit("breadcrumb", []);
        this.$store.dispatch("title", "Site");
      });
    },
    preview() {
      window.open(this.site.url);
    }
  }
};
</script>
