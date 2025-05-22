<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head 파일 -->
</head>
<body>

    <!--// loading -->
    <section class="loading-layer">
	    <div class="loadingBg"></div>
	    <div class="loadingImg"><img src="/resources/images/loading.png" alt="로딩중..." /></div>
    </section>
    <!-- loading //-->

	<section class="loginCont">
	    <section class="loginBG">
	        <!-- <p>어디에도<br /><span class="ftBold colPoint">존재하지 않는<br /> 시스템</span>을 만들다 </p> -->
	    </section>
	    <section id="login">
	        <section>
	            <img src="/resources/images/login/logo.png" alt="junecheol">
	            <p>LOGIN</p>
	            <input class="mgB20" name="txtID" type="text" maxlength="100" id="txtID" placeholder="아이디를 입력해주세요." value="">
	            <input class="mgB20" name="txtPW" type="password" maxlength="100" id="txtPW" placeholder="비밀번호를 입력해주세요." value="">
	            <div class="pdTB20">
	                <!-- <input name="chkIdSave" type="checkbox" id="chkIdSave">
	                <label for="chkIdSave"></label> -->
		            <input type="checkbox" id="chkAutoLogin" placeholder="자동 로그인을 원할 경우 체크해 주세요.">
		            <label for="chkAutoLogin"></label>	                
	            </div>
	            <a href="#login" id="btnLogin" class="loginBtn">로그인</a>
	        </section>
	    </section>
	</section>

</body>
</html>