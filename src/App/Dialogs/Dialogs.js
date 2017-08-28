import Vue from 'vue'

import PageCreateDialog from './Page/PageCreateDialog/PageCreateDialog.vue'
import PageRemoveDialog from './Page/PageRemoveDialog/PageRemoveDialog.vue'
import PageUrlDialog from './Page/PageUrlDialog/PageUrlDialog.vue'

import FileRemoveDialog from './File/FileRemoveDialog/FileRemoveDialog.vue'

import UserCreateDialog from './User/UserCreateDialog/UserCreateDialog.vue'
import UserRemoveDialog from './User/UserRemoveDialog/UserRemoveDialog.vue'

Vue.component('kirby-page-create-dialog', PageCreateDialog);
Vue.component('kirby-page-url-dialog', PageUrlDialog);
Vue.component('kirby-page-remove-dialog', PageRemoveDialog);

Vue.component('kirby-file-remove-dialog', FileRemoveDialog);

Vue.component('kirby-user-create-dialog', UserCreateDialog);
Vue.component('kirby-user-remove-dialog', UserRemoveDialog);
