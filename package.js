Package.describe({
  name: 'yasaricli:paginated',
  version: '0.0.2',
  summary: 'Meteor Paginated Subscription',
  git: 'https://github.com/yasaricli/meteor-paginated.git',
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
