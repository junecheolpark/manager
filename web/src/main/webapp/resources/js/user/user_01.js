let _pageSize = 11, _curPage = 1;

$(function() {
	fnCodeSelList([1, 10, '', '선택', 0, true, 0], $('#selPosi'));
	fnCodeSelList([1, 14, '', '선택', 0, true, 0], $('#selDept'));
	fnCodeSelList([1, 16, '', '상태', 0, true, 0], $('#selSchUserSts'));
	fnCodeSelList([1, 16, '', '선택', 0, true, 0], $('#selUserSts'));
	fnCodeSelList([1, 30, '', '구분', 0, true, 0], $('#selSchUserTp'));
	fnCodeSelList([1, 30, '', '선택', 0, true, 0], $('#selUserTp'));
	
	fnSortListView();

	// 검색창 엔터키
	$('.schBox').children('input, select').keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			_curPage = 1;
			fnSortListView();
		}
	});

	// 검색
	$('#btnSch').on('click', function() {
		_curPage = 1;
		fnSortListView();
		return false;
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
		usertp: parseInt($('#selSchUserTp').val()),
		usersts: parseInt($('#selSchUserSts').val()),
		admintp: parseInt($('#selSchAdTp').val()),
		cidx: 0,
		cnm: $('#txtSchCom').val(),
		datetp: 0,
		sdate: '',
		edate: '',
		schsel: parseInt($('#selSch').val()),
		schtxt: $('#txtSch').val(),
		orderby: 0,
		desc: 0
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/user/listTotal',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			const total = res;
			console.log(total);
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
			let sHtml = user_ID = nm = dept_NM = posi_NM = phone = mobile = email = zipcode = addr = addr_DETAIL = join_DATE = company_NM = admin_NM = user_STS_NM = ''
				, user_IDX = company_IDX = user_STS = 0;

			if (items.length == 0) {
				sHtml += '<tr>';
				sHtml += '  <td colspan="6" class="noData">검색된 사용자가 없습니다.</td>';
				sHtml += '</tr>';

				$('#pagingView').hide();

				objList.html(sHtml);
			} else {
				$.each(items, function(i, val) {
					user_IDX = val.user_IDX;
					user_ID = val.user_ID;
					nm = val.nm;
					dept_NM = val.dept_NM;
					posi_NM = val.posi_NM;
					phone = val.phone;
					mobile = val.mobile;
					email = val.email;
					zipcode = val.zipcode;
					addr = val.addr;
					addr_DETAIL = val.addr_DETAIL;
					join_DATE = val.join_DATE;
					company_IDX = val.company_IDX;
					company_NM = val.company_NM;
					admin_NM = val.admin_NM;
					user_STS = val.user_STS;
					user_STS_NM = val.user_STS_NM;

					company_IDX = (company_IDX == '' ? 0 : company_IDX);
					mobile = (mobile == '' ? phone : mobile);

					sHtml += '<tr data-uidx="' + user_IDX + '" data-cidx="' + company_IDX + '">' + '\n';
					sHtml += '	<td><p class="text-ellipsis" title="' + company_NM + '"><span>' + company_NM + '</span></p></td>' + '\n';
					sHtml += '	<td><p class="text-ellipsis" title="' + nm + '"><span>' + nm + '</span></p></td>' + '\n';
					sHtml += '	<td><p class="text-ellipsis" title="' + posi_NM + '"><span>' + fnBlank(posi_NM, false) + '</span></p></td>' + '\n';
					sHtml += '	<td><p class="text-ellipsis" title="' + user_ID + '"><span>' + user_ID + '</span></p></td>' + '\n';
					sHtml += '	<td>' + fnBlank(mobile, false) + '</td>' + '\n';
					//sHtml += '	<td>' + fnBlank(email, false) + '</td>' + '\n';
					sHtml += '	<td class="' + (user_STS == 37 ? 'colRed' : '') + '">' + user_STS_NM + '</td>' + '\n';
					sHtml += '</tr>' + '\n';
				});

				// 페이징
				arrayPageList('pagingView', totalCnt, _pageSize, _curPage);
				$('#pagingView').show();

				objList.html(sHtml);

				// 행 선택 이벤트
				objList.find('td').unbind().bind('click', function() {
					const objThis = $(this)
						, objRow = objThis.parent();

					objList.children('tr').removeClass('selRow');
					objRow.addClass('selRow');

					fnUserView();
				});
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

// 사용자 보기
function fnUserView() {
	const objSel = $('#userList').find('.selRow')
		, uidx = parseInt(objSel.attr('data-uidx'));
	const paramMap = {
		uidx: uidx
	}
	const jsonData = JSON.stringify(paramMap);
	//console.log(jsonData);
	$.ajax({
		type: 'POST',
		url: '/user/view',
		data: jsonData,
		//async: false,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json', // dataType is json format
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			const items = res;
			let user_IDX = admin_TP = company_IDX = dept_IDX = posi_IDX = user_STS = user_TP = 0
				, nm = user_ID = phone = mobile = email = zipcode = addr = addr_DETAIL = admin_NM = birthday = company_NM = join_DATE = ''
				, arrEMail = [];

			user_IDX = items.user_IDX;
			nm = items.nm;
			user_ID = items.user_ID;
			phone = items.phone;
			mobile = items.mobile;
			email = items.email;
			zipcode = items.zipcode;
			addr = items.addr;
			addr_DETAIL = items.addr_DETAIL;
			admin_NM = items.admin_NM;
			admin_TP = items.admin_TP;
			birthday = items.birthday;
			company_IDX = items.company_IDX;
			company_NM = items.company_NM;
			dept_IDX = items.dept_IDX;
			posi_IDX = items.posi_IDX;
			join_DATE = items.join_DATE;
			user_STS = items.user_STS;
			user_TP = items.user_TP;

			company_IDX = (company_IDX == null || company_IDX == '' ? 0 : company_IDX);
			dept_IDX = (dept_IDX == null || dept_IDX == '' ? 0 : dept_IDX);
			posi_IDX = (posi_IDX == null || posi_IDX == '' ? 0 : posi_IDX);
			admin_TP = (admin_TP == null || admin_TP == '' ? 0 : admin_TP);
			email = (email == null || email.length < 5 ? '@' : email);

			arrEMail = email.split('@');

			$('#txtComNm')
				.attr('data-cidx', company_IDX)
				.val(company_NM);
			$('#selDept').val(dept_IDX);
			$('#selPosi').val(posi_IDX);
			$('#txtNm')
				.attr('data-uidx', user_IDX)
				.val(nm);
			$('#selUserTp').val(user_TP);
			$('#txtID').val(user_ID);
			$('#txtPW')
				.val('')
				.attr('placeholder', '비밀번호 변경시 입력');
			$('#txtPhone').val(phone);
			$('#txtMobile').val(mobile);
			$('#txtZipCd').val(zipcode);
			$('#txtAddr').val(addr);
			$('#txtAddrDetail').val(addr_DETAIL);
			$('#txtBDate').val(birthday);
			$('#txtJDate').val(join_DATE);
			$('#txtEmail').val(arrEMail[0]);
			$('#txtEmailDm').val(arrEMail[1]);
			$('#selUserSts').val(user_STS);
			$('#lblAdTpNm')
				.attr('data-atp', admin_TP)
				.text(fnBlank(admin_NM, false));

			$('#pwRequired').hide();

			$('#btnInput').text('수정');
			$('#btnDelete').css('display', 'inline-block');

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