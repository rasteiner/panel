import Vue from 'vue'

/* Misc */
import Bar from 'Layout/Bar/Bar.vue'
import Box from 'Layout/Box/Box.vue'
import Card from 'Layout/Card/Card.vue'
import Cards from 'Layout/Cards/Cards.vue'
import Grid from 'Layout/Grid/Grid.vue'
import Header from 'Layout/Header/Header.vue'
import Column from 'Layout/Grid/Column.vue'
import View from 'Layout/View/View.vue'

/* Table */
import Table from 'Layout/Table/Table.vue';
import TableRow from 'Layout/Table/TableRow.vue';
import TableCell from 'Layout/Table/TableCell.vue';
import TableHeader from 'Layout/Table/TableHeader.vue';
import TableHeaderCell from 'Layout/Table/TableHeaderCell.vue';
import TableBody from 'Layout/Table/TableBody.vue';

/* Misc */
Vue.component('kirby-bar', Bar);
Vue.component('kirby-card', Card);
Vue.component('kirby-cards', Cards);
Vue.component('kirby-box', Box);
Vue.component('kirby-grid', Grid);
Vue.component('kirby-header', Header);
Vue.component('kirby-column', Column);
Vue.component('kirby-view', View);

/* Table */
Vue.component('kirby-table', Table);
Vue.component('kirby-table-row', TableRow);
Vue.component('kirby-table-cell', TableCell);
Vue.component('kirby-table-header', TableHeader);
Vue.component('kirby-table-header-cell', TableHeaderCell);
Vue.component('kirby-table-body', TableBody);

