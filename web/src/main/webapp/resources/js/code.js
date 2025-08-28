// 휴가 사용률
function fnVacationUsageRate(pVal) {
	/*
		0 ~ 30 빨강
		30 ~ 60 파랑
		60 ~ 90 초록
		90 ~ 100 검정
		*/
	let ret = "";

	if (pVal < 30) {
		ret = "colRed";
	} else if (pVal < 60) {
		ret = "colBlue";
	} else if (pVal < 90) {
		ret = "colGreen2";
	} else {
		ret = "";
	}

	return ret;
}

// 일정관리 색상
function fnScheduleTp(pVal) {
	/*
	26	"공휴일"
	27	"연차"
	29	"반차"
	33	"기타"
	*/
	let ret = "";

	if (pVal == 29) {
		ret = "colGreen";
	} else if (pVal == 26) {
		ret = "colRed";
	} else {
		ret = "colBlack";
	}

	return ret;
}
