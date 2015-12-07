class Paginated {
  constructor(collection, perPage) {
    this.perPage = perPage;

    // Cursor
    this._collection = collection;

    // limit and loaded
    this._limit = this.perPage;
    this._loaded = 0;

    // Tracker Dependency
    this._limitListeners = new Deps.Dependency();
    this._loadedListeners = new Deps.Dependency();
  }

  loaded() {
    this._loadedListeners.depend();
    return this._loaded;
  }

  limit() {
    this._limitListeners.depend();
    return this._limit;
  }

  ready() {
    return _.isEqual(this.loaded(), this.limit());
  }

  next() {
    this._limit += this.perPage;
    this._limitListeners.changed();
  }

  hasNext(filter = {}) {
    return _.isEqual(this._collection.find(filter).count(), this.limit());
  }

  done() {
    this._loaded = this._limit;
    this._loadedListeners.changed();
  }

  reset() {
    this._limit = this.perPage;
    this._limitListeners.changed();
  }

  subscribe(filter = {}) {

    // subscribe autorun then
    Meteor.autorun(() => {
      const handle = Meteor.subscribe(this._collection.name, this.limit(), filter);

      if (handle.ready()) {
        this.done();
      }
    });
  }
}

// Merge assign attachPaginated method.
Object.assign(Mongo.Collection.prototype, {
  attachPaginated(perPage) {
    this.paginated = new Paginated(this._collection, perPage);
  }
});
