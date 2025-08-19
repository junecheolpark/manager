_today = datetimeView('date');
$(function() {
	//내 정보
	fnMySchedule();

	//프로젝트
	/*/
	fnCompanyIndexSelList(['최신', 0, 1], $('#selSchPj'));
	if ($('#selSchPj option').text() != 'no data') fnProjectView();

	//select 변경시
	$("#selSchPj").on("change", function() {
		fnProjectView();
	});
	
	 */

	//주간일정
	fnScheduleList();

	//게시판
	fnBoardList(0);

	//메모
	//메모 숨김
	fnTopMemo();

	fnMemoList();
});

// 게시판 공지사항 보기
function fnBoardNoticeView() {
	const obj = $("#noticeTxt");
	let paramMap = {
		bidx: 0
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
			//fnLoadingOpen();
		},
		success: function(res) {
			//console.log(res);

			const items = res;
			let conts = '';

			board_IDX = items.board_IDX;
			subj = items.subj;

			if (board_IDX == 0) {
				$("#noticeTxt").text('등록된 공지사항이 없습니다.').closest('a').attr('data-bidx', board_IDX);
			} else {
				$("#noticeTxt").text(subj).closest('a').attr('data-bidx', board_IDX);

				// 메뉴 행 선택 이벤트
				obj.closest('a').unbind().bind('click', function() {
					const objThis = $(this)
						, objBidx = objThis.attr('data-bidx');

					location.href = '/clipboard/01?bidx=' + objBidx;
				});
			}
			//fnLoadingClose();
		},
		//error: function(jqXHR, textStatus, errorThrown) {
		error: function(jqXHR, textStatus, errorThrown) {
			// loading.. progressbar 종료			
			//fnLoadingClose();
			alert('실패');
			//console.log("ERROR : " + textStatus + " : " + errorThrown);
			//console.log(res.responseText);
		}
	});
}

// 게시글 목록
function fnBoardList(midx) {
	let paramMap = {
		ltype: 2,
		page: 1,
		psize: 5,
		midx: parseInt(midx),
		schd1: '',
		schd2: '',
		schrnm: '',
		schsel: 0, //제목
		schtxt: '',
		orderby: 0,
		desc: 0
	}
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
				, objList = $('#boardList')
				, obj = $('#boardMenu').find('ul');
			let sHtml = subj = reg_NM = reg_DATE = ''
				, board_IDX = read_CNT = file_IDX = dateCnt = 0;
			if (items.length == 0) {
				sHtml += '<li style="text-align:center;">';
				sHtml += '  <span class="noData">검색된 게시글이 없습니다.</span>';
				sHtml += '</li>';
				objList.html(sHtml);
			} else {
				$.each(items, function(i, val) {
					board_IDX = val.board_IDX;
					master_BOARD_IDX = val.master_BOARD_IDX;
					subj = val.subj;
					reg_NM = val.reg_NM;
					reg_DATE = val.reg_DATE.substr(0, 10);
					file_IDX = val.file_IDX;
					dateCnt = dateDiff(_today, reg_DATE);
					//console.log(dateCnt);
					sHtml += '<li data-bidx="' + board_IDX + '" data-mbidx="' + master_BOARD_IDX + '">' + '\n';
					sHtml += '	<a href="#">' + (dateCnt < 7 ? '<img src="/resources/images/icon/newIcon.png" alt="new">&nbsp;' : '') + subj + '</a>' + '\n';
					sHtml += '	<p>' + '\n';
					sHtml += '		<span class="colGray2">' + reg_NM + '</span>&nbsp;&nbsp;&nbsp;<span class="colGray2">' + reg_DATE + '</span>' + '\n';
					sHtml += '	</p>' + '\n';
					sHtml += '</li>';
				});

				objList.html(sHtml);

				// 행 선택 이벤트
				objList.find('a').unbind().bind('click', function() {
					const objThis = $(this)
						, objBmidx = parseInt(objThis.parent().attr('data-mbidx'))
						, objBidx = parseInt(objThis.parent().attr('data-bidx'));

					objList.children('li').removeClass('selRow');
					//console.log(objBmidx);
					switch (objBmidx) {
						case 10: location.href = '/clipboard/01?bidx=' + objBidx; break;
						case 11: location.href = '/clipboard/02?bidx=' + objBidx; break;
						case 12: location.href = '/clipboard/03?bidx=' + objBidx; break;
					}
					//location.href = '/report/01/write?midx=' + objRow.attr('data-midx');
				});

			}
			fnBoardNoticeView();

			// 메뉴 행 선택 이벤트
			obj.find('a').unbind().bind('click', function() {
				const objThis = $(this)
					, objRow = objThis.parent();
				obj.children('li').removeClass('choicebulletin');
				objRow.addClass('choicebulletin');
				fnBoardList(objRow.attr('data-mbidx'));
				return false;
			});

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

// 근태 관리 불러오기
function fnMySchedule() {
	let year = _today.substr(0, 4);
	let paramMap = {
		year: parseInt(year),
		uidx: _c_logIdx
	}
	const jsonData = JSON.stringify(paramMap);
	console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/schedule/vacationView',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			const items = res;
			console.log(res);
			let in_DATETIME = out_DATETIME = in_TIME = out_TIME = now = weekKN = ''
				, nomal_CNT = use_NOMAL_CNT = quarter = 0;
			const week = ['일', '월', '화', '수', '목', '금', '토'];

			user_IDX = items.user_IDX;
			in_DATETIME = fnBlank(items.in_DATETIME, false);
			out_DATETIME = fnBlank(items.out_DATETIME, false);
			nomal_CNT = items.nomal_CNT;
			use_NOMAL_CNT = items.use_NOMAL_CNT;
			in_TIME = items.in_TIME;
			out_TIME = items.out_TIME;

			now = dateUtil.prototype.nowDate().split('-');
			weekKN = week[new Date().getDay()];
			$('#today').text(now[0] + '년 ' + now[1] + '월 ' + now[2] + '일 (' + weekKN + ')');
			//분기 처리
			switch (parseInt(now[1])) {
				case 1: case 2: case 3: quarter = 1 + '분기 출근';
					break;
				case 4: case 5: case 6: quarter = 2 + '분기 출근';
					break;
				case 7: case 8: case 9: quarter = 3 + '분기 출근';
					break;
				case 10: case 11: case 12: quarter = 4 + '분기 출근';
					break;
			}
			//근태관리
			$('#quarter').append(quarter);

			$('#goWork').text(in_DATETIME != '-' ? in_DATETIME.substr(10, 9) : '미등록');
			$('#backWork').text(out_DATETIME != '-' ? out_DATETIME.substr(10, 9) : '미등록');
			$('#yearLeave').text(nomal_CNT - use_NOMAL_CNT);
			$('#workInTime').text(in_TIME);
			$('#workOutTime').text(out_TIME);

			fnLoadingClose();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// loading.. progressbar 종료			
			fnLoadingClose();
			
			alert('근태관리 실패');
			//console.log("ERROR : " + textStatus + " : " + errorThrown);
			//console.log(res.responseText);
		}
	});
}

//select Box 회사 불러오기
function fnCompanyIndexSelList(arr, obj) {
	const paramMap = {
		seltp: arr[2],
		ridx: (_c_logAdTp == 27 || _c_logAdTp == 28) ? 0 : _c_logIdx
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/company/companyIndexNmList',
		data: jsonData,
		async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			obj.html('<option value="' + arr[1] + '" data-id="">loading...</option>');
		},
		success: function(res) {
			//console.log(res);
			const items = res;
			let company_IDX = 0
				, company_NM = sHtml = '';

			if (arr[1] == false) sHtml = '<option value="' + arr[1] + '" data-id="">' + arr[0] + '</option>' + '\n';

			if (items.length == 0) {
				sHtml = '<option value="' + arr[1] + '" data-id="noData">no data</option>' + '\n';
			} else {
				$.each(items, function(i, val) {
					company_IDX = val.company_IDX;
					company_NM = val.company_NM;

					sHtml += '<option value="' + company_IDX + '" data-id="' + company_NM + '" ' + (arr[1] == '' || arr[1] == '0' ? '' : 'selected="selected"') + '>' + company_NM + '</option>' + '\n'; // 시스템관리자 제외
				});
			}
			//fnLoadingClose();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// loading.. progressbar 종료			
			fnLoadingClose();
			alert('실패');
			//console.log("ERROR : " + textStatus + " : " + errorThrown);
			//console.log(res.responseText);
			sHtml = '<option value="' + arr[1] + '" data-id="">Error!</option>' + '\n';
		}
	});

	obj.children('option').remove();

	obj.html(sHtml);

}


// 프로젝트 보기
function fnProjectView() {
	let paramMap = {
		pidx: 0,
		cidx: parseInt($('#selSchPj').val())
	}
	const jsonData = JSON.stringify(paramMap);
	console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/project/projectMainView',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
		},
		success: function(res) {
			//console.log(res);
			const items = res;
			let work_PROGRESS = dateProgress = company_IDX = schedule = uLen = 0
				, project_NM = s_USER_NM = sdate = edate = sHtml = ''
			dDay = _today.split('-');
			// D-day (전체일정 비율)


			if (items.length > 0) {
				$.each(items, function(i, val) {
					work_PROGRESS = val.work_PROGRESS;
					work_PROGRESS = work_PROGRESS > 98 ? 100 : work_PROGRESS;
					project_NM = val.project_NM;
					s_USER_NM = val.s_USER_NM.split(',');
					uLen = s_USER_NM.length;
					sdate = val.sdate;
					edate = val.edate;
					dateProgress = Math.round((dateDiff(_today, sdate)) / dateDiff(edate, sdate) * 100);
					dateProgress = dateProgress <= 0 ? 0 : dateProgress;
					dateProgress = dateProgress >= 100 ? 100 : dateProgress;

					$('#projectNm').text(project_NM);
					$('#projectUser').text(uLen == 1 ? s_USER_NM : s_USER_NM[0] + ' 외 ' + (uLen - 1) + '명');
					$('#projectPg').css('width', dateProgress + '%');
					$('#projectPgTxt').text(dateProgress + '%').parent().css('left', dateProgress - 5 + '%');

					$('.font1').html(dDay[0] + '년 <b>' + dDay[1] + '월');
					$('.font2').text(work_PROGRESS + '%');

					//원형 플러그인 
					const chart1 = document.querySelector('.doughnut1');
					const makeChart = (percent, classname, color) => {
						let i = 0;
						let chartFn = setInterval(function() {
							if (i < percent) {
								colorFn(i, classname, color);
								i++;
							} else {
								clearInterval(chartFn);
							}
						}, 10);
					}
					const colorFn = (i, classname, color) => {
						classname.style.background = "conic-gradient(" + color + " 0% " + i + "%, #fff " + i + "% 100%)";
					}
					makeChart(work_PROGRESS + 1, chart1, '#f5b914');

					$('#projectHide').hide();
					$('#projectShow').show();
				});
			} else {
				$('#projectHide').show();
				$('#projectShow').hide();
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
}

// 주간 일정 목록
function fnScheduleList() {

	let toDay = new Date().getDay()
		, sdate = dateUtil.prototype.setAddDate(_today, -(toDay))
		, edate = dateUtil.prototype.setAddDate(_today, (7 - toDay))
		, paramMap = {
			uidx: 0,
			sdate: sdate,
			edate: edate,
		}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
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
			//console.log(res)
			const items = res
				, holi = fnHolidayList(paramMap.sdate, paramMap.edate); // 공휴일 불러와 변수 저장
			let sdate = edate = code_NM = user_NM = dateCnt = startDate = endDate = sHtml = APPROVE_STS = ''
				, day0 = day1 = day2 = day3 = day4 = day5 = day6 = ''

			day0 = paramMap.sdate;
			day1 = dateUtil.prototype.setAddDate(day0, 1);
			day2 = dateUtil.prototype.setAddDate(day0, 2);
			day3 = dateUtil.prototype.setAddDate(day0, 3);
			day4 = dateUtil.prototype.setAddDate(day0, 4);
			day5 = dateUtil.prototype.setAddDate(day0, 5);
			day6 = dateUtil.prototype.setAddDate(day0, 6);

			/**/
			$('#sunday').html('');
			$('#monday').html('');
			$('#tuesday').html('');
			$('#wednesday').html('');
			$('#thursday').html('');
			$('#friday').html('');
			$('#saturday').html('');
			/**/

			$.each(items, function(i, val) {
				code_NM = val.code_NM;
				user_NM = val.user_NM;
				sdate = val.sdate;
				edate = val.edate;
				schedule_TP = val.schedule_TP;
				approve_STS = val.approve_STS;
				conts = val.conts;

				if (approve_STS == 2) { //승인 된경우에
					if (schedule_TP == 111 || schedule_TP == 112) {
						sHtml = '<span class="colRed">' + conts + '</span>' + '\n'
					} else if (schedule_TP == 113) {
						sHtml = '<p class="shadowBox sc_box mgB10">' + '\n'
						sHtml += '	<span class="' + fnScheduleTp(schedule_TP) + '"> ' + conts + '</span>' + '\n'
						sHtml += '</p>' + '\n'
					} else {
						sHtml = '<p class="shadowBox sc_box mgB10">' + '\n'
						sHtml += '	<span class="' + fnScheduleTp(schedule_TP) + '">' + code_NM + '</span> | <span>' + user_NM + '</span>' + '\n'
						sHtml += '</p>' + '\n'
					}


					for (let i = 0; i <= dateDiff(edate, sdate); i++) {
						switch (dateUtil.prototype.setAddDate(sdate, i)) {
							case day0: $('#sunday').append(sHtml); break;
							case day1: $('#monday').append(sHtml); break;
							case day2: $('#tuesday').append(sHtml); break;
							case day3: $('#wednesday').append(sHtml); break;
							case day4: $('#thursday').append(sHtml); break;
							case day5: $('#friday').append(sHtml); break;
							case day6: $('#saturday').append(sHtml); break;
						}
					}
				}
			})

			$.each(holi, function(i, val) {
				holiday_NM = val.holiday_NM;
				holiday = val.holiday;

				sHtml = '<span class="colRed">' + holiday_NM + '</span>' + '\n'
				switch (holiday) {
					case day0: $('#sunday').html(sHtml); $('.sunday').addClass('colRed'); break;
					case day1: $('#monday').html(sHtml); $('.monday').addClass('colRed'); break;
					case day2: $('#tuesday').html(sHtml); $('.tuesday').addClass('colRed'); break;
					case day3: $('#wednesday').html(sHtml); $('.wednesday').addClass('colRed'); break;
					case day4: $('#thursday').html(sHtml); $('.thursday').addClass('colRed'); break;
					case day5: $('#friday').html(sHtml); $('.friday').addClass('colRed'); break;
					case day6: $('#saturday').html(sHtml); $('.sunday').addClass('colBlue2'); break;
				}
			})

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
// 공휴일
function fnHolidayList(sdate, edate) {
	let paramMap = {
		sdate: sdate,
		edate: edate,
	}
	let items = '';
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/schedule/holidayList',
		data: jsonData,
		async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			//fnLoadingOpen();
		},
		success: function(res) {
			items = res;
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// loading.. progressbar 종료			
			fnLoadingClose();
			alert('실패');
			//console.log("ERROR : " + textStatus + " : " + errorThrown);
			//console.log(res.responseText);
		}
	});
	return items;
}

// 메모 목록
function fnMemoList() {
	let paramMap = {
		uidx: _c_logIdx,
		showtp: 1
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/user/memoList',
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
				, objList = $('#memoBox');
			let sHtml = memo = reg_DATE = reg_DATE_2 = ''
				, user_IDX = show_TP = 0;
			if (items.length == 0) {

			} else {
				$.each(items, function(i, val) {
					user_IDX = val.user_IDX;
					memo = val.memo;
					reg_DATE = val.reg_DATE.substr(0, 19);
					reg_DATE_2 = val.reg_DATE.substr(0, 16);

					sHtml += '<div class="memo">' + '\n';
					sHtml += '	<div class="placeTitle">' + '\n';
					sHtml += '		<span class="pdL5 colGray2">' + reg_DATE_2 + '</span>' + '\n';
					sHtml += '		<div class="floatR" data-uidx="' + user_IDX + '" data-rdate="' + reg_DATE + '">' + '\n';
					sHtml += '			<a href="#" class="btn btnS btnWhite memoSave" onclick="fnMemoInput($(this)); return false;">저장</a>&nbsp;' + '\n';
					sHtml += '			<a href="#" class="btn btnS btnPointLine memoDel" onclick="fnMemoDelete($(this)); return false;">삭제</a>' + '\n';
					sHtml += '		</div>' + '\n';
					sHtml += '		<textarea rows="5" cols="5" class="txtMemo" >' + memo + '</textarea>' + '\n';
					sHtml += '	</div>' + '\n';
					sHtml += '</div>' + '\n';
				});

				objList.html(sHtml);

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

// 메모 등록/수정
function fnMemoInput(objTh) {
	const obj = objTh.parent()
	let uidx = obj.attr('data-uidx')
		, rdate = obj.attr('data-rdate')
		, memo = obj.next('.txtMemo').val();
	if (memo == '') { alert('메모을(를) 입력해 주세요.'); return false; }
	const paramMap = {
		rdate: rdate,
		uidx: parseInt(uidx),
		memo: memo,
		showtp: 1,
		ridx: _c_logIdx,
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/user/memoInput',
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
				fnMemoList();
			} else {
				alert('실패');
			}
			fnLoadingClose()
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

// 메모 삭제
function fnMemoDelete(objTh) {
	const obj = objTh.parent()
		, objPar = objTh.closest('.memo');
	let uidx = obj.attr('data-uidx')
		, rdate = obj.attr('data-rdate');
	if (rdate == '') {
		objPar.remove();
	} else {
		if (fnDeleteMsg(1)) {
			const obj = objTh.parent()
			let uidx = obj.attr('data-uidx')
				, rdate = obj.attr('data-rdate');

			const paramMap = {
				deltp: 1,
				rdate: rdate,
				uidx: parseInt(uidx),
				DEL_IDX: _c_logIdx,
			}
			const jsonData = JSON.stringify(paramMap);
			//console.log(jsonData);
			$.ajax({
				type: 'POST',
				url: '/user/memoDelete',
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
						objPar.remove();
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
	}
}

// 메모 숨김
function fnTopMemo() {
	$('.showMemoBtn').click(function() {
		const objImg = $('.showMemoBtn').children('img');

		if ($('.mP').css('display') != 'none') {
			$('.mP, .mDiv').hide();
			$('.myPlace').css('top', '160px');
			objImg.attr('src', '/resources/images/icon/ic_arrow_u.gif');
		} else {
			$('.mP, .mDiv').show();
			$('.myPlace').css('top', '0px');
			objImg.attr('src', '/resources/images/icon/ic_arrow_d.gif');

		}
	})
}

// 메모 추가
function fnMemoAdd() {
	let sHtml = '';
	sHtml += '<div class="memo">' + '\n';
	sHtml += '	<div class="placeTitle">' + '\n';
	sHtml += '		<div class="floatR" data-uidx="0" data-rdate="">' + '\n';
	sHtml += '			<a href="#" class="btn btnS btnWhite memoSave" onclick="fnMemoInput($(this)); return false;">저장</a>&nbsp;' + '\n';
	sHtml += '			<a href="#" class="btn btnS btnPointLine memoDel" onclick="fnMemoDelete($(this)); return false;">삭제</a>' + '\n';
	sHtml += '		</div>' + '\n';
	sHtml += '		<textarea rows="5" cols="5" class="txtMemo" ></textarea>' + '\n';
	sHtml += '	</div>' + '\n';
	sHtml += '</div>' + '\n';
	$('#memoBox').append(sHtml);
}