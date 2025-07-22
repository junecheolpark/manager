let _pageSize = 15, _curPage = 1, _bidx = 0, _master_boardIdx = 0
	, _fidx = [], _furl = [], _fnm = [];

$(function() {
    // ck에디터
    CKEDITOR.replace('resCnts', {
        filebrowserUploadUrl: '/common/uploadImgOne',
        editorplaceholder: '내용을 입력해 주세요',
    });

    /*메인 이동시*/
	window.onload = function() {
		const urlParams = new URLSearchParams(window.location.search);
		_bidx = parseInt(urlParams.get('bidx'));
		
		if (!isNaN(_bidx)) {
			console.log(_bidx);
			fnBoardView(bidx);
		}
	}
	/**/

	/*게시판 jsp 3개 안만들기위한 용도*/
	const arrPath = _path.split('/');
	const boardMap = {
		'01': 10,
		'02': 11
	};
	_master_boardIdx = boardMap[arrPath[2]] || 12;
	/**/
	
	$("#regName").text(_c_logNm);
    
    fnSortListView();
    
	// 파일 드롭 다운
	fnRyUploader('fileDragBody'); // 드래그 영역 id
	
	_fileFolder = 'board';
	
	//파일 드롭 성공 하면 이미지 숨김
	$('#fileDragBody').on('drop', function() {
		const obj = $('#fileDragBody').find('tbody');
		if (obj.children('tr').length != 0) { $('#fileDragBody').css('background', 'none') };
	});
	// 검색
	$('#btnSch').on('click', function() {
		_curPage = 1;
		fnSortListView();
		return false;
	});
	
	// 검색창 엔터키
	$('.schBox').children('input, select').keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			_curPage = 1;
			fnSortListView();
		}
	});

	// 선택 달력 이벤트 불러오기
	$('.cal').datepicker({
		language: 'ko-KR',
		format: 'yyyy-mm-dd',
		autoHide: true,
		zIndex: 8889,
	});
});

// 목록 보기
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
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/board/listTotal',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			const total = res;
			//console.log(res);

			//commify= 천단위로 콤마 표시
			$('#totalCnt').text(commify(total));
			fnSortList(total, paramMap);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// loading.. progressbar 종료			
			fnLoadingClose();
			alert('실패');
			//console.log("ERROR : " + textStatus + " : " + errorThrown);
			//console.log(res.responseText);
		}
	});
}
// 목록
function fnSortList(totalCnt, paramMap) {
	paramMap.ltype = 2;
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/board/list',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			//if ($('.loading-layer').css('display') == 'none') $('.loading-layer').show();
		},
		success: function(res) {
			//console.log(res);
			const items = res
				, objList = $('#tableList').children('tbody');
			let sHtml = subj = reg_NM = reg_DATE = ''
				, board_IDX = read_CNT = file_IDX = 0;
			if (items.length == 0) {
				sHtml += '<tr>';
				sHtml += '  <td colspan="5" class="noData">검색된 게시글이 없습니다.</td>';
				sHtml += '</tr>';

				$('#pagingView').hide();
				objList.html(sHtml);
			} else {
				$.each(items, function(i, val) {
					board_IDX = val.board_IDX;
					subj = val.subj;
					reg_NM = val.reg_NM;
					read_CNT = val.read_CNT;
					reg_DATE = val.reg_DATE.substr(0, 10);
					file_IDX = val.file_IDX;
					sHtml += '<tr data-bidx="' + board_IDX + '" class="' + (_bidx == board_IDX ? 'selRow' : '') + '">' + '\n';
					sHtml += '	<td class="tdL"><p class="text-ellipsis" title="' + subj + '"><span>' + subj + '</span></p></td>' + '\n';
					sHtml += '	<td><span class="lblFile">' + (file_IDX == 0 ? '-' : '<img src="/resources/images/icon/ic_file.png" alt="첨부파일 있음" height="16">') + '</span></td>' + '\n';
					sHtml += '	<td><span class="lblRegName">' + reg_NM + '</span></td>' + '\n';
					sHtml += '	<td><span class="lblCnt">' + read_CNT + '</span></td>' + '\n';
					sHtml += '	<td><span class="lblRegDate">' + reg_DATE + '</span></td>' + '\n';
					sHtml += '</tr>';
				});

				// 페이징
				$('#pagingView').show();
				arrayPageList('pagingView', totalCnt, _pageSize, _curPage);
				objList.html(sHtml);

				// 행 선택 이벤트
				objList.find('td').unbind().bind('click', function() {
					const objThis = $(this)
						, objRow = objThis.parent()
						, bidx = parseInt(objRow.attr('data-bidx'));
					//, selCol = objThis.index();

					//if (selCol != 3) {
					objList.children('tr').removeClass('selRow');
					objRow.addClass('selRow');
					fnBoardView(bidx);
					//}
				})
				//fnBoardCancel()

			}
			fnLoadingClose();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// loading.. progressbar 종료			
			fnLoadingClose();
			alert('실패');
			//console.log("ERROR : " + textStatus + " : " + errorThrown);
			//console.log(res.responseText);
		}
	});
}


/***********************************/
/* paging */
// 페이지 이동
function gotoPage(pCurPage) {
	_curPage = pCurPage;
	fnSortListView();
}
/***********************************/

// 게시판 보기
function fnBoardView(bidx) {
	const objSel = $('#tableList').find('.selRow');
	const paramMap = {
		bidx: bidx
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);

	$.ajax({
		type: 'POST',
		url: '/board/view',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			//console.log(res);
			const items = res;
			let board_IDX = parent_IDX = is_NOTICE = rcnt = 0
				, reg_NM = subj = conts = sHtml = '';

			board_IDX = items.board_IDX;
			parent_IDX = items.parent_IDX;
			is_NOTICE = items.is_NOTICE;
			reg_NM = items.reg_NM;
			reg_DATE = items.reg_DATE.substr(0, 16);
			subj = items.subj;
			conts = items.conts;
			rcnt = items.read_CNT;
			sHtml += conts;

			CKEDITOR.instances.resCnts.setData(sHtml);
			$('#btnInput').text('수정');
			$('#txtSubj').attr('data-bidx', board_IDX).val(subj);
			$('#regName').text(reg_NM);
			$('#regDate').text(reg_DATE);
			objSel.find(".lblCnt").text(rcnt);
			$("#btnDelete").show();

			fnBoardFileList();

			fnLoadingClose();
		},
		//error: function(jqXHR, textStatus, errorThrown) {
		error: function(jqXHR, textStatus, errorThrown) {
			// loading.. progressbar 종료			
			fnLoadingClose();
			alert('실패');
			//console.log("ERROR : " + textStatus + " : " + errorThrown);
			//console.log(res.responseText);
		}
	});
}

// 게시판 등록/수정/ 조회수
function fnBoardInput(regCnt) {
	const objSel = $('#tableList').find('.selRow');
	let board_IDX = reg_CNT = 0;
	let subj = conts = '';

	conts = CKEDITOR.instances.resCnts.getData();
	if (regCnt != 1) {
		if (!fnAlertReturn('txtSubj', '제목', '')) return false;
		if (conts == '' || conts == null) {
			alert('내용을 입력해주세요');
			return false;
		}
	}

	if (objSel.length > 0) {
		board_IDX = parseInt(objSel.attr('data-bidx'));
	}

	subj = $('#txtSubj').val();

	const paramMap = {
		bidx: board_IDX,
		mbidx: _master_boardIdx,
		rnm: $('#regName').text(),
		rcnt: regCnt,
		subj: subj,
		conts: conts,//editor.getData(),//.replace(/<[^>]*>?/g, '')
		ridx: _c_logIdx
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