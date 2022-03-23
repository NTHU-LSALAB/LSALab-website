import AuthLogo from './extensions/logo.png';
import favicon from './extensions/favicon.ico';

export default {
  config: {
    auth: {
      logo: AuthLogo
    },
    head: {
      favicon
    },
    menu: {
      logo: AuthLogo
    },
    tutorials: false,
    locales: [
      'zh-Hans',
      'zh',
    ],
  },
  bootstrap(app) {
    console.log(app);
  },
};
