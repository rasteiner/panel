import Vue from "vue";

import Dialog from "./Dialog.vue";
Vue.component("kirby-dialog", Dialog);

Vue.component("kirby-page-create-dialog", () =>
  import(/* webpackChunkName: "page-create-dialog" */
  "./Page/PageCreateDialog/PageCreateDialog.vue")
);
Vue.component("kirby-page-url-dialog", () =>
  import(/* webpackChunkName: "page-url-dialog" */
  "./Page/PageUrlDialog/PageUrlDialog.vue")
);
Vue.component("kirby-page-status-dialog", () =>
  import(/* webpackChunkName: "page-status-dialog" */
  "./Page/PageStatusDialog/PageStatusDialog.vue")
);
Vue.component("kirby-page-rename-dialog", () =>
  import(/* webpackChunkName: "page-rename-dialog" */
  "./Page/PageRenameDialog/PageRenameDialog.vue")
);
Vue.component("kirby-page-remove-dialog", () =>
  import(/* webpackChunkName: "page-remove-dialog" */
  "./Page/PageRemoveDialog/PageRemoveDialog.vue")
);

Vue.component("kirby-file-rename-dialog", () =>
  import(/* webpackChunkName: "file-rename-dialog" */
  "./File/FileRenameDialog/FileRenameDialog.vue")
);

Vue.component("kirby-file-remove-dialog", () =>
  import(/* webpackChunkName: "file-remove-dialog" */
  "./File/FileRemoveDialog/FileRemoveDialog.vue")
);

Vue.component("kirby-user-create-dialog", () =>
  import(/* webpackChunkName: "user-create-dialog" */
  "./User/UserCreateDialog/UserCreateDialog.vue")
);
Vue.component("kirby-user-rename-dialog", () =>
  import(/* webpackChunkName: "user-rename-dialog" */
  "./User/UserRenameDialog/UserRenameDialog.vue")
);
Vue.component("kirby-user-role-dialog", () =>
  import(/* webpackChunkName: "user-role-dialog" */
  "./User/UserRoleDialog/UserRoleDialog.vue")
);
Vue.component("kirby-user-password-dialog", () =>
  import(/* webpackChunkName: "user-password-dialog" */
  "./User/UserPasswordDialog/UserPasswordDialog.vue")
);
Vue.component("kirby-user-language-dialog", () =>
  import(/* webpackChunkName: "user-language-dialog" */
  "./User/UserLanguageDialog/UserLanguageDialog.vue")
);
Vue.component("kirby-user-remove-dialog", () =>
  import(/* webpackChunkName: "user-remove-dialog" */
  "./User/UserRemoveDialog/UserRemoveDialog.vue")
);
