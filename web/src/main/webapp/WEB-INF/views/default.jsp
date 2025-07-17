<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/include/common.jsp" %>
	<!-- head íì¼ -->
	<link href="/resources/css/default.css?ver=20250525103500000" rel="stylesheet">
	<script src="/resources/js/default.js?ver=20250624103500000"></script>
</head>
<body>
    <!--// loading -->
    <section class="loading-layer">
	    <div class="loadingBg"></div>
	    <div class="loadingImg"><img src="/resources/images/loading.png" alt="ë¡ë©ì¤..." /></div>
    </section>
    <!-- loading //-->

	<section class="loginCont">
	    <section class="loginBG">
			<p>아이디어를<br /><span class="ftBold colPoint">구체화하는 힘,<br /> 박준철</span>입니다. </p>
	    </section>
	    <section id="login">
	        <section>
	            <img src="/resources/images/login/logo.png" alt="junecheol">
	            <p>LOGIN</p>
	            <input class="mgB20" name="txtID" type="text" maxlength="100" id="txtID" placeholder="아이디를 입력해 주세요." value="">
	            <input class="mgB20" name="txtPW" type="password" maxlength="100" id="txtPW" placeholder="비밀번호를 입력해 주세요." value="">
	            <!-- <div class="pdTB20">
		            <input type="checkbox" id="chkAutoLogin" placeholder="자동로그인">
		            <label for="chkAutoLogin"></label>	                
	            </div> -->
	            <a href="#login" id="btnLogin" class="loginBtn" >로그인</a>
	            <!-- <a href="#login" id="btnLogin" class="loginBtn">ë¡ê·¸ì¸</a> -->
	        </section>
	    </section>
	</section>

</body>
</html>
