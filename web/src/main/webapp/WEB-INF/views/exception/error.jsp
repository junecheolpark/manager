<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/_include/common.jsp" %>
	<%@ include file="/WEB-INF/views/_include/html_head.jsp" %>
	<link href="/resources/css/error.css?ver=20230330103500000" rel="stylesheet">
</head>
<body>

    <section id="htmlBody">
        <header id="subTop">
            <h1 class="subTopL"><a href="/">랑연소프트</a></h1>
        </header>
        <section id="subBody">
            <article id="subConts">
                <!--// 내용 -->
                <p><!--<img src="/images/icon/ic_warning.jpg" height="100" />--> 죄송합니다.</p>
                <p>페이지가 없거나 오류가 발생하였습니다.</p>
                <p>현재 페이지가 존재하지 않거나, 현재 이용할 수 없는 페이지 입니다.</p>
                <!--<p>지속적인 장애가 발생할 경우 아래의 연락처로 문의 주시기 바랍니다.</p>
                <p>공개교육 : 02·2025·9091~5<br />중소특화 : 02·2025·9081~6</p>-->
                <!--<p><a href="/">로그인 재시도</a></p>-->
                <!-- 내용 //-->
            </article>
        </section>
        <footer id="subFooter"></footer>
    </section>

</body>
</html>	