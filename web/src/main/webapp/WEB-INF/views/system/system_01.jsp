<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/_include/common.jsp" %>
	<%@ include file="/WEB-INF/views/_include/html_head.jsp" %>	
	<script src="/resources/js/paging.js?ver=20230330103500000"></script>
	<script src="/resources/js/_system/system_01.js?ver=20230330103500000"></script>
    <style>
        #userCont{display: grid; margin-top: 15px; grid-template-columns: 1fr .7fr;}
        #userCont > section:first-child{margin-right: 10px;}
        #userCont > section{padding:15px;}
        
        #btnDelete {display: none;}
    </style>		
</head>
<body>
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
					시스템 관리&nbsp;&nbsp;<span class="ftNormal colGray2">운영자 관리</span>
				</p>
				<div id="leftTop">
				</div>
			</section>
			<section class="lmMenu">
				<h3><img src="/resources/images/sub/leftMenu_icon_01.png" alt="대메뉴">&nbsp;&nbsp;<span
						id="leftMenuTop">시스템 관리<!-- 대메뉴 --></span></h3>
				<ul id="leftMenuList">
					<li class="lmChoice"><a href="/WEB-INF/views/system/system_01.html">운영자 관리</a></li>
					<li><a href="/WEB-INF/views/system/system_02.html">코드 관리</a></li>
				</ul>
			</section>
			<footer></footer>
		</section>
		<section class="contens">
	
            <section class="schBox">
                <p>총 <span id="totalCnt" class="colPoint">0</span>건</p>&nbsp;
                <select id="selSchAdTp" name="selSchAdTp" style="width:120px;">
                    <option value="0">권한</option>
                </select>&nbsp;                    
                <select id="selSch" name="selSch" style="width:120px;">
                    <option value="1">성명</option>
                    <option value="2">사번(ID)</option>
                </select>
                <input type="text" maxlength="100" id="txtSch" name="txtSch" style="width:200px;">&nbsp;
                <input type="submit" id="btnSch" name="btnSch" class="btn btnPoint" value="검색" >
            </section>
            <section id="userCont">
                <section class="shadowBox">
                    <section class="tableBody">
                        <table id="adminList" class="tableList">
                        	<colgroup>
                        		<col style="width: 22%" />                        		
                        		<col style="width: 11%" />
                        		<col style="width: 11%" />
                        		<col style="width: 11%" />
                        		<col style="width: 16%" />
                        		<col style="width: 12%" />
                        		<col />
                        	</colgroup>
                            <thead>
                                <tr>
                                    <th>회사</th>
                                    <th>성명</th>
                                    <th>직위</th>
                                    <th>ID</th>
                                    <th>연락처</th>
                                    <th>권한</th>
                                    <th>결재권한</th>
                                </tr>
                            </thead>
                            <tbody><!--최대 13개 노출-->
	                            <tr>
	                            	<td colspan="7" class="noData">검색된 운영자가 없습니다.</td>
	                            </tr>
                                <!-- <tr>
                                    <td><p class="text-ellipsis" title="랑연소프트"><span>랑연소프트랑연소프트</span></p></td>  
                                    <td><p class="text-ellipsis" title="홍길동"><span>홍길동</span></p></td>  
                                    <td><p class="text-ellipsis" title="대표이사"><span>대표이사</span></p></td>  
                                    <td><p class="text-ellipsis" title="id"><span>id</span></p></td>
                                    <td>총괄관리자</td>                                    
                                </tr> -->
                            </tbody>
                        </table>
                    </section>
                    <section id="pagingView" class="paging">
                        <button class="img brNo" onclick="location.href='#'; return false;"><img src="/resources/images/btn/paging_first_n.gif" alt="first"></button><button class="img no" ><img src="/resources/images/btn/paging_prev_n.gif" alt="before"></button>
                        <button class="on" onclick="return false;">1</button> 
                        <!-- <button onclick="location.href='#';return false;">2</button>  
                        <button onclick="location.href='#';return false;">3</button>  
                        <button onclick="location.href='#';return false;">4</button>  
                        <button onclick="location.href='#';return false;">5</button> -->  
                        <button class="img brNo" onclick="location.href='#';return false;"><img src="/resources/images/btn/paging_next_n.gif" alt="next"></button><button class="img" onclick="location.href='#';return false;"><img src="/resources/images/btn/paging_last_n.gif" alt="last"></button>
                    </section>
                </section>
                <section class="shadowBox">
                    <table id="adminInput" class="tableView">
                    	<colgroup>
                    		<col style="width: 20%;">
                    		<col style="width: 30%;">
                    		<col style="width: 20%;">
                    		<col style="width: 30%;">
                    	</colgroup>
	                    <tbody>
	                        <tr>
	                            <th><span class="colRed">*</span> 성명</th>
	                            <td colspan="3">
	                            	<input type="text" id="txtNm" name="txtNm" maxlength="100" data-uidx="0" style="padding-right: 50px;" placeholder="성명 검색 후 선택">
	                            	<a href="#company" class="btn btnS btnBlue" style="display: block; position: relative; float: right; margin: -27px 5px 0 0;" >추가</a>
	                            	<div id="userSchResult"><!-- 검색 목록 --></div>
	                            </td>
	                        </tr>
	                        <!-- <tr>
	                            <th>일반전화</th>
	                            <td><span id="lblPhone">-</span></td> 
	                            <th>휴대전화</th>
	                            <td><span id="lblMobile">-</span></td> 
	                        </tr>
	                        <tr>
	                            <th>회사</th>
	                            <td><span id="lblComNm">-</span></td> 
	                            <th>이메일</th>
	                            <td><span id="lblEmail">-</span></td> 
	                        </tr> -->
	                        <tr>
	                            <th>권한</th>
	                            <td>
	                                <select id="selAdTp" name="selAdTp">
	                                    <option value="0">선택</option>
	                                </select>
	                            </td> 
	                            <th>결재 권한</th>
	                            <td>
	                                <select id="selSgTp" name="selSgTp">
	                                    <option value="0">선택</option>
	                                </select>
	                            </td> 
	                        </tr>	                        
	                        <tr>
	                            <th>메모</th>
	                            <td colspan="3"><textarea id="txtAdminMemo" name="txtAdminMemo" style="height:100px;"></textarea></td>
	                        </tr>
	                    </tbody>
                    </table>
                    <div class="btnRight pdT10">
                        <a href="#reg" class="btn btnPoint" id="btnInput" >등록</a> 
                        <a href="#del" class="btn btnRed" id="btnDelete" >삭제</a>
                        <a href="#can" class="btn btnWhite" >취소</a> 
                    </div>
                </section>
            </section>
  
</body>
</html>	