let _pageSize = 11, _curPage = 1, _today = datetimeView('date');
$(function() {

	$('#leftTopRpt05').show().find('#inputBtn').text('연차 부여');

	fnSelYear($('#selSchYear'), 2025, 1, false, '년');
	//ddlYear(yyyy);

	fnVacationListView();
	// 검색창 엔터키
	$('.schBox').children('input, select').keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			_curPage = 1;
			fnVacationListView();
		}
	});

	// 검색
	$('#btnSch').on('click', function() {
		_curPage = 1;
		fnVacationListView();
		return false;
	});

	// 연차부여
	$('#inputBtn').on('click', function() {
		fnVacationInput();
		return false;
	});
});

function ddlYear(yyyy) {
	var sList = "";
	for (var i = 2023; new Date().getFullYear() + 3 > i; i++) {
		sList += "    <option value=\"" + i + "\" " + (yyyy == i ? "selected" : "") + ">" + i + "년</option>";
	}

	$('#selSchYear').html(sList);
}

// 목록 보기
function fnVacationListView() {
	let paramMap = {
		ltype: 1,
		page: _curPage,
		psize: _pageSize,
		cidx: _c_logCIdx,
		year: parseInt($('#selSchYear').val()),
		usersts: parseInt($('#selStatus').val()),
		schsel: parseInt($('#selSearch').val()),
		schtxt: $('#txtSearch').val(),
		orderby: 0,
		desc: 0
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/user/VacationTotal',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			const total = res;
			console.log(res);

			//commify= 천단위로 콤마 표시
			$('#totalCnt').text(commify(total));
			fnVacationList(total, paramMap);
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
function fnVacationList(totalCnt, paramMap) {
	paramMap.ltype = 2;
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/user/vacationList',
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
				, objList = $('#AppList').children('tbody');
			let sHtml = dept_NM = posi_NM = nm = ''
				, user_IDX = nomal_CNT = use_NOMAL_CNT = vacationUse = 0;
			if (items.length == 0) {
				sHtml += '<tr>';
				sHtml += '  <td colspan="8" class="noData">검색된 정보가 없습니다.</td>';
				sHtml += '</tr>';

			} else {
				$.each(items, function(i, val) {
					user_IDX = val.user_IDX;
					dept_NM = fnBlank(val.dept_NM, false);
					posi_NM = fnBlank(val.posi_NM, false);
					nm = val.nm;
					nomal_CNT = val.nomal_CNT;
					use_NOMAL_CNT = val.use_NOMAL_CNT;
					vacationUse = Math.floor(use_NOMAL_CNT * 100 / nomal_CNT);

					sHtml += '<tr>' + '\n';
					sHtml += '	<td><input type="checkbox" name="chkIdx" value="' + user_IDX + '"></td>' + '\n';
					sHtml += '	<td>' + dept_NM + '</td>' + '\n';
					sHtml += '	<td>' + posi_NM + '</td>' + '\n';
					sHtml += '	<td>' + nm + '</td>' + '\n';
					sHtml += '	<td><input type="text" class="nomalCnt" value="' + nomal_CNT + '"></td>' + '\n';
					sHtml += '	<td class="ftBold"><a href="#" onclick="fnSchList(' + user_IDX + ',\'' + nm + '\'); return false;">' + use_NOMAL_CNT + '</a></td>' + '\n';
					sHtml += '	<td >' + (nomal_CNT - use_NOMAL_CNT) + '</td>' + '\n';
					sHtml += '	<td><span class="' + fnVacationUsageRate(vacationUse) + '">' + (nomal_CNT == 0 ? 100 : vacationUse) + ' %</span></td>' + '\n';
					sHtml += '</tr>';
				});

			}
			objList.html(sHtml);
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

// 연차 등록/수정
function fnVacationInput() {
	let uidx = ncnt = '';

	if (!fnCheckboxCheck('chkIdx', '사용자')) return false;
	$('input:checkbox[name=chkIdx]').each(function(i) {
		const obj = $(this);
		if (obj.is(":checked") == true) {
			uidx += obj.val() + ',';
			ncnt += obj.closest('tr').find('.nomalCnt').val() + ',';
		}
	});
	//console.log(uidx.slice(0, -1));
	//console.log(ncnt.slice(0, -1));

	const paramMap = {
		uidx: uidx.slice(0, -1),
		year: parseInt($('#selSchYear').val()),
		ncnt: ncnt.slice(0, -1),
		ridx: _c_logIdx
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(paramMap);
	$.ajax({
		type: 'POST',
		url: '/user/vacationInput',
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
				alert('처리 되었습니다.');
				$('#allChk').prop('checked', false);
				fnVacationListView();
			} else {
				alert('실패');
				fnLoadingClose();
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
}

// 일정 목록
function fnSchList(uidx, userNM) {
	$('#vacationNm').text(userNM);
	let paramMap = {
		uidx: uidx,
		sdate: $('#selSchYear').val() + '-01-01',
		edate: $('#selSchYear').val() + '-12-31',
	}
	const jsonData = JSON.stringify(paramMap);
	$.ajax({
		type: 'POST',
		url: '/schedule/list',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			const items = res
				, objList = $('#AppList2').children('tbody');
			//console.log(res);
			let sdate = edate = code_NM = user_NM = dateCnt = reg_DATE = conts = sHtml = ''
				, schedul_IDX = schedule_TP = approve_STS = dayCnt = 0;

			if (items.length == 0) {
				sHtml += '<tr>';
				sHtml += '  <td colspan="8" class="noData">검색된 휴가 사용내역이 없습니다.</td>';
				sHtml += '</tr>';

			} else {
				$.each(items, function(i, val) {
					user_NM = val.user_NM;
					reg_DATE = val.reg_DATE.substr(0, 10);
					code_NM = val.code_NM;
					sdate = val.sdate;
					edate = val.edate;
					schedule_IDX = val.schedule_IDX;
					schedule_TP = val.schedule_TP;
					approve_STS = val.approve_STS;
					conts = val.conts;

					//승인되고 연차관련
					if (approve_STS == 2 && (schedule_TP == 106 || schedule_TP == 110 || schedule_TP == 127 || schedule_TP == 128)) { // 휴가,반차,반반차

						dayCnt = dateDiff('2023-01-01', '2023-01-01') + 1;
						switch (schedule_TP) {
							case 106: dayCnt *= 1; break; // 연차
							case 110: dayCnt *= 0.5; break; // 반차
							case 127: dayCnt *= 0.25; break; // 반반차
							case 128: dayCnt *= 0; break; // 기타휴가

						}
						sHtml += '<tr>' + '\n';
						sHtml += '	<td>' + reg_DATE + '</td>' + '\n';
						sHtml += '	<td>' + code_NM + '</td>' + '\n';
						sHtml += '	<td>' + sdate + '</td>' + '\n';
						sHtml += '	<td>' + edate + '</td>' + '\n';
						sHtml += '	<td>' + dayCnt + '</td>' + '\n';
						sHtml += '	<td class="tdL">' + conts + '</td>' + '\n';
						sHtml += '</tr>' + '\n';
					}
				});
			}
			//console.log(sHtml)
			objList.html(sHtml);
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
	fnOpenPopUp();
}

//선택 팝업창 
function fnOpenPopUp() {
	fnLayerPopupView('VacationView');
	return false;
}

// 휴가 사용내역 닫기
function fnVacationClose() {
	fnLayerPopupClose('VacationView');
	//fnrScheduleReset();
}
