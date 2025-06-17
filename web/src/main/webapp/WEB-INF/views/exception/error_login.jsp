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
                <p>로그인 후에 이용해 주세요.</p>
                <p><a href="/">로그인</a></p>
                <!-- 내용 //-->
            </article>
        </section>
        <footer id="subFooter"></footer>
    </section>

</body>
</html>	