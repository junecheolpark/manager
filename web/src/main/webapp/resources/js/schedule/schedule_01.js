_today = datetimeView('date')
	, _fileRName = '', _fileName = '', _fileUrl = '', _fileSize = 0, _clsDelFile = 'N'
	, _schedule_Arr = [27, 29, 34];

$(function() {
	$("#leftTopRpt04").show();
	$('#txtSDate, #txtEDate').val(_today);
	$('.mySelect').prop('checked', true);
	// 선택 달력 이벤트 불러오기
	$('.cal').datepicker({
		language: 'ko-KR',
		format: 'yyyy-mm-dd',
		autoHide: true,
		zIndex: 8889,
		pick: function(e) {
			e.preventDefault();
			let pickedDate = e.date;
			let date = dateUtilObj.formatDate(pickedDate, '-');
			let sObj = eObj = null
				, obj = $(this);
			let id = (obj.attr('id') == undefined ? obj.attr('name') : obj.attr('id'));
			let txtID = ''
				, edate = date;

			if (id.indexOf('SDate') > -1 || id.indexOf('EDate') > -1) {
				if (id == 'txtSDate' || id == 'txtEDate') {
					txtID = (id == 'txtSDate' ? 'st' : 'en');
					sObj = $('#txtSDate');
					eObj = $('#txtEDate');
				}

				if (txtID == 'st') {
					sObj.val(date);
					eObj.val(edate); // 시작일 선택시 시작일 + MD 계산 후 종료일 업데이트						
				} else {
					if (sObj.val() == '') sObj.val(date);
					eObj.val(edate);
				}

				eObj.datepicker('setStartDate', sObj.val()); // 시작일 이전 날짜 선택 안되도록 수정
			} else {
				obj.val(date);
			}
		}
	});

	// 코드불러오기
	fnCodeSelList([1, 24, '', '선택', 0, true, 0], $('#selSchdule'));

	// 년도 설정
	let date = new Date();
	let month = date.getMonth() + 1;
	fnSelYear($('#selSchYear'), 2025, 1, false, '년');
	$('#selSchMonth').val(month > 9 ? month : '0' + month);

	//대상 유저 불러오기
	fnUserList();

	fnScheduleLoad();

	//연차 개수
	fnMySchedule();
	/***************************************/

	// 표준, 년, 월 선택
	$('#selSchYear, #selSchMonth').on('change', function() {
		let changeDate = $('#selSchYear').val() + '-' + $('#selSchMonth').val() + '-01';
		$('#calendar').fullCalendar('gotoDate', changeDate);
		fnHolidayList();
		fnSchList();
		return false;
	});

	// 이전달, 오늘, 다음달
	$('#btnPrev, #btnToday, #btnNext').click(function() {
		let thisObj = $(this);
		let btnObj = null;

		if (thisObj.attr('id') == 'btnPrev') btnObj = $('.fc-prev-button');
		else if (thisObj.attr('id') == 'btnToday') {
			if (_today.substr(5, 2) == $('#selSchMonth').val()) { return false; }
			btnObj = $('.fc-today-button');
		}
		else if (thisObj.attr('id') == 'btnNext') btnObj = $('.fc-next-button');

		btnObj.click();

		let moment = $('#calendar').fullCalendar('getDate');
		let calYear = moment.format('YYYY');
		let calMonth = moment.format('MM');

		$('#selSchYear').val(calYear);
		$('#selSchMonth').val(calMonth);

		fnHolidayList();
		fnSchList();
		return false;
	});
	// 버튼 이벤트
	$('.btn, #btnSch').click(function() {
		let title = target = standard = date = list = sendList = '';
		let obj = listObj = chkObj = thisObj = null;
		let btnObj = $(this);

		if (btnObj.attr('id') == 'btnSch') {
			fnHolidayList();
			fnSchList();
		}
		return false;
	});

	/**/
	// 파일 업로드
	$('#scheduleFile').ajaxfileupload({
		action: '/common/fileupload',
		params: {
			'utype': '2',
			'ufolder': 'schedule'
		},
		validate_extensions: false,
		valid_extensions: ['bmp', 'gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'rar', 'pdf', 'hwp', 'ppt', 'pptx'],
		onComplete: function(response) {
			const items = response.fileDTOList[0];
			console.log(items);
			var status = response.status;
			var code = null;
			if (status == false) {
				fnAlertError('첨부할 수 없는 파일 형식 입니다.');
				fnLoadingClose();
				return false;
			}

			if ($(this).attr('id').indexOf('scheduleFile') > -1) $('#UploadFileView').html('<span class="colBlue">※ 파일이 여러개일 경우 압축파일로 첨부</span>');
			_fileRName = items.real_FILE_NM;
			_fileName = items.file_NM;
			_fileUrl = items.file_PATH;
			_fileSize = items.file_SIZE;
			_clsDelFile = 'N';

			$('#scheduleFile').parent().find('label').hide();
			$('#scheduleFile').hide();
			$('#UploadFileView').show();
			$('#UploadFileView').html('<a href="/common/filedownload?fpt=' + _fileUrl + '&fnm=' + _fileName + '&rfnm=' + _fileRName + '" target="_blank" class="btn btnWhite">' + _fileRName +
				'</a>&nbsp;<a href="#del" id="btnDelFile1" class="btn btnGray" onclick="fnFileDelete(); return false;">삭제</a>');
			fnLoadingClose();
		}
	});

});

//대상 유저 불러오기
function fnUserList() {
	let paramMap = {
		ltype: 3,
		page: 1,
		psize: 11,
		usertp: 0,
		usersts: 35,
		admintp: 0,
		cidx: _c_logCIdx,
		cnm: '',
		datetp: 0,
		sdate: '',
		edate: '',
		schsel: 1,
		schtxt: '',
		orderby: 0,
		desc: 0
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/user/list',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			//if ($('.loading-layer').css('display') == 'none') $('.loading-layer').show();
		},
		success: function(res) {
			const items = res
				, objList = $('#userList').children('tbody');
			let sHtml = user_ID = nm = dept_NM = posi_NM = phone = mobile = email = zipcode = addr = addr_DETAIL = join_DATE = company_NM = admin_NM = ''
				, user_IDX = company_IDX = 0
				, schedule_TP = $('#selSchdule').val();

			if (items.length == 0) {
				sHtml += '<tr>';
				sHtml += '  <td colspan="3" class="noData">검색된 사용자가 없습니다.</td>';
				sHtml += '</tr>';

			} else {
				$.each(items, function(i, val) {
					user_IDX = val.user_IDX;
					nm = val.nm;
					posi_NM = (val.posi_NM == null ? '-' : val.posi_NM);
					user_ID = val.user_ID;

					sHtml += '<tr">' + '\n';
					sHtml += '	<td class="rightTd">' + '\n';
					sHtml += '		<input type="checkbox"name="userSelect" class="noBorder ' + (_c_logIdx == user_IDX ? 'mySelect' : '') + '" value="' + user_ID + '|' + nm + '|' + user_IDX + '" />' + '\n';
					sHtml += '	</td>' + '\n';
					sHtml += '	<td class="rightTd">' + posi_NM + '</td>' + '\n';
					sHtml += '	<td>' + nm + '</td>' + '\n';
					sHtml += '</tr>' + '\n';
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

//선택 user 불러오기
function fnUserSelect() {
	var chk = '';
	var chkText = '';
	for (var i = 0; i < $('[name=userSelect]').length; i++) {
		if ($('[name=userSelect]')[i].checked == true) {
			var txt = $('[name=userSelect]')[i].value.split('|');
			chk = chk + txt[2] + ',';
			chkText = chkText + txt[1] + ',';
		}
	}
	$('#schIdx').val(chk.substr(0, chk.lastIndexOf(',')));
	$('#ToName').text(chkText.substr(0, chkText.lastIndexOf(',')));
	$('#CheckList').hide();
}

// 일정 달력
function fnScheduleLoad() {
	let pDate = datetimeView('date').substr(0, 7) + '-01';
	$('#calendar').fullCalendar({
		schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
		//theme: true, //테마
		defaultDate: pDate, //고정날짜
		contentHeight: 'auto', //높이초과시
		nextDayThreshold: '00:00:00', // 마지막날 기준
		height: 700,
		locale: "ko",
		/*/
		header: {
			left: '',
			center: 'prev title next',
			right: 'today'
		},
		views: {
			month: { // name of view
				titleFormat: 'YYYY.MM'
				// other view-specific options here
			}
		},
		buttonText: {
			prev: '<',
			next: '>',
			today: '오늘',
			//month: '월별',
			//week: '주별',
			//day: '일별'
		},
		/**/
		//monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		//monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		//dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
		dayNamesShort: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
		defaultView: 'month',
		timeFormat: 'HH:mm',
		allDaySlot: false,
		displayEventTime: false,
		selectable: false,
		//fixedWeekCount: false, // 주만큼 간격변경
		editable: false, // enable draggable events
		eventLimit: false, // allow "more" link when too many events
		eventClick: function(calEvt, jsEvt, view) {
			//console.log('click title ' + calEvt.title);
			//console.log(jsEvt);
			//console.log(view);
			if (calEvt.title == '심사') {
				location.href = 'Schedule_View_01.aspx?yyyy=' + $('#selSchYear').val() + '&mm=' + $('#selSchMonth').val() + '&cidx=' +
					calEvt.cidx + '&sidx=' + calEvt.sidx + '&ccidx=' + calEvt.ccidx + '&atype=' + calEvt.atype + '&atype_cdb=' + calEvt.atype_cdb +
					'&muidx=' + calEvt.muidx;
			}
		},
		eventRender: function(event, element, view) {
			//console.log(event);
			//console.log("element", element);
			const uidx = _c_logIdx
				, sidx = event.sidx
			let title = event.title
				, stype = event.stype
				, conts = ''

			//console.log("title", title);
			if (stype == 1) {
				conts += '<div class="fc-content btnPointer" data-sidx="' + sidx + '" onclick="fnUserScheduleView(this);">' + '\n';
				conts += '<span class="fc-title"  >' + '\n';
				conts += '' + title + '' + '\n';
				conts += '</span></div>' + '\n';

				element.unbind().bind().html(conts);

			} else if (stype == 2) {
				//console.log(title);
				conts += '<div class="fc-content">' + '\n';
				conts += '<span class="fc-title" data-uidx="' + uidx + '">';
				conts += '' + title + '' + '\n';
				conts += '</span></div>' + '\n';

				element.unbind().bind().html(conts);
				//element.find('.fc-title').css('background-color', 'red');
			}
		}
	});
	fnHolidayList();
	fnSchList();
}

// 공휴일 목록
function fnHolidayList() {
	let moment = $('#calendar').fullCalendar('getView')
		, sdate = moment.start.format('YYYY-MM-DD')
		, edate = moment.end.format('YYYY-MM-DD')
		, arrDate = []
		, arrName = []
		, paramMap = {
			sdate: sdate,
			edate: edate,
		}
	const jsonData = JSON.stringify(paramMap);
	$.ajax({
		type: 'POST',
		url: '/schedule/holidayList',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			const items = res;
			//console.log(res);
			let date = name = '';
			$.each(items, function(i, val) {
				date = val.holiday;
				name = val.holiday_NM;

				arrDate.push(date);
				arrName.push(name);
			});

			$('.fc-day-number').each(function() {
				dateIdx = $.inArray($(this).parent().data('date'), arrDate);
				if (dateIdx > -1) {
					if ($(this).parent().find('.holy').length == 0) {
						$(this).css('color', 'red');
						$(this).parent().append('<p class="holiday">' + arrName[dateIdx] + '</p>');
					}
				}
			});
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

// 일정 목록
function fnSchList() {
	let events = []
		, moment = $('#calendar').fullCalendar('getView')
		, sdate = moment.start.format('YYYY-MM-DD')
		, edate = moment.end.format('YYYY-MM-DD')
		, paramMap = {
			uidx: 0,
			sdate: sdate,
			edate: edate,
		}
	//console.log(paramMap);
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
			const items = res;
			console.log(res);
			let sdate = edate = code_NM = user_NM = dateCnt = startDate = endDate = title = approveClass = conts = ''
				, schedul_IDX = schedule_TP = approve_STS = 0;
			$.each(items, function(i, val) {
				code_NM = val.code_NM;
				user_NM = val.user_NM;
				sdate = val.sdate;
				edate = val.edate;
				schedule_IDX = val.schedule_IDX;
				schedule_TP = val.schedule_TP;
				approve_STS = val.approve_STS;
				approveClass = '';
				conts = val.conts;

				switch (approve_STS) {
					case 1: approveClass = 'boxCol1 '; break; // 신청
					case 2: approveClass = 'boxCol2 '; break; // 승인
					case 9: approveClass = 'boxCol3 '; break; // 취소
				}
				if (schedule_TP != 27 && schedule_TP != 29 && schedule_TP != 34) { approveClass = 'boxCol4 ' }

				if (schedule_TP == 26 || schedule_TP == 33) {//기타
					title = '<div class="titleBox ftSize11 boxCol5"><span class="ftBold ' + fnScheduleTp(schedule_TP) + '">' + conts + '</span>' + '</div>';
				} else {
					title = '<div class="titleBox ftSize11 ' + approveClass + '"><span class="ftBold ' + fnScheduleTp(schedule_TP) + '">' + code_NM + '</span>' + ' | ' + user_NM + '</div>';
				}


				// 날짜 사이 일수
				dateCnt = dateDiff(edate, sdate)
				//console.log("dateCnt: " + dateCnt);
				for (let i = 0; i <= dateCnt; i++) {
					//날짜 계산
					startDate = dateUtil.prototype.setAddDate(sdate, i);
					endDate = dateUtil.prototype.setAddDate(startDate, 1);
					//console.log("startDate: " + startDate);
					//console.log("endDate: " + endDate);

					events.push({
						id: i,
						title: title,
						stype: 1,
						start: startDate,
						end: endDate,
						allday: true,
						sidx: schedule_IDX
						//textColor: "#000",
						//backgroundColor: "white",
						//borderColor: "black"
					});

				}

			})
			$('#calendar').fullCalendar('removeEvents');
			$('#calendar').fullCalendar('addEventSource', events);
			$('#calendar').fullCalendar('refetchEvents');
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

// 일정관리 보기
function fnUserScheduleView(pThis) {
	const objThis = $(pThis);

	let paramMap = {
		sidx: parseInt(objThis.attr('data-sidx')),
		uidx: 0
	}
	const jsonData = JSON.stringify(paramMap);
	$.ajax({
		type: 'POST',
		url: '/schedule/view',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
		},
		success: function(res) {
			//console.log(res);
			const items = res;
			let schedule_TP = schedule_IDX = approve_STS = ampm = 0
				, subj = conts = sdate = edate = stime = etime = approve = mod_DATE = user_NM = schedule_USER_IDX = fHtml = '';

			schedule_IDX = items.schedule_IDX;
			schedule_USER_IDX = items.schedule_USER_IDX;
			schedule_TP = items.schedule_TP;
			subj = items.subj;
			sdate = items.sdate;
			edate = items.edate;
			conts = items.conts;
			stime = items.stime.substr(0, 5);
			etime = items.etime.substr(0, 5);
			ampm = items.ampm;
			approve_STS = items.approve_STS;
			user_NM = items.user_NM;
			reg_DATE = items.reg_DATE.substr(0, 16);
			mod_DATE = fnBlank(items.mod_DATE, false).substr(0, 16);
			_fileName = items.file_NM;
			_fileRName = items.real_FILE_NM;
			_fileUrl = items.file_PATH;

			//승인 표시
			switch (approve_STS) {
				case 1: approve = '신청'
					break;
				case 2: approve = mod_DATE == '-' ? '승인 (' + reg_DATE + ')' : '승인 (' + mod_DATE + ')'
					break;
				case 9: approve = '취소 (' + mod_DATE + ')'
					break;
			}

			$('#txtTitle').attr('data-sidx', schedule_IDX);
			$('#schIdx').val(schedule_USER_IDX);
			$('#selSchdule').val(schedule_TP);
			$('#txtTitle').val(subj);
			$('#txtSDate').val(sdate);
			$('#txtEDate').val(edate);
			$('#txtConts').val(conts);
			$('#txtSTime').val(stime);
			$('#txtETime').val(etime);
			$('#selectTimeType').val(ampm);
			$('#txtSchedule_TP').text(approve);
			$('#ToName').text(user_NM);
			$('#btnSave').text('수정');

			if (_schedule_Arr.includes(schedule_TP)) { // 휴가,반차,반반차

				if (schedule_TP == 34) {// 기타휴가시 파일 체크
					fHtml = fnEmpty(items.file_NM, '') == '' ? ' -' : '<a href="/common/filedownload?fpt=' + _fileUrl + '&fnm=' + _fileName + '&rfnm=' + _fileRName + '" target="_blank" class="btn btnWhite">' + _fileRName + '</a>&nbsp;<a href="#del" id="btnDelFile1" class="btn btnGray" onclick="fnFileDelete(); return false;">삭제</a>'
					$('#fileShow').show();
					$('#scheduleFile').parent().find('label').hide();
					$('#scheduleFile').hide();
					$('#UploadFileView').show();
					$('#UploadFileView').html(fHtml);
				}
				if (fnEmpty(_c_logSign, '') != '') { // 결재자일 경우
					$('#btnDelete').show();
					if (approve_STS == 2) { // 승인
						$("#selSchdule").prop("disabled", true);
						$('#btnApproveCancel').show();
					} else if (approve_STS == 9) { // 취소
						$("#selSchdule").prop("disabled", true);
						$('#btnApprove').show();
					} else { // 신청
						$('#btnApproveCancel').show();
						$('#btnApprove').show();
					}
				}
				(approve_STS == 1) ? $('#btnSave').show() : $('#btnSave').hide();
				(approve_STS == 1) ? $('#btnDelFile1').show() : $('#btnDelFile1').hide();
				$('.vacationShow').show();
				$('#btnUser').hide();
			} else if (schedule_TP == 26|| schedule_TP == 33) { // 공휴일, 휴무, 기타시
				$('#userTr').hide();
				$('#btnDelete').show();
			} else { // 휴가 외
				if (fnEmpty(_c_logSign, '') != '') { // 결재자일 경우
					$('#btnSave').show();
					$('#btnDelete').show();
				} else {
					$('#btnSave').hide();
				}
				$('.vacationShow').hide();
				$('#btnUser').show();
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
	fnOpenPopUp(); // 팝업띄우기
}

// 사내일정 등록/수정
function fnScheduletcInput(appSts) {
	let sUser = $("#ToName").text()
		, stp = parseInt($("#selSchdule").val());

	if (!fnAlertReturn('selSchdule', '일정구분', 'select')) return false;
	if (!fnAlertReturn('txtTitle', '제목', '')) return false;
	if (stp != 26 && stp != 33) {
		if (sUser == '' || sUser == null) { alert("선택된 대상자가 없습니다."); return false; }
	}
	if (fnEmpty(_fileName, '') == '' && stp == 34) { alert("업로드된 파일이 없습니다."); return false; }
	if (!fnAlertReturn('txtSDate', '시작일', '')) return false;
	if (!fnAlertReturn('txtEDate', '종료일', '')) return false;
	if (!fnAlertReturn('txtConts', '내역', '')) return false;

	// 연차,반차,반반차 외 등록 시 승인처리
	if (!_schedule_Arr.includes(stp)) { appSts = 2; }
	let paramMap = {
		sidx: parseInt($("#txtTitle").attr('data-sidx')),
		stp: stp,
		subj: $("#txtTitle").val(),
		conts: $("#txtConts").val(),
		sdate: $('#txtSDate').val(),
		stime: $('#txtSTime').val(),
		edate: $('#txtEDate').val(),
		etime: $('#txtETime').val(),
		ampm: parseInt($('#selectTimeType').val()),
		asts: appSts,
		suidx: $('#schIdx').val(),// 일정관리에서는 대상자 , 받아서
		ridx: _c_logIdx
	}
	const jsonData = JSON.stringify(paramMap);
	/**/
	$.ajax({
		type: 'POST',
		url: '/schedule/input',
		data: jsonData,
		async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			//console.log(res);
			let selSchdule = $("#selSchdule option:checked").text();
			if (res == 0) {

				if (appSts == 1) { //휴가신청
					if (stp == 34 && _clsDelFile == 'Y') { // 기타휴가시 파일 삭제
						fnScheduleFileDelete();
					}
					if (stp == 34 && _fileName != '') { // 기타휴가시 파일 등록
						fnScheduleFileInput();
					}

				} else if (appSts == 2 && (_schedule_Arr.includes(stp))) {
				}
				alert('처리 되었습니다.');
				fnMySchedule();
				fnSchList();
				fnScheduleClose();

			} else if (res == 4) {
				alert('해당 기간에 이미 등록된 대상이 있습니다.');
				fnLoadingClose();
			} else {
				alert('실패!');
				fnLoadingClose();
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

}

// 사내일정 파일 등록/수정
function fnScheduleFileInput() {
	let paramMap = {
		sidx: parseInt($("#txtTitle").attr('data-sidx')),
		fidx: 0,
		ftp: 1,
		fpath: _fileUrl,
		fnm: _fileName,
		rfnm: _fileRName,
		fsize: _fileSize,
		ridx: _c_logIdx
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	/**/
	$.ajax({
		type: 'POST',
		url: '/schedule/fileInput',
		data: jsonData,
		async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			//fnLoadingOpen();
		},
		success: function(res) {
			//console.log(res);
			if (res != 0) {
				alert('실패!');
				fnLoadingClose();
			}

		},
		error: function(jqXHR, textStatus, errorThrown) {
			fnLoadingClose();
			alert('실패');
		}
	});
	/**/
}

// 사내일정 파일 삭제
function fnScheduleFileDelete() {
	let paramMap = {
		deltp: 1,
		sidx: parseInt($("#txtTitle").attr('data-sidx')),
		fidx: 0,
		didx: _c_logIdx
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	/**/
	$.ajax({
		type: 'POST',
		url: '/schedule/fileDelete',
		data: jsonData,
		async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			//fnLoadingOpen();
		},
		success: function(res) {
			//console.log(res);
			if (res != 0) {
				alert('파일 삭제 실패');
				fnLoadingClose();
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			fnLoadingClose();
			alert('실패');
		}
	});
	/**/
}
// 참석자 등록/수정
function fnAttendeesInput() {

	let hdAIdx = [], hdCompany = [], hdPersons = [], toName = []
		, perNm = '';
	toName = $('#ToName').text().split(',');
	perNm = (toName.length > 1 ? toName[0] + ' 외 ' + (toName.length - 1) + '명' : toName[0]);
	hdAIdx.push(0);
	hdCompany.push('');
	hdPersons.push(perNm);
	//console.log(hdPersons)
	/**/
	$.ajax({
		type: 'POST',
		traditional: true,
		url: '/meeting/attendeesInput',
		data: { "hdAIdx": hdAIdx, "hdCompany": hdCompany, "hdPersons": hdPersons, ridx: _c_logIdx },
		//async: false,
		//contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
		},
		success: function(res) {
			const midx = res
			fnLoadingClose();
			location.href = '/report/03/write?midx=' + midx;
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

// 개인 일정 삭제
function fnScheduleDelete() {
	if (confirm('삭제 하시겠습니까?')) {
		let paramMap = {
			deltp: 1,
			suidx: $('#schIdx').val(),
			sidx: parseInt($("#txtTitle").attr('data-sidx')),
			didx: _c_logIdx
		}
		const jsonData = JSON.stringify(paramMap);
		//console.log(jsonData);
		$.ajax({
			type: 'POST',
			url: '/schedule/delete',
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
					fnMySchedule();
					fnScheduleClose();
					fnSchList();
				} else {
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
	}
}

// 근무시간 및 근태 불러오기
function fnMySchedule() {
	let year = _today.substr(0, 4);
	let paramMap = {
		uidx: _c_logIdx,
		yyyy: parseInt(year),
		sweek: $('.fc-today').siblings('.fc-sun').attr('data-date'),
		eweek: $('.fc-today').siblings('.fc-sat').attr('data-date'),
		syear: year + '-01-01',
		eyear: year + '-12-31',
	}
	const jsonData = JSON.stringify(paramMap);
	console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/schedule/mySchedule',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			//fnLoadingOpen();
		},
		success: function(res) {
			const items = res;
			console.log(res);
			let vacation = nomal_CNT = halfday = 0;

			vacation = items.vacation;
			nomal_CNT = items.nomal_CNT;
			halfday = items.halfday;
			$('#yearLeave').text(nomal_CNT - vacation - (halfday * 0.5));
			$('#yearVacation').text(nomal_CNT);
			$('#yearUse').text(vacation + (halfday * 0.5));
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

// 일정구분 선택시
function fnSelSchTp() {
	const objSel = $('#selSchdule')
		, schedule_TP = $('#selSchdule').val()
		, txtSel = objSel.children('option:selected').text();

	$('#txtTitle').val(txtSel);
	if (schedule_TP == 27 || schedule_TP == 29 || schedule_TP == 34) {
		$('.vacationShow, #userTr').show();
		$('#txtSchedule_TP').closest('tr').hide();
		$('#btnUser').hide();

		$('#ToName').text(_c_logNm);
		$('#schIdx').val(_c_logIdx);

		if (schedule_TP == 34) {//기타휴가시 파일 첨부
			$('#fileShow').show();
		}

	} else if (schedule_TP == 26|| schedule_TP == 33) { // 공휴일, 휴무, 기타시
		$('#schIdx').val(_c_logIdx);
		$('#userTr, #btnApprove, #btnApproveCancel').hide();
	} else {
		$('.vacationShow, #btnApprove, #btnApproveCancel').hide();
		$('#btnUser, #userTr').show();

		$('#ToName').text('');
		$('#schIdx').val('');
	}
}

//선택 팝업창 
function fnCheckListPopUp() {
	if ($('#selSchdule').val() == 0) {
		alert('일정구분을(를) 선택해 주세요.');
		return false;
	}
	// 대상 선택 창 클릭 시 해제 후 본인 선택
	$('[name="userSelect"], [name="userSelect2"]').prop('checked', false);
	$('.mySelect').prop('checked', true);
	fnLayerPopupView('CheckList');
	return false;
}
//선택 팝업창 
function fnOpenPopUp() {
	fnLayerPopupView('scheduleInputView');
	return false;
}

// 개인 일정 등록 닫기
function fnScheduleClose() {
	fnLayerPopupClose('scheduleInputView');
	fnrScheduleReset();
}

// 파일 삭제
function fnFileDelete() {
	_fileName = '';
	_fileUrl = '';
	_fileSize = 0; // KB
	_clsDelFile = 'Y';
	$('#scheduleFile').parent().find('label').show();
	$('#scheduleFile').val('').show();
	$('#UploadFileView').html('<span class="colBlue">※ 파일이 여러개일 경우 압축파일로 첨부</span>');
}

// 개인 일정 등록/수정 취소
function fnrScheduleReset() {
	const objView = $('#scheduleInputView').find('.tableView');

	objView.find('input[type=text], textarea').val('');

	$('#txtSDate, #txtEDate').val(_today);
	$('#selSchdule').val(0);
	$('#selectTimeType').val(1);
	$('#txtSTime').val('09:00');
	$('#txtETime').val('17:59');
	$('#ToName').text('');
	$('#schIdx').val('');
	$('#txtTitle').attr('data-sidx', 0);
	$('#btnSave').text('등록').show();
	$('#txtSchedule_TP').text('-');

	$('#btnUser, #userTr').show();
	$('#btnDelete, #btnApprove, #btnApproveCancel, #fileShow, .vacationShow').hide();
	$("#selSchdule").prop("disabled", false);
	fnFileDelete();
}

//선택 체크 All
function fnCheckAll() {
	let boolcheck = false
		, schedule_TP = $('#selSchdule').val();;

	if ($('[name=userSelect2]')[0].checked == true) boolcheck = true;
	$('[name="userSelect"]').prop('checked', boolcheck);
}

// 오전/ 오후 선택시 변경
function fnSelectType() {
	const timeTp = $('#selectTimeType').val();

	$('#txtSTime').val('14:00');

	if (timeTp == 1) {
		$('#txtSTime').val('09:00');
		$('#txtETime').val('17:59');
	} else if (timeTp == 2) {
		$('#txtSTime').val('09:00');
		$('#txtETime').val('12:59');
	} else if (timeTp == 3) {
		$('#txtSTime').val('14:00');
		$('#txtETime').val('17:59');
	}
};
