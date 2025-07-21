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
function fnEmpty(pVal, pView) {
	let txt = $.trim(pVal);

	if (txt == 'null' ||txt == null || txt == ''|| txt == 0) txt = pView;

	return txt;
}

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