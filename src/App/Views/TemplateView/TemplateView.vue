<template>

  <kirby-view class="kirby-template-view">

    <kirby-header :label="$t('page.list')" link="/pages"
      :icon="icon"
      :breadcrumb="breadcrumb">

      <div class="kirby-page-title">
        Template for <span>{{ page.title }}</span>
      </div>

      <template slot="buttons-left">
        <kirby-button @click="select">
          Please select a template…
        </kirby-button>
      </template>

      <template slot="buttons-right">
        <kirby-button icon="cancel" @click="cancel">
          Cancel
        </kirby-button>
      </template>
    </kirby-header>

    <section v-if="step === 'select'">

      <kirby-collection layout="cards" :items="[
        {
          id:   'default',
          text: 'Default',
          info: 'Just a text block'
        },
        {
          id:   'article',
          text: 'Article',
          info: 'A blog article'
        },
        {
          id:   'project',
          text: 'Project',
          info: 'A portfolio Project'
        }
      ]"></kirby-collection>
    </section>


    <section v-if="step === 'confirm'">
      Here you can see the implications your template choice would have
    </section>

  </kirby-view>

</template>

<script>


import PageQuery from 'App/Api/PageQuery.js';

export default {
  props: ['path'],
  data () {
    return {
      step: 'select',
      page: {
        title: '',
        id: ''
      },
      icon: 'page',
      breadcrumb: []
    }
  },
  created () {
    this.fetch();
  },
  methods: {
    select () {
      this.step = "confirm";
    },
    cancel () {
      this.$router.push({
        name: 'Page',
        params: { path: this.path }
      });
    },
    fetch () {

      if (!this.path || this.path === '/') {
        console.log('Site blueprint cannot be changed!');
        return false;
      }

      PageQuery(this.path).then((page) => {
        this.page       = page;
        this.breadcrumb = page.breadcrumb;
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

</style>
