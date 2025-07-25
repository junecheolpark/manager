_today = new Date();

$(function(){
	$("#leftTopRpt04").show();
	
	let month = _today.getMonth() + 1 < 10 ? '0' + (_today.getMonth() + 1) : _today.getMonth() + 1;
	fnDdlYear(_today.getFullYear());
	// 주간 불러오기
	$('#selMonth').val(month).prop("selected", true);
	fnDdlWeek(_today.toISOString());

	
})

//년 불러오기
function fnDdlYear(yyyy) {
	let sList = "";
	for (let i = yyyy + 1; 2025 <= i; i--) {
		sList += "    <option value=\"" + i + "\" " + (yyyy == i ? "selected" : "") + ">" + i + "년</option>";
	}
	$('#selYear').html(sList);
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