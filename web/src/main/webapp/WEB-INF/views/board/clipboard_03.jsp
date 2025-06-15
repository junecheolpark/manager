<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/_include/common.jsp" %>
	<%@ include file="/WEB-INF/views/_include/html_head.jsp" %>
	 <!-- 멀티 파일 업로드 -->
    <script src="/resources/plugin/filedropdown/js/filedropdown.js?ver=20221013134344363"></script>
    <link href="/resources/plugin/filedropdown/css/filedropdown.css?ver=20221013134344363" rel="stylesheet">
    <!-- CK에디터 -->
     <script src="/resources/plugin/ckeditor/ckeditor.js"></script>
       <!--// 달력 -->
	<script src="/resources/plugin/datepicker/datepicker.min.js?ver=20230330103500000"></script>
	<script src="/resources/plugin/datepicker/datepicker.ko-KR.js?ver=20230330103500000"></script>
	<link href="/resources/plugin/datepicker/datepicker.min.css?ver=20230330103500000" rel="stylesheet" />
	<!-- board, pazing -->
    <script src="/resources/js/paging.js?ver=20230330103500000"></script>
    <script src="/resources/js/_clipboard/clipboard_01.js?ver=20230330103500000"></script>
	<link href="/resources/css/_clipboard/clipboard_01.css?ver=20230330103500000" rel="stylesheet">
</head>
<body>
	<!-- top -->
	<%@ include file="/WEB-INF/views/_include/body_top.jsp" %>	
	<!-- left -->
	<%@ include file="/WEB-INF/views/_include/body_left.jsp" %>

	<!-- 게시판 -->
	<input id="mBIdx" type="hidden" value="18">
	<%@ include file="/WEB-INF/views/_include/clipboard.jsp" %>
	
	<!-- footer -->
	<%@ include file="/WEB-INF/views/_include/body_footer.jsp" %>	

</body>
</html>	