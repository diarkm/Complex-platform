const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();

let authenticated = false;
let principal     = {};

module.exports = {
  isAuthenticated: function () {
    return authenticated;
  },

  getPrincipal: function () {
    return principal;
  },

  setPrincipal: function (user) {
    principal = user;
  },

  setAuthenticated: function (val) {
    authenticated = val;
  },

  subscribe: function (callback) {
    emitter.addListener('update', callback);
  },

  unsubscribe: function (callback) {
    emitter.removeListener('update', callback);
  },

  resetPrincipal: function () {
    principal     = {};
    authenticated = false;
  }
};
