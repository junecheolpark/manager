<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/_include/common.jsp" %>
	<%@ include file="/WEB-INF/views/_include/html_head.jsp" %>	

<!--// fullcalendar -->
<link href="/resources/plugin/fullcalendar-3.9.0/fullcalendar.min.css" rel="stylesheet" />
<link href="/resources/plugin/fullcalendar-3.9.0/fullcalendar.print.min.css" rel="stylesheet" media="print" />
<script src="/resources/plugin/fullcalendar-3.9.0/lib/moment.min.js"></script>
<script src="/resources/plugin/fullcalendar-3.9.0/fullcalendar.min.js"></script>
<script src="/resources/plugin/fullcalendar-3.9.0/gcal.js"></script>
<script src="/resources/plugin/fullcalendar-3.9.0/locale-all.js"></script>
<!-- fullcalendar //-->
<!--// file upload -->
<script src="/resources/js/jquery/jquery.ajaxfileupload.js?ver=20230406094721580"></script>
<!--// 달력 -->
<script src="/resources/plugin/datepicker/datepicker.min.js?ver=20250624103500000"></script>
<script src="/resources/plugin/datepicker/datepicker.ko-KR.js?ver=20250624103500000"></script>
<link href="/resources/plugin/datepicker/datepicker.min.css?ver=20250624103500000" rel="stylesheet" />

<!--// schedule -->
<link href="/resources/css/schedule/schedule_01.css?ver=20250624103500000"	rel="stylesheet">

</head>
<body>
	<!-- top -->
	<section class="topMenu">
        <div class="logo"><h1><a href="/WEB-INF/views/index.html"><img src="/resources/images/index/logo.png" alt="junecheol"></a></h1></div>
        <div class="menuList">
            <ul id="menuTop">
                <li><a href="#menu" class="menuToggle" id="btnMenu"><img src="/resources/images/btn/btn_menu_open.png" alt="menuBtn"></a></li>
                <li><a href="/WEB-INF/views/report/report_01.html">업무보고</a></li>
                <li><a href="/WEB-INF/views/schedule/schedule_01.html">일정관리</a></li>
                <li><a href="/WEB-INF/views/company/company_01.html">회사관리</a></li>
                <li><a href="/WEB-INF/views/clipboard/clipboard_01.html">게시판</a></li>
                <li><a href="/WEB-INF/views/system/system_01.html">시스템관리</a></li>
            </ul>
            <div id="menuAll" style="display: block;">
            </div>            
        </div>        
        <div class="userInfo">
			<a href="#noti" ><img id="imgNoti" src="/resources/images/index/bell.png" alt="알림" style="width: 24px;"></a>
			<!-- <a href="#"><img src="/resources/images/icon/ic_refresh.png" alt="새로고침"></a> -->
			<div id="notiCntView" style="display: none;">
				<ul>
					<li><a href="/schedule/01"><p>휴가 미승인</p><p class="txtR"><span id="lblSignCnt">0</span>건</p></a></li>
					<li><a href="/report/01"><p>유지보수 접수</p><p class="txtR"><span id="lblMaintCnt">0</span>건</p></a></li>
					<li><a href="/clipboard/01"><p>신규 공지사항</p><p class="txtR"><span id="lblNotiCnt">0</span>건</p></a></li>
				</ul>
			</div>
            <div class="user">
                <a href="#user" >
                    <img src="/resources/images/profile/s_profile_01.png" id="userCharacterS" alt="userImg" onerror="this.src='/resources/images/profile/s_profile_01.png';">
                    <span><span id="logNM" class="colWhite">&nbsp;</span><br><span id="logDept" class="colGray3 ftSize12">&nbsp;</span></span>                        
                </a>
            </div>
        </div>
        <!-- .userInfo 클릭 시 오픈 -->
        <div id="popUserInfo" class="shadowBox">
            <a href="#popclose" class="btn-layerClose"  ><img src="/resources/images/btn/btn_popclose.png" alt="닫기"></a>
            <div class="popInfoTop">
                <img src="/resources/images/common/no_Image.jpg" alt="유저" id="userCharacter" onerror="this.src='/resources/images/common/no_Image.jpg';">
                <!-- 관리자 뱃지 관리자만 노출 -->
                <span id="managerBadge" style="display:none;"><!-- 권한 --></span>
                <p id="userName">
                    <span id="popLogNm" class="ftBold ftSize18 mgB5"><!-- 성명 --></span>
                    <span id="popLogDept"class="colGray2"><!-- 부서 --></span>
                </p>
            </div>
            <div class="popInfoCont">
                <div id="popMyLink">
                    <a href="/mypage/01"><img src="/resources/images/icon/ic_pcon_1.svg" alt="마이페이지">&nbsp;마이페이지</a>
                    <!-- <a href="#qr" ><img src="/resources/images/icon/ic_pcon_2.png" alt="QR 다운로드">&nbsp;QR 다운로드</a> -->
                </div>
                <div id="popMyInfo">
                    <ul>                        
                        <!--로그아웃 버튼-->
                        <li>
                            <a href="/login/logout" class="colRed" >
                            <img src="/resources/images/icon/ic_logout.png" alt="로그아웃" >
                            &nbsp;로그아웃</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
	<!-- left -->
	<section class="contentsBox">
		<!-- left -->
		<section class="leftMenu">
			<div class="leftBox"><img src="/resources/images/btn/btn_leftmenu_close.png" alt="대메뉴"></div>
			<section class="lmTop">
				<p id="pageNavi" class="ftSize20 ftBold mgB10">
					일정관리&nbsp;&nbsp;<span class="ftNormal colGray2">사내일정</span>
				</p>
				<div id="leftTop">
				</div>
			</section>
			<section class="lmMenu">
				<h3><img src="/resources/images/sub/leftMenu_icon_01.png" alt="대메뉴">&nbsp;&nbsp;<span
						id="leftMenuTop">일정관리<!-- 대메뉴 --></span></h3>
				<ul id="leftMenuList">
					<li class="lmChoice"><a href="/WEB-INF/views/schedule/schedule_01.html">사내일정</a></li>
					<li><a href="/WEB-INF/views/schedule/schedule_02.html">프로젝트</a></li>
				</ul>
			</section>
			<footer></footer>
		</section>
		<section class="contens">
			<section class="schBox txtC">
				<section>
					<a id="btnPrev" href="#"><img src="/resources/images/btn/btn_bleft.png" alt="이전"><i class="fas fa-chevron-circle-left"></i></a>&nbsp;
					<select id="selSchYear" style="width: 100px">
					</select>&nbsp; 
					<select id="selSchMonth" style="width: 100px">
						<option value="01">01월</option>
						<option value="02">02월</option>
						<option value="03">03월</option>
						<option value="04">04월</option>
						<option value="05">05월</option>
						<option value="06">06월</option>
						<option value="07">07월</option>
						<option value="08">08월</option>
						<option value="09">09월</option>
						<option value="10">10월</option>
						<option value="11">11월</option>
						<option value="12">12월</option>
					</select>&nbsp; 
					<a id="btnNext" href="#"><img src="/resources/images/btn/btn_nright.png" alt="다음"><i
						class="fas fa-chevron-circle-right"></i></a>
						<input type="submit" name="btnToday" value="오늘" id="btnToday" class="btn btnPoint ">
				</section>
			</section>
		<section class="contsF shadowBox">
			<section id="calendar">
				<!--// 내용 상단 영역 - 서브페이지 필수 -->

				<!--  -->

				<!--  -->

			</section>
			<!--등록 팝업//-->
			<input type="hidden" id="schIdx" name="schIdx" value="" />
			<section id="scheduleInputView" class="dim-layer"
				style="display: none;">
				<section class="dimBg"></section>
				<section class="autoSizeLayerBg" style="overflow-y: auto;">
					<div class="autoSizeLayer ui-draggable"
						style="width: 500px; margin: 147.5px auto; position: relative;">
						<div class="autoSizeLayerT">
							<div class="autoSizeLayerCls">
								<a href="#popclose" class="" ><img
									src="/resources/images/btn/btn_popclose.png" alt="닫기"></a>
							</div>
							<div class="autoSizeLayerTInner">
								<h4 class="ui-draggable-handle txtC">등록</h4>
							</div>
						</div>
						<div class="autoSizeLayerCont">
							<div class="autoSizeLayerContBody">
								<ul class="vacationShow">
									<li>
										<p>
											<span>연차일수</span>
											<span><span id="yearVacation">0</span>&nbsp;일</span>
										</p>                                                
									</li>
									<li>
										<p>
											<span>사용일수</span>
											<span><span id="yearUse">0</span>&nbsp;일</span>
										</p> 
									</li>
									<li>
										<p>
											<span>잔여일수</span>
											<span><span id="yearLeave">0</span>&nbsp;일</span>
										</p> 
									</li>
									<!-- <li>
										<p>
											<span>대체 잔여일수</span>
											<span><span>0</span>&nbsp;일</span>
										</p> 
									</li> -->
								</ul>
								<table class="tableView">
									<colgroup>
										<col style="width: 20%;">
										<col style="width: 80%;">
									</colgroup>
									<tbody>
										<tr>
											<th><span class="colRed">*</span> 일정구분</th>
											<td><select name="selSchdule" id=selSchdule >
											</select></td>
										</tr>
										<tr style="display:none;">
											<th><span class="colRed">*</span> 제목</th>
											<td><input type="text" id="txtTitle"
												name="txtTitle"  data-sidx="0" maxlength="50"></td>
										</tr>
										<tr id="userTr">
											<th><span class="colRed">*</span> 대상</th>
											<td>
												<div id="targetList">
													<p id="ToName"></p>
													<p>
														<a href="#" id="btnUser" class="btn btnPoint " 
															>선택</a>
													</p>
												</div>
											</td>
										</tr>
										<tr>
											<th><span class="colRed">*</span> 날짜</th>
											<td><input type="text" id="txtSDate" class="cal"
												name="txtSDate" value="" maxlength="10" style="width: 120px;">
												~ <input type="text" id="txtEDate" class="cal"
												name="txtEDate" value="" maxlength="10" style="width: 120px;"></td>
										</tr>
										<tr>
											<th><span class="colRed">*</span> 내역</th>
											<td><textarea id="txtConts" name="txtConts" rows="2"
													cols="20" style="height: 70px;"></textarea></td>
										</tr>
										<tr id="fileShow" style="display:none;">
											<th><span class="colRed">*</span> 첨부파일</th>
											<td id="scheduleFileArea" class="fileDragDrop" colspan="5">
												<div class="filebox dragbox">
													<label for="scheduleFile" style="display: inline-block;" title="파일 추가 또는 드래그 하세요.">파일 
													<img src="/resources//images/icon/file_dd2.png" alt="파일 추가 또는 드래그 하세요." style="height: 26px;"></label>
													<input type="file" id="scheduleFile" name="uploadFiles" style="display: block;">
													<p id="scheduleFileView" class="pdT5" style="display: none;"></p>
													<span id="UploadFileView" class="pdT5"><span class="colBlue"> ※ 파일이 여러개일 경우 압축파일로 첨부</span></span>
												</div>
											</td>
										</tr>
										<tr>
											<th class="bor_bot_none">시간</th>
											<td class="bor_bot_none"><select id="selectTimeType"
												style="width: 100px;">
													<option value="1">종일</option>
													<option value="2">오전</option>
													<option value="3">오후</option>
											</select> <select name="txtSTime" id="txtSTime"
													style="width: 100px;">
													<option value="08:00">08:00</option>
													<option value="09:00" selected="selected">09:00</option>
													<option value="10:00">10:00</option>
													<option value="11:00">11:00</option>
													<option value="12:00">12:00</option>
													<option value="13:00">13:00</option>
													<option value="14:00">14:00</option>
													<option value="15:00">15:00</option>
													<option value="16:00">16:00</option>
													<option value="17:00">17:00</option>
													<option value="18:00">18:00</option>
											</select> ~ <select name="txtETime" id="txtETime"
													style="width: 100px;">
													<option value="08:59">09:00</option>
													<option value="09:59">10:00</option>
													<option value="10:59">11:00</option>
													<option value="11:59">12:00</option>
													<option value="12:59">13:00</option>
													<option value="13:59">14:00</option>
													<option value="14:59">15:00</option>
													<option value="15:59">16:00</option>
													<option value="16:59">17:00</option>
													<option selected="selected" value="17:59">18:00</option>
													<option value="18:59">19:00</option>
											</select></td>
										</tr>
										<tr class="vacationShow">
											<th>승인상태</th>
											<td><span id="txtSchedule_TP">-</span></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="autoSizeLayerF">
								<a id="btnApprove" class="btn btnPointLine" href="#"
									style="display: none;">휴가승인</a>
								<!--관리자 노출 버튼-->
								<a id="btnApproveCancel" class="btn btnRedLine" href="#"
									style="display: none;">휴가취소</a>
								<!--관리자 노출 버튼-->
								<a id="btnSave" class="btn btnPoint"
									style="">저장</a>
								<a id="btnDelete" class="btn btnRed"  href="#" style="display: none;">삭제</a>
								<!--등록된 일정 클릭 시 노출 버튼-->
								<a href="#popclose" class="btn btnWhite"
									>닫기</a>
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
								<a href="#popclose" class="" >
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
												<input type="checkbox" name="userSelect2" class="noBorder" />
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
								<a href="#popclose" class="btn btnPoint"
									>확인</a> <a
									href="#popclose" class="btn btnWhite"
									>닫기</a>
							</div>
						</div>
					</div>
				</section>
			</section>
		</section>
	</section> 
	<!-- footer -->
</body>
</html>
