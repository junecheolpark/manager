_today = new Date();

let cke = prevId = null;

$(function(){
	$("#leftTopRpt04").show();
	
	let month = _today.getMonth() + 1 < 10 ? '0' + (_today.getMonth() + 1) : _today.getMonth() + 1;
	fnDdlYear(_today.getFullYear());
	// 주간 불러오기
	$('#selMonth').val(month).prop("selected", true);
	fnDdlWeek(_today.toISOString());

	fnPrNekWeekUpdate(0);

	// , 년, 월 선택
	$('#selYear, #selMonth').on('change', function() {
		let firstday = $('#selYear').val() + '-' + $('#selMonth').val() + '-01';
		fnDdlWeek(firstday);
		fnWorkWeekList()
	});
	// 주간 선택
	$('#selWeek').on('change', function() {
		fnWorkWeekList();
	});
	
})

// 주간업무 조회
function fnWorkWeekList() {
	let weekDate = fnweekDate(-7).split('-');
	const paramMap = {
		preyyyy: parseInt(weekDate[0]),
		prewwork: parseInt(weekDate[3]),
		yyyy: parseInt($('#selYear').val()),
		wwork: parseInt($('#selWeek').val()),
		uidx: 0
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/weekWork/list',
		data: jsonData,
		async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			//console.log(res);
			const items = res
				, objList = $('#weekList').children('tbody');

			let sHtml = company_NM = ''
				, now_CONTS = prev_CONTS = user_IDX = user_NM = ''
				, company_IDX = prevCIdx = row_CNT = 0;

			if (items.length > 0) {  // 값이 없다면, list는 html
				$.each(items, function(i, val) {
					week_WORK_CONTS_IDX = val.week_WORK_CONTS_IDX;
					company_IDX = val.company_IDX;
					company_NM = val.company_NM;
					now_CONTS = val.now_CONTS;
					prev_CONTS = val.prev_CONTS;
					user_IDX = val.user_IDX;
					user_NM = val.user_NM;
					row_CNT = val.row_CNT;

					//if (now_CONTS != '') { // 리스트 출력
					sHtml += '<tr>' + '\n';
					if (prevCIdx != company_IDX) {
						sHtml += '	<td ' + ('rowspan="' + row_CNT) + '" class="rLine tdCenter">' + company_NM + '</td>' + '\n';
					}
					sHtml += '	<td class="rLine tdCenter">' + user_NM + '</td>' + '\n';
					sHtml += '	<td class="rLine tdVTop ' + (isEmpty(prev_CONTS) ? 'noData' : '') + '"><div>' + prev_CONTS + '</div></td>' + '\n';
					sHtml += '	<td class="tdVTop ' + (isEmpty(now_CONTS) ? 'noData' : '') + '"><div>' + now_CONTS + '</div></td>' + '\n';
					sHtml += '</tr>' + '\n';
					//}
					prevCIdx = company_IDX;
				});
			}
			if (sHtml == '') {
				sHtml += '<tr>';
				sHtml += '  <td colspan="4" class="none">등록된 내용이 없습니다.</td>';
				sHtml += '</tr>';
			}
			objList.html(sHtml);
			fnWorkWeekInputList();
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

// 주간업무 등록 조회
function fnWorkWeekInputList() {
	let weekDate = fnweekDate(-7).split('-');
	const paramMap = {
		preyyyy: parseInt(weekDate[0]),
		prewwork: parseInt(weekDate[3]),
		yyyy: parseInt($('#selYear').val()),
		wwork: parseInt($('#selWeek').val()),
		uidx: _c_logIdx
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/weekWork/list',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			//console.log(res);
			const items = res
				, objBtn = $("#leftTopRpt04").find('a')
				, objInput = $('#weekInput').children('tbody');

			let sInput = company_NM = ''
				, prev_CONTS = user_IDX = user_NM = ''
				, company_IDX = cnt = cnt2 = row_CNT = 0;

			

			if (items.length > 0) {  // 값이 없다면, list는 html
				$.each(items, function(i, val) {
					week_WORK_CONTS_IDX = val.week_WORK_CONTS_IDX;
					company_IDX = val.company_IDX;
					company_NM = val.company_NM;
					now_CONTS = val.now_CONTS;
					prev_CONTS = val.prev_CONTS;
					user_IDX = val.user_IDX;
					user_NM = val.user_NM;
					row_CNT = val.row_CNT;

					if (user_IDX == _c_logIdx) { // 로그인된값과 같으면 담아줌
						sInput = '<tr data-widx="' + week_WORK_CONTS_IDX + '"><td class="tdCenter"><select name="selectItem" class="selectItem"><option value="10" data-id="">준철 포트폴리오</option><select name="selectItem" class="selectItem"></select></td>' + '\n';
						sInput += '<td><div id="beforeWeek' + (i + 1) + '" class="beforeWeek txtWeek">' + prev_CONTS + '</div></td>' + '\n';
						sInput += '<td><div id="nextWeek' + (i + 1) + '" class="nextWeek txtWeek">' + now_CONTS + '</div></td>' + '\n';
						sInput += '<td></td></tr>' + '\n';
						if (cnt == 0) {
							objInput.html(sInput);
						} else {
							objInput.append(sInput);
						}
						cnt++;

						if (now_CONTS != '') {
							cnt2++;
						}
					}
				});

			} else {
				// 주간업무 보고 빈값 생성
				objInput.html('<tr><td class="tdCenter"><select name="selectItem" class="selectItem"><option value="10" data-id="">준철 포트폴리오</option><select name="selectItem" class="selectItem">'
					+ '</select></td><td><div id="beforeWeek0" class="beforeWeek txtWeek"></div></td><td><div id="nextWeek0" class="nextWeek txtWeek">'
					+ '</div></td><td></td></tr>');
			}
				fnSetCKEditor();
			// cnt2 0 이 아니면 수정
			if (cnt2 == 0) {
				$('#btnDelete').hide();
				objBtn.text('등록')
				$('#btnSave').text('등록')
			} else {
				$('#btnDelete').show();
				objBtn.text('수정')
				$('#btnSave').text('수정')
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

// 주간업무 등록/수정
function fnWorkWeekInput() {
	const objList = $('#weekInput').children('tbody');
	let selDate = rCd = ''
		, selCnt = yyyy = wwork = widx = resCd = failCnt = 0;

	//기간
	yyyy = parseInt($('#selYear').val());
	wwork = parseInt($('#selWeek').val());
	selDate = $("#selWeek option:selected").attr('data-date').split('|');
	selCnt = $("select[name=selectItem]").length;
	rCd = getTimeStampCustom('');
	rCd = rCd.slice(0, 8) + ' ' + rCd.slice(8, 14) + '.' + rCd.slice(14, rCd.length);

	const promise = new Promise(function(resolve, reject) {
		fnLoadingOpen(); // 로딩 시작

		// 로딩 이미지가 활성화 된 상태에서 실행하기 위해 지연시간을 둠
		setTimeout(function() {
			resolve();
		}, 100);
	});

	promise.then(function() {
		if (cke != null) {
			$('#' + cke.name).html(cke.getData());
		}

		objList.children('tr').each(function() {
			const objThis = $(this)
				, objSel = objThis.find('select[name=selectItem]');
			const paramMap = {
				widx: parseInt(objSel.closest('tr').attr('data-widx')),
				yyyy: yyyy,
				wwork: wwork,
				uidx: _c_logIdx,
				sdate: selDate[0],
				edate: selDate[1],
				cidx: parseInt(objSel.val()),
				pconts: objThis.find('.beforeWeek').html(),
				nconts: objThis.find('.nextWeek').html(),
				rcd: rCd
			}
			const jsonData = JSON.stringify(paramMap);
			//console.log(jsonData);
			$.ajax({
				type: 'POST',
				url: '/weekWork/input',
				data: jsonData,
				async: false,
				contentType: 'application/json; charset=utf-8',
				dataType: 'json', // dataType is json format
				success: function(res) {
					if (res > 0) {
						resCd = res;
						failCnt++;
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					resCd = 9;
					failCnt++;
				}
			});
		});
	}).then(function() {
		if (resCd == 0) {
			alert('처리 되었습니다.');
			fnWeekWorkDelete(9, rCd);
			fnWorkWeekList();
			fnLayerPopupClose('WeekLayerPopUp');
		} else {
			alert(failCnt + '건 처리 실패!');
		}
	});
}

// 주간업무 삭제
function fnWeekWorkDelete(dType, rCd) {
	let dtp = 0;
	dtp = (dType == 9 ? 2 : dtp = 1);

	if (fnDeleteMsg(dType)) {
		const paramMap = {
			deltp: dtp,
			yyyy: parseInt($('#selYear').val()),
			wwork: parseInt($('#selWeek').val()),
			uidx: _c_logIdx,
			didx: _c_logIdx,
			rcd: rCd,
		}
		const jsonData = JSON.stringify(paramMap);
		//console.log(jsonData);
		/**/
		$.ajax({
			type: 'POST',
			url: '/weekWork/delete',
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
					if (dType != 9) {
						alert('처리 되었습니다.');
						fnWorkWeekList();
						fnLayerPopupClose('WeekLayerPopUp');
					}
				} else {
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
		/**/
	}
}

// 등록 시 항목 추가
function fnItemAdd(pType, objTh) {
	const obj = $('#weekInput').children('tbody')
		, beforeWeekId = getTimeStampCustom('b')
		, nextWeekId = getTimeStampCustom('n');
	let leth = obj.children('tr').length;

	if (pType == "1") {
		obj.append('<tr data-widx="0"><td class="tdCenter"><select name="selectItem" class="selectItem">' + fnCompanySelList(['전체', 0], $('#selSchMn')) + '</select></td><td><div id="' + beforeWeekId + '" class="beforeWeek txtWeek"></div></td><td><div id="' + nextWeekId + '" class="nextWeek txtWeek"></div></td><td><a href="/_Business/Business_Write_01.aspx" onclick="fnItemAdd(2, $(this)); return false;"><img src="/resources/images/btn/btn_minus.png" alt="삭제" style="width: 30px;"></a></td></tr>');

		fnSetCKEditor();
	} else {
		if (leth <= 1) {
			alert('입력 항목은 1개 이상이어야 합니다.');
			return false;
		}

		$(objTh).closest('tr').remove();
	}
}

//선택 팝업창 
function fnOpenPopUp() {
	const obj = $("#tableTitle")
		, objSel = $("#selWeek option:selected")
		, objSelF = $("#selWeek option:eq(0)").val();


	fnLayerPopupView('WeekLayerPopUp');
	obj.children('p:first').text('적용기간 : ' + objSel.text() + '(' + (objSel.val() - objSelF + 1) + '주차)');
	return false;
}


//년 불러오기
function fnDdlYear(yyyy) {
	let sList = "";
	for (let i = yyyy + 1; 2025 <= i; i--) {
		sList += "    <option value=\"" + i + "\" " + (yyyy == i ? "selected" : "") + ">" + i + "년</option>";
	}
	$('#selYear').html(sList);
}

// 월별 주간 불러오기
function fnDdlWeek(thisday) {
	//console.log(thisday);
	let year = Number(thisday.substring(0, 4))
		, month = thisday.substring(5, 7)
		, nowDate = new Date(year, Number(month) - 1, 1)
		, lastDate = new Date(year, Number(month), 0)
		, lastMonthSWeek = lastDate.getDay()
		, monthSWeek = nowDate.getDay()
		, weekSeq = parseInt((parseInt(lastDate.getDate()) + monthSWeek - 1) / 7) + 1
		, cnt = 0
		, sHtml = '';
	if (monthSWeek == 0) {
		cnt++;
		weekSeq++;
	} else if (monthSWeek == 6) {
		cnt++;
	}
	if (lastMonthSWeek == 0) { weekSeq--; }

	for (let i = cnt; i < weekSeq; i++) {
		let d = new Date(year + '-' + month + '-' + '01')
			, day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1)
			, monday = new Date(d.setDate(diff + (i * 7))).toISOString().substr(0, 10).split('-')
			, friday = new Date(d.setDate(d.getDate() + 4)).toISOString().substr(0, 10).split('-')

			, startYearDay = '1/1/' + monday[0]
			, today = monday[1] + '/' + monday[2] + '/' + monday[0]

			, dt = new Date(startYearDay)
			, tDt = new Date(today)

			, diffDay = (tDt - dt) / 86400000

			// 1월 1일부터 현재날자까지 차이에서 7을 나눠서 몇주가 지났는지 확인을 함
			, weekDay = parseInt(diffDay / 7) + 1;
		// 요일을 기준으로 1월 1일보다 이전 요일이라면 1주가 더 늘었으므로 +1 시켜줌.
		if (tDt.getDay() < dt.getDay()) weekDay += 1;

		sHtml += '<option data-date="' + monday.join('-') + '|' + friday.join('-') + '"value="' + weekDay + '">' + monday[0] + '년 ' + monday[1] + '월 ' + monday[2] + '일' + ' ~ ' + friday[0] + '년 ' + friday[1] + '월 ' + friday[2] + '일</option>'

		//console.log(monday[0] + '년 ' + monday[1] + '월 ' + monday[2] + '일' + ' ~ ' + friday[0] + '년 ' + friday[1] + '월 ' + friday[2] + '일');
		//console.log(weekDay);

	}
	$('#selWeek').html(sHtml);
}

// (전주 이번주 다음주) 계산
function fnweekDate(weekTp) {
	let thisObj = weekTp == 0 ? _today.toISOString().substr(0, 10) : $("#selWeek option:selected").attr('data-date').split('|')[0];
	'';
	let d = new Date(thisObj)
		, day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : 1) + weekTp
		, monday = new Date(d.setDate(diff)).toISOString().substr(0, 10).split('-')

		, startYearDay = '1/1/' + monday[0]
		, today = monday[1] + '/' + monday[2] + '/' + monday[0]

		, dt = new Date(startYearDay)
		, tDt = new Date(today)

		, diffDay = (tDt - dt) / 86400000

		// 1월 1일부터 현재날자까지 차이에서 7을 나눠서 몇주가 지났는지 확인을 함
		, weekDay = parseInt(diffDay / 7) + 1;
	// 요일을 기준으로 1월 1일보다 이전 요일이라면 1주가 더 늘었으므로 +1 시켜줌.
	if (tDt.getDay() < dt.getDay()) weekDay += 1;
	return monday[0] + '-' + monday[1] + '-' + monday[2] + '-' + weekDay;
}

// (전주 이번주 다음주) 업데이트
function fnPrNekWeekUpdate(weekTp) {
	let monthObj = $('#selMonth')
		, yearObj = $('#selYear')
		, weekObj = $('#selWeek')
		, weekDate = fnweekDate(weekTp).split('-');

	if (monthObj.val() != weekDate[1]) { // 현재 달과 다를경우 
		fnDdlWeek(weekDate[0] + '-' + weekDate[1] + '-' + weekDate[2]);
		yearObj.val(weekDate[0]);
		monthObj.val(weekDate[1]);
	}
	weekObj.val(weekDate[3]);
	fnWorkWeekList();
}


// 내용 클릭시 에디터 호출
function fnSetCKEditor() {
	objInput = $('#weekInput')

	objInput.find('.txtWeek').unbind().bind('click', function() {
		const objThis = $(this)
			, txtId = objThis.attr('id');

		if (txtId != prevId) {
			if (cke != null) {
				$('#' + prevId)
					.html(cke.getData())
					.css({ 'visibility': 'visible', 'display': 'block' });
				cke.destroy();
			}

			cke = CKEDITOR.replace(txtId, {
				customConfig: '/resources/plugin/ckeditor/config_s.js',
				filebrowserUploadUrl: '/common/uploadImgOne',
				editorplaceholder: '내용을 입력해 주세요',
			});

			cke.setData(objThis.html());

			prevId = txtId;
		}
	});
}