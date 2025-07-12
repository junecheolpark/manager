<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

    <!--// loading -->
    <section class="loading-layer">
	    <div class="loadingBg"></div>
	    <div class="loadingImg"><img src="/resources/images/loading.svg" alt="로딩중..." /></div>
    </section>
    <!-- loading //-->

    <!-- 상단 메뉴 -->
    <section class="topMenu">
        <div class="logo"><h1><a href="/index"><img src="/resources/images/index/logo.png" alt="RYsoft"></a></h1></div>
        <div class="menuList">
            <ul id="menuTop">
                <li><a href="#menu" class="menuToggle" id="btnMenu"><img src="/resources/images/btn/btn_menu_open.png" alt="menuBtn"></a></li>
                <li><a href="/report/01">업무보고</a></li>
                <li><a href="/schedule/01">일정관리</a></li>
                <li><a href="/company/01">사용자관리</a></li>
                <li><a href="/clipboard/01">게시판</a></li>
                <li><a href="/system/01">시스템관리</a></li>
            </ul>
            <div id="menuAll">
                <ul>
                    <li>
                        <a href="/report/01">주간업무</a>
                        <ul>
                            <li><a href="/report/01">주간업무</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/schedule/01">일정 관리</a>
                        <ul>
                            <li><a href="/schedule/01">사내일정</a></li>
                            <li><a href="/schedule/02">프로젝트</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/company/01">사용자 관리</a>
                        <ul>
                            <li><a href="/company/01">사용자 관리</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/clipboard/01">게시판</a>
                        <ul>
                            <li><a href="/clipboard/01">공지사항</a></li>
                            <li><a href="/clipboard/02">자료실</a></li>
                            <li><a href="/clipboard/03">업무공유</a></li>
                        </ul>
                    </li>                    
                    <li>
                        <a href="/system/01">시스템 관리</a>
                        <ul>
                            <li><a href="/system/01">운영자 관리</a></li>
                            <li><a href="/system/02">코드 관리</a></li>
                            <li><a href="/system/03">연차관리</a></li>
                        </ul>
                    </li>
                </ul>
            </div>           
        </div>        
        <div class="userInfo">
			<a href="#noti" onclick="fnNotificationCntView(); return false;"><img id="imgNoti" src="/resources/images/index/bell.png" alt="알림" style="width: 24px;"></a>
			<!-- <a href="#"><img src="/resources/images/icon/ic_refresh.png" alt="새로고침"></a> -->
			<div id="notiCntView" style="display: none;">
				<ul>
					<li><a href="/schedule/01"><p>휴가 미승인</p><p class="txtR"><span id="lblSignCnt">0</span>건</p></a></li>
					<li><a href="/report/01"><p>유지보수 접수</p><p class="txtR"><span id="lblMaintCnt">0</span>건</p></a></li>
					<li><a href="/clipboard/01"><p>신규 공지사항</p><p class="txtR"><span id="lblNotiCnt">0</span>건</p></a></li>
				</ul>
			</div>
            <div class="user">
                <a href="#user" onclick="fnLoginView(); return false;">
                    <img src="/resources/images/profile/s_profile_01.png" id="userCharacterS" alt="userImg" onerror="this.src='/resources/images/profile/s_profile_01.png';">
                    <span><span id="logNM" class="colWhite">&nbsp;</span><br><span id="logDept" class="colGray3 ftSize12">&nbsp;</span></span>                        
                </a>
            </div>
        </div>
        <!-- .userInfo 클릭 시 오픈 -->
        <div id="popUserInfo" class="shadowBox">
            <a href="#popclose" class="btn-layerClose" onclick="fnLoginView(); return false;" ><img src="/resources/images/btn/btn_popclose.png" alt="닫기"></a>
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
                    <!-- <a href="#qr" onclick="fnQRSave(); return false;"><img src="/resources/images/icon/ic_pcon_2.png" alt="QR 다운로드">&nbsp;QR 다운로드</a> -->
                </div>
                <div id="popMyInfo">
                    <ul>                        
                        <!-- <li>
                            <img src="/resources/images/icon/ic_pcon_3.svg" alt="이메일">                            
                            <span id="popLogEmail">help@rysoft.co.kr</span>
                        </li>
                        <li>
                            <img src="/resources/images/icon/ic_pcon_4.png" alt="휴대전화번호">                            
                            <span id="popLogMobile">010-0000-0000</span>
                        </li> -->
                        <!--로그아웃 버튼-->
                        <li>
                            <a href="/login/logout" class="colRed" onclick="if(!confirm('로그아웃하시겠습니까?')) return false;">
                            <img src="/resources/images/icon/ic_logout.png" alt="로그아웃" >
                            &nbsp;로그아웃</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>        
    </section>