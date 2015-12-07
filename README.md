## Paginated

Meteor Paginated Subscription

Go to [paginated.meteor.com][1] for examples and full documentation.


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
Meteor.publish('posts', function(limit, filter) {
  return Posts.find(filter, { limit: limit });
});
```

###### Use Iron Router
```js
Router.route('/posts', {
  name: 'Posts',
  waitOn() {
    return Posts.paginated.subscribe();
  }
});
```

##### Following API

 - `paginated.subscribe()` - it makes subscribers.
 - `paginated.next()` - fetch the next page of results
 - `paginated.hasNext()` - limit fetched collection. `{{# if hasNext }}`
 - 
 [1]:http://paginated.meteor.com/
