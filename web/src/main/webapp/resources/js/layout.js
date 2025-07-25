﻿let _c_logIdx, _c_logSign = _c_logCIdx = _c_logAdTp = 0
	, _c_logNm = _c_logMobile = _c_logPhone = _c_logEmail = _c_logPosi = _c_logDept = ''
	, _c_isMenuW = false;
	
$(function () {
	
	// 로그인 사용자 정보
	fnLoginInfo();
	
	// 탑 메뉴 열기/닫기
	fnTopBox();
	
	// 좌측 메뉴 열기/닫기
	fnLeftBox();
	
	// 사이트 메뉴
	fnSiteMenu();
		
});
// 탑 메뉴 열기/닫기
function fnTopBox() {
	$('#btnMenu').click(function () {
	        const objImg = $('#btnMenu').children('img')
	            , objList = $('#menuAll');

	        if (objList.css('display') == 'none') {
	            objImg.attr('src', '/resources/images/btn/btn_menu_close.png');
	            objList.show();
	        } else {
	            objImg.attr('src', '/resources/images/btn/btn_menu_open.png');
	            objList.hide();
	        }
	        return false;
	    });
}

// 좌측 메뉴 열기/닫기
function fnLeftBox() {
	$('.leftBox').click(function() {
		const objImg = $('.leftBox').children('img');

		if ($('.lmTop').css('display') != 'none') {
			$('.leftMenu').css('margin-left', '-240px');
			$('.lmTop, .lmMenu, footer').hide();
			$('.contens').css('margin-left', '0');
			objImg.attr('src', '/resources/images/btn/btn_leftmenu_open.png');
		} else {
			$('.leftMenu').css('margin-left', '0');
			$('.lmTop, .lmMenu, footer').show();
			$('.contens').css('margin-left', '240px');
			objImg.attr('src', '/resources/images/btn/btn_leftmenu_close.png');
		}
	})
}

// 사이트 메뉴
function fnSiteMenu(){
	const leftMenus = {
	  'report': [
	    {navi:'주간업무', name: '주간업무', url: '/report/01'},
	  ],
	  'schedule': [
	    {navi:'일정 관리', name: '사내일정', url: '/schedule/01'},
	    {navi:'일정 관리', name: '프로젝트', url: '/schedule/02'},
	  ],
	  'company': [
	    {navi:'사용자 관리', name: '사용자 관리', url: '/company/01'},
	  ],
	  'clipboard': [
	    {navi:'게시판', name: '공지사항', url: '/clipboard/01'},
	    {navi:'게시판', name: '자료실', url: '/clipboard/02'},
        {navi:'게시판', name: '업무공유', url: '/clipboard/03'},
	  ],
	  'system': [
	    {navi:'시스템 관리', name: '코드 관리', url: '/system/01'},
        {navi:'시스템 관리', name: '연차 관리', url: '/system/02'},
	  ]
	};

    const arrPath = _path.split('/');
    const arrMenu = leftMenus[arrPath[1]];
	if (!arrMenu) return;
	
	let leftMenuTop = '';
	let leftMenuList = '';
	let pageNavi = '';
    
    $.each(arrMenu, function (j, val){
        let menuOn = '';
		if (_path == val.url) {
			leftMenuTop = val.navi;
		      menuOn = 'class="lmChoice"';
			  pageNavi = leftMenuTop + '&nbsp;&nbsp;<span class="ftNormal colGray2">' + val.name + '</span>';
	  	}

        leftMenuList += `<li ${menuOn}><a href="${val.url}">${val.name}</a></li>\n`;
    })
    $('#leftMenuTop').html(leftMenuTop);
    $('#leftMenuList').html(leftMenuList);
    $('#pageNavi').html(pageNavi);

}

// 로그인 사용자 정보
function fnLoginInfo() {
	$.ajax({
		type: 'POST',
		url: '/login/loginCok',
		//data: jsonData,
		async: false,
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			// 로그인 중.. progressbar 시작
		},
		success: function(res) {
			const items = res;
			let admin_NM = dept_NM = nm = posi_NM = user_ID = phone = mobile = email = ''
				, user_IDX = sign_TP = company_IDX = user_IMG_NUM = 0;
			admin_NM = fnBlank(items.admin_NM, false);
			dept_NM = items.dept_NM;
			nm = items.nm;
			posi_NM = items.posi_NM;
			phone = items.phone;
			mobile = items.mobile;
			email = items.email;
			user_IDX = items.user_IDX;
			sign_TP = items.sign_TP;
			company_IDX = items.company_IDX;
			user_IMG_NUM = items.user_IMG_NUM;
			admin_TP = items.admin_TP;

			phone = (phone == '' || phone == null ? '' : phone);
			mobile = (mobile == '' || mobile == null ? '' : mobile);

			if (user_IDX == 0) {
				//alert('로그인 후 이용 가능합니다.');
				//location.href = '/';
			} else {
				$('body').show();
				$('#userCharacterS').attr('src', '/resources/images/profile/s_profile_' + (user_IMG_NUM < 10 ? '0' : '') + user_IMG_NUM + '.png');
				$('#userCharacter').attr('src', '/resources/images/profile/b_profile_' + (user_IMG_NUM < 10 ? '0' : '') + user_IMG_NUM + '.png');				
				$('#logNM, #popLogNm').text(nm);
				$('#logDept, #popLogDept').text(fnBlank(dept_NM, false));
				$('#managerBadge').text(admin_NM);
				if (admin_NM != '-') $('#managerBadge').show();

				_c_logIdx = user_IDX;
				_c_logSign = sign_TP;
				_c_logCIdx = company_IDX;
				_c_logNm = nm;
				_c_logMobile = mobile;
				_c_logPhone = phone;
				_c_logEmail = email;
				_c_logPosi = posi_NM;
				_c_logDept = dept_NM;
				_c_logAdTp = admin_TP;
			}
			// 로그인 중.. progressbar 종료
		},
		error: function(jqXHR, textStatus, errorThrown) {
			//error: function(res) {
			// 로그인 중.. progressbar 종료
			console.log("ERROR : " + textStatus + " : " + errorThrown);
			alert('로그인 실패');
			//console.log(res.responseText);
		}
	});
}
