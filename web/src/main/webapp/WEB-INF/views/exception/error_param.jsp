
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
            <h1 class="subTopL"><a href="/">junecheol</a></h1>
        </header>
        <section id="subBody">
            <article id="subConts">
                <!--// 내용 -->
                <p> 죄송합니다.</p>
                <p>파라미터 정보가 없습니다.</p>
                <p>올바른 경로로 이용해 주세요.</p>
                <p><a href="#back" onclick="history.back(-2); return false;">확인</a></p>
                <!-- 내용 //-->
            </article>
        </section>
        <footer id="subFooter"></footer>
    </section>

</body>
</html>	