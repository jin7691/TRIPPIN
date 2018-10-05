// <![CDATA[
jQuery(function($){
	//팝업메뉴 스크립트
	$('.script-popup').each(function(index){
		var _parent = $(this);
		var _this = $(this).attr('data-scp_child');
		_this = $('.'+_this);
		var _option = _parent.attr('data-scp_option');

		var _parent_position = _parent.position();
		var _parent_offset = _parent.offset();

		_this_style = $(_this).attr('style');

		if(_option == 'absolute'){
			var _body_width = $('html').width();
			var _this_width = _this.width();
			var _this_left = _parent_position.left;
			var _this_top = _parent_position.top;
			var _this_top_margin = _parent_offset.top;
			_this_top = parseInt(_parent.height())+parseInt(_this_top)+parseInt(_this_top_margin);

			if((parseInt(_body_width)+parseInt(_this_width)) > parseInt(_body_width)){
				var add_style = 'position:absolute;top:'+_this_top+'px;right:0px;';
			}else{
				var add_style = 'position:absolute;left:'+_parent_position.left+'px;top:'+_this_top+'px;';
			}
		}
		if(_this_style != null){
			_this.attr('style',_this_style+add_style);
		}else{
			_this.attr('style',add_style);
		}

		_parent.attr('data-on','off');
		_this.hide();
	});
	$(document).on('click','.script-popup',function(){
		var _on = $(this).attr('data-on');
		if(_on == 'off'){
			var _animate = $(this).attr('data-scp_ani');
			var _child = $(this).attr('data-scp_child');
			_child = $('.'+_child);
			$(this).addClass('on');
			if(_animate == 'fade'){
				_child.fadeIn();
			}else if(_animate == 'slide'){
				_child.slideDown();
			}else{
				_child.show();
			}
			$(this).attr('data-on','on');
		}else{
			var _animate = $(this).attr('data-scp_ani');
			var _child = $(this).attr('data-scp_child');
			_child = $('.'+_child);
			$(this).removeClass('on');
			if(_animate == 'fade'){
				_child.fadeOut();
			}else if(_animate == 'slide'){
				_child.slideUp();
			}else{
				_child.hide();
			}
			$(this).attr('data-on','off');
		}
	});


	$(document).mouseup(function(e){
		$('.script-popup').each(function(index){
			var _animate = $(this).attr('data-scp_ani');
			var _child = $(this).attr('data-scp_child');
			_child = $('.'+_child);
			if(($(this).is(e.target) && $(this).has(e.target).length === 0)){

			}else{
				$(this).removeClass('on');
				if(_animate == 'fade'){
					_child.fadeOut();
				}else if(_animate == 'slide'){
					_child.slideUp();
				}else{
					_child.hide();
				}
				$(this).attr('data-on','off');
			}
		});
	});

	//탭메뉴 스크립트
	$('.script-tab').each(function(index){
		var _group = $(this).attr('data-sct_group');

		$('.script-tab-s[data-sct_parent="'+_group+'"]').each(function(s_index){
			if(s_index != '0'){
				$(this).hide();
			}
		});

		$('.script-tab[data-sct_group="'+_group+'"]').each(function(s_index){
			$(this).attr('data-index',s_index);
			if(s_index == '0'){
				$(this).addClass('on');
			}
		});
	});

	$(document).on('click','.script-tab',function(){
		var _group = $(this).attr('data-sct_group');
		var _this_index = $(this).attr('data-index');
		$('.script-tab[data-sct_group="'+_group+'"]').each(function(index){
			if(index == _this_index){
				$(this).addClass('on');
			}else{
				$(this).removeClass('on');
			}
		});

		$('.script-tab-s[data-sct_parent="'+_group+'"]').each(function(index){
			if(index == _this_index){
				var _this_option = $(this).attr('data-sct_option');

				if(_this_option == 'fade'){
					$(this).fadeIn();
				}else if(_this_option == 'slide'){
					$(this).slideDown();
				}else{
					$(this).show();
				}
			}else{
				$(this).hide();
			}
		});
	});

	$('body').on('click','.et_modal_close, .et_modal_bg.on',function(){
		$('.et_modal').remove();
	});
});

	function et_tracker(type,member_srl){
		$.ajax({
			type:'POST',
			url:'/api/common/et_tracker',
			data:{'type':type,'member_srl':member_srl},
			success:function(data){
				console.log(data);
			}
		});
	}

function input_focus(c_name){ // 포커싱 스크립트
	var _this = $('.'+c_name).position();
	$('.'+c_name).focus();
	$('html,body').animate({'scrollTop':_this.top+'px'});
}

function et_modal(width, height, type, loading, url, scroll_type, animation, bg_close, close_type){ //모달
	$('html').css('overflow-y','hidden');
	if(bg_close == '1'){
		var bg_class = 'et_modal_bg on';
	}else{
		var bg_class = 'et_modal_bg';
	}
	var ie8_sc = '';
	if(isIE(8)){
		var bg_class = 'et_modal_bg on';
	}
	if(scroll_type == '0'){
		var m_height = height.replace('px','');
		var margin = parseInt(height)/2;
		var modal_default_html = '<div class="et_modal">';
				modal_default_html += '<div class="et_modal_layer">';
					modal_default_html += '<div class="'+bg_class+'"></div>';
					modal_default_html += '<div class="et_modal_load">로딩중</div>';
					modal_default_html += '<div class="et_modal_window" style="width:'+width+'px;height:'+height+'px;margin-top:-'+margin+'px;top:50%;">';
					if(close_type == '1'){
						modal_default_html += '<div class="et_modal_close">X</div>';
					}
						modal_default_html += '<iframe id="modal_view" border="0" frameborder="0" class="et_iframe" src="" scrolling=no allowTransparency="true"></iframe>';
					modal_default_html += '</div>';
				modal_default_html += '</div>';
			modal_default_html += '</div>';
	}else if(scroll_type == '1'){
		var modal_default_html = '<div class="et_modal">';
				modal_default_html += '<div class="et_modal_layer">';
					modal_default_html += '<div class="'+bg_class+'"></div>';
					modal_default_html += '<div class="et_modal_load">로딩중</div>';
					modal_default_html += '<div class="et_modal_window" style="width:'+width+';height:100%;margin-top:10px;overflow:scroll">';
					if(close_type == '1'){
						modal_default_html += '<div class="et_modal_close">X</div>';
					}
						modal_default_html += '<iframe id="modal_view" scrolling="no" border="0" frameborder="0" class="et_iframe" style="width:1000px;height:1500px;" src="" allowTransparency="true"></iframe>';
					modal_default_html += '</div>';
				modal_default_html += '</div>';
			modal_default_html += '</div>';
	}else if(scroll_type == '2'){
		var m_height = height.replace('px','');
		var margin = parseInt(height)/2;
		var modal_default_html = '<div class="et_modal" style="overflow:hidden;">';
				modal_default_html += '<div class="et_modal_layer">';
					modal_default_html += '<div class="'+bg_class+'"></div>';
					modal_default_html += '<div class="et_modal_load">로딩중</div>';
					modal_default_html += '<div class="et_modal_window" style="width:'+width+';height:'+height+';margin-top:-'+margin+'px;top:50%;overflow:hidden;">';
					if(close_type == '1'){
						modal_default_html += '<div class="et_modal_close">X</div>';
					}
						modal_default_html += '<iframe id="modal_view" scrolling="no" border="0" frameborder="0" class="et_iframe" src="" style="overflow:hidden;" allowTransparency="true"></iframe>';
					modal_default_html += '</div>';
				modal_default_html += '</div>';
			modal_default_html += '</div>';		
	}
	
	
	$('body').prepend(modal_default_html);
	$('#modal_view').attr('src', url);    

	if(animation == '0'){
		if(loading == '1'){
			var scriptTag = "<script>$('#modal_view', window.parent.document).load(function(){$('.et_modal_window', window.parent.document).show();$('.et_modal_load', window.parent.document).hide();})<";
			scriptTag +=  "/script>";
			$('#modal_view').contents().find('body').append(scriptTag);
		}else{
			$('.et_modal_load').hide();
			$('.et_modal_window').show();
		}
	}else if(animation == '1'){
		if(loading == '1'){
			var scriptTag = "<script>$('#modal_view', window.parent.document).load(function(){$('.et_modal_window', window.parent.document).fadeIn();$('.et_modal_load', window.parent.document).hide();})<";
			scriptTag +=  "/script>";
			$('#modal_view').contents().find('body').append(scriptTag);
		}else{
			$('.et_modal_load').hide();
			$('.et_modal_window').fadeIn();
		}		
	}

}

function et_full_modal(url){
	$('html').css('overflow-y','hidden');
	var bg_class = 'et_modal_bg';

	var ie8_sc = '';
	if(isIE(8)){
		var bg_class = 'et_modal_bg on';
	}
		var modal_default_html = '<div class="et_modal">';
				modal_default_html += '<div class="et_modal_layer_full">';
					modal_default_html += '<div class="et_modal_window" style="width:100%;height:100%;top:0px;margin:0px;">';
						modal_default_html += '<iframe id="modal_view" border="0" frameborder="0" src="'+url+'" style="width:100%;height:100%;" scrolling=auto allowTransparency="true"></iframe>';
					modal_default_html += '</div>';
				modal_default_html += '</div>';
			modal_default_html += '</div>';
	$('body').prepend(modal_default_html);
	$('.et_modal_window').fadeIn();
}

function et_modal_close(){
	$('html',parent.document).css('overflow-y','scroll');
	$('.et_modal',parent.document).remove();
}

function lang_add(obj, add_txt){
	return obj.replace(/%s/gi,add_txt);
}

function lang_ex(obj,txt,op){
	var obj_txt = obj;
	if(op == null){
		var arr_txt = String(txt).split(',');
	}else{
		var arr_txt = String(txt).split('/');
	}
	$.each(arr_txt, function(key, val){	
		obj_txt = obj_txt.replace('{%s'+key+'}',val);
	});
	return obj_txt;
}

function check_sk() {
    var dns, arrDns, str; 
    dns = document.location.href; //<-- 현재 URL 얻어온다
    arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
    str = arrDns[0]+"//"+arrDns[1].substring(0,arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다 
	str = str.replace('http://','');
    if(str == 'skt.earthtory.com' || str == 'sk.earthtory.com'){
		return true;
	}else{
		return false;
	}
}

String.prototype.cut = function(len, tail) 
{
    var str = this;
    var l = 0;
    for (var i=0; i<str.length; i++) 
    {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len) return str.substring(0,i) + tail;
    }
    return str;
}

function isIE(version, comparison) {
	var cc      = 'IE',
	    b       = document.createElement('B'),
	    docElem = document.documentElement,
	    isIE;
	    
	if(version){
		cc += ' ' + version;
		if(comparison){ cc = comparison + ' ' + cc; }
	}
	
	b.innerHTML = '<!--[if '+ cc +']><b id="iecctest"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('iecctest');
	docElem.removeChild(b);
	return isIE;
}

function set_clip(pl_srl,member_srl,_class,type){
	var set_srl = pl_srl;
	if(type == null){
		type = '0';
	}
	if(member_srl == '0' || member_srl == ''){
		et_modal('365px','380px','1','0','/ko/member','2','1');
	}else{
		$.ajax({
			type:'POST',
			url:'/api/spot/set_clip_spot',
			data:{'member_srl':member_srl,'pl_srl':pl_srl,'pl_type':type},
			success:function(data){
				console.log(data);
				if($('.'+_class+'[data-srl='+set_srl+']').attr('data-yn') == 'y'){
					$('.'+_class+'[data-srl='+set_srl+']').attr('data-yn','n');
					$('.'+_class+'[data-srl='+set_srl+']').removeClass('on');
					common_msg(lang.deleted_clipboard,1000);
				}else{
					$('.'+_class+'[data-srl='+set_srl+']').attr('data-yn','y');
					$('.'+_class+'[data-srl='+set_srl+']').addClass('on');
					common_msg(lang.added_clipboard,1000);
				}
			}
		});
		$('.clip_bubble').fadeOut();
		SetCookie('clip','1',365);
	}
}

function date_flip(date,sp){//영문용 날짜 뒤집기

	var date_arr = date.split(sp);
	var res_date = '';

	for(var i=date_arr.length;i>0;i--){
		console.log(i);

		if(res_date != ''){
			res_date += sp;
		}

		res_date += date_arr[parseInt(i)-1];
	}

	return res_date;
}

function set_review_vote(cl,no,rv_type,member_srl){ //리뷰 추천
	if(member_srl != '' && member_srl != '0'){
		console.log(cl+'/'+no+'/'+rv_type);

		$.ajax({
			type:'POST',
			url:'/api/common/set_like',
			data:{'srl':no,'like_type':'5'},
			success:function(data){
				console.log(data);
				if(cl == 'cmtm_btn_like' || cl == 'review_like'){
					$('.'+cl+'[data-srl='+no+'] span').text(data.response_data);
					$('.'+cl+'[data-srl='+no+']').addClass('on');
				}
			}
		});
	}else{
		et_modal('365px','380px','1','0','/ko/member','2','1');
	}
}

function txt_trim(value){
	value = value.replace(/^\s+/, "");    // 왼쪽 공백 제거
	value = value.replace(/\s+$/g, "");  // 오른쪽 공백 제거
	value = value.replace(/\n/g, "");     // 행바꿈제거
	value = value.replace(/\r/g, "");      // 엔터제거 
	value = value.replace(/<br>/gi, " ");      // 엔터제거 
	value = value.replace(/<(\/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(\/)?>/gi, ""); //html 제거
	return value;
}

function SetCookie(cKey, cValue, expire)  // name,pwd
{
    var date = new Date(); // 오늘 날짜
    // 만료시점 : 오늘날짜+10 설정
    var validity = expire;
    date.setDate(date.getDate() + validity);
    // 쿠키 저장
    document.cookie = cKey + '=' + escape(cValue) + ';expires=' + date.toGMTString();
}
function DelCookie(cKey) {
    // 동일한 키(name)값으로
    // 1. 만료날짜 과거로 쿠키저장
    // 2. 만료날짜 설정 않는다. 
    //    브라우저가 닫힐 때 제명이 된다   
    var date = new Date(); // 오늘 날짜 
    var validity = -1;
    date.setDate(date.getDate() + validity);
    document.cookie =
          cKey + "=;expires=" + date.toGMTString();
}
function GetCookie(cKey) {
    var allcookies = document.cookie;
    var cookies = allcookies.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var keyValues = cookies[i].split("=");
        if (keyValues[0] == cKey) {
            return unescape(keyValues[1]);
        }
    }
    return "";
}
// ]]>