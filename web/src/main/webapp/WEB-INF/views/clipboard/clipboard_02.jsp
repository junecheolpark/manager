<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/include/common.jsp" %>
	<%@ include file="/WEB-INF/views/include/html_head.jsp" %>	
	
	 <!-- 멀티 파일 업로드 -->
    <script src="/resources/plugin/filedropdown/js/filedropdown.js?ver=20221013134344363"></script>
    <link href="/resources/plugin/filedropdown/css/filedropdown.css?ver=20221013134344363" rel="stylesheet">
    <!-- CK에디터 -->
     <script src="/resources/plugin/ckeditor/ckeditor.js"></script>
    <!--// 달력 -->
	<script src="/resources/plugin/datepicker/datepicker.min.js?ver=20250624103500000"></script>
	<script src="/resources/plugin/datepicker/datepicker.ko-KR.js?ver=20250624103500000"></script>
	<link href="/resources/plugin/datepicker/datepicker.min.css?ver=20250624103500000" rel="stylesheet" />
	<!-- board, pazing -->
    <link href="/resources/css/clipboard/clipboard_01.css?ver=20250624103500000" rel="stylesheet">
</head>
<body>
	<!-- top -->
	<%@ include file="/WEB-INF/views/include/body_top.jsp" %>	
	<!-- left -->
	<%@ include file="/WEB-INF/views/include/body_left.jsp" %>
		<!-- 게시판 -->
		<input type="hidden" id="mBIdx" value="17">
			<section class="schBox">
				<p>
					총 <span id="totalCnt" class="colPoint">0</span>건
				</p>
				&nbsp; <select id="cphBody_ddlDateSearch" style="width: 120px;">
					<option value="">작성일</option>
				</select> <input type="text" id="txtSdate" class="cal" style="width: 120px;" onkeyup="fnDateMask(this);"> ~ <input
					type="text" id="txtEdate" class="cal" style="width: 120px;" onkeyup="fnDateMask(this);">&nbsp; <input
					type="text" maxlength="100" id="txtRegName" placeholder="작성자" style="width: 120px;">&nbsp; <input type="text"
					maxlength="100" id="txtTitle" placeholder="제목" style="width: 250px;"> <input type="submit" value="검색"
					id="btnSch" class="btn btnPoint">
			</section>
			<section id="clipboard_01">
				<section class="shadowBox">
					<table id="tableList" class="tableList">
						<colgroup>
							<col>
							<col style="width: 10%">
							<col style="width: 10%">
							<col style="width: 10%">
							<col style="width: 17%">
						</colgroup>
						<thead>
							<tr>
								<th>제목</th>
								<th>첨부파일</th>
								<th>작성자</th>
								<th>조회수</th>
								<th>작성일</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="5" class="noData">검색된 게시글이 없습니다.</td>
							</tr>
						</tbody>
					</table>
					<section id="pagingView" class="paging">
						<!-- 페이징 -->
					</section>
				</section>
				<section class="shadowBox">
					<table id="tableView" class="tableView">
						<colgroup>
							<col style="width: 12%">
							<col style="width: 40%">
							<col style="width: 10%">
							<col style="width: 38%">
						</colgroup>
						<tbody>
							<tr>
								<th>작성자</th>
								<td><span id="regName"></span></td>
								<!--로그인된 사람 불러옴-->
								<th>작성날짜</th>
								<td><span id="regDate">자동 저장</span></td>
							</tr>
							<tr>
								<td colspan="4" style="padding: 10px 0;"><input id="txtSubj" name="txtSubj" type="text"
										maxlength="100" data-bidx="0" placeholder="제목을 입력해 주세요"></td>
							</tr>
							<tr>
								<td colspan="4" style="padding: 10px 0;"><textarea name="resCnts" id="resCnts"
										placeholder="내용을 입력해 주세요"></textarea></td>
							</tr>
						</tbody>
					</table>
					<div class="ry_fileUploadBody">
						<!-- class(ry_fileUploadBody) 변경하면 안됨 -->
						<div class="DivScrollY" id="fileDragBody">
							<!-- 멀티 업로드 영역이 여러개일 경우 각 영역별 id 지정 -->
							<table class="tableList">
								<colgroup>
									<col style="width: 55%;">
									<col style="width: 15%;">
									<col style="width: 15%;">
									<col style="width: 15%;">
								</colgroup>
								<thead>
									<tr class="DivScrollYHead">
										<th>파일명</th>
										<th>용량</th>
										<th>상태</th>
										<th>삭제</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div id="fileFoot">
							<div class="filebox mgTB10">
								<label for="ry_file">파일추가</label><input type="file" id="ry_file" name="ry_file" multiple="multiple">
								<a href="#download" id="fileDownBtn" class="btn btnWhite"
									 style="display: none;">파일전체 다운로드</a> <a
									href="#input" id="fileUpBtn" class="btn btnPointLine floatR"
									 style="display: none;">파일 업로드</a>
							</div>
						</div>
					</div>
					<div class="boardFootBtn">
						<a href="#reg" id="btnInput" class="btn btnPoint" >등록</a> <a
							href="#del" id="btnDelete" class="btn btnRed" 
							style="display: none;">삭제</a> <a href="#can" id="btnCancel" class="btn btnWhite"
							>취소</a>
					</div>
				</section>
			</section>
		</section> 
	</section>
</body>
</html>	