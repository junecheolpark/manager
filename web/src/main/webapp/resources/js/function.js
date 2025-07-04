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