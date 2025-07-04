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
	
	console.log(jsonData);
}