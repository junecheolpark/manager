$(function() {
	// 로그인
	$('body').keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			$('#btnLogin').click();
		}
	});
	
	// 버튼 클릭
	$('#btnLogin').click(function() { // , #btnGoogleLogin
		fnIdLogin();
	
		return false;
	});
		
});

// 아이디 로그인
function fnIdLogin() {
	if (!fnAlertReturn('txtID', '아이디', '')) return false;
	if (!fnAlertReturn('txtPW', '비밀번호', '')) return false;

	const paramMap = {
		ltp: 1,
		id: $('#txtID').val(),
		pw: $('#txtPW').val(),
		at_login: $('#chkAutoLogin').is(':checked')
	}
	const jsonData = JSON.stringify(paramMap);
	
	$.ajax({
			type: 'POST',
			url: '/login/login',
			data: jsonData,
			//async: false,		        
			contentType: 'application/json; charset=UTF-8',
			dataType: 'json', // dataType is json format
			beforeSend: function() {
				fnLoadingOpen();
			},
			success: function(res) {
				console.log(res);
				let redirectUrl = '';
				if (res == 0) {
					redirectUrl = '/index';
				} else if (res == 3) {
					redirectUrl = '/index';
					//alert('아이디 또는 비빌번호를 확인해 주세요.');
				} else if (res == 5) {
					alert('비밀번호 입력 오류 횟수를 초과 하였습니다.\n\n[비밀번호 찾기]에서 임시비밀번호를 발급 받아서 로그인해 주시기 바랍니다.');
				} else if (res == 6) {
					alert('로그인 후 비빌번호를 변경해 주세요.');
					redirectUrl = '/main';
				} else {
					alert('로그인 실패');
					redirectUrl = '/';
				}

				if (redirectUrl.length > 0) location.href = redirectUrl;

				fnLoadingClose();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				fnLoadingClose();
				//console.log("ERROR : " + textStatus + " : " + errorThrown);
				alert('로그인 실패');
				//console.log(jqXHR.responseText);
			}
		});
	
}