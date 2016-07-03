function dispatch () {
  var url;
  var searchbox = $('#searchbox');
  var searchval = searchbox.val();
  if (searchval !== '') {
    url = 'http://www.google.com/search?q=site:qcyoung.com/%20' + searchval;
    if (navigator.userAgent.indexOf('iPad') > -1 || navigator.userAgent.indexOf('iPhone') > -1) {
      location.href = url;
    } else {
      window.open(url, '_blank');
    }
  }
  return false;
}



$(document).ready(function ($) {
  /**
   * plugins list
   * @type {
   *   jquery:[nicescroll,slidebars,animsition,Bootstrap Auto-Hiding Navbar,pace]
   * }
   */
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  var documentHeight = $(document).height();
  var footerHeight = $('footer').outerHeight();
  var tocHeight;
  var duoshuoMark;
  var egglayer;
  var gPushed = false;
  var msViewportStyle;
  var wallNumber;
  var scrollStatus;
  var scrollTop;
  var tocScroll;
  var tocs;
  if ($('#toc').length) {
    tocHeight = $('.toc').outerHeight();
    duoshuoMark = $('.duoshuo').offset().top;
  }
  var a = {
    info: '卧槽，你居然敢点开控制台看我的代码，这下我的屎代码无所遁形了 T _ T',
    logo: '         _.-.  \n' + '       ,\'/ //\\ \n' + '      /// // /)\n' + '     /// // //|\n' + '    /// // /// \n' + '   /// // ///  \n' + '  (`: // ///   \n' + '   `;`: ///    \n' + '   / /  `\'      \n' + '  / /\n' + ' (_/  \n'
  };
  window.console && console.info && console.info(a.logo + a.info);

  document.onkeydown = function (e) {
    if (!($(':focus').prop('tagName') === 'INPUT') && !($(':focus').prop('tagName') === 'TEXTAREA')) {
      e = e || window.event;
      if (e.keyCode === 191 && e.shiftKey) {
        if (windowWidth < 1024) {
          return false;
        }
        if ($('.layui-layer-shade').length > 0) {
          return false;
        } else {
          egglayer = layer.open({
            type: 1,
            title: false,
            skin: 'layui-layer-demo', // 样式类名
            closeBtn: false, // 不显示关闭按钮
            shift: 5,
            shadeClose: true, // 开启遮罩关闭
            area: [windowWidth, windowHeight],
            content: '<div class="egg-tips"><div class="egg-header"><span>彩蛋指南(仿Github —— 试着按下这些键)</span><span class="egg-close"><i class="demo-icon icon-cancel">&#xe808;</i></span> </div><div class="egg-helps"><table class="keyboard-map"><tbody><tr><th></th><th>快捷方式说明</th></tr><tr><td class="keys"><kbd>?</kbd></td><td>打开彩蛋说明</td></tr><tr><td class="keys"><kbd>g</kbd><kbd>s</kbd></td><td>定焦到搜索框</td></tr><tr><td class="keys"><kbd>g</kbd><kbd>a</kbd></td><td>打开归档页</td></tr><tr><td class="keys"><kbd>g</kbd><kbd>c</kbd></td><td>打开目录页</td></tr><tr><td class="keys"><kbd>g</kbd><kbd>t</kbd></td><td>打开标签页</td></tr></tbody></table></div></div>'
          });
        }
        gPushed = false;
      } else if (e.keyCode === 71) { // g
        gPushed = true;
      } else if (e.keyCode === 65) { // angular.bind(self, function)
        if (gPushed) {
          location.href = '/archives';
        }
        gPushed = false;
      } else if (e.keyCode === 67) { // c
        if (gPushed) {
          location.href = '/categories';
        }
        gPushed = false;
      } else if (e.keyCode === 84) { // t
        if (gPushed) {
          location.href = '/tags';
        }
        gPushed = false;
      } else if (e.keyCode === 83) { // S
        if (gPushed) {
          $('#searchbox').focus();
          $('#searchbox').val('');
        }
        gPushed = false;
        return false;
      } else {
        gPushed = false;
      }
    }
  };
  $(document).delegate('.egg-close', 'click', function () {
    layer.close(egglayer);
  });

  // 开始进入时加载位置
  scrollStatus = $(document).scrollTop();
  if (scrollStatus > 10) {
    $('.lightnav .navbar-inner').addClass('lightnav-alt');
  } else {
    $('.lightnav .navbar-inner').removeClass('lightnav-alt');
  }

  $(window).scroll(function () {
    scrollTop = $(this).scrollTop();
    if ($('#toc').length) {
      var heads = $('.post-article').find('h1,h2,h3,h4,h5');
      var nowtoc = 0;
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].getBoundingClientRect().top <= 0) {
          nowtoc = i;
        } else {
          break;
        }
      }
      tocs = $('.toc').find('a');
      $(tocs).removeClass('toc-active');
      $(tocs[nowtoc]).addClass('toc-active');
      tocScroll = tocs[nowtoc].offsetTop;
      if (tocScroll > windowHeight / 2) {
        $('#toc').scrollTop(tocScroll - windowHeight / 2);
      }
      if (tocHeight > windowHeight - footerHeight - 100) {
        if (scrollTop > duoshuoMark - windowHeight) {
          $('#toc').css({
            'position': 'absolute',
            'top': duoshuoMark - tocHeight
          });
        } else {
          $('#toc').css({
            'position': 'fixed',
            'top': '50px'
          });
        }
      }
    }
    if ($(document).scrollTop() > 10) {
      $('.lightnav .navbar-inner').addClass('lightnav-alt');
    } else {
      $('.lightnav .navbar-inner').removeClass('lightnav-alt');
    }
  });

  wallNumber = 'url(http://qcyoung.qiniudn.com/qcyoung/TKL/wall-' + Math.ceil(Math.random() * 132) + '.jpg)';
  // wallNumber = "url(http://i2.buimg.com/7a5bdc5143c173c1.jpg)";
  $('.element-img').css('background-image', wallNumber);

  // 微信Window
  $('#navigation .weixin,.social .weixin').bind('click', function () {
    layer.open({
      type: 1,
      title: false,
      skin: 'layui-layer-demo', // 样式类名
      closeBtn: false, // 不显示关闭按钮
      shift: 2,
      shadeClose: true, // 开启遮罩关闭
      area: [windowWidth, windowHeight],
      content: '<img src="http://qcyoung.qiniudn.com/qcyoung/yangzj1992QRcode.jpg" width="200px" height="200px"/>'
    });
  });

  var scrollclick;

  // 返回顶部功能
  $(window).bind('scroll', function () {
    var scrollTopNum;
    var returnTop;
    // 获取当前垂直位移值
    if (!scrollclick) {
      scrollTopNum = $(document).scrollTop();
      // 获取浏览器当前高度
      returnTop = $('div.control-panel');
      // 滚动条垂直距离大于0时显示，反之隐藏
      (scrollTopNum > 240) ? returnTop.fadeIn('fast') : returnTop.fadeOut('fast');
    }
  });

  $('.icon-gotop').click(function () {
    scrollclick = true;
    $('div.control-panel').fadeOut('800');
    $('html, body').animate({ scrollTop: 0 }, 800, function () {
      scrollclick = false;
    });
    return false;
  });

  $('.icon-godown').click(function () {
    scrollclick = true;
    $('html, body').animate({ scrollTop: documentHeight }, 800, function () {
      scrollclick = false;
    });
    return false;
  });

  $('.icon-music').click(function () {
    window.open('http://yangzj1992.u117.15800000.top/yPlayer/');
  });
  // Slidebars off-canvas menu
  $.slidebars();

  $('#toc').niceScroll({
    smoothscroll: true, // scroll with ease movement
    autohidemode: true,
    zindex: '100', // change z-index for scrollbar div
    scrollspeed: 60, // scrolling speed
    mousescrollstep: 40, // mouse scrolling speed
    gesturezoom: false, // 上缩放框激活时，间距输出/输入
    horizrailenabled: false, // 管理水平滚动
    cursorcolor: '#151515',
    boxzoom: false, // enable zoom for box content
    cursorborder: '0px solid #202020',
    cursorborderradius: '8px',
    cursorwidth: 4, // 9
    enablemousewheel: true,
    background: 'rgba(255,255,255,0.7)'
  });
  $('html').niceScroll({
    // smoothscroll: true, // scroll with ease movement
    // autohidemode: false,
    // zindex: "100", // change z-index for scrollbar div
    // scrollspeed: 60, // scrolling speed
    // mousescrollstep: 40,// mouse scrolling speed
    // gesturezoom: false,//上缩放框激活时，间距输出/输入
    // horizrailenabled: false,//管理水平滚动
    // cursorcolor: "#151515",
    // boxzoom: false,// enable zoom for box content
    // cursorborder: "0px solid #202020",
    // cursorborderradius: "5px",
    cursorwidth: 0 // 9
    // enablemousewheel: true,
    // background: "rgba(255,255,255,0.7)",
  });

  // Page transitions
  $('.animsition').animsition({
    inClass: 'fade-in',
    outClass: 'fade-out-down-sm',
    inDuration: 500,
    outDuration: 500,
    linkElement: '.animsition-link',
    // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
    loading: true,
    loadingParentElement: 'body', // animsition wrapper element
    loadingClass: 'animsition-loading',
    unSupportCss: ['animation-duration', '-webkit-animation-duration', '-o-animation-duration'],
    // "unSupportCss" option allows you to disable the "animsition"
    // in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser
    // that does not support "animation-duration".
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'body'
  });

  // Functionailty constraints for mobile(wall opacity covering layer)
  if (!Modernizr.touch) {
    jQuery(function ($) {
      // Hero & page-header fade-in effect
      var divs = $('.herofade');
      $(window).on('scroll', function () {
        var st = $(this).scrollTop();
        divs.css({
          'margin-top': -(st / 0) + 'px',
          opacity: 0.7 - st / 1600
        });
      });
    });
  }

  // autohide navbar on scroll
  $('div.navbar-fixed-top').autoHidingNavbar({
    animationDuration: 400,
    hideOffset: 0 // Hides the navbar after scrolling . auto means the navbar's height.
  });

  /*!
   * IE10 viewport hack for Surface/desktop Windows 8 bug
   * Copyright 2014 Twitter, Inc.
   * Licensed under the Creative Commons Attribution 3.0 Unported License. For
   * details, see http://creativecommons.org/licenses/by/3.0/.
   */
  // See the Getting Started docs for more information:
  // http://getbootstrap.com/getting-started/#support-ie10-width
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    );
    document.querySelector('head').appendChild(msViewportStyle);
  }

  $('.logo').hover(function () {
    $(this).find('#white-logo').css('display', 'none');
    $(this).find('#brown-logo').css('display', 'block');
  }, function () {
    $(this).find('#brown-logo').css('display', 'none');
    $(this).find('#white-logo').css('display', 'block');
  });
}(jQuery)); // End "use strict"
