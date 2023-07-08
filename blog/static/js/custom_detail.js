Fluid.utils.createScript('https://lib.baomitu.com/tocbot/4.18.2/tocbot.min.js', function () {
    var toc = jQuery('#toc');
    if (toc.length === 0 || !window.tocbot) {
        return;
    }
    var boardCtn = jQuery('#board-ctn');
    var boardTop = boardCtn.offset().top;

    window.tocbot.init({
        tocSelector: '#toc-body',
        contentSelector: '.markdown-body',
        headingSelector: CONFIG.toc.headingSelector || 'h1,h2,h3,h4,h5,h6',
        linkClass: 'tocbot-link',
        activeLinkClass: 'tocbot-active-link',
        listClass: 'tocbot-list',
        isCollapsedClass: 'tocbot-is-collapsed',
        collapsibleClass: 'tocbot-is-collapsible',
        collapseDepth: CONFIG.toc.collapseDepth || 0,
        scrollSmooth: true,
        headingsOffset: -boardTop
    });
    if (toc.find('.toc-list-item').length > 0) {
        toc.css('visibility', 'visible');
    }
});


Fluid.utils.createScript('https://lib.baomitu.com/anchor-js/4.3.1/anchor.min.js', function () {
    window.anchors.options = {
        placement: CONFIG.anchorjs.placement,
        visible: CONFIG.anchorjs.visible
    };
    if (CONFIG.anchorjs.icon) {
        window.anchors.options.icon = CONFIG.anchorjs.icon;
    }
    var el = (CONFIG.anchorjs.element || 'h1,h2,h3,h4,h5,h6').split(',');
    var res = [];
    for (var item of el) {
        res.push('.markdown-body > ' + item.trim());
    }
    if (CONFIG.anchorjs.placement === 'left') {
        window.anchors.options.class = 'anchorjs-link-left';
    }
    window.anchors.add(res.join(', '));
});

Fluid.utils.createScript('https://lib.baomitu.com/fancybox/3.5.7/jquery.fancybox.min.js', function () {
    Fluid.plugins.fancyBox();
});

(function () {
    var enableLang = CONFIG.code_language.enable && CONFIG.code_language.default;
    var enableCopy = CONFIG.copy_btn;
    if (!enableLang && !enableCopy) {
        return;
    }

    function getBgClass(ele) {
        return Fluid.utils.getBackgroundLightness(ele) >= 0 ? 'code-widget-light' : 'code-widget-dark';
    }

    var copyTmpl = '';
    copyTmpl += '<div class="code-widget">';
    copyTmpl += 'LANG';
    copyTmpl += '</div>';
    jQuery('.markdown-body pre').each(function () {
        var $pre = jQuery(this);
        if ($pre.find('code.mermaid').length > 0) {
            return;
        }
        if ($pre.find('span.line').length > 0) {
            return;
        }

        var lang = '';

        if (enableLang) {
            lang = CONFIG.code_language.default;
            if ($pre[0].children.length > 0 && $pre[0].children[0].classList.length >= 2 && $pre.children().hasClass('hljs')) {
                lang = $pre[0].children[0].classList[1];
            } else if ($pre[0].getAttribute('data-language')) {
                lang = $pre[0].getAttribute('data-language');
            } else if ($pre.parent().hasClass('sourceCode') && $pre[0].children.length > 0 && $pre[0].children[0].classList.length >= 2) {
                lang = $pre[0].children[0].classList[1];
                $pre.parent().addClass('code-wrapper');
            } else if ($pre.parent().hasClass('markdown-body') && $pre[0].classList.length === 0) {
                $pre.wrap('<div class="code-wrapper"></div>');
            }
            lang = lang.toUpperCase().replace('NONE', CONFIG.code_language.default);
        }
        $pre.append(copyTmpl.replace('LANG', lang).replace('code-widget">',
            getBgClass($pre[0]) + (enableCopy ? ' code-widget copy-btn" data-clipboard-snippet><i class="iconfont icon-copy"></i>' : ' code-widget">')));

        if (enableCopy) {
            Fluid.utils.createScript('https://lib.baomitu.com/clipboard.js/2.0.10/clipboard.min.js', function () {
                var clipboard = new window.ClipboardJS('.copy-btn', {
                    target: function (trigger) {
                        var nodes = trigger.parentNode.childNodes;
                        for (var i = 0; i < nodes.length; i++) {
                            if (nodes[i].tagName === 'CODE') {
                                return nodes[i];
                            }
                        }
                    }
                });
                clipboard.on('success', function (e) {
                    e.clearSelection();
                    e.trigger.innerHTML = e.trigger.innerHTML.replace('icon-copy', 'icon-success');
                    setTimeout(function () {
                        e.trigger.innerHTML = e.trigger.innerHTML.replace('icon-success', 'icon-copy');
                    }, 2000);
                });
            });
        }
    });
})();
