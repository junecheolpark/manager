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
			fnBoardView(_bidx);
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
	//조회수 업
	fnBoardInput(1);
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
		conts: conts,
		ridx: _c_logIdx
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(paramMap);
	$.ajax({
		type: 'POST',
		url: '/board/input',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			if (res == 0) {
				if (regCnt == 0) {
					if (_fnm != '') {
						fnBoardFileDelete();
					}
					//파일등록
					fnBoardFileInput();
					alert('처리 되었습니다.');

					if (_master_boardIdx == 11) {
						let fcm_subj = '공지사항 ' + (board_IDX == 0 ? '등록' : '수정')
							, fcm_conts = subj;

						fnFCMSend(false, [1, 1, fcm_subj, fcm_conts, '', _c_logIdx, 0]);
					}
				}

			} else {
				alert('실패');
			}

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

// 게시판 삭제
function fnBoardDelete() {
	if (fnDeleteMsg(1)) {
		const objSel = $('#tableList').find('.selRow');
		let bidx = 0;

		if (objSel.length > 0) {
			bidx = parseInt(objSel.attr('data-bidx'));
		}

		const paramMap = {
			deltp: 1,
			bidx: bidx,
			didx: _c_logIdx,
		}
		const jsonData = JSON.stringify(paramMap);
		//console.log(jsonData);
		/**/
		$.ajax({
			type: 'POST',
			url: '/board/delete',
			data: jsonData,
			//async: false,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json', // dataType is json format
			beforeSend: function() {
				fnLoadingOpen();
			},
			success: function(res) {
				//console.log(res);
				if (res == 0) {

					fnBoardCancel();

					_curPage = 1;
					fnSortListView();
					alert('처리 되었습니다.');
				} else {
					alert('실패');
				}

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
		/**/
	}
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

// 파일 업로드 후 등록/수정
function fnBoardFileInput() {
	const obj = $('#fileDragBody').find('tbody');
	//console.log(obj.children('tr').length);
	if (obj.children('tr').length == 0 && _fidx == '') {
		//if ($('.ry_row_new').length == 0) {
		//alert('첨부파일을 추가해 주세요.');
		_curPage = 1;
		fnSortListView();
		fnBoardCancel();
		fnLoadingClose();
		return false;
	} else {
		let conts = CKEDITOR.instances.resCnts.getData();
		if (!fnAlertReturn('txtSubj', '제목', '')) return false;
		if (conts == '' || conts == null) {
			alert('내용을 입력해주세요');
		}

		const promise = new Promise(function(resolve, reject) {
			fnLoadingOpen(); // 로딩 시작

			// 로딩 이미지가 활성화 된 상태에서 실행하기 위해 지연시간을 둠
			setTimeout(function() {
				resolve();
			}, 100);
		});

		promise.then(function() {
			// 파일 업로드 처리
			fnRyUploaderUpFile('fileDragBody', true);
		}).then(function() {
			let arrParam = [];
			arrParam[0] = parseInt($('#txtSubj').attr('data-bidx'));
			arrParam[1] = 0;
			arrParam[2] = 0;
			arrParam[3] = '';
			arrParam[4] = '';
			arrParam[5] = '';
			arrParam[6] = 0.0;
			arrParam[7] = _c_logIdx;

			let obj = $('#fileDragBody')
				//, objBody = obj.find('tbody')
				, objList = obj.find('.ry_row_no')
				, objThis = null;
			let fileidx = fstatus = rfilename = filename = filepath = filesize = sizetype = sHtml = '';
			let isError = false;
			//let resultCode = 9;
			// 파일 정보 DB 저장
			//console.log(objList)

			if (objList.length > 0) {
				objList.each(function() {
					objThis = $(this);
					fstatus = objThis.attr('data-status');
					fileidx = objThis.attr('data-fidx');
					rfilename = objThis.attr('data-rfilename');
					filename = objThis.attr('data-filename');
					filepath = objThis.attr('data-filepath');
					filesize = objThis.attr('data-filesize');

					// 새파일 파일 저장
					if (fstatus == 1) {
						//console.log(fileidx + ' | ' + rfilename + ' | ' + filename + ' | ' + filepath + ' | ' + filesize);
						arrParam[2] = fileidx;
						arrParam[3] = rfilename;
						arrParam[4] = filepath;
						arrParam[5] = filename;
						arrParam[6] = filesize;
						//console.log(arrParam);

						// 파일 등록/수정
						const paramMap = {
							bidx: arrParam[0],
							fidx: parseInt(arrParam[2]),
							ftp: 1,
							fpath: arrParam[4],
							fnm: arrParam[5],
							rfnm: arrParam[3],
							fsize: parseInt(arrParam[6]),
							ridx: _c_logIdx
						}
						const jsonData = JSON.stringify(paramMap);
						//console.log(jsonData);
						$.ajax({
							type: 'POST',
							url: '/board/fileInput',
							data: jsonData,
							async: false,
							contentType: 'application/json; charset=utf-8',
							dataType: 'json', // dataType is json format
							beforeSend: function() {
								fnLoadingOpen();
							},
							success: function(res) {
								if (res != 0) {
									alert('실패');
								}
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
					} else {
						if (!isError) isError = true;
					}
				});

				if (isError) {
					alert('일부파일이 저장중 오류가 발생했습니다.');
				}

				//fnBoardFileList(2);
			}
		}).then(function() {
			_curPage = 1;
			fnSortListView();
			fnBoardCancel();
			fnLoadingClose();
		});
	}

}
// 파일 목록 생성
function fnBoardFileList(pFtp) {
	let paramMap = {
		bidx: parseInt($('#txtSubj').attr('data-bidx')),
		fidx: 0,
		ftp: 0//pFtp
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/board/fileList',
		data: jsonData,
		async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			//if (pIsLoadingView) fnLoadingOpen();
		},
		success: function(res) {
			const items = res
				, totalCnt = items.length
				, objList = $('#fileDragBody').find('tbody');
			let sHtml = file_PATH = file_NM = file_SIZE = fileType = real_FILE_NM = ''
				, board_IDX = file_IDX = file_TP = 0;
			if (totalCnt > 0) {
				_totalfile_SIZE = 0;
				//이미지 숨김
				$('#fileDragBody').css('background', 'none');

				$.each(items, function(i, val) {
					board_IDX = val.board_IDX;
					file_IDX = val.file_IDX;
					file_PATH = val.file_PATH;
					file_NM = val.file_NM;
					file_SIZE = val.file_SIZE;
					real_FILE_NM = val.real_FILE_NM

					sHtml += '<tr id="ry_fileIdx_0' + (i + 1) + '" class="ry_row" data-fidx="' + file_IDX + '" data-status="2" data-filename="' + file_NM + '" data-filepath="' + file_PATH + '" data-filesize="' + file_SIZE + '" data-sizetype="' + fileType + '">' + '\n';
					sHtml += '   <td class="tdL"><a href="/common/filedownload?fpt=' + file_PATH + '&fnm=' + file_NM + '&rfnm=' + real_FILE_NM + '" target="_blank" class="text-ellipsis" title="' + real_FILE_NM + '"><span>' + real_FILE_NM + '</p></div></td>' + '\n';
					sHtml += '   <td class="tdR">' + fnFileSize(file_SIZE, fileType) + ' ' + '</td>' + '\n';
					sHtml += '   <td class="tdC"><img class="ry_btnLoading" src="/resources/plugin/filedropdown/images/ajax-loader-s.gif" alt="file upload..." /><span class="ry_fileStatus">정상</span></td>' + '\n';
					sHtml += '   <td class="tdC"><a href="#filedel" class="ry_btnFileDel" onclick="fnDelFile($(this),1); return false;"><img src="/resources/plugin/filedropdown/images/btn_rowdel.png" alt="삭제"></a></td>' + '\n';
					sHtml += '</tr>' + '\n';

					// 전체 파일 사이즈
					_totalfile_SIZE += fnFileSize(file_SIZE, fileType);
				});

			} else {
				$('#fileDragBody').css('background', '');
			}
			objList.html(sHtml);

			//if (pIsLoadingView) fnLoadingClose();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// loading.. progressbar 종료			
			//if (pIsLoadingView) fnLoadingClose();
			alert('실패');
			//console.log("ERROR : " + textStatus + " : " + errorThrown);
			//console.log(res.responseText);
		}
	});
}
// - 삭제 버튼 클릭시 배열 +
function fnDelFile(objTh) {
	if (fnDeleteMsg(3)) {
		const obj = $('#fileDragBody').find('tbody')
			, objThis = objTh.closest('tr');
		//console.log(objThis);
		let fidx = objThis.attr('data-fidx')
			, fnm = objThis.attr('data-filename')
			, furl = objThis.attr('data-filepath');

		objThis.remove();
		_furl.push(furl);
		_fnm.push(fnm);
		_fidx.push(fidx);
		if (obj.children('tr').length == 0) { $('#fileDragBody').css('background', '') };
	}
}

// 게시판 파일 삭제
function fnBoardFileDelete() {
	let bidx = 0;
	bidx = parseInt($('#txtSubj').attr('data-bidx'));
	$.each(_fidx, function(i, val) {
		const paramMap = {
			furl: unescape(_furl[i]),
			fnm: unescape(_fnm[i]),
			deltp: 0,
			bidx: bidx,
			fidx: parseInt(_fidx[i]),
			didx: _c_logIdx
		}
		const jsonData = JSON.stringify(paramMap);
		//console.log(jsonData);
		/**/
		$.ajax({
			type: 'POST',
			url: '/board/fileDelete',
			data: jsonData,
			//async: false,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json', // dataType is json format
			beforeSend: function() {
				fnLoadingOpen();
			},
			success: function(res) {
				//console.log(res);
				if (res !== 0) {
					alert('실패');
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// loading.. progressbar 종료			
				fnLoadingClose();
				alert('실패');
				//console.log("ERROR : " + textStatus + " : " + errorThrown);
				//console.log(res.responseText);
			}
		});
		/**/
	});
	_fidx = [], _furl = [], _fnm = [];
}