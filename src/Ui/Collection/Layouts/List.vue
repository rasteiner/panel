<template>
  <kirby-table>
    <kirby-table-body>
      <kirby-table-row v-for="(item, index) in items" :key="item.id">
        <kirby-table-cell type="image" aria-hidden="true">
          <router-link :to="item.link" tabindex="-1">
            <kirby-image :src="item.image.url" :cover="true" />
          </router-link>
        </kirby-table-cell>
        <kirby-table-cell type="link">
          <router-link v-tab :to="item.link">{{ item.text }}</router-link>
        </kirby-table-cell>
        <kirby-table-cell v-if="item.info" type="info">
          <router-link :to="item.link">{{ item.info }}</router-link>
        </kirby-table-cell>
        <kirby-table-cell v-if="item.options" type="button">
          <kirby-dropdown>
            <kirby-button
              icon="dots"
              alt="Options"
              @click="$refs['dropdown-' + index][0].toggle()">
            </kirby-button>
            <kirby-dropdown-content
              @action="$emit('action', item, $event)"
              align="right"
              :ref="'dropdown-' + index"
              :options="item.options"
              :dark="true">
            </kirby-dropdown-content>
          </kirby-dropdown>
        </kirby-table-cell>
      </kirby-table-row>
    </kirby-table-body>
  </kirby-table>
</template>

<script>

export default {
  props: ['items']
};

</script>
