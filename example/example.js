Posts = new Mongo.Collection('posts');

Posts.attachPaginated(5);

if (Meteor.isClient) {

  // subscribe
  Posts.paginated.subscribe();

  // HELPERS
  Template.posts.helpers({
    posts() {
      return Posts.find();
    }
  });

  // EVENTS
  Template.posts.events({
    'click button': function() {
      Posts.paginated.next();
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
