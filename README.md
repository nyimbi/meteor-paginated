## Paginated

Meteor Paginated Subscription


### Installation

``` sh
$ meteor add yasaricli:paginated
```

### Usage

```js
Posts = new Mongo.Collection('posts');

// 5 page limit
Posts.attachPaginated(5);
```

##### Subscription

```js
Meteor.publish('posts', function(limit) {
  return Posts.find({}, { limit: limit });
});
```

##### Following API

 - `Posts.paginated.subscribe()` - It makes subscribers.
 - `Posts.paginated.next()` - fetch the next page of results
