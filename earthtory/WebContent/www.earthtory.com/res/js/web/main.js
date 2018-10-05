
var vw_ci_srl = '';
var member_srl ='';
var main_guide_is_open = getCookie('main_guide');
var auto_time;
$(document).ready(function(){

$('#originplace_f').blur(function(){
$('body').on('click', function(e){
if($(e.target).parents("#originplace_auto").length > 0 || $(e.target).attr('id') == 'originplace_f'){

}else{
$('#originplace_auto').hide();
}
});
});

$('#originplace_f').focus(function(){
if($('#originplace_auto').html()!=''){
$('#originplace_auto').show();
}
});

$('#destinationplace_f').blur(function(){
$('body').on('click', function(e){
if($(e.target).parents("#destinationplace_auto").length > 0 || $(e.target).attr('id') == 'destinationplace_f'){

}else{
$('#destinationplace_auto').hide();
}
});
});

$('#destinationplace_f').focus(function(){
if($('#destinationplace_auto').html()!=''){
$('#destinationplace_auto').show();
}
});

$('#key_hotelsearch').blur(function(){
$('body').on('click', function(e){
if($(e.target).parents("#key_hotelsearch_autocomplete").length > 0 || $(e.target).attr('id') == 'key_hotelsearch'){

}else{
$('#key_hotelsearch_autocomplete').hide();
}
});
});

$('#key_hotelsearch').focus(function(){
if($('#key_hotelsearch_autocomplete').html()!=''){
$('#key_hotelsearch_autocomplete').show();
}
});



var auto_time;
$("#city_search").keyup(function(e){
		var s_val = $('#city_search').val();
		var _this_class = $(this).attr('class');
		var UP = 38;
		var DOWN = 40;
		var ENTER = 13;
		var getKey = e.which;

		if(getKey == UP || getKey == DOWN || getKey == ENTER){
			clearTimeout(auto_time);
			if(_this_class == 'sk_auto'){
				$('#city_search').css('background','url("/res/img/main/sk_search_w.gif") no-repeat white');
				$('#city_search').css('background-position','right center');
			}else{
				if(_this_class == 'search_input'){
					$('#city_search').css('background','url("/res/img/area/area_search_ico.gif") no-repeat white');			
					$('#city_search').css('background-position','center right');
				}else{
					$('#city_search').css('background','url("/res/img/common/gnb/search_icon.png") no-repeat white');				
				}				
			}

			is_target = $('#city_autocomplete .wm_city_item.on').length;

			if(is_target == 0){
				if(getKey == DOWN){
					$('#city_autocomplete .wm_city_item').first().addClass('on');
					$('#city_autocomplete .wm_city_item').first().addClass('select');

					_this_text = $('#city_autocomplete .wm_city_item.select').find('.h_search_name').text();
					$('#city_search').val(_this_text);
				}else if(getKey == UP){
					$('#city_autocomplete .wm_city_item').last().addClass('on');
					$('#city_autocomplete .wm_city_item').last().addClass('select');

					_this_text = $('#city_autocomplete .wm_city_item.select').find('.h_search_name').text();
					$('#city_search').val(_this_text);
				}else if(getKey == ENTER){
					//$('#key_hotelsearch_autocomplete').hide();
				}
			}else{
				if(getKey == DOWN){
					$('#city_autocomplete .wm_city_item').removeClass('on');
					$('#city_autocomplete .wm_city_item.select').next().addClass('on');
					$('#city_autocomplete .wm_city_item.select').next().addClass('select');
					$('#city_autocomplete .wm_city_item:not(.on)').removeClass('select');

					_this_text = $('#city_autocomplete .wm_city_item.select').find('.h_search_name').text();
					$('#city_search').val(_this_text);

				}else if(getKey == UP){

					$('#city_autocomplete .wm_city_item').removeClass('on');
					$('#city_autocomplete .wm_city_item.select').prev().addClass('on');
					$('#city_autocomplete .wm_city_item.select').prev().addClass('select');
					$('#city_autocomplete .wm_city_item:not(.on)').removeClass('select');

					_this_text = $('#city_autocomplete .wm_city_item.select').find('.h_search_name').text();
					$('#city_search').val(_this_text);

				}else if(getKey == ENTER){
					$('#city_autocomplete').hide();
					_go_ = $('#city_autocomplete .wm_city_item.select').attr('href');
					location.href= _go_;
				}
			}
		}else{
			if (s_val != '' && getKey != UP && getKey != DOWN && getKey != ENTER){

				if(_this_class == 'sk_auto'){
					$('#city_search').css('background','url("/res/img/common/input_load_big.gif") no-repeat white');
					$('#city_search').css('background-position','455px center');
				}else{

						console.log(_this_class);
					if(_this_class == 'search_input'){
						//$('#city_search').css('background','url("/res/img/area/area_search_ico.gif") no-repeat white');		
						$('#city_search').css('background','url("/res/img/common/input_load.gif") no-repeat white');
						$('#city_search').css('background-position','98% center');	
					}else{
						$('#city_search').css('background','url("/res/img/common/input_load.gif") no-repeat');
						$('#city_search').css('background-position','471px 6px');
					}
				}
				clearTimeout(auto_time);
				auto_time = setTimeout(function(){
					var data = 'search_val='+s_val;

					var html_code = '';
					$('#city_autocomplete').html(''); 
					$.ajax({
							type:'post',
							data:data,
							url:'/api/common/autucomplete_cicu',
							success: function(data){
								console.log(data);
								$.each(data.response_data,function(key,val){
									html_code += '<a class="h_search area wm_city_item" href="'+val.link_url+'">';
										html_code += '<span class="h_search_name">'+val.name+'</span>';
										html_code += '<div class="clear"></div>';
										if(val.type == 'ci'){
											html_code += '<span class="h_search_cicu">'+val.parent_name+'</span>';
										}else{
											html_code += '<span class="h_search_cicu">'+val.name_en+'</span>';
										}
									html_code += '</a>';
								});
								$('#city_autocomplete').html(html_code);


								if(_this_class == 'sk_auto'){
									$('#city_search').css('background','url("/res/img/main/sk_search_w.gif") no-repeat white');
									$('#city_search').css('background-position','right center');
								}else{
									if(_this_class == 'search_input'){
										$('#city_search').css('background','url("/res/img/area/area_search_ico.gif") no-repeat white');		
										$('#city_search').css('background-position','center right');
									}else{
										$('#city_search').css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
										$('#city_search').css('background-position','471px 4px');
									}
								}

								if(html_code != ''){
									$("#city_autocomplete").show();
								}else{
									$("#city_autocomplete").hide();
								}
					
							},complete:function(){

							}
					});
				},300);
			}else{
				clearTimeout(auto_time);
				auto_time = setTimeout(function(){
					if(_this_class == 'sk_auto'){
						$('#city_search').css('background','url("/res/img/main/sk_search_w.gif") no-repeat white');
						$('#city_search').css('background-position','right center');
					}else{
						if(_this_class == 'search_input'){
							$('#city_search').css('background','url("/res/img/area/area_search_ico.gif") no-repeat white');			
							$('#city_search').css('background-position','center right');
						}else{
							$('#city_search').css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
							$('#city_search').css('background-position','471px 4px');
						}	
					}
					$('#city_autocomplete').html('');
					$('#city_autocomplete').hide();
				},300);
		}
	}
	});

	$('#city_search').blur(function(){
		$('body').on('click', function(e){
		if($(e.target).parents("#city_autocomplete").length > 0 || $(e.target).attr('id') == 'city_search'){

		}else{
			$('#city_autocomplete').hide();
		}
		});
	});

	$('#city_search').focus(function(){
	if($('#city_autocomplete').html()!=''){
		$('#city_autocomplete').show();
	}
	});

//vw_type_3_load();

	if(main_guide_is_open == 'close'){
	$('.guide_open_content').hide();
	$('.guide_close_content').show();
	$('#guide_close_btn').attr('data','off');
	$('#main_guide_full_box').css('height','74px');
	$('.main_guide.open').css('height','47px');
	$('.main_guide.open .wrap').css('height','47px');
	$('#guide_close_btn img').attr('src','/res/img/main/guide_open_btn.png'); 
	}


$('#popular_trip_tab .popular_trip_tab_item').click(function(){
if($(this).attr('data-onoff')=='off'){
$('#popular_trip_tab .popular_trip_tab_item.on').attr('data-onoff', 'off');
$(this).attr('data-onoff','on');
$('#popular_trip_tab .popular_trip_tab_item').removeClass('on');
$(this).addClass('on');
vw_type_3_load();
}
});

$('.v_select ul li').click(function(){
$('.v_select ul li').css('border-right', 'solid #84a2c2 1px');
$(this).css('border-right','solid #fff 1px');
if($(this).hasClass('middle')){
$('li.first').css('border-right','solid #fff 1px');
}else{
if($(this).hasClass('last')){
$('li.middle').css('border-right','solid #fff 1px');
}
}
});

	$('.indicator_box[data="spot"] img').click(function(){
	$('.indicator_box[data="spot"] img').attr('src','/res/img/common/indicator_a.png');
	$(this).attr('src','/res/img/common/indicator_b.png');
	var page = $(this).attr('data');
	get_spot_list(vw_ci_srl, page);
	});

	$('.indicator_box[data="wp"] img').click(function(){
	$('.indicator_box[data="wp"] img').attr('src','/res/img/common/indicator_a.png');
	$(this).attr('src','/res/img/common/indicator_b.png');
	var page = $(this).attr('data');

	});

$('#guide_close_btn').click(function(){
var on_off = $(this).attr('data');

if(on_off == 'on'){
setCookie('main_guide','close',7);
$('#main_guide_full_box').animate({height:74},
{duration: 300,
 complete: function(){
$('.guide_open_content').hide();
$('.guide_close_content').show();
$('#guide_close_btn').attr('data','off');
}
});
$('.main_guide.open').animate({height:47},300);
$('.main_guide.open .wrap').animate({height:47},300);
$('#guide_close_btn img').attr('src','/res/img/main/guide_open_btn.png');
}else{
setCookie('main_guide','open',7);
$('.guide_close_content').hide();
$('.guide_open_content').show();

$('#main_guide_full_box').animate({height:337},
{duration: 300,
complete: function(){
$('#guide_close_btn').attr('data','on');
}
});
$('.main_guide.open').animate({height:310},300);
$('.main_guide.open .wrap').animate({height:310},300);
$('#guide_close_btn img').attr('src','/res/img/main/guide_close_btn.png');
}
});

$('#flight_search_box .flight_option').click(function(){
is_this_on = $(this).attr('data-is_on');
_this_data=$(this).attr('data');
if(_this_data == 0){
$('#inbounddate').attr('disabled', true);
$('#inbounddate').css('background','#ddd');
$('#inbounddate').val(lang.pc_one_way);
$('#onway').val('true');
}else{
$('#inbounddate').attr('disabled', false);
$('#inbounddate').css("background","url('/res/img/main/hotel/check_out_bg.png') no-repeat 155px 6px");
$('#inbounddate').val('');
$('#onway').val('false');
}

$('#flight_search_box .flight_option').removeClass('on');
$(this).addClass('on');
$(this).attr('data-is_on','1');
}); 

$('#key_hotelsearch_checkin').datepicker({
numberOfMonths:2,
prevText:'',
nextText:'',
monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
dayNames:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dayNamesShort:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dayNamesMin:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dateFormat:'yy-mm-dd',
minDate: 0,
maxDate: '+1Y',
hideIfNoPrevNext: true,
onClose:function(selectedDate){
var _this_start_day = selectedDate;
var _this_select_day = $('#key_hotelsearch_checkout').val();

var between_day = date_gap(_this_start_day, _this_select_day);

if(between_day > 29){
alert('죄송합니다. 30일 이상의 예약은 할 수 없습니다.');
$('#key_hotelsearch_checkin').val('');
}

var next_day = get_day_plus(selectedDate.replace(/-/gi,''),1);
$('#key_hotelsearch_checkout').datepicker('option','minDate',next_day);
}
});

 var _this_checkin_date = $('#key_hotelsearch_checkin').val();
$('#key_hotelsearch_checkout').datepicker({
numberOfMonths:2,
prevText:'',
nextText:'',
monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
dayNames:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dayNamesShort:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dayNamesMin:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dateFormat:'yy-mm-dd',
maxDate: '+1Y',
minDate: _this_checkin_date,
hideIfNoPrevNext: true,
onClose:function(selectedDate){
var _this_start_day = $('#key_hotelsearch_checkin').val();
var _this_select_day = selectedDate;

var between_day = date_gap(_this_start_day, _this_select_day);

if(between_day > 29){
alert('죄송합니다. 30일 이상의 예약은 할 수 없습니다.');
$('#key_hotelsearch_checkout').val('');
}
//$('#key_hotelsearch_checkin').datepicker('option','maxDate',selectedDate);
}
});



$('#outbounddate').datepicker({
numberOfMonths:2,
prevText:'',
nextText:'',
monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
dayNames:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dayNamesShort:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dayNamesMin:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dateFormat:'yy-mm-dd',
minDate: 0,
maxDate: '+1Y',
hideIfNoPrevNext: true,
onClose:function(selectedDate){
_this_is_one_way = $('.flight_option.on').attr('data');
if(_this_is_one_way != '0'){
$('#inbounddate').datepicker('option','minDate',selectedDate);
if($('#inbounddate').val() == ''){
$('#inbounddate').val(selectedDate);
}
}
}
});

var _this_out_date = $('#outbounddate').val();
$('#inbounddate').datepicker({
numberOfMonths:2,
prevText:'',
nextText:'',
monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
dayNames:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dayNamesShort:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dayNamesMin:['SUN','MON','TUE','WED','THU','FRI','SAT'],
dateFormat:'yy-mm-dd',
maxDate: '+1Y',
minDate: _this_out_date,
hideIfNoPrevNext: true,
onClose:function(selectedDate){
//$('#outbounddate').datepicker('option','maxDate',selectedDate);
}
}); 


var auto_time;
$("#key_hotelsearch").keyup(function(e){
var search_value = $("#key_hotelsearch").val();
//$("#key_hotelsearch_autocomplete").hide();


var UP = 38;
var DOWN = 40;
var ENTER = 13;
var getKey = e.which;
//console.log(getKey);


if(getKey == UP || getKey == DOWN || getKey == ENTER){
clearTimeout(auto_time);
$('#key_hotelsearch').css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
$('#key_hotelsearch').css('background-position','345px 4px');
is_target = $('#key_hotelsearch_autocomplete .hotel_item.on').length;
if(is_target ==0){
if(getKey == DOWN){
$('#key_hotelsearch_autocomplete .hotel_item').first().addClass('on');
$('#key_hotelsearch_autocomplete .hotel_item').first().addClass('select');

_this_id = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data');
_this_text = $('#key_hotelsearch_autocomplete .hotel_item.select').find('.h_search_name').text();
_this_qtxt = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data-qtxt');
_this_type = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data-type');


$('#key_hotelsearch').val(_this_text);
$('#entityid').val(_this_id);
$('#q_txt').val(_this_qtxt);
$('#search_type').val(_this_type);

}else if(getKey == UP){
$('#key_hotelsearch_autocomplete .hotel_item').last().addClass('on');
$('#key_hotelsearch_autocomplete .hotel_item').last().addClass('select');

_this_id = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data');
_this_text = $('#key_hotelsearch_autocomplete .hotel_item.select').find('.h_search_name').text();
_this_qtxt = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data-qtxt');
_this_type = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data-type');


$('#key_hotelsearch').val(_this_text);
$('#entityid').val(_this_id);
$('#q_txt').val(_this_qtxt);
$('#search_type').val(_this_type);

}else if(getKey == ENTER){
//$('#key_hotelsearch_autocomplete').hide();
}
}else{
if(getKey == DOWN){
$('#key_hotelsearch_autocomplete .hotel_item').removeClass('on');
$('#key_hotelsearch_autocomplete .hotel_item.select').next().addClass('on');
$('#key_hotelsearch_autocomplete .hotel_item.select').next().addClass('select');
$('#key_hotelsearch_autocomplete .hotel_item:not(.on)').removeClass('select');

_this_id = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data');
_this_text = $('#key_hotelsearch_autocomplete .hotel_item.select').find('.h_search_name').text();
_this_qtxt = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data-qtxt');
_this_type = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data-type');


$('#key_hotelsearch').val(_this_text);
$('#entityid').val(_this_id);
$('#q_txt').val(_this_qtxt);
$('#search_type').val(_this_type);
}else if(getKey == UP){

$('#key_hotelsearch_autocomplete .hotel_item').removeClass('on');
$('#key_hotelsearch_autocomplete .hotel_item.select').prev().addClass('on');
$('#key_hotelsearch_autocomplete .hotel_item.select').prev().addClass('select');
$('#key_hotelsearch_autocomplete .hotel_item:not(.on)').removeClass('select');

_this_id = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data');
_this_text = $('#key_hotelsearch_autocomplete .hotel_item.select').find('.h_search_name').text();
_this_qtxt = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data-qtxt');
_this_type = $('#key_hotelsearch_autocomplete .hotel_item.select').attr('data-type');


$('#key_hotelsearch').val(_this_text);
$('#entityid').val(_this_id);
$('#q_txt').val(_this_qtxt);
$('#search_type').val(_this_type);

}else if(getKey == ENTER){
$('#key_hotelsearch_autocomplete').hide();
}
}
}else{

if (search_value != '' && getKey != UP && getKey != DOWN && getKey != ENTER){
$('#key_hotelsearch').css('background','url("/res/img/common/input_load.gif") no-repeat');
$('#key_hotelsearch').css('background-position','345px 6px');
clearTimeout(auto_time);
 auto_time = setTimeout(function(){
var en_search_value = search_value.replace(/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi,'');
$.ajax({
type: "POST",
url: "/api/hotel/get_hotel_autosuggest",
data: {"market": default_i.market, "currency": default_i.currency, "locale": default_i.locale, "query" : en_search_value},
success: function(data) {
//console.log(data);


 var html_code = "";

$.each(data.results,function(key,val){
var place_a_no = Number(val.parent_place_id) - 1;
html_code += '<div class="h_search hotel_item" data="'+val.individual_id+'" data-qtxt="'+val.display_name+', '+data.places[place_a_no].country_name+'" data-type="'+val.localised_geo_type+'">';
html_code += '<span class="h_search_name">'+val.display_name+'</span>';
html_code += '<div class="clear"></div>';
html_code += '<span class="h_search_cicu">'
$.each(data.places,function(keys,vals){
var com = false;
if(vals.place_id == val.parent_place_id){
if(vals.city_name != null && vals.city_name != ''){
html_code += vals.city_name;
com = true;
}

if(vals.country_name != null && vals.country_name != ''){
if(com){
html_code += ',';
}
html_code += vals.country_name;
}
return false;
}
});
html_code += '</span>';

html_code += '<div class="hotel_type">'+val.localised_geo_type+'</div>';
html_code += '</div>';

});

$("#key_hotelsearch_autocomplete").html(html_code);
if(html_code != ''){
$("#key_hotelsearch_autocomplete").show();
}else{
$("#key_hotelsearch_autocomplete").hide();
}
$('#key_hotelsearch').css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
$('#key_hotelsearch').css('background-position','345px 4px');
},
error:function(request,status,error){
alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
}
});
},300);
}else{
clearTimeout(auto_time);
auto_time = setTimeout(function(){
$('#key_hotelsearch').css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
$('#key_hotelsearch').css('background-position','345px 4px');
$('#key_hotelsearch_autocomplete').html('');
$('#key_hotelsearch_autocomplete').hide();
},300);
}
}
});


var auto_time;
// 항공 자동완성
$("#originplace_f, #destinationplace_f").keyup(function(e){
var obj = $(this);
var _this_id = obj.attr('id');
var search_value = obj.val();

var UP = 38;
var DOWN = 40;
var ENTER = 13;
var getKey = e.which;

if(_this_id == 'originplace_f'){
_this_auto_id = 'originplace_auto';

}else{
_this_auto_id = 'destinationplace_auto';
}
//console.log(_this_auto_id);
if(getKey == UP || getKey == DOWN || getKey == ENTER){
clearTimeout(auto_time);
$('#'+_this_id).css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
$('#'+_this_id).css('background-position','right 5px top 4px');
is_target = $('#'+_this_auto_id+' .f_search.on').length;
if(is_target ==0){
if(getKey == DOWN){
$('#'+_this_auto_id+' .f_search').first().addClass('on');
$('#'+_this_auto_id+' .f_search').first().addClass('select');

if(_this_id == 'originplace_f'){
$('#originplace').val($('#'+_this_auto_id+' .f_search.select').attr('id'));
$('#originplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
$('#originplace_name').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
if($('#'+_this_auto_id+' .f_search.select').attr("countryId") == $('#'+_this_auto_id+' .f_search.select').attr("id")){
$('#originplace_iscountry').val('y');
}else{
$('#originplace_iscountry').val('n');
}
$('#originplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
}else{
$('#destinationplace').val($('#'+_this_auto_id+' .f_search.select').attr('id'));
$('#destinationplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
$('#destinationplace_name').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
if($('#'+_this_auto_id+' .f_search.select').attr("countryId") == $('#'+_this_auto_id+' .f_search.select').attr("id")){
$('#destinationplace_iscountry').val('y');
}else{
$('#destinationplace_iscountry').val('n');
}
$('#destinationplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
}



}else if(getKey == UP){
$('#'+_this_auto_id+' .f_search').last().addClass('on');
$('#'+_this_auto_id+' .f_search').last().addClass('select');
if(_this_id == 'originplace_f'){
$('#originplace').val($('#'+_this_auto_id+' .f_search.select').attr('id'));
$('#originplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
$('#originplace_name').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
if($('#'+_this_auto_id+' .f_search.select').attr("countryId") == $('#'+_this_auto_id+' .f_search.select').attr("id")){
$('#originplace_iscountry').val('y');
}else{
$('#originplace_iscountry').val('n');
}
$('#originplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
}else{
$('#destinationplace').val($('#'+_this_auto_id+' .f_search.select').attr('id'));
$('#destinationplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
$('#destinationplace_name').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
if($('#'+_this_auto_id+' .f_search.select').attr("countryId") == $('#'+_this_auto_id+' .f_search.select').attr("id")){
$('#destinationplace_iscountry').val('y');
}else{
$('#destinationplace_iscountry').val('n');
}
$('#destinationplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
}

}else if(getKey == ENTER){
//$('#key_hotelsearch_autocomplete').hide();
}
}else{
if(getKey == DOWN){
$('#'+_this_auto_id+' .f_search').removeClass('on');
$('#'+_this_auto_id+' .f_search.select').next().addClass('on');
$('#'+_this_auto_id+' .f_search.select').next().addClass('select');
$('#'+_this_auto_id+' .f_search:not(.on)').removeClass('select');

if(_this_id == 'originplace_f'){
$('#originplace').val($('#'+_this_auto_id+' .f_search.select').attr('id'));
$('#originplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
$('#originplace_name').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
if($('#'+_this_auto_id+' .f_search.select').attr("countryId") == $('#'+_this_auto_id+' .f_search.select').attr("id")){
$('#originplace_iscountry').val('y');
}else{
$('#originplace_iscountry').val('n');
}
$('#originplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
}else{
$('#destinationplace').val($('#'+_this_auto_id+' .f_search.select').attr('id'));
$('#destinationplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
$('#destinationplace_name').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
if($('#'+_this_auto_id+' .f_search.select').attr("countryId") == $('#'+_this_auto_id+' .f_search.select').attr("id")){
$('#destinationplace_iscountry').val('y');
}else{
$('#destinationplace_iscountry').val('n');
}
$('#destinationplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
} 
}else if(getKey == UP){

$('#'+_this_auto_id+' .f_search').removeClass('on');
$('#'+_this_auto_id+' .f_search.select').prev().addClass('on');
$('#'+_this_auto_id+' .f_search.select').prev().addClass('select');
$('#'+_this_auto_id+' .f_search:not(.on)').removeClass('select');

if(_this_id == 'originplace_f'){
$('#originplace').val($('#'+_this_auto_id+' .f_search.select').attr('id'));
$('#originplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
$('#originplace_name').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
if($('#'+_this_auto_id+' .f_search.select').attr("countryId") == $('#'+_this_auto_id+' .f_search.select').attr("id")){
$('#originplace_iscountry').val('y');
}else{
$('#originplace_iscountry').val('n');
}
$('#originplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
}else{
$('#destinationplace').val($('#'+_this_auto_id+' .f_search.select').attr('id'));
$('#destinationplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
$('#destinationplace_name').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
if($('#'+_this_auto_id+' .f_search.select').attr("countryId") == $('#'+_this_auto_id+' .f_search.select').attr("id")){
$('#destinationplace_iscountry').val('y');
}else{
$('#destinationplace_iscountry').val('n');
}
$('#destinationplace_f').val($('#'+_this_auto_id+' .f_search.select').attr('placeName'));
}

}else if(getKey == ENTER){
$('#'+_this_auto_id).hide();
}
}
}else{
if (search_value != '' && getKey != UP && getKey != DOWN && getKey != ENTER){
$('#'+_this_id).css('background','url("/res/img/common/input_load.gif") no-repeat');
$('#'+_this_id).css('background-position','right 5px top 6px');
clearTimeout(auto_time);
 auto_time = setTimeout(function(){
				console.log(default_i.market, default_i.currency, default_i.locale, search_value);
				 
$.ajax({
type: "POST",
url: "/api/air/get_air_autosuggest",
data : {"market": default_i.market, "currency": default_i.currency, "locale": default_i.locale, "query": search_value},
		dataType:"json",
success: function(data) {
console.log(data);
var html = '';
var is_city = 0;
$('#originplace_auto').html('');
$('#destinationplace_auto').html('');

//lang==ko
if(search_value == '서울'){
html += '<div class="f_search flight" id="SELA-sky" cityid="SELA-sky" countryid="KR-sky" placename="서울"><span class="h_search_name">서울(모두)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
}

$.each(data.Places, function(key, value) {
html = '';
html += '<div class="f_search flight" id="'+value.PlaceId+'" cityId="'+value.CityId+'" countryId="'+value.CountryId+'" placeName="'+value.PlaceName+'" ><span class="h_search_name">';

if(value.PlaceId.replace(/-sky/gi,'').length != '4'){
html += value.PlaceName+'('+value.PlaceId.replace(/-sky/gi,'')+')';
is_city = 0;
}else{
html += value.PlaceName+'('+lang.all2+')';//모두
is_city = 1;
}

html += '</span><div class="clear"></div><span class="h_search_cicu">'+value.CountryName+'</span></div>';
if(_this_id == 'originplace_f'){
if(is_city == 1){
$('#originplace_auto').prepend(html);
}else{
$('#originplace_auto').append(html);
}
}else{
if(is_city == 1){
$('#destinationplace_auto').prepend(html);
}else{
$('#destinationplace_auto').append(html);
}
}
});

if(_this_id == 'originplace_f'){
$('#originplace_auto').show();

}else{
$('#destinationplace_auto').show();

}
$('#'+_this_id).css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
$('#'+_this_id).css('background-position','right 5px top 4px');

},error:function(data){
		console.log('error');
		console.log(data);
	}
});
},300);
}else{
clearTimeout(auto_time);
auto_time = setTimeout(function(){
$('#'+_this_id).css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
$('#'+_this_id).css('background-position','right 5px top 4px');
//lang ko
if(et_lang == 'ko'){
html ='<div class="f_search flight" id="ICN-sky" cityid="SELA-sky" countryid="KR-sky" placename="인천국제공항"><span class="h_search_name">인천국제공항(ICN)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="GMP-sky" cityid="SELA-sky" countryid="KR-sky" placename="서울 김포"><span class="h_search_name">서울 김포(GMP)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="PUS-sky" cityid="PUSA-sky" countryid="KR-sky" placename="부산"><span class="h_search_name">부산(PUS)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="CJU-sky" cityid="CJUA-sky" countryid="KR-sky" placename="제주공항"><span class="h_search_name">제주공항(CJU)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="CJJ-sky" cityid="CJJA-sky" countryid="KR-sky" placename="청주"><span class="h_search_name">청주(CJJ)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="MWX-sky" cityid="KWJA-sky" countryid="KR-sky" placename="광주 무안 인터내셔널"><span class="h_search_name">광주 무안 인터내셔널(MWX)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
}
if(_this_id == 'originplace_f'){
$('#originplace_auto').html(html);
$('#originplace_auto').show();

}else{
$('#destinationplace_auto').html('');
$('#destinationplace_auto').hide();

}
//no ko
// $('#'+_this_auto_id).html('');
// $('#'+_this_auto_id).hide();

},300);
}
}
//lang ko
if(search_value == ''){
if(et_lang == 'ko'){
html ='<div class="f_search flight" id="ICN-sky" cityid="SELA-sky" countryid="KR-sky" placename="인천국제공항"><span class="h_search_name">인천국제공항(ICN)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="GMP-sky" cityid="SELA-sky" countryid="KR-sky" placename="서울 김포"><span class="h_search_name">서울 김포(GMP)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="PUS-sky" cityid="PUSA-sky" countryid="KR-sky" placename="부산"><span class="h_search_name">부산(PUS)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="CJU-sky" cityid="CJUA-sky" countryid="KR-sky" placename="제주공항"><span class="h_search_name">제주공항(CJU)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="CJJ-sky" cityid="CJJA-sky" countryid="KR-sky" placename="청주"><span class="h_search_name">청주(CJJ)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
html +='<div class="f_search flight" id="MWX-sky" cityid="KWJA-sky" countryid="KR-sky" placename="광주 무안 인터내셔널"><span class="h_search_name">광주 무안 인터내셔널(MWX)</span><div class="clear"></div><span class="h_search_cicu">대한민국</span></div>';
}
if(_this_id == 'originplace_f'){
$('#originplace_auto').html(html);
$('#originplace_auto').show();

}else{
$('#destinationplace_auto').html('');
$('#destinationplace_auto').hide();

}
}
 
});



$('body').on('mouseover','.own_spot_item.close',function(){

$(this).addClass('open');
$(this).removeClass('close');
$(this).find('.spot_item_hover').stop();
$(this).find('.spot_item_hover').slideDown("fast",function() {
$(this).parent().find('*').stop(true, true);// Animation complete.
});
});

$('body').on('mouseleave','.own_spot_item.open',function(){

$(this).addClass('close');
$(this).removeClass('open');
$(this).find('.spot_item_hover').stop();
$(this).find('.spot_item_hover').slideUp("fast",function() {
$(this).parent().find('*').stop(true, true);// Animation complete.
});
});




$("#originplace_auto, #destinationplace_auto").on("click", ".f_search", function(){
//$(this).parent().parent().parent().find("input:text").val($(this).attr("id"));

this_input_id= $(this).parent().attr('id');
if(this_input_id == 'originplace_auto'){
$('#originplace').val($(this).attr('id'));
$('#originplace_f').val($(this).attr('placeName'));
$('#originplace_name').val($(this).attr('placeName'));
if($(this).attr("countryId") == $(this).attr("id")){
$('#originplace_iscountry').val('y');
}else{
$('#originplace_iscountry').val('n');
} 
}else{
$('#destinationplace').val($(this).attr('id'));
//console.log($('#destinationplace').val());
$('#destinationplace_f').val($(this).attr('placeName'));
$('#destinationplace_name').val($(this).attr('placeName'));
if($(this).attr("countryId") == $(this).attr("id")){
$('#destinationplace_iscountry').val('y');
}else{
$('#destinationplace_iscountry').val('n');
} 
}

$('#'+this_input_id).hide();
$('#'+this_input_id).html('');
});

$('#key_hotelsearch_autocomplete').on('click','.hotel_item',function(){
_this_id = $(this).attr('data');
_this_text = $(this).find('.h_search_name').text();
_this_qtxt = $(this).attr('data-qtxt');
_this_type = $(this).attr('data-type');

$('#key_hotelsearch_autocomplete').hide();
$('#key_hotelsearch').val(_this_text);
$('#entityid').val(_this_id);
$('#q_txt').val(_this_qtxt);
$('#search_type').val(_this_type);
});

$('#reco_city_box .main_city_item').mouseover(function(){
	if(!check_sk()){
		$(this).removeClass('bgb-10');
		$(this).addClass('bgb-50');
	}
});

$('#reco_city_box .main_city_item').mouseout(function(){
	if(!check_sk()){
		$(this).removeClass('bgb-50');
		$(this).addClass('bgb-10');
	}
});

if(check_sk()){
	$('.sk_v').owlCarousel({
		loop:true,
		nav:true,
		items:1,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		animateOut:'fadeOut',
		navText:['<img src="/res/img/main/sknav_prev.png">','<img src="/res/img/main/sknav_next.png">']
	});
}
});
//document ready

function date_gap(_this_start_day, _this_select_day){

var _start_day_arr = _this_start_day.split("-");
var _start_day_obj = new Date(_start_day_arr[0], Number(_start_day_arr[1])-1, _start_day_arr[2]);
var _sel_day_arr = _this_select_day.split("-");
var _sel_day_obj = new Date(_sel_day_arr[0], Number(_sel_day_arr[1])-1, _sel_day_arr[2]);

var between_day = (_sel_day_obj.getTime() - _start_day_obj.getTime())/1000/60/60/24;
return between_day;
}



function cutStr(str,limit){
var tmpStr = str;
var byte_count = 0;
var len = str.length;
var dot = "";

for(i=0; i<len; i++){
byte_count += chr_byte(str.charAt(i)); 
if(byte_count == limit-1){
if(chr_byte(str.charAt(i+1)) == 2){
tmpStr = str.substring(0,i+1);
dot = "...";
}else {
if(i+2 != len) dot = "...";
tmpStr = str.substring(0,i+2);
}
break;
}else if(byte_count == limit){
if(i+1 != len) dot = "...";
tmpStr = str.substring(0,i+1);
break;
}
}
return tmpStr+dot;
}

function chr_byte(chr){
if(escape(chr).length > 4)
return 2;
else
return 1;
}




var data = 'vw_type=1';
$.ajax({
type:'post',
data:data,
cache:false,
url:'/api/main/get_view_main',
success: function(data){
//console.log(data);
$.each(data.response_data, function(key, val) {
if(Number(val.vw_order) <= 7){
$(".mk_"+val.rel_upcode+"[data='1']").append('<a href="'+val.link+'"><div class="mk_list_item">'+val.ci_name+'<div></a>');
}else{
$(".mk_"+val.rel_upcode+"[data='2']").append('<a href="'+val.link+'"><div class="mk_list_item">'+val.ci_name+'<div></a>');
}
});
}
});


var data = 'vw_type=2&member_srl='+member_srl;
$.ajax({
type:'post',
data:data,
cache:false,
url:'/api/main/get_view_main',
success: function(data){
//console.log('vw_2');
//console.log(data);
//console.log('vw_2');
$.each(data.response_data, function(key, val) {

vw_ci_srl = val.ci_srl;
$('.own_city_box').css("background","url('"+val.ci_img_url+"')");
$('.own_city_box').css("background-size","720px 250px");
$('#own_city_name_en').html(val.ci_name_en);
$('.own_city_name').html(val.ci_name);
$('#vw_2_link').attr('href',val.link);


get_whether(val.ci_lat, val.ci_lng);
get_exchange_rate(val.cu_cc);
get_spot_list(val.ci_srl, 1);
get_reco_plan_list(val.ci_srl);
});
}
});


function get_reco_plan_list(ci_srl){
var data = 'paging=true&per_page=3&cur_page=1&ci_srl='+ci_srl;
$.ajax({
type:'post',
data:data,
cache:false,
url:'/api/plan/get_recommend_plan_list',
success: function(data){
//console.log(data);
var html_code = '';
$.each(data.response_data, function(key, val) {
if(key == 2){
html_code += '<div class="plan_item_content fl" style="margin-right:0px;">';
}else{
html_code += '<div class="plan_item_content fl">';
}
html_code +='<a href="/mypage/'+val.reg_member_my_url+'?type=plan_sub&gdb_srl='+val.pn_srl+'"><div class="plan_item_over"></div><div class="plan_item_info"><div class="plan_item_title"><span>2박3일</span> '+val.pn_title+'</div>';
html_code += '<div class="plan_item_sub_title">'+val.tour_type_nm+'</div></div><img src="'+val.cover_img_url+'"></div></a>';
});
html_code += '<div class="clear"></div>';
$('#reco_plan_item_box').html(html_code);

}
}); 

}




function get_day_plus(date,num) {

//Date객체는 달은 -1만큼 줄임

if(date.substring(6,7) == "0") {

var myDate = new Date(date.substring(0,4), parseInt(date.substring(4,6),10)-1, parseInt(date.substring(7,8),10)+parseInt(num,10));

}

else {

var myDate = new Date(date.substring(0,4), parseInt(date.substring(4,6),10)-1, parseInt(date.substring(6,8),10)+parseInt(num,10));

}

//myDate.setDate(myDate.getDate() + Number(1));

var result = formatDate(myDate);



return result;

} 

function formatDate(date) {

var mymonth = date.getMonth()+1;//변환시 반드시 1 넣기!!

var myweekday = date.getDate();


var year = date.getFullYear();
var month = fillzero(mymonth,2);
var day = fillzero(myweekday,2);
//console.log(year+'/'+month+'/'+day);
//return (date.getFullYear() + ((mymonth < 10) ? "0" : "") +'-'+ mymonth +'-'+ ((myweekday < 10) ? "0" : "") + myweekday);
return year+'-'+month+'-'+day;

}

function fillzero(obj, len) {
obj= '000000000000000'+obj;
return obj.substring(obj.length-len);
} 




function get_recent_view_spot(){
var data='member_srl='+member_srl
$.ajax({
type:'post',
data:data,
cache:false,
url:'/api/spot/get_recent_view_spot',
success: function(data){
//console.log('>>>>>>>>>>>');
//console.log(data);
//console.log(data);
$('#vw_2_item_c_box').hide();
$('#vw_2_item_c_box').html('');
var html = '';
$.each(data.response_data, function(key, val) {
if(key == 3){
html +='<div class="own_spot_item fl close" style="margin: 25px 0px 0px 0px;">';
}else{
html +='<div class="own_spot_item fl close">';
}
html +='<div class="spot_img"><img src="'+val.pl_img_url+'" alt="'+val.pl_name+'"></div>';
html +='<div class="spot_item_content"><div class="spot_category"><img src="/res/map/marker/'+val.pl_sub_category+'_0.png"></div>';
html +='<div class="spot_title">'+val.pl_name+'</div><div class="clip_cnt fl">'+number_format(val.pl_clip_cnt)+'</div>';
html +='<div class="spot_tag fr">테마1</div><div class="spot_tag fr">테마테마2</div>';
html +='<div class="clear"></div><div class="spot_item_hover" style="display: none; height: 57px; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;">';
html +='<a href="'+val.link_url+'"><div class="btn-gray spot_detail_btn fl">상세보기</div></a><div class="btn-sky spot_clip_btn fl">클립</div><div class="clear"></div></div></div></div>';
if(key == 3){
return false;
}
});

$('#vw_2_item_c_box').html(html);
$('#vw_2_item_c_box').fadeIn();

}
});
}

function get_spot_list(ci_srl, page_no){
var data ="pl_ci="+ci_srl+'&per_page=4&cur_page='+page_no+'&exclude_clip=true&member_srl='+member_srl;
//console.log(data);
$.ajax({
type:'post',
data:data,
cache:false,
url:'/api/spot/get_spot_list',
success: function(data){
//console.log(data);
$('#vw_2_item_a_box').hide();
$('#vw_2_item_a_box').html('');
var html = '';
$.each(data.response_data, function(key, val) {
if(key == 3){
html +='<div class="own_spot_item fl close" style="margin: 25px 0px 0px 0px;">';
}else{
html +='<div class="own_spot_item fl close">';
}
html +='<div class="spot_img"><img src="'+val.pl_img_url+'" alt="'+val.pl_name+'"></div>';
html +='<div class="spot_item_content"><div class="spot_category"><img src="/res/map/marker/'+val.pl_sub_category+'_0.png"></div>';
html +='<div class="spot_title">'+val.pl_name+'</div><div class="clip_cnt fl">'+number_format(val.pl_clip_cnt)+'</div>';
html +='<div class="spot_tag fr">테마1</div><div class="spot_tag fr">테마테마2</div>';
html +='<div class="clear"></div><div class="spot_item_hover" style="display: none; height: 57px; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;">';
html +='<a href="'+val.link_url+'"><div class="btn-gray spot_detail_btn fl">상세보기</div></a><div class="btn-sky spot_clip_btn fl">클립</div><div class="clear"></div></div></div></div>';
});

$('#vw_2_item_a_box').html(html);
$('#vw_2_item_a_box').fadeIn();

}
});

}







function vw_type_3_load(){
var pop_cu = $('#popular_trip_tab .popular_trip_tab_item.on').attr('data');
var data = 'vw_type=3&rel_upcode='+pop_cu;
//console.log(data);
$.ajax({
type:'post',
data:data,
cache:false,
url:'/api/main/get_view_main',
success: function(data){
//console.log('vw_3 start>>>');
//console.log(data);
//console.log('vw_3 end<<<');
$('.popular_trip_big_box').hide();
$('.popular_trip_small_box').hide(); 
$.each(data.response_data, function(key, val) {
if(val.vw_order == 1){
$('.popular_trip_big_box').css("background","url('"+val.ci_img_url+"')");
$('.popular_trip_big_box').css("background-size","538px 380px");

$('.popular_trip_big_box .p_title').html(val.ci_name);
$('.popular_trip_big_box .p_sub_title').html(val.sub_title);
$('.popular_trip_big_box .p_content').html(val.contents);
$('.popular_trip_big_box .p_link').attr('href',val.link);
}else{
$('.popular_trip_small_box .item[data-no="'+val.vw_order+'"]').css("background","url('"+val.ci_img_url+"')");
$('.popular_trip_small_box .item[data-no="'+val.vw_order+'"]').css("background-size","261px 184px");

$('.popular_trip_small_box .item[data-no="'+val.vw_order+'"] .p_title').html(val.ci_name);
$('.popular_trip_small_box .item[data-no="'+val.vw_order+'"] .p_sub_title').html(val.sub_title);
$('.popular_trip_small_box .item[data-no="'+val.vw_order+'"] .p_content').html(val.contents); 
$('.popular_trip_small_box .item[data-no="'+val.vw_order+'"] .p_link').attr('href',val.link);
}

});
$('.popular_trip_big_box').fadeIn();
$('.popular_trip_small_box').fadeIn();
}
});
}

var data = 'vw_type=4';
$.ajax({
type:'post',
data:data,
cache:false,
url:'/api/main/get_view_main',
success: function(data){
$.each(data.response_data, function(key, val) {
$('.mg_tab[data-no="'+val.vw_order+'"] .title').html(val.title);
$('.mg_tab[data-no="'+val.vw_order+'"] .sub_title').html(cutStr(val.sub_title, 20));

$('.mg_img[data-no="'+val.vw_order+'"]').css("background","url('"+val.img_url+"')");
$('.mg_img[data-no="'+val.vw_order+'"]').css("background-size","372px 260px");
});
}
});


// 날씨 조회
function get_whether(city_lat, city_lng){
var lat = city_lat;
var lon = city_lng;

//alert("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat+"&lon="+lon+"&cnt=5&mode=json&units=metric");
$.ajax({
type: "POST",
url: "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat+"&lon="+lon+"&cnt=5&mode=json&units=metric",
success: function(data) {

var html = "";

var d = new Date();
var week = new Array('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');
var day = d.getDay();

$.each(data.list, function(key, value) {
if(key > 0){
var ico_no = 1;
var weatherIdint =value.weather[0].id;

if (weatherIdint<600) {
ico_no = 3;
}else if (weatherIdint<700) {
ico_no = 5;
}else if (weatherIdint<800) {
ico_no = 4;
}else if (weatherIdint<801) {
ico_no = 1;
}else if (weatherIdint<802) {
ico_no = 2;
}else if (weatherIdint<805) {
ico_no = 4;
}else if (weatherIdint<903) {
ico_no = 6;
}

var print_day = day+key;
if(print_day > 6){
print_day = print_day-7;
}
html += '<li class="w'+ico_no+'">';
html += ' <b class="t1">'+week[print_day]+'</b>';
html += ' <b>'+value.temp.day+'℃</b>';
html += '</li>';
}
});

$("#weather").html(html);
},
error:function(request,status,error){
//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
}
});
}

// 환율 조회
function get_exchange_rate(city_cc){

$.ajax({
type: "POST",
url: "/api/city/get_exchange",
data: {'from_type':city_cc,'from_value':'1','to_type':'KRW' },
success: function(data) {
//console.log(data);
var html = data.rate+" "+ data.to+" = 1 "+data.from;
$(".own_city_currency").html(html);
},
error:function(request,status,error){
//alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
}
});
}



function setCookie(cName, cValue, cDay){
var expire = new Date();
expire.setDate(expire.getDate() + cDay);
cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
document.cookie = cookies;
}
 

function getCookie(cName) {
cName = cName + '=';
var cookieData = document.cookie;
var start = cookieData.indexOf(cName);
var cValue = '';
if(start != -1){
start += cName.length;
var end = cookieData.indexOf(';', start);
if(end == -1)end = cookieData.length;
cValue = cookieData.substring(start, end);
}
return unescape(cValue);
}








function go_hotel_search(){
var entityid = $('#entityid').val();
if(entityid == ''){
alert(lang.alert_sel_destination);
$('#key_hotelsearch').focus();
return false;
}else{
$.ajax({
type: "POST",
url: "/api/city/get_exist_city",
data: {"ss_city_id" : entityid},
success: function(data) {

if(data.response_data.ci_name_url){

gogo_hotel_search(data.response_data.ci_name_url);

}else{
gogo_hotel_search('all');
}

},
error:function(request,status,error){
alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
}
});
}
}

function gogo_hotel_search(city_url){
var entityid = $('#entityid').val();
var checkindate = $('#key_hotelsearch_checkin').val();
var checkoutdate = $('#key_hotelsearch_checkout').val();
var guests = $('select[name="guest"]').val();
var rooms = $('select[name="room"]').val();
var qtxt = $('#q_txt').val().replace(/[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi,'');
var search_type = $('#search_type').val();

if(entityid == ''){
alert(lang.alert_sel_destination);
$('#key_hotelsearch').focus();
return false;
}else if(checkindate == ''){
alert(lang.select_checkin_alert);
$('#key_hotelsearch_checkin').focus();
return false;
}else if(checkoutdate == ''){
alert(lang.select_checkout_alert);
$('#key_hotelsearch_checkout').focus();
return false;
}else if(rooms > guests){
alert(lang.room_cnt_alert);
return false;
}else{
if(checkindate != '<?=date("Y-m-d")?>'){
window.localStorage.setItem("h_checkindate", checkindate);
window.localStorage.setItem("h_checkoutdate", checkoutdate);
}

var lh_search = {'entityid':entityid,'search_type':search_type,'q_txt':qtxt};
window.localStorage.setItem("h_search", JSON.stringify(lh_search));
var url = lang_uri()+'/city/'+city_url+'/hotel?entityid='+entityid+'&checkindate='+checkindate+'&checkoutdate='+checkoutdate+'&guests='+guests+'&rooms='+rooms+'&q_txt='+qtxt+'&search_type='+search_type;
location.href = url;
}

}

function go_flight_search(){
var originplace = $('#originplace').val().split('-');
originplace = originplace[0];
var destinationplace = $('#destinationplace').val().split('-');
destinationplace = destinationplace[0];
var originplace_name = $('#originplace_name').val();
var destinationplace_name = $('#destinationplace_name').val();
var outbounddate = $('#outbounddate').val();
var inbounddate = $('#inbounddate').val();
var adults = $('#adults').val();
var children = $('#children').val();
var infants = $('#infants').val();
var onway = $('#onway').val();

var originplace_iscountry = $('#originplace_iscountry').val();
var destinationplace_iscountry = $('#destinationplace_iscountry').val();

if(originplace ==''){
alert(lang.alert_sel_origin);
$('#originplace_f').focus();
return false;
}else if(destinationplace ==''){
alert(lang.alert_sel_destination);
$('#destinationplace_f').focus();
return false;
}else if(outbounddate ==''){
alert(lang.alert_sel_startdate);
$('#outbounddate').focus();
return false;
}else if(inbounddate ==''){
alert(lang.alert_sel_enddate);
$('#inbounddate').focus();
return false;
}else if(adults < infants){
alert(lang.alert_cnt_people);
return false;
}else{
 if(outbounddate != '<?=date("Y-m-d")?>'){
window.localStorage.setItem("f_checkindate", outbounddate);
window.localStorage.setItem("f_checkoutdate", inbounddate);
 }

var lf_search = {
'originplace':originplace+'-sky',
'originplace_name':originplace_name,
'originplace_iscountry':originplace_iscountry,
'destinationplace':destinationplace+'-sky',
'destinationplace_name':destinationplace_name,
'destinationplace_iscountry':destinationplace_iscountry
};
window.localStorage.setItem("f_search", JSON.stringify(lf_search));
var url = lang_uri()+'/city/all/flight_list?originplace='+originplace+'&destinationplace='+destinationplace+'&originplace_name='+originplace_name+'&destinationplace_name='+destinationplace_name+'&outbounddate='+outbounddate+'&inbounddate='+inbounddate+'&adults='+adults+'&children='+children+'&infants='+infants+'&originplace_iscountry='+originplace_iscountry+'&destinationplace_iscountry='+destinationplace_iscountry+'&onway='+onway;
location.href=url;
}
}