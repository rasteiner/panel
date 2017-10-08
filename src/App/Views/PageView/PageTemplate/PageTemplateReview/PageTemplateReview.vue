<template>
  <div class="kirby-page-template-review">

    <kirby-grid class="kirby-sections" gutter="small">
      <kirby-column width="1/3">
        <kirby-card
          :text="'New template: ' + template"
          :info="'Old template: ' + page.template"
          :image="{
            url: 'https://unsplash.it/600/400/?random'
          }"></kirby-card>
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

  </div>
</template>

<script>

export default {
  props: ['page', 'template'],
  computed: {
    changes () {
      if (this.template) {
        console.log(this.template);
      }
      return [
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
  }
}

</script>
