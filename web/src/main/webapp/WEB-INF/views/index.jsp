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
    <!-- js -->
    <script src="/resources/js/html5/html5shiv.js"></script>
    <script src="/resources/js/html5/placeholders.min.js"></script>
    <script src="/resources/js/jquery/jquery-1.11.0.min.js"></script>
    <script src="/resources/js/jquery/jquery-ui.js"></script>
    <script src="/resources/js/function.js?ver=20250624103500000"></script>
    <!-- css -->
    <link href="/resources/css/common.css?ver=20250624103500000" rel="stylesheet">
    <!-- js -->
    <script src="/resources/js/layout.js?ver=20250624103500000"></script>
    <!-- font-->
    <link href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css" rel="stylesheet">
    
    <!-- css -->
    <link href="/resources/css/jquery-ui.css?ver=20250624103500000" rel="stylesheet">
    <link href="/resources/css/layout.css?ver=20250624103500000" rel="stylesheet">
    <link href="/resources/css/sub.css?ver=20250624103500000" rel="stylesheet">
    
    <link href="/resources/css/index.css?ver=20250624103500000" rel="stylesheet">
</head>
<body>
	<!-- top -->
	<%@ include file="/WEB-INF/views/include/body_top.jsp" %>

	<!-- 컨텐츠 -->
    <section class="board">
        <section class="mainBoard">
            <!--//근태관리-->
            <div class="tA">
                <div class="mTitle">
                    <span class="ftSize20 ftBold">근태관리</span>&nbsp;&nbsp;&nbsp;
                    <a href="/mypage/01" class="moreBtn">more +</a>
                </div>
                <div class="contBox">
                    <p id="today" class="mgB20 ftSize18 ftMedium">
                        <span class="ftSize20 ftMedium"></span>
                        <span class="ftSize20 ftMedium"></span>
                        <span class="ftSize20 ftMedium"></span>
                        <span class="ftSize20 ftMedium"></span>
                    </p>
                   <p class="mgTB10">출근시간 <span id="goWork" class="floatR colGray2">-</span></p>
                   <p>퇴근시간 <span id="backWork" class="floatR colGray2">-</span></p>
                   <p class="mgTB10">남은연차 <span id="yearLeave" class="floatR colGray2">0</span></p>
                   <div class="txtC">
                   <p class="fick">
	                   <img src="/resources/images/icon/ic_fick.svg" alt="중요"><span id="quarter"></span>
	                   <span id="workInTime"></span> ~ 퇴근
	                   <span id="workOutTime"></span> 적용중
                   </p>
					</div>
                </div>
            </div>
            <!--근태관리//-->
            <!--//프로젝트-->
            <div class="project">
                <div class="mTitle">
                    <span class="ftSize20 ftBold">프로젝트</span> &nbsp;&nbsp;
                    <select name="selSchPj" id="selSchPj" style="width:180px">
                    </select>
                    <a href="/schedule/02" class="moreBtn">more +</a>
                </div>
                <div class="contBox" id="projectShow" style="display:none;">
                    <!--그래프 영역-->
                    <div class="projectGraph">
						<div class='wrap'>
							<div class='container'>
								<div class="chart doughnut1">
									<div class="center2"></div>
									<div class="grayCenter">
										<div class="center">
											<div style="margin-top: 20px;">
												<div class="font1">
													년 <b>월</b>
												</div>
												<div class="font2">0%</div>
												<div class="font3">진행률</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
                    <p class="txtC">
	                    <span id="projectNm"></span>&nbsp;|&nbsp;
	                    <span id="projectUser"class="colGray2"></span>
                    </p>
                    <div class="progress mgTB10">
                        <p id="projectPg" style="width: 0%;">&nbsp;</p>
                        <span>D-day &nbsp;<span id="projectPgTxt"></span></span>
                    </div>
                </div>
                <div class="contBox" id="projectHide">
                	<span class="noData pdL20">검색된 프로젝트가 없습니다.</span>
                </div>
            </div>
            <!--프로젝트//-->
            <!--//주간일정-->
            <div class="weekly">
                <div class="mTitle">
                        <span class="ftSize20 ftBold">주간일정</span> &nbsp;&nbsp;
                        <a href="/schedule/01" class="moreBtn">more +</a>
                    </div>
                <div id="contentswrap1" class="contentswrap shadowBox contBox">
                    <div id="indexSchedule">
                        <table>
                            <colgroup>
                            	<col style="width:10%">
                                <col style="width:10%">
                                <col style="width:10%">
                                <col style="width:10%">
                                <col style="width:10%">
                                <col style="width:10%">
                                <col style="width:10%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th class="colRed sunday">일요일</th>        
                                    <th class="monday">월요일</th>        
                                    <th class="tuesday">화요일</th>        
                                    <th class="wednesday">수요일</th>        
                                    <th class="thursday">목요일</th>        
                                    <th class="friday">금요일</th>
                                    <th class="colBlue2 saturday">토요일</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td id="sunday"></td>
                                    <td id="monday"></td>
                                    <td id="tuesday"></td>
                                    <td id="wednesday"></td>
                                    <td id="thursday"></td>
                                    <td id="friday"></td>
                                    <td id="saturday"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!--주간일정//-->
            <!--//게시판-->
            <div class="bulletin">
                <div class="mTitle">
                    <span class="ftSize20 ftBold">게시판</span>
                    <a href="/clipboard/01" class="moreBtn">more +</a>
                </div>
                
                <div class="contBox">
                    <div class="noticeTop">
                        <a href="#">&nbsp;&nbsp;<img src="/resources/images/icon/notice_icon.png" alt="Notice"><span class="ftBold ftSize16"
                                id="noticeTxt">-</span></a>
                    </div>
                    <div class="tabMenuList" id="boardMenu">
                        <ul>
                            <li data-mbidx="0" class="choicebulletin"><a href="#all">전체</a></li>
                            <li data-mbidx="11"><a href="/WEB-INF/views/clipboard/clipboard_01.html">공지사항</a></li>
                            <li data-mbidx="17"><a href="/WEB-INF/views/clipboard/clipboard_02.html">자료실</a></li>
                            <li data-mbidx="18"><a href="/WEB-INF/views/clipboard/clipboard_03.html">업무공유</a></li>
                        </ul>
                    </div>
                    <div class="tabMenuCont">
                        <ul>
                            <li>
                                <a href="#">전체</a>
                                <ul id="boardList">
	                                <li style="text-align:center;">
	                                	<span class="noData">검색된 게시글이 없습니다.</span>
	                                <li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--게시판//-->
        </section>
        <!--my place-->
        <section class="myPlace">
            <p class="ftSize20 ftBold mP">My Place &nbsp;&nbsp;
            <a href="#memo" ><img src="/resources/images/icon/ic_memo.png" alt="추가">추가</a>
            </p>
            <div class="mDiv" id="memoBox">
                <div class="memo">
                    <div class="placeTitle">
                        <span class="pdL5 colGray2">2023-06-15 10:55</span>
                        <div class="floatR" data-uidx="12" data-rdate="2023-06-15 10:55:27">
                            <a href="#" class="btn btnS btnWhite memoSave" onclick="fnMemoInput($(this)); return false;">저장</a>&nbsp;
                            <a href="#" class="btn btnS btnBlueLine memoDel" onclick="fnMemoDelete($(this)); return false;">삭제</a>
                        </div>
                        <textarea rows="5" cols="5" class="txtMemo">테스트 메모</textarea>
                    </div>
                </div>
                <div class="memo">
                    <div class="placeTitle">
                        <span class="pdL5 colGray2">2023-06-15 10:55</span>
                        <div class="floatR" data-uidx="12" data-rdate="2023-06-15 10:55:27">
                            <a href="#" class="btn btnS btnWhite memoSave" onclick="fnMemoInput($(this)); return false;">저장</a>&nbsp;
                            <a href="#" class="btn btnS btnBlueLine memoDel" onclick="fnMemoDelete($(this)); return false;">삭제</a>
                        </div>
                        <textarea rows="5" cols="5" class="txtMemo">테스트 메모</textarea>
                    </div>
                </div>
                <div class="memo">
                    <div class="placeTitle">
                        <span class="pdL5 colGray2">2023-06-15 10:55</span>
                        <div class="floatR" data-uidx="12" data-rdate="2023-06-15 10:55:27">
                            <a href="#" class="btn btnS btnWhite memoSave" onclick="fnMemoInput($(this)); return false;">저장</a>&nbsp;
                            <a href="#" class="btn btnS btnBlueLine memoDel" onclick="fnMemoDelete($(this)); return false;">삭제</a>
                        </div>
                        <textarea rows="5" cols="5" class="txtMemo">테스트 메모</textarea>
                    </div>
                </div>
                <div class="memo">
                    <div class="placeTitle">
                        <span class="pdL5 colGray2">2023-06-15 10:55</span>
                        <div class="floatR" data-uidx="12" data-rdate="2023-06-15 10:55:27">
                            <a href="#" class="btn btnS btnWhite memoSave" onclick="fnMemoInput($(this)); return false;">저장</a>&nbsp;
                            <a href="#" class="btn btnS btnBlueLine memoDel" onclick="fnMemoDelete($(this)); return false;">삭제</a>
                        </div>
                        <textarea rows="5" cols="5" class="txtMemo">테스트 메모</textarea>
                    </div>
                </div>
                <div class="memo">
                    <div class="placeTitle">
                        <span class="pdL5 colGray2">2023-06-15 10:55</span>
                        <div class="floatR" data-uidx="12" data-rdate="2023-06-15 10:55:27">
                            <a href="#" class="btn btnS btnWhite memoSave" onclick="fnMemoInput($(this)); return false;">저장</a>&nbsp;
                            <a href="#" class="btn btnS btnBlueLine memoDel" onclick="fnMemoDelete($(this)); return false;">삭제</a>
                        </div>
                        <textarea rows="5" cols="5" class="txtMemo">테스트 메모</textarea>
                    </div>
                </div>
                
            </div>
        </section>
    </section>
	<script>
            
    </script>
	<!--// pwa -->
	<script src="/index-init.js"></script>
	<!-- pwa //-->       
	<!--// firebase -->
	<script type="module" src="/firebase-init.js"></script>
	<!-- firebase //-->
        
</body>
</html>