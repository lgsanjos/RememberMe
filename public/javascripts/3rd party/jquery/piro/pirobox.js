/**
* Name: piroBox v.1.2.2
* Date: May 2010
* Autor: Diego Valobra (http://www.pirolab.it),(http://www.diegovalobra.com)
* Version: 1.2.2
* Licence: CC-BY-SA http://creativecommons.org/licenses/by-sa/2.5/it/
**/

(function($) {
	$.fn.piroBox = function(opt) {
		opt = jQuery.extend({
		my_speed : null,
		close_speed : 300,
		bg_alpha : 0.5,
		close_all : '.piro_close,.piro_overlay',
		slideShow : null,
		slideSpeed : null,
                conteudoHtml : 'hello world'
		}, opt);

		function start_pirobox(aConteudo) {
		  var corners = 
			  '<tr>'+					   
			  '<td colspan="3" class="pirobox_up"></td>'+
			  '</tr>'+	
			  '<tr>'+	
			  '<td class="t_l"></td>'+
			  '<td class="t_c"></td>'+
			  '<td class="t_r"></td>'+
			  '</tr>'+
			  '<tr>'+
			  '<td class="c_l"></td>'+
			  '<td class="c_c"><span><span></span></span><div></div></td>'+
			  '<td class="c_r"></td>'+
			  '</tr>'+
			  '<tr>'+
			  '<td class="b_l"></td>'+
			  '<td class="b_c"></td>'+
			  '<td class="b_r"></td>'+
			  '</tr>'+
			  '<tr>'+
			  '<td colspan="3" class="pirobox_down"></td>'+
			  '</tr>';
			var window_height =  $(document).height();
			var bg_overlay = $(jQuery('<div class="piro_overlay"></div>').hide().css({'opacity':+opt.bg_alpha,'height':window_height+'px'}));
			var main_cont = $(jQuery('<table class="pirobox_content" cellpadding="0" cellspacing="0"></table>'));
			var caption = $(jQuery('<div class="caption"></div>'));
			var piro_nav = $(jQuery('<div class="piro_nav"></div>'));
			var piro_close = $(jQuery('<a href="#close" class="piro_close" title="close"></a>'));
			var piro_play = $(jQuery('<a href="#play" class="play" title="play slideshow"></a>'));
			var piro_stop = $(jQuery('<a href="#stop" class="stop" title="stop slideshow"></a>'));
			var piro_prev = $(jQuery('<a href="#prev" class="piro_prev" title="previous image"></a>'));
			var piro_next = $(jQuery('<a href="#next" class="piro_next" title="next image"></a>'));				
			$('body').append(bg_overlay).append(main_cont);
			main_cont.append(corners);
			$('.pirobox_up').append(piro_close);
			//$('.pirobox_down').append(piro_nav);
			//$('.pirobox_down').append(piro_play);
			//piro_play.hide();
			//$('.pirobox_down').append(piro_prev).append(piro_next);
			piro_nav.append(caption);
			var my_nav_w = piro_prev.width();
			main_cont.hide();
			var my_gall_classes = $("a[class^='pirobox']");
			var map = new Object();
				for (var i=0; i<my_gall_classes.length; i++) {
					var it=$(my_gall_classes[i])
					map['a.'+it.attr('class')]=0;
				}
			var gall_settings = new Array();
				for (var key in map) {
					gall_settings.push(key);
				}
				for (var i=0; i<gall_settings.length; i++) {
					$(gall_settings[i]).each(function(rel){this.rel = rel+1 + "&nbsp;of&nbsp;" + $(gall_settings[i]).length;});
						var add_first = $(gall_settings[i]+':first').addClass('first');
						var add_last = $(gall_settings[i]+':last').addClass('last');
				}						
			$(my_gall_classes).each(function(rev){this.rev = rev+0});
			var imgCache = $(my_gall_classes).each(function(){this.href});
			var hidden = $('body').append('<div id="imgCache" style="display:none"></div').children('#imgCache');
			$.each(imgCache, function (i,val) {
				$('<div/>').css({'background':'url('+val+')'/*,'width':'600px','height':'200px'*/}).appendTo(hidden);
			});
			var piro_gallery = $(my_gall_classes);
			$.fn.fixPNG = function() {
				return this.each(function () {
					var image = $(this).css('backgroundImage');
					if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
						image = RegExp.$1;
						$(this).css({
							'backgroundImage': 'none',
							'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=" + ($(this).css('backgroundRepeat') == 'no-repeat' ? 'crop' : 'scale') + ", src='" + image + "')"
						}).each(function () {
							var position = $(this).css('position');
							if (position != 'absolute' && position != 'relative')
								$(this).css('position', 'relative');
						});
					}
				});
			};
			$.browser.msie6 =($.browser.msie && /MSIE 6\.0/i.test(window.navigator.userAgent));
			if( $.browser.msie6 && !/MSIE 8\.0/i.test(window.navigator.userAgent)) {
				$('.t_l,.t_c,.t_r,.c_l,.c_r,.b_l,.b_c,.b_r,a.piro_next, a.piro_prev,a.piro_prev_out,a.piro_next_out,.c_c,.piro_close,a.play,a.stop').fixPNG();
				var ie_w_h =  $(document).height();
				bg_overlay.css('height',ie_w_h+ 'px'); 
			}
			if( $.browser.msie) {
			opt.close_speed = 0;
			}
			$(window).resize(function(){
				var new_w_bg = $(document).height();
				bg_overlay.css({'visibility':'visible','height':+ new_w_bg +'px'});				  
			});	
			piro_prev.add(piro_next).bind('click',function(c) {
				c.preventDefault();
				var image_count = parseInt($(piro_gallery).filter('.item').attr('rev'));
				var start = $(this).is('.piro_prev_out,.piro_prev') ? $(piro_gallery).eq(image_count - 1) : $(piro_gallery).eq(image_count + 1);
				if(!start.size()) {
					start = $(this).is('.piro_prev_out,.piro_prev') ? $(piro_gallery).eq($(piro_gallery).size() - 1) : $(piro_gallery).eq(0);
				}
				start.click();
				piro_close.add(caption).add(piro_next).add(piro_prev).css('visibility','hidden');
			});
			$(piro_gallery).each(function(array) {
					var item = $(this);
					item.unbind(); 
					item.bind('click',function(c) {
						c.preventDefault();
						piro_open(item.attr('href'));
						var this_url = item.attr('href');
						//var descr = item.children('span').html();
						var descr = item.attr('title');	
						var number = item.attr('rel');
						if( descr == ""){
						caption.html('<p>'+ this_url+'<em class="number">' + number + '</em><a href='+ this_url +' class="link_to" target="_blank" title="Open Image in a new window"></a></p>');
						}else{
						caption.html('<p>'+ descr+'<em class="number">' + number + '</em><a href='+ this_url +' class="link_to" target="_blank" title="Open Image in a new window"></a></p>');
						}
						if(item.is('.last')){
							$('.number').css('text-decoration','underline');
							
						}else{
							$('.number').css('text-decoration','none');
							}				
						if(item.is('.first')){
							piro_prev.hide();
							piro_next.show();		
						}else{
							piro_next.add(piro_prev).show();		  
						}
						if(item.is('.last')){
							piro_prev.show();
							piro_next.hide();
							piro_play.css('width','0');	  
						}else{
							piro_play.css('width','40px');
							}
						if(item.is('.last') && item.is('.first') ){
							piro_prev.add(piro_next).hide();
							$('.number').hide();
							piro_play.remove();
						}					
							$(piro_gallery).filter('.item').removeClass('item');
							item.addClass('item');
							$('.c_c').removeClass('unique');		
					});
				});
				var piro_open = function(my_url) {
					piro_play.add(piro_stop).hide();
					piro_close.add(caption).add(piro_next).add(piro_prev).css('visibility','hidden');

                                        $('.c_c div').children().remove();
                                        main_cont.show();
                                        bg_overlay.fadeIn(0,function(){

                                        // Adicionar aqui o conteudo
                                        $(".c_c div").append('<div>' + aConteudo + '</div>');
                                        // -------------------------

                                        });
					
				}

			}

		start_pirobox(opt.conteudoHtml);
	}
})(jQuery);


  function setPirobox(conteudo){

      $().piroBox({
                  my_speed: 300, //animation speed
                  bg_alpha: 0.5, //background opacity
                  slideShow : 'false', // true == slideshow on, false == slideshow off
                  slideSpeed : 3, //slideshow
                  conteudoHtml : conteudo,
                  close_all : '.piro_close' // add class .piro_overlay(with comma)if you want overlay click close piroBox
                  });

  }


  function closePiro(){
    $('.pirobox_content').fadeOut("fast");
    $('.piro_overlay').fadeOut("slow");
    $(document).removeData($('.pirobox_content'));
    $(document).removeData($('.pirobox_overlay'));

  }