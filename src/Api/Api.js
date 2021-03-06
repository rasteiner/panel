import Request from "./Request.js";

import Auth from "./Auth.js";
import File from "./File.js";
import Locale from "./Locale.js";
import Page from "./Page.js";
import Role from "./Role.js";
import System from "./System.js";
import Section from "./Section.js";
import Site from "./Site.js";
import User from "./User.js";

export default {
  config: {
    onStart() {},
    onComplete() {},
    onSuccess(json) {},
    onError(error) {
      console.log(error.message);
      throw error;
    }
  },
  auth: Auth,
  file: File,
  locale: Locale,
  page: Page,
  role: Role,
  system: System,
  section: Section,
  site: Site,
  user: User,
  ...Request
};
