Posts = new Mongo.Collection('posts');

Posts.attachPaginated(5);

if (Meteor.isClient) {

  // subscribe
  Posts.paginated.subscribe();

  // HELPERS
  Template.posts.helpers({
    posts() {
      return Posts.find();
    },

    hasNext() {
      return Posts.paginated.hasNext();
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
  Meteor.publish('posts', (limit) => {
    return Posts.find({}, { limit: limit });
  });

  Migrations.add('posts', () => {
    _.times(13, (i) => {
      Posts.insert({ rank: i });
    });
  });
}
