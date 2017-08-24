import Vue from 'vue'

import Dialog from 'Dialogs/Dialog/Dialog.vue'
import PageCreateDialog from 'Dialogs/Page/PageCreateDialog/PageCreateDialog.vue'
import PageRemoveDialog from 'Dialogs/Page/PageRemoveDialog/PageRemoveDialog.vue'
import PageUrlDialog from 'Dialogs/Page/PageUrlDialog/PageUrlDialog.vue'

import FileRemoveDialog from 'Dialogs/File/FileRemoveDialog/FileRemoveDialog.vue'

import UserCreateDialog from 'Dialogs/User/UserCreateDialog/UserCreateDialog.vue'
import UserRemoveDialog from 'Dialogs/User/UserRemoveDialog/UserRemoveDialog.vue'

Vue.component('kirby-dialog', Dialog);

Vue.component('kirby-page-create-dialog', PageCreateDialog);
Vue.component('kirby-page-url-dialog', PageUrlDialog);
Vue.component('kirby-page-remove-dialog', PageRemoveDialog);

Vue.component('kirby-file-remove-dialog', FileRemoveDialog);

Vue.component('kirby-user-create-dialog', UserCreateDialog);
Vue.component('kirby-user-remove-dialog', UserRemoveDialog);
