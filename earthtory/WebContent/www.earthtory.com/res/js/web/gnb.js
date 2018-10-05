
$(document).ready(function(){
    $('#gnb_login_box .gnb_user_img').hover( function() { 
		$('#gnb_login_box .gnb_mn_drop').slideDown("fast",
			function() {
				$(this).parent().find('*').stop(true, true);
	        });
	},
		function(){$('#gnb_login_box .gnb_mn_drop').slideUp("fast",function() {
			$(this).parent().find('*').stop(true, true);
		});
	});

	$('.gnb_cmmt, .gnb_community_menu').hover(function(){
		$('.gnb_community_menu').stop().slideToggle('fast');
	},function(){
		$('.gnb_community_menu').stop().slideToggle('fast');
	
	});

    

 //console.log(et_lang);
  



var auto_time;
$("#gnb_search").keyup(function(e){
  var search_value = $('#gnb_search').val();
      
      
var UP = 38;
var DOWN = 40;
var ENTER = 13;
var getKey = e.which;

if(getKey == UP || getKey == DOWN || getKey == ENTER){
  clearTimeout(auto_time);
  $('#gnb_search').css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
  $('#gnb_search').css('background-position','right 5px top 4px');
  is_target = $('#gnb_search_autocomplete .h_search.on').length;
  if(is_target ==0){
    if(getKey == DOWN){
      $('#gnb_search_autocomplete .h_search').first().addClass('on');
      $('#gnb_search_autocomplete .h_search').first().addClass('select');

      _this_id = $('#gnb_search_autocomplete .h_search.select').attr('data');
      _this_text = $('#gnb_search_autocomplete .h_search.select').find('.h_search_name').text();
      _this_qtxt = $('#gnb_search_autocomplete .h_search.select').attr('data-qtxt');
      _this_type = $('#gnb_search_autocomplete .h_search.select').attr('data-type');

      
      $('#gnb_search').val(_this_text);
      $('#entityid').val(_this_id);
      $('#q_txt').val(_this_qtxt);
      $('#search_type').val(_this_type);

    }else if(getKey == UP){
      $('#gnb_search_autocomplete .h_search').last().addClass('on');
      $('#gnb_search_autocomplete .h_search').last().addClass('select');

      _this_id = $('#gnb_search_autocomplete .h_search.select').attr('data');
      _this_text = $('#gnb_search_autocomplete .h_search.select').find('.h_search_name').text();
      _this_qtxt = $('#gnb_search_autocomplete .h_search.select').attr('data-qtxt');
      _this_type = $('#gnb_search_autocomplete .h_search.select').attr('data-type');

      
      $('#gnb_search').val(_this_text);
      $('#entityid').val(_this_id);
      $('#q_txt').val(_this_qtxt);
      $('#search_type').val(_this_type);

    }else if(getKey == ENTER){
      //$('#key_hotelsearch_autocomplete').hide();
    }
  }else{
    if(getKey == DOWN){
      $('#gnb_search_autocomplete .h_search').removeClass('on');
      $('#gnb_search_autocomplete .h_search.select').next().addClass('on');
      $('#gnb_search_autocomplete .h_search.select').next().addClass('select');
      $('#gnb_search_autocomplete .h_search:not(.on)').removeClass('select');

      _this_id = $('#gnb_search_autocomplete .h_search.select').attr('data');
      _this_text = $('#gnb_search_autocomplete .h_search.select').find('.h_search_name').text();
      _this_qtxt = $('#gnb_search_autocomplete .h_search.select').attr('data-qtxt');
      _this_type = $('#gnb_search_autocomplete .h_search.select').attr('data-type');

      
      $('#gnb_search').val(_this_text);
      $('#entityid').val(_this_id);
      $('#q_txt').val(_this_qtxt);
      $('#search_type').val(_this_type);      
    }else if(getKey == UP){
    
      $('#gnb_search_autocomplete .h_search').removeClass('on');
      $('#gnb_search_autocomplete .h_search.select').prev().addClass('on');
      $('#gnb_search_autocomplete .h_search.select').prev().addClass('select');
      $('#gnb_search_autocomplete .h_search:not(.on)').removeClass('select');

      _this_id = $('#gnb_search_autocomplete .h_search.select').attr('data');
      _this_text = $('#gnb_search_autocomplete .h_search.select').find('.h_search_name').text();
      _this_qtxt = $('#gnb_search_autocomplete .h_search.select').attr('data-qtxt');
      _this_type = $('#gnb_search_autocomplete .h_search.select').attr('data-type');

      
      $('#gnb_search').val(_this_text);
      $('#entityid').val(_this_id);
      $('#q_txt').val(_this_qtxt);
      $('#search_type').val(_this_type);

    }else if(getKey == ENTER){
      $('#gnb_search_autocomplete').hide();
      _go_ = $('#gnb_search_autocomplete .h_search.select').attr('href');
      location.href= _go_;
    }
  }
}else{
    if (search_value != '' && getKey != UP && getKey != DOWN && getKey != ENTER){
      $('#gnb_search').css('background','url("/res/img/common/input_load.gif") no-repeat');
        $('#gnb_search').css('background-position','right 5px top 4px');
        clearTimeout(auto_time);
		auto_time = setTimeout(function(){
			var data = 'text='+search_value+'&lang='+lang_uri().replace(/\//,'');

		  
			var html_code = '';
			$('#gnb_search_autocomplete').html(''); 
			console.log(data);
			$.ajax({  
					type:'post',
					data:data,
					url:'/api/sphinx/full_search',
					success: function(data){
						console.log(data);
						if(data.response_data.length != 0){
							$.each(data.response_data,function(key,val){
								if(val.rel_type == '1'){ 
									html_code += '<a href="'+lang_uri()+val.link+'" class="h_search area">';
									html_code += '<span class="h_search_name">'+val.name.cut(30,'...')+'</span>';
									html_code += '<div class="clear"></div>';
									html_code += '<span class="h_search_cicu">'+val.remk+'</span>';
									html_code += '</a>';
								}else if(val.rel_type == '2'){
									html_code += '<a href="'+lang_uri()+val.link+'" class="h_search area">';
									html_code += '<span class="h_search_name">'+val.name.cut(30,'...')+'</span>';
									html_code += '<div class="clear"></div>';
									html_code += '<span class="h_search_cicu">'+val.remk+'</span>';
									html_code += '</a>';
								}else if(val.rel_type == '3'){
									if(val.category == '200'){
										var add_style= 'food';
									}else if(val.category == '400'){
										var add_style= 'shopping';
									}else{
										var add_style= 'attr';
									}
									html_code += '<a href="'+val.link+'" class="h_search '+add_style+'">';
									html_code += '<span class="h_search_name">'+val.name.cut(30,'...')+'</span>';
									html_code += '<div class="clear"></div>';
									html_code += '<span class="h_search_cicu">'+val.remk+'</span>';
									html_code += '</a>';
								}else if(val.rel_type == '6'){
									html_code += '<a href="'+val.link+'" class="h_search hotel">';
									html_code += '<span class="h_search_name">'+val.name.cut(30,'...')+'</span>';
									html_code += '<div class="clear"></div>';
									html_code += '<span class="h_search_cicu">'+val.remk+'</span>';
									html_code += '</a>';
								}else if(val.rel_type == '5'){
									html_code += '<a href="'+val.link+'" class="h_search hotel">';
									html_code += '<span class="h_search_name">'+val.name.cut(30,'...')+'</span>';
									html_code += '<div class="clear"></div>';
									html_code += '<span class="h_search_cicu">'+val.remk+'</span>';
									html_code += '</a>';
								}
							});
							$('#gnb_search_autocomplete').html(html_code);
							$('#gnb_search_autocomplete').show();
						}else{
							$('#gnb_search_autocomplete').hide();
						}

					},complete:function(){

					},error:function(){
						console.log('error');
					}
			});

			$('#gnb_search').css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
			$('#gnb_search').css('background-position','right 5px top 4px');
           
        },300);

}else{
        clearTimeout(auto_time);
              auto_time = setTimeout(function(){
        $('#gnb_search').css('background','url("/res/img/common/gnb/search_icon.png") no-repeat');
        $('#gnb_search').css('background-position','right 5px top 4px');
        $('#gnb_search_autocomplete').html('');
        $('#gnb_search_autocomplete').hide();
        },300);
      }
    }
  });
$('#gnb_search').blur(function(){
  $('#gnb_search').animate({width:'180px'}, 500);
  $('body').on('click', function(e){
    
    if($(e.target).parents("#gnb_search_autocomplete").length > 0 || $(e.target).attr('id') == 'gnb_search'){

    }else{
      $('#gnb_search_autocomplete').hide();
    }
  });
});

$('#gnb_search').focus(function(){
  if($('#gnb_search_autocomplete').html().trim() !=''){
    $('#gnb_search_autocomplete').show();
  }
 $('#gnb_search').animate({width:'220px'}, 500);
});


});

function open_gnb_cu(){
    if ( $( "#gnb_cu_box" ).is( ":hidden" ) ) {
      $('.gnb li[data="1"]').addClass('on');
      $("html, body").animate({ scrollTop: 0 }, 200);
      $( "#gnb_cu_box" ).slideDown( "fast" );
    } else {
      $('.gnb li[data="1"]').removeClass('on');
      $( "#gnb_cu_box" ).slideUp("fast");
    } 
}