/**
 * j360 jQuery plugin
 * author     Stable Flow
 * copyright  (c) 2009-2010 by StableFlow
 * link       http://www.stableflow.com/downloads/jquery-plugins/360-degrees-product-view/
 *
 * Version: 1.0.0 (12/13/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
  var aImages = {};
  var page=1;
  var img_num=1;
(function($){
    $.fn.j360 = function(options) {
        var defaults = {
            clicked: false,
            currImg: img_num
        }
        var options = jQuery.extend(defaults, options);
        return this.each(function() {
            var $obj = jQuery(this);
           
            $obj.css({
                'margin-left' : 'auto',
                'margin-right' : 'auto',
                'text-align' : 'center',
                'overflow' : 'hidden'
            });
            // $obj.prepend('<img src="/images/loader.gif" class="loader" style="margin-top:' + ($obj.height()/2 - 15) + 'px" />');

            $overlay = $obj.clone(true);
            $overlay.html('<img src="img/loader.gif"  class="loader" style=" width:55px;margin-top:' + ($obj.height()/2 - 15) + 'px" />');
            $overlay.attr('id', 'view_overlay');
            $overlay.css({
                'position' : 'absolute',
                'z-index': '5',
                'top' : '100px',
                'left' : '0',
                'background' : '#fff'
            });
            $obj.after($overlay);
            $obj.after('<div id="colors_ctrls"></div>');
            jQuery('#colors_ctrls').css({
                'width' : $obj.width(),
                'position' : 'absolute',
                'z-index': '5',
                'top' : $obj.offset().top + $obj.height - 50,
                'left' : $obj.offset().left
            });

            var imageTotal = 0;
            jQuery('img', $obj).each(function() {
                aImages[++imageTotal] = jQuery(this).attr('src');
                preload(jQuery(this).attr('src'));
            })
            var imageCount = 0;
            jQuery('.preload_img').load(function() {
                if (++imageCount == imageTotal) {
                    $overlay.animate({
                        'filter' : 'alpha(Opacity=0)',
                        'opacity' : 0
                    }, 500);
                    $obj.html('<img src="' + aImages[1] + '" />');	//显示第一张图片
                    $overlay.bind('mousedown touchstart', function(e) {
                        if (e.type == "touchstart") {
                            options.currPos = window.event.touches[0].pageX;
							
                        } else {
                            options.currPos = e.pageX;
                        }
						
                        options.clicked = true;
                        return false;
                    });
                    jQuery(document).bind('mouseup touchend', function() {
                        options.clicked = false;
                    });
                    jQuery(document).bind('mousemove touchmove', function(e) {
                        if (options.clicked) {
                            var pageX;
                            if (e.type == "touchmove") {
                                pageX = window.event.targetTouches[0].pageX;
                            } else {
                                pageX = e.pageX;
                            }

                            var width_step = 4;
                            if (Math.abs(options.currPos - pageX) >= width_step) {
                                if (options.currPos - pageX >= width_step) {
									img_num++;
									
                                    if (img_num > imageTotal) {
                                        img_num= 1;
                                    }
                                } else {
                                   img_num--;
                                    if (img_num < 1) {
                                        img_num = imageTotal;
                                    
                                    }
                                }
								page=options.currImg;
                                options.currPos = pageX;
                                $obj.html('<img src="' + aImages[img_num] + '" />');
								switch(img_num){
									case 1:
										$(".duimg").hide();
										$("#du1").show();
									break;
									case 12:
										$(".duimg").hide();
										$("#du2").show();
									break;
									case 24:
										$(".duimg").hide();
										$("#du3").show();
									break;
									case 36:
										$(".duimg").hide();
										$("#du4").show();
									break;
									case 42:
										$(".duimg").hide();
										$("#du5").show();
									break;
									case 48:
										$(".duimg").hide();
										$("#du6").show();
									break;
									case 60:
										$(".duimg").hide();
										$("#du7").show();
									break;
									case 73:
										$(".duimg").hide();
										$("#du8").show();
									break;
									
								}
                            }
                        }
                    });
                }
            });

            if (jQuery.browser.msie || jQuery.browser.mozilla || jQuery.browser.opera || jQuery.browser.safari ) {
                jQuery(window).resize(function() {
                    onresizeFunc($obj, $overlay);
                });
            } else {
                var supportsOrientationChange = "onorientationchange" in window,
                orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
                window.addEventListener(orientationEvent, function() {
                    onresizeFunc($obj, $overlay);
                }, false);
            }
            onresizeFunc($obj, $overlay)

        });
    };
})(jQuery)

function onresizeFunc($obj, $overlay) {
    /*
	$obj.css({
        'margin-top' : $(document).height()/2 - 150
    });*/
    $overlay.css({
        'margin-top' : 0,
        'top' : $obj.offset().top,
        'left' : $obj.offset().left
    });

    jQuery('#colors_ctrls').css({
        'top' : $obj.offset().top + $obj.height - 50,
        'left' : $obj.offset().left
    });
}

function preload(image) {
    if (typeof document.body == "undefined") return;
    try {
        var div = document.createElement("div");
        var s = div.style;
        s.position = "absolute";
        s.top = s.left = 0;
        s.visibility = "hidden";
        document.body.appendChild(div);
        div.innerHTML = "<img class=\"preload_img\" style='width:700px;' src=\"" + image + "\" />";
    } catch(e) {
    // Error. Do nothing.
    }
}