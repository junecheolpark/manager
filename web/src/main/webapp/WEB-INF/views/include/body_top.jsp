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
                <li><a href="/user/01">사용자관리</a></li>
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
                        </ul>
                    </li>
                    <li>
                        <a href="/user/01">사용자 관리</a>
                        <ul>
                            <li><a href="/user/01">사용자 관리</a></li>
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
                            <li><a href="/system/01">코드 관리</a></li>
                            <li><a href="/system/02">연차관리</a></li>
                        </ul>
                    </li>
                </ul>
            </div>           
        </div>        
        <div class="userInfo">
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
                <p id="userName">
                    <span id="popLogNm" class="ftBold ftSize18 mgB5"><!-- 성명 --></span>
                    <span id="popLogDept"class="colGray2"><!-- 부서 --></span>
                </p>
            </div>
            <div class="popInfoCont">
                <div id="popMyInfo">
                    <ul>                        
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