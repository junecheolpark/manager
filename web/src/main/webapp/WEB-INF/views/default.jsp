<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<title>준철 포트폴리오</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="google" content="notranslate">
    <link href="/resources/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link href="/manifest.webmanifest" rel="manifest">
    <!-- js -->
    <script src="/resources/js/html5/html5shiv.js"></script>
    <script src="/resources/js/html5/placeholders.min.js"></script>
    <script src="/resources/js/jquery/jquery-1.11.0.min.js"></script>
    <script src="/resources/js/jquery/jquery-ui.js"></script>
    <script src="/resources/js/function.js?ver=20250624103500000"></script>
    <!-- css -->
    <link href="/resources/css/common.css?ver=20250624103500000" rel="stylesheet">
    <!-- js -->
    <script src="/resources/js/layout.js?ver=20250624103500000"></script>
    <!-- font-->
    <link href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css" rel="stylesheet">
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
