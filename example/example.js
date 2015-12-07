Posts = new Mongo.Collection('posts');

Posts.attachPaginated(5);

if (Meteor.isClient) {

  Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
  });

  Router.route('/', {
    name: 'Posts',
    waitOn() {
      return  Posts.paginated.subscribe();
    }
  });

  // HELPERS
  Template.posts.helpers({
    posts() {
      return Posts.find();
    },

    hasNext() {
      return Posts.paginated.hasNext();
    },

    ready() {
      return Posts.paginated.ready();
    }
  });

  // EVENTS
  Template.posts.events({
    'click .next': function() {
      Posts.paginated.next();
    },

    'click .reset': function() {
      Posts.paginated.reset();
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('posts', (limit, filter) => {
    return Posts.find(filter, { limit: limit });
  });

  Migrations.add('posts', () => {
    _.times(13, (i) => {
      Posts.insert({ rank: i });
    });
  });
}
