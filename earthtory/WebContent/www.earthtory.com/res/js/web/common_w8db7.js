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
function round(num,ja) { 

    ja=Math.pow(10,ja) 

    return Math.round(num * ja) / ja; 

}

function number_format(num){
       return String(num).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

function number_format_rate(num){
       return String(num).replace(/(\d)(?=(?:\d{1})+(?!\d))/g, '$1.');
};

function get_gap(time1,time2){
      var time1_arr = time1.split('-');
      var time2_arr = time2.split('-');
      var time1 = new Date(time1_arr[0]+'/'+time1_arr[1]+'/'+time1_arr[2]);
      var time2 = new Date(time2_arr[0]+'/'+time2_arr[1]+'/'+time2_arr[2]);

      var msecPerMinute = 1000 * 60;
      var msecPerHour = msecPerMinute * 60;
      var msecPerDay = msecPerHour * 24;

      var gap = time2.getTime() - time1.getTime();

      gap = gap / msecPerDay;

      return gap;
}


    // 페이징 생성
    function makePaging(total, curPage, ci_srl, type){
		console.log(total+'/'+curPage)
		$('html, body').scrollTop(0);
		// 페이지당 리스트출력수
		if(type == 'hotel'){
			var perPage = 20;
		}else if(type=='flight'){
			var perPage = 10;
		}else if(type == 'plan'){
			var perPage = 20;
		}else if(type == 'ci_list'){
			var perPage = 8;
		}else if(type == 'qa' || type == 'rv'){
			var perPage = 10;
		}else if(type == 'pn_list'){
			var perPage = 18;
		}else if(type == 'my_plan'){
			var perPage = 12;
		}else if(type == 'theme_tips'){
			var perPage = 20;
		}else{
			var perPage = 15;
		}

		var viewPage = 10;
		var movePage = viewPage-1;
		// 연결 펑션
		if(type == 'hotel'){
			var bindFunction = 'get_ht_list';
		}else if(type=='flight'){
			var bindFunction = 'list_filter';
		}else if(type == 'plan'){
			var bindFunction = 'get_plan_list';
		}else if(type == 'ci_list'){
			var bindFunction = 'get_ci_list';
		}else if(type == 'qa'){
			var bindFunction = 'get_qa_list';
		}else if(type == 'rv'){
			var bindFunction = 'get_rv_list';
		}else if(type == 'pn_list'){
			var bindFunction = 'get_search_plan';
		}else if(type == 'my_plan'){
			var bindFunction = 'get_plan_list';
		}else if(type == 'theme_tips'){
			var bindFunction = 'get_theme_tips';
		}else{
			var bindFunction = 'get_spot_list';
		}
		// 전체 페이지
		var totalPage =  Math.ceil(total/perPage);
		var startPage = (Math.floor((curPage-1)/viewPage))*viewPage+1;
		var endpage = (startPage+movePage < totalPage)? startPage+movePage: totalPage;


		// 페이징 생성
		var paging ='<span class="nv">';
		if(curPage > 1){
			paging += '<button type="button" class="pgn-pv1" onclick="'+bindFunction+'('+ci_srl+',1)">처음으로</button>';
		}
		if(startPage > viewPage && curPage > 1){
			paging += '<button type="button" class="pgn-pv2" onclick="'+bindFunction+'('+ci_srl+','+(startPage-viewPage)+')">이전</button>';
		}

		paging += '</span>';
		for(i=startPage ; i<= endpage; i++){
			if(curPage == i){
			  paging += '<button type="button" class="on" onclick="'+bindFunction+'('+ci_srl+','+i+')">'+i+'</button>';
			}else{
			  paging += '<button type="button" onclick="'+bindFunction+'('+ci_srl+','+i+')">'+i+'</button>';
			}
		}

		paging += '<span class="nv">';
		if((startPage+movePage) < totalPage && curPage < totalPage){
			paging += '<button type="button" class="pgn-nx2" onclick="'+bindFunction+'('+ci_srl+','+(startPage+viewPage)+')">다음</button>';
		}

		if(curPage < totalPage){
			paging += '<button type="button" class="pgn-nx1" onclick="'+bindFunction+'('+ci_srl+','+totalPage+')">맨뒤로</button>';
		}

		paging += '</span>';
		//paging += '<input type="hidden" id="curPage" name="curPage" value="'+curPage+'"/>';
		//paging += '<input type="hidden" id="perPage" name="perPage" value="'+perPage+'"/>';
		if(type == 'rv' || type == 'qa'){
			$('.page.'+type).html(paging);
		}else{
			$('#paging').html(paging);
		}
    }


    $(document).ready(function(){
      $('body').on('click','.prevent_href',function(){
        $(this).attr('href','javascript:void(0)');
      });
    });

$(document).mouseup(function (e)
{
    var container = $("#gnb_cu_box");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.slideUp();
        $('#header ul.gnb li[data="1"]').removeClass('on');
    }
});    