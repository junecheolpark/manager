<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/include/common.jsp" %>
	<%@ include file="/WEB-INF/views/include/html_head.jsp" %>	

	<!-- fullcalendar //-->
	<!--// 달력 -->
	<script src="/resources/plugin/datepicker/datepicker.min.js?ver=20230330103500000"></script>
	<script src="/resources/plugin/datepicker/datepicker.ko-KR.js?ver=20230330103500000"></script>
	<link href="/resources/plugin/datepicker/datepicker.min.css?ver=20230330103500000" rel="stylesheet" />
	<!--// 달력 -->
	<link href="/resources/css/schedule/schedule_02.css?ver=20250624103500000" rel="stylesheet">
</head>

<body>
			<!-- top -->
			<%@ include file="/WEB-INF/views/include/body_top.jsp" %>	
			<!-- left -->
			<%@ include file="/WEB-INF/views/include/body_left.jsp" %>
			<!-- 컨텐츠 -->
			<section class="schBox">
				<select id="selSchMn" style="width: 120px;">
					<option value="">전체</option>
				</select>&nbsp; <select style="width: 120px;">
					<option value="">기간</option>
				</select>&nbsp;
				<input name="schSdate" type="text" id="schSdate" class="cal" style="width: 120px;"> ~
				<input name="schEdate" type="text" id="schEdate" class="cal" style="width: 120px;">&nbsp;
				<input name="schText" type="text" id="schText" maxlength="100" style="width: 250px;">
				<input type="submit" id="btnSch" value="검색" class="btn btnPoint schBox">
			</section>
			<section class="contsTB">
				<div class="pdB10">
					<p class="ftBold">담당프로젝트</p>
				</div>
				<table class="tableTB" id="tableMyProject">
					<colgroup>
						<col style="width: 2%">
						<col style="width: 9%">
						<col style="width: 9%">
						<col style="width: 15%">
						<col style="width: 20%">
						<col style="width: 44%">
					</colgroup>
					<tbody>
						<tr class="noProject">
							<td colspan="6">
								<p class="colGray2 txtC">
									<img src="/resources/images/sub/noProjec.png" alt="담당 프로젝트가 없습니다."><br>담당 프로젝트가
									없습니다.
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section class="contsTB">
				<div class="pdB10">
					<p class="ftBold">프로젝트</p>
				</div>
				<table class="tableTB" id="tableAllProject">
					<colgroup>
						<col style="width: 2%">
						<col style="width: 9%">
						<col style="width: 9%">
						<col style="width: 15%">
						<col style="width: 20%">
						<col style="width: 44%">
					</colgroup>
					<tbody>
						<tr class="noProject">
							<td colspan="6">
								<p class="colGray2 txtC">
									<img src="/resources/images/sub/noProjec.png" alt="진행중인 프로젝트가 없습니다."><br>담당 프로젝트가
									없습니다.
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			<!--프로젝트 등록 팝업//-->
			<section id="calProject" class="dim-layer" style="display: none;">
				<section class="dimBg"></section>
				<section class="autoSizeLayerBg" style="overflow-y: auto;">
					<div class="autoSizeLayer ui-draggable"
						style="width: 500px; margin: 147.5px auto; position: relative;">
						<div class="autoSizeLayerT">
							<div class="autoSizeLayerCls">
								<a href="#popclose" class="" onclick="fnProjectClose(); return false;"><img
										src="/resources/images/btn/btn_popclose.png" alt="닫기"></a>
							</div>
							<div class="autoSizeLayerTInner">
								<h4 class="ui-draggable-handle txtC">프로젝트 설정</h4>
							</div>
						</div>
						<div class="autoSizeLayerCont">
							<div class="autoSizeLayerContBody">
								<div class="mgB10">
									<img src="/resources/images/icon/ic_info_02.png" alt="info">&nbsp; <span
										class="ftBold ftSize16">프로젝트 정보</span>
								</div>
								<table class="tableView">
									<colgroup>
										<col style="width: 20%;">
										<col style="width: 80%;">
									</colgroup>
									<tbody>
										<tr>
											<th><span class="colRed">*</span>업체명</th>
											<td><select id="selMn">
													<option value="0" selected="selected">선택</option>
												</select></td>
										</tr>
										<tr>
											<th><span class="colRed">*</span>프로젝트 기간</th>
											<td>
												<input name="txtSDate" type="text" id="txtSDate" class="cal"
													style="width: 120px;"> ~
												<input name="txtEDate" type="text" id="txtEDate" class="cal"
													style="width: 120px;">
											</td>
										</tr>
										<tr>
											<th><span class="colRed">*</span>프로젝트 명</th>
											<td><input name="txtConts" id="txtConts" data-pidx="0"></td>
										</tr>
										<tr>
											<th><span class="colRed">*</span>프로젝트 책임자</th>
											<td class="projectCharge" id="workUser">
												<a href="#" class="" onclick="fnCheckListPopUp(); return false;">
													<img src="/resources/images/common/no_Image.jpg"
														alt="담당자 검색">&nbsp;담당자 검색
												</a>
												<div id="workUserSch"></div>
												<input type="hidden" id="schIdx" value="0">
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="autoSizeLayerF">
								<a href="#" id="btnSave" class="btn btnPoint"
									onclick="fnProjecttcInput(); return false;">등록</a>
								<a href="#" id="btnDelete" class="btn btnRed" onclick="fnProjectDelete(); return false;"
									style="display:none;">삭제</a>
								<a href="#popclose" class="btn btnWhite"
									onclick="fnProjectClose(); return false;">닫기</a>
							</div>
						</div>
					</div>
				</section>
			</section>
			<!--//등록 팝업-->
			<!--// 팝업 -->
			<section id="CheckList" class="dim-layer">
				<section class="dimBg"></section>
				<section class="autoSizeLayerBg">
					<div class="autoSizeLayer" style="width: 350px;">
						<div class="autoSizeLayerT">
							<div class="autoSizeLayerCls">
								<a href="#popclose" class="" onclick="fnLayerPopupClose('CheckList'); return false;">
									<img src="/resources/images/btn/btn_popclose.png" alt="닫기" />
								</a>
							</div>
							<div class="autoSizeLayerTInner">
								<h4>대상자 선택</h4>
							</div>
						</div>
						<div class="autoSizeLayerCont">
							<div class="autoSizeLayerContBody">
								<table id="userList" class="tableList">
									<colgroup>
										<col style="width: 10%" />
										<col style="width: 35%" />
										<col style="width: 55%" />
									</colgroup>
									<thead>
										<tr>
											<th>
												<input type="checkbox" name="userSelect2" onclick="fnCheckAll();"
													class="noBorder" />
											</th>
											<th>직급</th>
											<th>성명</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
							<div class="autoSizeLayerF">
								<a href="#popclose" class="btn btnPoint" onclick="fnUserSelect(); return false;">확인</a>
								<a href="#popclose" class="btn btnWhite"
									onclick="fnLayerPopupClose('CheckList'); return false;">닫기</a>
							</div>
						</div>
					</div>
				</section>
			</section>
		</section>
	</section>
</body>

</html>