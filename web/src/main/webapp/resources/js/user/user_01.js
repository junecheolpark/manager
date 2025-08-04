let _pageSize = 11, _curPage = 1;

$(function() {
	fnCodeSelList([1, 38, '', '구분', 0, true, 0], $('#selSchComTp'));
	fnCodeSelList([1, 39, '', '상태', 0, true, 0], $('#selSchComSts'));
	fnCodeSelList([1, 38, '', '선택', 0, true, 0], $('#selComTp'));
	fnCodeSelList([1, 39, '', '선택', 0, true, 0], $('#selComSts'));
	
});