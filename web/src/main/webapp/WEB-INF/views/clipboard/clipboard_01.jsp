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
	<script src="/resources/plugin/datepicker/datepicker.min.js?ver=20250624103500000"></script>
	<script src="/resources/plugin/datepicker/datepicker.ko-KR.js?ver=20250624103500000"></script>
	<link href="/resources/plugin/datepicker/datepicker.min.css?ver=20250624103500000" rel="stylesheet" />
	<!-- board, pazing -->
	<script src="/resources/js/clipboard/clipboard_01.js?ver=20250624103500000"></script>
    <link href="/resources/css/clipboard/clipboard_01.css?ver=20250624103500000" rel="stylesheet">
</head>
<body>
	<!-- top -->
     <!--// loading -->
    <section class="loading-layer">
	    <div class="loadingBg"></div>
	    <div class="loadingImg"><img src="/resources/images/loading.svg" alt="로딩중..." /></div>
    </section>
    <!-- loading //-->

    <!-- 상단 메뉴 -->
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
            <div id="menuAll">
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
	<section class="contentsBox">
		<!-- left -->
		<section class="leftMenu">
			<div class="leftBox"><img src="/resources/images/btn/btn_leftmenu_close.png" alt="대메뉴"></div>
			<section class="lmTop">
				<p id="pageNavi" class="ftSize20 ftBold mgB10">
					게시판&nbsp;&nbsp;<span class="ftNormal colGray2">공지사항</span>
				</p>
				<div id="leftTop">
					<div id="leftTopRpt01" class="leftTopConts">
						<div class="ucTable">
							<div>
								<p>
									<!-- <span class="colGray2">MD</span> -->
									<span class="colGray2">예상:</span>
									<strong id="lblRpt01EMD">0</strong>
								</p>
							</div>
							<div>
								<p>
									<span class="colGray2">처리:</span>
									<strong id="lblRpt01CMD">0</strong>
								</p>
							</div>
						</div>
					</div>
					<!-- 회의록  -->
					<div id="leftTopRpt02" class="leftTopConts">
						<div class="ucTable">
							<a href="#inp" class="btn btn100 btnPoint" >저장</a>
							<a href="#inp" class="btn btn100 btnRed mgT10" >삭제</a>
						</div>
					</div>
		
					<div id="leftTopRpt03" class="leftTopConts">
						<div class="ucTable">
							<a href="/report/03/write" class="btn btn100 btnPoint">등록</a>
						</div>
					</div>
					<!-- 사내일정 -->
					<div id="leftTopRpt04" class="leftTopConts">
						<div class="ucTable">
							<a href="#reg" class="btn btn100 btnPoint" >등록</a>
						</div>
					</div>
					<div id="leftTopRpt05" class="leftTopConts">
						<div class="ucTable">
							<a href="#reg" class="btn btn100 btnPoint" id="inputBtn">등록</a>
						</div>
					</div>
				</div>
			</section>
			<section class="lmMenu">
				<h3><img src="/resources/images/sub/leftMenu_icon_01.png" alt="대메뉴">&nbsp;&nbsp;<span
						id="leftMenuTop">게시판<!-- 대메뉴 --></span></h3>
				<ul id="leftMenuList">
					<li class="lmChoice"><a href="/WEB-INF/views/clipboard/clipboard_01.html">공지사항</a></li>
					<li><a href="/WEB-INF/views/clipboard/clipboard_02.html">자료실</a></li>
					<li><a href="/WEB-INF/views/clipboard/clipboard_03.html">업무공유</a></li>
				</ul>
			</section>
			<footer></footer>
		</section>
		<section class="contens">
		<!-- 게시판 -->
		<input type="hidden" id="mBIdx" value="11">
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
						<a href="#reg" id="btnInput" class="btn btnPoint">등록</a>
						<a href="#del" id="btnDelete" class="btn btnRed" style="display: none;">삭제</a>
						<a href="#can" id="btnCancel" class="btn btnWhite" onclick="fnBoardCancel(); return false;">취소</a>
					</div>
					</section>
			</section>
		</section> 
	</section>
</body>
</html>	