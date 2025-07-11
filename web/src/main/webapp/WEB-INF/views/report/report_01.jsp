<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<title>준철 포트폴리오</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="google" content="notranslate">
	<link href="/resources/favicon.ico" rel="shortcut icon" type="image/x-icon">
	<link href="/manifest.webmanifest" rel="manifest">
	<!-- font-->
	<link href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css" rel="stylesheet">
	<!-- css -->
    <link href="/resources/css/common.css?ver=20250624103500000" rel="stylesheet">

    <link href="/resources/css/jquery-ui.css?ver=20250624103500000" rel="stylesheet">
    <link href="/resources/css/layout.css?ver=20250624103500000" rel="stylesheet">
    <link href="/resources/css/sub.css?ver=20250624103500000" rel="stylesheet">

    <!-- CK에디터 -->
     <script src="/resources/plugin/ckeditor/ckeditor.js"></script>	
	<!--// report -->
	<link href="/resources/css/_report/report_01.css?ver=20250624103500000" rel="stylesheet">
</head>
<body>
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
                <li><a href="/WEB-INF/views/company/company_01.html">사용자관리</a></li>
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
					업무보고&nbsp;&nbsp;<span class="ftNormal colGray2">주간업무</span>
				</p>
				<div id="leftTop">
					<!-- 사내일정 -->
					<div id="leftTopRpt04" class="leftTopConts" style="display: block;">
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
						id="leftMenuTop">업무보고<!-- 대메뉴 --></span></h3>
				<ul id="leftMenuList">
					<li class="lmChoice"><a href="/WEB-INF/views/clipboard/clipboard_01.html">주간업무</a></li>
				</ul>
			</section>
			<footer></footer>
		</section>
		<section class="contens">
			<!-- 팝업 시작 -->
			<section id="WeekLayerPopUp" class="dim-layer" style="display: none;">
				<section class="dimBg"></section>
				<section class="autoSizeLayerBg">
					<div class="autoSizeLayer" style="width: 1200px;">
						<div class="autoSizeLayerT">
							<div class="autoSizeLayerCls">
								<a href="#popclose" class="btn-layerClose"> <img src="/resources/images/btn/btn_popclose.png" alt="닫기">
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
									<p>
										<span class="tableBtn"> 
											<a href="/_Business/Business_Write_01.aspx" class="btn btnPoint" >추가</a> 
										</span>
									</p>
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
								<a id="btnSave" class="btn btnPoint" href="#">저장</a>
								<a id="btnDelete" class="btn btnRed" href="#" style="display:none;">삭제</a> 
								<a href="#popclose" class="btn btnWhite btn-layerClose" >닫기</a>
							</div>
						</div>
					</div>
				</section>
			</section>
			<!-- 팝업 끝 -->
			<section class="schBox">
				<section class="txtC">
					<a id="btnWeekPre" href="#" >
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
					<a id="btnWeekNext" href="#" >
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
		</section>
	</section>

	<script>
		/* 
		CKEDITOR.instances.resCnts.getData();
		CKEDITOR.instances.resCnts.setData('');
		
		CKEDITOR.replace('resCnts', {
			filebrowserUploadUrl:'/common/uploadImgOne',
			editorplaceholder : '내용을 입력해 주세요',
		}); */
	</script>

	<!-- footer -->
</body>
</html>
