
import Request from './Request.js';

import Auth from './Auth.js';
import File from './File.js';
import Locale from './Locale.js';
import Page from './Page.js';
import Panel from './Panel.js';
import Section from './Section.js';
import Site from './Site.js';
import User from './User.js';

export default {
  auth: Auth,
  file: File,
  locale: Locale,
  page: Page,
  panel: Panel,
  section: Section,
  site: Site,
  user: User,
  ...Request
};
