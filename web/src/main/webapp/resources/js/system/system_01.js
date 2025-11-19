$(function() {
	// 페이지 열리면 대분류를 기본으로 보여준다.
	fnCodeView(1, 0);
});

//버튼 정렬 업데이트
function fnCodeSortUpdate(pNum, obj, type) {
	let trObj = $(obj).closest("tr")
		, maxSort = parseInt($("#CateList" + pNum).find('tr').last().attr('data-sort'))
		, code_sort = code_idx = parent_idx = prevIdx = 0;

	prevIdx = parseInt($("#CateIdx" + (pNum - 1)).val());
	code_sort = parseInt(trObj.attr('data-sort'));
	parent_idx = parseInt($("#CateIdx" + (pNum - 1)).val());
	code_idx = parseInt(trObj.attr('data-idx'));

	if ((type == 1 && code_sort != 1) || (type == 2 && code_sort != maxSort)) {
		// 바꿀 code_idx값 가져오기
		if (type == 1) {
			chsort = parseInt(trObj.prev().attr('data-sort'));
		} else if (type == 2) {
			chsort = parseInt(trObj.next().attr('data-sort'));
		}
		const paramMap = {
			cidx: code_idx,
			pidx: parent_idx,
			chsort: chsort,
			sort: code_sort
		}

		const jsonData = JSON.stringify(paramMap);
		//console.log(jsonData);
		$.ajax({
			type: 'POST',
			url: '/code/sort',
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
					//alert('처리 되었습니다.');
					fnCancel(pNum - 1)
					fnCodeView((pNum), prevIdx);

				} else {
					alert('등록 실패');
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
}



//리스트 뷰
function fnCodeView(pNum, cidx) {
	const paramMap = {
		idx: cidx
	}
	//console.log(jsonData);
	$.ajax({
		type: 'GET',
		url: '/code/list',
		data: paramMap,
		//async: false,		        
		beforeSend: function() {
			fnLoadingOpen();
		},
		success: function(res) {
			let code_IDX = parent_IDX = code_STS = code_SORT = 0
				, sHtml = code_NM = '';
			// 페이지 열리면 대분류를 기본으로 보여준다.
			if (pNum == 1) {
				if (res.length == 0) {
					sHtml += '<tr><td colspan="3" class="colGray2 ftSize12">검색된 내용이 없습니다.</td></tr>';
				} else {
					$.each(res, function(i, val) {
						code_IDX = val.code_IDX;
						code_ID = val.code_ID;
						code_STS = val.code_STS;
						code_NM = val.code_NM;
						code_SORT = val.code_SORT;

						sHtml += '<tr data-idx="' + code_IDX + '" data-sort="' + code_SORT + '"><td>' + code_ID + '</td>';
						sHtml += '<td onclick="fnCodeView(2,' + code_IDX + ');" ><a href="#view">' + code_NM + '</a></td>';
						if (code_STS == 1) {
							sHtml += '<td>사용</td></tr>';
						} else {
							sHtml += '<td>미사용</td></tr>';
						}

					});
				}
				// 분류 선택시
			} else {
				code_IDX = res[0].code_IDX;
				code_ID = res[0].code_ID;
				code_STS = res[0].code_STS;
				code_NM = res[0].code_NM;
				code_SORT = res[0].code_SORT;
				//console.log(code_SORT);
				$("#CateName" + (pNum - 1)).val(code_NM);
				$("#CateIdx" + (pNum - 1)).val(code_IDX);
				$("#CateCode" + (pNum - 1)).val(code_ID);
				$("#CateCode" + (pNum - 1)).attr("readonly", true);
				$("#CateSort" + (pNum - 1)).val(code_SORT);
				$("input[name=CateUse" + (pNum - 1) + "][value='" + code_STS + "']").prop("checked", true);

				if (res.length > 1) {
					for (var i = 1; i < res.length; i++) {
						code_IDX = res[i].code_IDX;
						code_ID = res[i].code_ID;
						parent_IDX = res[i].parent_IDX;
						code_STS = res[i].code_STS;
						code_NM = res[i].code_NM;
						code_SORT = res[i].code_SORT;
						sHtml += '<tr data-idx="' + code_IDX + '" data-sort="' + code_SORT + '"><td>' + code_ID + '</td>';
						sHtml += '<td onclick="fnCodeView(' + (pNum + 1) + ',' + code_IDX + ');"><a href="#view" >' + code_NM + '</a></td>';
						if (code_STS == 1) {
							sHtml += '<td>사용</td>';
						} else {
							sHtml += '<td>미사용</td>';
						}
						sHtml += '<td><a href="#" onclick="fnCodeSortUpdate(' + pNum + ',this, 1); return false;">';
						sHtml += '<img src="/resources/images/icon/ic_arrow_u.gif" alt="▲"></a><br>';
						sHtml += '<a href="#" onclick="fnCodeSortUpdate(' + pNum + ', this,2); return false;">';
						sHtml += '<img src="/resources/images/icon/ic_arrow_d.gif" alt="▼"></a></td></tr>';
					}
				} else {
					sHtml += '<tr><td colspan="4" class="colGray2 ftSize12">검색된 내용이 없습니다.</td></tr>';
				}
				fnCancel(pNum)
				$("#btnSave" + (pNum - 1)).text("수정");
			}

			$("#CateList" + pNum).children("tbody").html(sHtml);
			fnLoadingClose();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			//error: function(res) {
			// loading.. progressbar 종료
			console.log("ERROR : " + textStatus + " : " + errorThrown);
			alert('실패');
			//console.log(res.responseText);
		}
	});
}

// 분류 저장
function fnCodeInput(pNum) {
	let code_IDX = parent_IDX = code_SORT = 0
		, code_ID, sHtml = '';

	if (!fnAlertReturn('CateName'+ pNum , '코드명', '')) return false;
	if (!fnAlertReturn('CateCode'+ pNum , '코드', '')) return false;

	code_ID = $("#CateCode" + pNum).val();

	// 대분류가 아니라면
	if (pNum != 1) {
		parent_IDX = parseInt($("#CateIdx" + (pNum - 1)).val());
	}
	// idx != '' = 수정이라면
	if ($("#CateIdx" + pNum).val() != '') {
		code_IDX = parseInt($("#CateIdx" + pNum).val());
	} else {
		// 대분류가 아니라면
		if (pNum != 1) {
			code_ID = $("#CateCode" + (pNum - 1)).val() + code_ID;
		}
	}

	//마지막 sort
	code_SORT = parseInt($("#CateList" + pNum).find('tr').last().attr('data-sort')) + 1;
	if (isNaN(code_SORT)) {
		code_SORT = 1;
	}

	const paramMap = {
		cidx: code_IDX,
		pidx: parent_IDX,
		cid: code_ID,
		cnm: $("#CateName" + pNum).val(),
		cdep: pNum,
		csts: parseInt($("input[name=CateUse" + pNum + "]:checked").val()),
		csor: code_SORT,
		ridx: 10
	}
	//console.log(paramMap);
	if (paramMap.code_NM == '') {
		alert("코드명을 입력해주세요");
		return false;
	}
	const jsonData = JSON.stringify(paramMap);
	$.ajax({
		type: 'POST',
		url: '/code/input',
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
				fnCancel(pNum)
				fnCodeView((pNum), parent_IDX);

			} else if (res == 4) {
				alert('중복된 코드명이 있습니다.');

			} else {
				alert('등록 실패');
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


// 취소
function fnCancel(pNum) {
	for (var i = 3; i >= pNum; i--) {
		if (pNum == 1) {
			let sHtml = '<tr><td colspan="4" class="colGray2 ftSize12">대분류를 선택해 주세요.</td></tr>';
			$("#CateList2").children("tbody").html(sHtml);
		}
		if (pNum == 1 || pNum == 2) {
			let sHtml = '<tr><td colspan="4" class="colGray2 ftSize12">중분류를 선택해 주세요.</td></tr>';
			$("#CateList3").children("tbody").html(sHtml);
		}
		$("input[name=CateUse" + i + "][value='" + 1 + "']").prop("checked", true);
		$("#CateName" + i).val("");
		$("#CateIdx" + i).val("");
		$("#CateCode" + i).val("");
		$("#CateCode" + i).removeAttr("readonly")
		$("#CateSort" + i).val("");
		$("#btnSave" + i).html("추가");

	}
}


