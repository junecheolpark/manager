<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/include/common.jsp" %>
	<%@ include file="/WEB-INF/views/include/html_head.jsp" %>	

    <!-- CK에디터 -->
     <script src="/resources/plugin/ckeditor/ckeditor.js"></script>	
	<!--// report -->
	<link href="/resources/css/report/report_01.css?ver=20250624103500000" rel="stylesheet">
	<script src="/resources/js/report/report_01.js?ver=20250624103500000"></script>
</head>
<body>
	<!-- top -->
	<%@ include file="/WEB-INF/views/include/body_top.jsp"%>
	<!-- left -->
	<%@ include file="/WEB-INF/views/include/body_left.jsp"%>
	<!-- 팝업 시작 -->
	<section id="WeekLayerPopUp" class="dim-layer">
		<section class="dimBg"></section>
		<section class="autoSizeLayerBg">
			<div class="autoSizeLayer" style="width: 1200px;">
				<div class="autoSizeLayerT">
					<div class="autoSizeLayerCls">
						<a href="#popclose" onclick="return false;" class="btn-layerClose"> <img src="/resources/images/btn/btn_popclose.png" alt="닫기">
						</a>
					</div>
					<div class="autoSizeLayerTInner">
						<h4>주간 업무 보고</h4>
					</div>
				</div>
				<div class="autoSizeLayerCont">
					<div class="autoSizeLayerContBody">
						<div class="tableTitle" id="tableTitle">
							<p style="padding-bottom: 5px;"></p>
						</div>
						<table class="tableView" id="weekInput">
							<colgroup>
								<col style="width: 20%">
								<col style="width: 40%">
								<col style="width: 40%">
							</colgroup>
							<thead>
								<tr>
									<th>항 목</th>
									<th>전주 추진사항</th>
									<th colspan="2" >금주 추진사항</th>
								</tr>
							</thead>
							<tbody>
								
							</tbody>
						</table>
					</div>
					<div class="autoSizeLayerF">
						<a id="btnSave" class="btn btnBlue" href="#"onclick="fnWorkWeekInput(); return false;">저장</a>
						<a id="btnDelete" class="btn btnRed" href="#" onclick="fnWeekWorkDelete(1); return false;" style="display:none;">삭제</a> 
						<a href="#popclose" class="btn btnWhite btn-layerClose" >닫기</a>
					</div>
				</div>
			</div>
		</section>
	</section>
	<!-- 팝업 끝 -->
	<section class="schBox">
		<section class="txtC">
			<a id="btnWeekPre" href="#" onclick="fnPrNekWeekUpdate(-7); return false;">
				<img src="/resources/images/btn/btn_bleft.png" alt="이전">
			</a>&nbsp; 
			<select name="selYear" id="selYear" style="width: 100px;">
			</select>&nbsp; 
			<select name="selMonth" id="selMonth" style="width: 100px;">
				<option value="01">01월</option>
				<option value="02">02월</option>
				<option value="03">03월</option>
				<option value="04">04월</option>
				<option value="05">05월</option>
				<option value="06">06월</option>
				<option value="07">07월</option>
				<option value="08">08월</option>
				<option value="09">09월</option>
				<option selected="selected" value="10">10월</option>
				<option value="11">11월</option>
				<option value="12">12월</option>
			</select>&nbsp; <select name="selWeek" id="selWeek" style="width: 290px;">
			</select>&nbsp; 
			<a id="btnWeekNext" href="#" onclick="fnPrNekWeekUpdate(7); return false;">
				<img src="/resources/images/btn/btn_nright.png" alt="다음">
			</a>
		</section>
	</section>
	<section class="contsF shadowBox">
		<section class="tableBody">
			<table class="tableView" id="weekList">
				<colgroup>
					<col style="width: 12%">
					<col style="width: 7%">
					<col style="width: 40%">
					<col style="width: 40%">
				</colgroup>
				<thead>
					<tr>
						<th>항&nbsp;&nbsp;목</th>
						<th>작업자</th>
						<th>전주 추진사항</th>
						<th>금주 추진사항</th>
					</tr>
				</thead>
				<tbody>
					<tr>  
						<td colspan="4" class="none">등록된 내용이 없습니다.</td>
					</tr>
				</tbody>
			</table>
		</section>
	</section>
</body>
</html>
