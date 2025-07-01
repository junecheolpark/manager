let _pageSize = 15, _curPage = 1, _bidx = 0, _master_boardIdx = 0
	, _fidx = [], _furl = [], _fnm = [];

$(function() {
    
    // ck에디터
    CKEDITOR.replace('resCnts', {
        filebrowserUploadUrl: '/common/uploadImgOne',
        editorplaceholder: '내용을 입력해 주세요',
    });

    // 선택 달력 이벤트 불러오기
    $('.cal').datepicker({
        language: 'ko-KR',
        format: 'yyyy-mm-dd',
        autoHide: true,
        zIndex: 8889,
    });

    // 검색창 엔터키
	$('.schBox').children('input, select').keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			_curPage = 1;
			fnSortListView();
		}
	});

    // 검색
	$('#btnSch').on('click', function() {
		_curPage = 1;
		fnSortListView();
		return false;
	});
});


function fnSortListView() {
	let paramMap = {
		ltype: 1,
		page: _curPage,
		psize: _pageSize,
		midx: _master_boardIdx,
		schd1: $('#txtSdate').val(),
		schd2: $('#txtEdate').val(),
		schrnm: $('#txtRegName').val(),
		schsel: 2, //제목
		schtxt: $('#txtTitle').val(),
		orderby: 0,
		desc: 0
	}
	const jsonData = JSON.stringify(paramMap);

    console.log(jsonData);
}

function fnBoardCancel() {
	const objList = $('#fileDragBody').find('tbody')
		, objSel = $('#tableList').find('.selRow');
	$('#btnInput').text('등록');
	$('#txtSubj').val('');
	$('#regDate').text('자동 저장');
	$('#txtSubj').attr('data-bidx', 0);
	CKEDITOR.instances.resCnts.setData('');
	$("#regName").text($("#logNM").text());
	objSel.removeClass('selRow');
	objList.html('');

	$('#btnDelete').hide();
	$('#fileDragBody').css('background', '');
}