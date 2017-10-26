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
    <kirby-grid class="kirby-sections" v-if="site" gutter="large">
      <kirby-column v-for="(column, columnIndex) in layout" :key="'site-column-' + columnIndex" :width="column.width">
        <component
          v-for="(section, sectionIndex) in column.sections"
          :key="'site-section-' + sectionIndex"
          :is="'kirby-' + section.type + '-section'"
          :site="site"
          v-bind="section" />
      </kirby-column>
    </kirby-grid>
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
        this.$api.blueprint.get('site').then((blueprint) => {
          this.site   = site;
          this.layout = blueprint.layout;
        });
      });
    },
    preview () {
      window.open(this.site.url);
    }
  }
}

</script>
