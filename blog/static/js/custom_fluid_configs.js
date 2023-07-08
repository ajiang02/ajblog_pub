var Fluid = window.Fluid || {};
Fluid.ctx = Object.assign({}, Fluid.ctx)
var CONFIG = {
    "hostname": "AJ.cn",
    "root": "/",
    "version": "1.9.1",
    "typing": {
        "enable": true,
        "typeSpeed": 70,
        "cursorChar": "_",
        "loop": false,
        "scope": []
    },
    /** 为文章内容中的标题添加锚图标 **/
    "anchorjs": {
        "enable": true,
        "element": "h1,h2,h3,h4,h5,h6",
        "placement": "left",
        "visible": "hover",
        "icon": ""
    },
    "code_language": {
        "enable": true,
        "default": "TEXT"
    },
    "copy_btn": true,
    "image_caption": {"enable": true},
    "image_zoom": {
        "enable": true,
        "img_url_replace": ["", ""]
    },
    "toc": {
        "enable": true,
        "placement": "left",
        "headingSelector": "h1,h2,h3,h4,h5,h6",
        "collapseDepth": 0
    },
    "lazyload": {
        "enable": true,
        "loading_img": "{% static 'img/loading.gif' %}",
        "onlypost": false,
        "offset_factor": 2
    },
    "search_path": "{% static 'xml/local-search.xml' %}"
};

