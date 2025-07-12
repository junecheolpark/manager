<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/include/common.jsp" %>
	<%@ include file="/WEB-INF/views/include/html_head.jsp" %>	
	<link href="/resources/css/system/system_03.css?ver=20250624103500000" rel="stylesheet">
</head>
<body>
	<!-- top -->
	<%@ include file="/WEB-INF/views/include/body_top.jsp" %>	
	<!-- left -->
	<%@ include file="/WEB-INF/views/include/body_left.jsp" %>
	
		<section id="VacationView" class="dim-layer" style="display: none;">
			<section class="autoSizeLayerBg" style="overflow-y: auto;">
				<div class="autoSizeLayer ui-draggable"
					style="width: 1000px; margin: 147.5px auto; position: relative;">
					<div class="autoSizeLayerT">
						<div class="autoSizeLayerCls">
							<a href="#popclose" class="" onclick="fnVacationClose(); return false;"><img
								src="/resources/images/btn/btn_popclose.png" alt="닫기"></a>
						</div>
						<div class="autoSizeLayerTInner">
							<h4 class="ui-draggable-handle txtC"><span id="vacationNm"></span>님 휴가사용 현황</h4>
						</div>
					</div>
					<div class="autoSizeLayerCont">
						<div class="autoSizeLayerContBody">
							<section class="tableBody">
                            <div class="DivScrollYHead">
                                <table class="tableList">
                                    <colgroup>
                                        <col style="width:14%;"><!-- 신청일 -->
                                        <col style="width:15%;"><!-- 휴가구분 -->
                                        <col style="width:14%;"><!-- 시작일 -->
                                        <col style="width:14%;"><!-- 종료일 -->
                                        <col style="width:10%;"><!-- 일수-->
                                        <col><!-- 휴가시유 -->
                                        <!--<col style="width:10%;"> 관리-->
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>신청일</th>
                                            <th>휴가구분</th>
                                            <th>시작일</th>
                                            <th>종료일</th>
                                            <th>일수</th>
                                            <th>휴가사유</th>
                                            <!-- <th>관리</th> -->
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="DivScrollY" style="height:300px;">
								<table class="tableList" id="AppList2">
									<colgroup>
										<col style="width: 14%;">
										<!-- 신청일 -->
										<col style="width: 15%;">
										<!-- 휴가구분 -->
										<col style="width: 14%;">
										<!-- 시작일 -->
										<col style="width: 14%;">
										<!-- 종료일 -->
										<col style="width: 10%;">
										<!-- 일수-->
										<col>
										<!-- 휴가시유 -->
										<%-- <col style="width: 10%;"> --%>
										<!-- 관리-->
									</colgroup>
									<tbody>
										<tr>
											<td>검색된 휴가 사용내역이 없습니다.</td>
										
										</tr>
									</tbody>
								</table>
							</div>
                        </section>
						</div>
						<div class="autoSizeLayerF">
							<!--등록된 일정 클릭 시 노출 버튼-->
							<a href="#popclose" class="btn btnWhite"
								onclick="fnVacationClose(); return false;">닫기</a>
						</div>
					</div>
				</div>
			</section>
		</section>
		<!--//등록 팝업-->
            <section class="schBox">
                <p>총 <span id="totalCnt" class="colPoint">0</span>건</p>&nbsp;
                <select style="width: 120px;" id="selSchYear">
	                <option value="0">년도</option>
                </select>&nbsp;
                <select style="width: 120px;" id="selStatus">
                    <option value="35">재직</option>
                    <option value="36">퇴사</option>
                    <option value="37">휴직</option>
                </select>&nbsp;
                <select style="width: 120px;" id="selSearch">
                    <option value="1">성명</option>
                    <option value="2">아이디</option>
                </select>
                <input type="text" style="width: 150px;" id="txtSearch">&nbsp;
                <input type="submit" value="검색" class="btn btnPoint" id="btnSch">
            </section> 
            <section class="contsBox">
                <section class="contsF" style="width:100%;">
                    <table class="tableList noCursor stats" id="AppList">
                        <colgroup>
                            <col style="width:3%;"><!-- 체크박스 -->
                            <col style="width:20%"> <!-- 부서명 -->
                            <col style="width:10%"> <!-- 직급 -->
                            <col style="width:10%"> <!-- 사원명 -->
                            <col style="width:7%"> <!-- 발생 -->
                            <col style="width:7%"> <!-- 사용 -->
                            <col style="width:7%"> <!-- 잔여 -->
                            <col style="width:7%"> <!-- 사용률 -->
                        </colgroup>
                        <thead>
                            <tr>
                                <th rowspan="2"><input type="checkbox" id="allChk" onclick="fnCheckAll('allChk', 'chkIdx');"></th>
                                <th colspan="3">사원정보</th>
                                <th colspan="4">연차휴가</th>
                            </tr>
                            <tr>
                                <th>부서명</th>
                                <th>직급</th>
                                <th>성명</th>
                                <th>발생</th>
                                <th>사용</th>
                                <th>잔여</th>
                                <th>사용률</th>
                            </tr>
                        </thead>
                        <tbody>
							<tr>
								<td colspan="8" class="noData">검색된 사용자가 없습니다.</td>
							</tr>
						</tbody>
                        </table>
                </section>
            </section>
</body>
</html>	