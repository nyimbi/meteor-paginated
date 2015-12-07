Package.describe({
  name: 'yasaricli:paginated',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  // api
  api.use([
    'ecmascript',
    'mongo',
    'underscore',
    'tracker'
  ]);

  // pages
  api.addFiles('paginated.js');
});
