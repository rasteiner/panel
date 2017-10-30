<template>
  <kirby-view key="site-view" class="kirby-site-view">
    <kirby-header :label="$t('page.list')" link="/pages" icon="page">
      {{ site.title }}
      <template slot="buttons-left">
        <kirby-button icon="preview" @click="preview">
          Preview
        </kirby-button>
      </template>
    </kirby-header>
    <kirby-sections v-if="site" :model="site" :layout="layout" />
  </kirby-view>
</template>

<script>

export default {
  data () {
    return {
      site: {
        title: null,
        content: {}
      },
      layout: [],
    }
  },
  created () {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$api.site.get().then((site) => {
        this.$api.site.blueprint().then((blueprint) => {
          this.site   = site;
          this.layout = blueprint.layout;
          this.$store.dispatch('isLoading', false);
        });
      });
    },
    preview () {
      window.open(this.site.url);
    }
  }
}

</script>
