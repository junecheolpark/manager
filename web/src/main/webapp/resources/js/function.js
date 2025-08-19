$(function () {
	//페이지에 있는 모든 <input> 요소를 선택시 텍스트 전체 선택
	$('input').focusin(function() {
		$(this).select();
	});
});

// 필수 항목 입력 체크
//pChk가 num일경우 숫자입력까지 체크
function fnAlertReturn(pVal, pTxt, pChk) {
	var sId = document.getElementById(pVal);

	if (pChk == 'select') {
		if (sId.value.replace(/\s/g, '') == '' || sId.value == '0') {
			alert(pTxt + '을(를) 선택해 주세요.');
			return false;
		}
	} else {
		if (sId.value.replace(/\s/g, '') == '') {
			alert(pTxt + '을(를) 입력해 주세요.');
			if (sId.disabled == false) {
				sId.focus();
			}
			return false;
		}

		if (pChk == 'num') {
			if (!onlyNumeric(sId.value.replace(/\./g, '').replace(/\,/g, ''))) {
				alert(pTxt + '은(는) 숫자만 입력해 주세요.');
				if (sId.disabled == false) {
					sId.focus();
				}
				return false;
			}
		}
	}
	return true;
}

// 로딩중 팝업 열기
function fnLoadingOpen() {
	if ($('.loading-layer').css('display') == 'none') $('.loading-layer').show();
	return false;
}

// 로딩중 팝업 닫기
function fnLoadingClose() {
	$('.loading-layer').fadeOut();
	return false;
}

// 값이 0이나 공백일경우 - 반환
function fnBlank(pVal, pReverse) {
	pVal = $.trim(pVal);

	if (pReverse == false) {
		if (pVal == null || pVal == '' || pVal == '0') pVal = '-';
	} else {
		if (pVal == '-') pVal = '';
	}

	return pVal;
}

// pVal 값이 null이거나 공백일경우 pView 반환
// 함수, 값이 비었을 때 대체 텍스트를 출력하고 싶을 때 사용
function fnEmpty(pVal, pView) {
	let txt = $.trim(pVal);

	if (txt == 'null' ||txt == null || txt == ''|| txt == 0) txt = pView;

	return txt;
}

// 넘어온 값이 빈값인지 체크합니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해
// 명시적으로 value == 사용
// [], {} 도 빈값으로 처리
// 함수, 어떤 값이 "비어 있음"인지 여부를 조건문에 사용하기 좋음.
var isEmpty = function(value) {
	if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
		return true
	} else {
		return false
	}
};

// 1000단위 콤마(,) 찍기 = 1,000
function commify(n) {

	var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	n += '';                          // 숫자를 문자열로 변환

	while (reg.test(n))
		n = n.replace(reg, '$1' + ',' + '$2');

	return n;
}

// 날짜 사이 일수 계산
function dateDiff(strDate1, strDate2) {
	datDate1 = new Date(strDate1);
	datDate2 = new Date(strDate2);
	return ((datDate1 - datDate2) / (24 * 60 * 60 * 1000));
}

// 디데이 계산
function dDayCalcul(strDate1, strDate2) {
	datDate1 = new Date(strDate1);
	datDate2 = new Date(strDate2);

	const timeDiff = datDate1.getTime() - datDate2.getTime();
	const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

	return dayDiff
}

// 페이지 뒤로가기
function fnPageBack() {
	history.go(-1);
}

// 파일 용량 단위
function fnFileSize(pFileSize) {
	let fs = '';

	if (pFileSize >= 1024) {
		if (((pFileSize / 1024) / 1024) >= 1024) {
			fs = (((pFileSize / 1024) / 1024) / 1024).toFixed(2) + ' GB';
		} else if ((pFileSize / 1024) >= 1024) {
			fs = ((pFileSize / 1024) / 1024).toFixed(2) + ' MB';
		} else {
			fs = (pFileSize / 1024).toFixed(2) + ' KB';
		}
	} else {
		fs = pFileSize.toFixed(2) + ' Byte';
	}

	fs = fs.replace('.00', '');

	return fs;
}

// 삭제처리중 메시지 보여주기
function fnDeleteMsg(pType) {
	if (pType == 1) {
		if (!confirm('삭제할 경우 데이터가 모두 삭제되며\n\n복구가 불가능합니다.\n\n삭제 하시겠습니까?')) return false;
	} else if (pType == 2) {
		if (!confirm('삭제할 경우 데이터 및 첨부파일이 모두 삭제되며\n\n복구가 불가능합니다.\n\n삭제 하시겠습니까?')) return false;
	} else if (pType == 3) {
		if (!confirm('삭제 하시겠습니까?')) return false;
	}

	return true;
}

// 레이어 팝업 보기
function fnLayerPopupView(el) {
	var $el = $('#' + el); // 레이어 id

	$el.fadeIn();

	var contsHeight = $el.find('.autoSizeLayer').height(),
		$elHeight = ~~($el.outerHeight()),
		docHeight = $(document).height(),
		winHeight = $(window).height(),
		margin = 0;

	margin = (($elHeight - contsHeight) / 2);
	margin = (margin < 50 ? 50 : margin);

	// 레이어에 대한 스크롤
	$('body').css('overflow', 'hidden');
	$el.find('.autoSizeLayerBg').css('overflow-y', 'auto');

	// 화면의 중앙에 레이어를 띄운다.
	$el.find('.autoSizeLayer').css({ 'margin': margin + 'px auto' });
	$el.find('.autoSizeLayer').draggable({ handle: 'h4' });

	//// 스크롤 이벤트
	//$(window).scroll(function () {
	//});

	//// 화면 크기 변경 이벤트
	//$(window).resize(function () {
	//});

	// 닫기 버튼 클릭 이벤트
	$el.find('.btn-layerClose').unbind().bind('click', function() {
		$el.fadeOut();
		$('body').css('overflow', 'auto');
		$el.find('.autoSizeLayerBg').css('overflow-y', 'hidden');
		return false;
	});

	//// 레이어 배경 클릭 이벤트
	//if (bgClose) {
	//    $('.autoSizeLayerBg, .autoSizeLayer').unbind().bind('click', function () {
	//        if ($(this).attr('class').indexOf('autoSizeLayerBg') > -1) {
	//            $el.fadeOut();
	//            $('body').css('overflow', 'auto');
	//            $el.find('.autoSizeLayerBg').css('overflow-y', 'hidden');
	//        }
	//        return false;
	//    });
	//}
}

// 레이어 팝업 닫기
function fnLayerPopupClose(el) {
	var $el = $('#' + el); // 레이어 id
	$el.fadeOut();
	$('body').css('overflow', 'auto');
	$el.find('.autoSizeLayerBg').css('overflow-y', 'hidden');
	return false;
}

// timestamp 생성
function getTimeStampCustom(pType) {
	var d = new Date();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	var msecond = d.getMilliseconds();

	month = (month < 10 ? '0' : '') + month;
	date = (date < 10 ? '0' : '') + date;
	hour = (hour < 10 ? '0' : '') + hour;
	minute = (minute < 10 ? '0' : '') + minute;
	second = (second < 10 ? '0' : '') + second;
	if (msecond < 100) msecond = '0' + msecond;
	else if (msecond < 10) msecond = '00' + msecond;

	var s = pType + '' + d.getFullYear() + '' + month + '' + date + '' + hour + '' + minute + '' + second + '' + msecond;

	return s;
}

//*************************************//
// 날짜 및 시간
function datetimeView(viewType) {
	var now = new Date();
	var sResult = null;
	var yyyy = null;
	var MM = null;
	var dd = null;
	var HH = null;
	var mm = null;
	var ss = null;

	yyyy = now.getFullYear();
	MM = now.getMonth() + 1;
	dd = now.getDate();
	HH = now.getHours();
	mm = now.getMinutes();
	ss = now.getSeconds();

	MM = (MM > 9 ? MM : '0' + MM);
	dd = (dd > 9 ? dd : '0' + dd);
	HH = (HH > 9 ? HH : '0' + HH);
	mm = (mm > 9 ? mm : '0' + mm);
	ss = (ss > 9 ? ss : '0' + ss);

	if (viewType == 'date') {
		sResult = yyyy + '-' + MM + '-' + dd;
	} else if (viewType == 'time') {
		sResult = HH + ':' + mm + ':' + ss;
	} else if (viewType == 'smalltime') {
		sResult = HH + ':' + mm;
	} else if (viewType == 'yyyy') {
		sResult = yyyy;
	} else if (viewType == 'mm') {
		sResult = MM;
	} else if (viewType == 'dd') {
		sResult = dd;
	} else {
		sResult = yyyy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss;
	}

	return sResult;
}

//*************************************//
// 날짜 계산 후 리턴
var dateUtil = function() {
	this.startObject = null;
	this.endObject = null;
	this.args = null;
	this.startDate = null;
}

dateUtil.prototype.formatLen = function(str) {
	return str = ("" + str).length < 2 ? "0" + str : str;
}

dateUtil.prototype.formatDate = function(dateObject, delimiter) {
	delimiter = delimiter || "-";
	return dateObject.getFullYear() + delimiter + this.formatLen(dateObject.getMonth() + 1) + delimiter + this.formatLen(dateObject.getDate());
}

dateUtil.prototype.toDay = function(delimiter) {
	return this.formatDate(new Date(this.startDate.split('-')[0], this.startDate.split('-')[1] - 1, this.startDate.split('-')[2]), "-");
}

dateUtil.prototype.calDate = function() {
	var year = this.args.year == null ? 0 : Number(this.args.year);
	var month = this.args.month == null ? 0 : Number(this.args.month);
	var day = this.args.day == null ? 0 : Number(this.args.day);
	var result = new Date(this.startDate.split('-')[0], this.startDate.split('-')[1] - 1, this.startDate.split('-')[2]);

	result.setYear(result.getFullYear() + year);
	result.setMonth(result.getMonth() + month);
	result.setDate(result.getDate() + day);
	return this.formatDate(result, "-");
}

dateUtil.prototype.setDate = function(startObject, endObject, args, startDate) {
	this.startObject = startObject;
	this.endObject = endObject;
	this.args = args;
	this.startDate = startDate;

	document.getElementById(this.startObject).value = this.toDay();
	document.getElementById(this.endObject).value = this.calDate();
}

dateUtil.prototype.formatTime = function(dateObject, delimiter) {
	delimiter = delimiter || ":";
	return this.formatLen(dateObject.getHours()) + delimiter + this.formatLen(dateObject.getMinutes());
}

dateUtil.prototype.setAddDate = function(dateObject, add) {
	var _date = new Date(dateObject);

	_date.setDate(_date.getDate() + add); // 날짜 +,-

	var yyyy = _date.getFullYear();
	var MM = _date.getMonth() + 1;
	var dd = _date.getDate();

	if (MM < 10) MM = '0' + MM;
	if (dd < 10) dd = '0' + dd;

	returnDate = yyyy + '-' + MM + '-' + dd;

	return returnDate;//this.formatDate(returnDate, "-");
}

dateUtil.prototype.setAddYear = function(dateObject, delimiter) {
	var result = new Date(dateObject);

	result.setYear(result.getFullYear() + delimiter);
	result.setMonth(result.getMonth());
	result.setDate(result.getDate());
	return this.formatDate(result, "-");
};

dateUtil.prototype.nowDate = function() {
	var result = new Date();

	result.setYear(result.getFullYear());
	result.setMonth(result.getMonth());
	result.setDate(result.getDate());
	return this.formatDate(result, "-");
};

var dateUtilObj = new dateUtil();
//*************************************//

//*************************************//

// 년도 설정
// obj : 셀렉트박스 id
// stYear : 시작 년도
// addYear : 현재 년도 기준 + addYear
// blBlank : 선택 option 추가함/추가 안함 (true, false)
// txt : 년도 숫자 뒤에 붙일 텍스트
// fnSelYear(obj, stYear, addYear, blBlank, txt)
function fnSelYear(obj, stYear, addYear, blBlank, txt) {
	var htmlOption = '';
	var date = new Date();
	var year = date.getFullYear();

	if (blBlank) htmlOption = '<option value="0">선택</option>';

	for (var i = stYear; (year + addYear) >= i; i++) {
		htmlOption += '<option value="' + i + '">' + i + txt + '</option>';
	}

	$(obj).html(htmlOption);
	$(obj).val(year);
}

///////////////////////////////////////////////////////////////////////////
// checkbox 체크여부 확인
// ex) fnCheckboxCheck(pRadioName, pMsg)
///////////////////////////////////////////////////////////////////////////
function fnCheckboxCheck(pCheckboxName, pMsg) {
	if ($('input[name=' + pCheckboxName + ']:checkbox:checked').length == 0) {
		alert(pMsg + '을(를) 선택해 주세요.');
		return false;
	} else {
		return true;
	}
}
