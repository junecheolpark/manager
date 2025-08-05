let _pageSize = 11, _curPage = 1;

$(function() {
	fnCodeSelList([1, 10, '', '선택', 0, true, 0], $('#selPosi'));
	fnCodeSelList([1, 14, '', '선택', 0, true, 0], $('#selDept'));
	fnCodeSelList([1, 16, '', '상태', 0, true, 0], $('#selSchUserSts'));
	fnCodeSelList([1, 16, '', '선택', 0, true, 0], $('#selUserSts'));
	fnCodeSelList([1, 30, '', '구분', 0, true, 0], $('#selSchUserTp'));
	fnCodeSelList([1, 30, '', '선택', 0, true, 0], $('#selUserTp'));
	

	
	// 선택 달력 이벤트 불러오기
	$('.cal').datepicker({
		language: 'ko-KR',
		format: 'yyyy-mm-dd',
		autoHide: true,
		zIndex: 8889,
	});
	
});