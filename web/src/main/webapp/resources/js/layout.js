$(function () {
	
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
	console.log(arrPath);
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
