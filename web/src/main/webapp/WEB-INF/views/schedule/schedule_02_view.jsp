<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/include/common.jsp" %>
	<%@ include file="/WEB-INF/views/include/html_head.jsp" %>	
    <!--// 달력 -->
    <script src="/resources/plugin/datepicker/datepicker.min.js?ver=20230330103500000"></script>
    <script src="/resources/plugin/datepicker/datepicker.ko-KR.js?ver=20230330103500000"></script>
    <link href="/resources/plugin/datepicker/datepicker.min.css?ver=20230330103500000" rel="stylesheet" />
    <!--// 달력 -->
    <link href="/resources/css/_schedule/schedule_03.css" rel="stylesheet">
    <script src="/resources/js/_schedule/schedule_03_view.js"></script>
</head>
<body>

	<!-- top -->
	<%@ include file="/WEB-INF/views/include/body_top.jsp" %>	
	<!-- left -->
	<%@ include file="/WEB-INF/views/include/body_left.jsp" %>
	
    <!-- 컨텐츠 -->
    <section class="schBox">
        <input type="hidden" id="chargeIndex" value="0">
        <input type="hidden" id="pwInput" value="0">
        <input type="hidden" id="pdInput" value="0">

        <ul id="projectSchBox">
            <li>
                <span>프로젝트 진행률</span>
                <span id="projectPg"></span>
            </li>
            <li>
                <span>프로젝트 일정</span>
                <span id="projectSd"></span>
            </li>
            <li>
                <span>프로젝트 상태</span>
                <span id="projectSt"></span>
                <span id="projectDate"></span>
            </li>
            <li>
                <a href="#" id="offMemo" >메모 접기</a>
                <a href="#" id="onMemo" class="onMeno">메모 펼치기</a>
            </li>
        </ul>
    </section>

    <!--세부 프로젝트가 없을 경우 노출-->
    <section class="noproCont">
        <div class="noProject" style="display:none;">
            <p class="colGray2 txtC"><img src="/resources/images/sub/noProjec.png" alt="담당 프로젝트가 없습니다."><br />프로젝트 업무가 없습니다.</p>
        </div>
    </section>

    <!--프로젝트 내용-->
	<section id="projectCont">
		<div class="proList">
			<div class="plTop">
				<p id="projectNm"></p>
				<div class="clickView">
					<a href="#" id="menuTg" onclick="fnToggleClick(1); return false;">
							<svg xmlns="http://www.w3.org/2000/svg" width="21" height="23" viewBox="0 0 21 23">
							<g id="그룹_1342" data-name="그룹 1342" transform="translate(-918 -206)">
							<g id="타원_246" data-name="타원 246" transform="translate(918 209)" fill="#fff" stroke="#ccc" stroke-width="1">
							<ellipse cx="10.5" cy="10" rx="10.5" ry="10" stroke="none" />
							<ellipse cx="10.5" cy="10" rx="10" ry="9.5" fill="none" /></g>
							<text id="_..." data-name="..." transform="translate(923 220)" fill="#ccc" font-size="14" font-family="SUIT-Regular, SUIT">
							<tspan x="0" y="0">...</tspan></text></g></svg></a>
					<ul class="clickvCont">
						<li><a href="#" onclick="fnProjectExcel(); return false;">엑셀 다운로드</a></li>
						<li><a href="#" onclick="fnReady(); return false;" style="display: none;">프로젝트 수정</a></li>
						<li><a href="#" onclick="fnReady(); return false;" style="display: none;">프로젝트 삭제</a></li>
					</ul>
				</div>
			</div>
			<ul class="plList scrollNone">
			</ul>
			<!-- 버튼 클릭 시, 프로젝트 업무 추가 팝업 노출(기존동일) -->
			<div>
				<a href="#" class="btn btn100 btnWhite" onclick="fnProjectOpenPopUp()">프로젝트 업무 추가</a>
			</div>
		</div>
		<%--세부 카테고리가 없는 경우 노출--%>
		<div class="noList" style="display: none;">
			<div>
				<p>세부 프로젝트를 추가해주세요.</p>
				<a href="#" class="btn btnPointLine">등록</a> <select>
					<option selected></option>
				</select>
			</div>
		</div>
		<!-- 프로젝트 업무 상세 뷰 -->
		<div class="proCont" style="display: none;">

			<%--            <div class="noProCon" style="display:none;">--%>
			<%--                <p class="colGray2 txtC"><img src="/resources/images/sub/noProjec.png" alt="담당 프로젝트가 없습니다."><br />프로젝트 업무가 없습니다.</p>--%>
			<%--            </div>--%>

			<div class="proCon">
				<!-- 업무 상세 -->
				<div class="procTop">
					<!-- 프로젝트 카테고리명 -->
					<div class="procLeft"></div>

					<!-- 토글(수정/삭제) 및 등록 버튼 -->
					<div class="procRight">
						<p>
							<span id="CompletCnt" class="ftBold colPoint">0</span> / <span id="totalCnt" class="colGray2 ftSize12">0</span>
						</p>
						<div class="clickView">
							<a href="#" id="subCateTg" onclick="fnToggleClick(2); return false;"> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="23" viewBox="0 0 21 23">
									<g id="그룹_1342" data-name="그룹 1342" transform="translate(-918 -206)">
									<g id="타원_246" data-name="타원 246" transform="translate(918 209)" fill="#fff" stroke="#ccc" stroke-width="1">
									<ellipse cx="10.5" cy="10" rx="10.5" ry="10" stroke="none" />
									<ellipse cx="10.5" cy="10" rx="10" ry="9.5" fill="none" /></g>
									<text id="_..." data-name="..." transform="translate(923 220)" fill="#ccc" font-size="14" font-family="SUIT-Regular, SUIT">
									<tspan x="0" y="0">...</tspan></text></g></svg>
							</a>
							<!-- clickView에 a태그 클릭 시 노출/ 재클릭 시 숨김 -->
							<ul class="clickvCont">
								<li><a href="#" onclick="fnProjectWorkEditClick(); return false;">프로젝트 수정</a></li>
								<li><a href="#" onclick="fnProjectDelete(2,0,0,0,$(this)); return false;">프로젝트 삭제</a></li>
							</ul>
						</div>
						<a href="#" id="subCateSaveBtn" class="btn btnPointLine">등록</a>
					</div>

					<!-- 담당자 및 참조 -->
					<div id="personBox" class="personBox">
						<!-- 담당자 -->
						<div class="charge"></div>

						<!-- 참조 (메일 발송)-->
						<div class="cc">
							<%--                            <span>참조</span>--%>
							<%--                            <ul>--%>
							<%--                                <li>--%>
							<%--                                    <div><img src="/resources/images/common/no_Image.jpg" alt="담당자">--%>
							<%--                                        <span class="chargeSel">김상범</span>--%>
							<%--                                    </div><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="9.414" height="9.414" viewBox="0 0 9.414 9.414"><g id="그룹_1347" data-name="그룹 1347" transform="translate(-15577.005 5160.995)"><line id="선_254" data-name="선 254" x2="8" y2="8" transform="translate(15577.712 -5160.288)" fill="none" stroke="#999" stroke-linecap="round" stroke-width="1"/><line id="선_255" data-name="선 255" x1="8" y2="8" transform="translate(15577.712 -5160.288)" fill="none" stroke="#999" stroke-linecap="round" stroke-width="1"/></g></svg></a>--%>
							<%--                                </li>--%>
							<%--                                <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="13.314" height="13.314" viewBox="0 0 13.314 13.314"><g id="그룹_1333" data-name="그룹 1333" transform="translate(6.657 1) rotate(45)"><line id="선_254" data-name="선 254" x2="8" y2="8" fill="none" stroke="#999" stroke-linecap="round" stroke-width="1"/><line id="선_255" data-name="선 255" x1="8" y2="8" fill="none" stroke="#999" stroke-linecap="round" stroke-width="1"/></g></svg></a></li>--%>
							<%--                            </ul>--%>
						</div>
					</div>

				</div>

				<!-- 서브 카테고리 상세 리스트 -->
				<ul class="procList" id="procList">

				</ul>
			</div>

			<!-- 프로젝트 상세 업무 입력 팝업 -->
			<div class="proInput" style="display: none">
				<div id="subCateCancelBtn" class="mgB20">
					<span class="ftBold ftSize16"><img src="/resources/images/icon/ic_info_02.png" alt="info">&nbsp;상세 업무 정보</span> <a href="#"><img src="/resources/images/btn/btn_popclose.png" alt="닫기"></a>
				</div>
				<div class="inputBox" id="inputBox">
					<ul>
						<li>
							<p>제목</p> <input type="text" class="txtDPW" value="" placeholder="제목을 입력하세요.">
						</li>
						<li>
							<p>프로젝트 기간</p> <input name="txtSDate" type="text" id="txtSDate" class="cal txtSDate" style="width: 120px;"> <span>~</span> <input name="txtEDate" type="text" id="txtEDate" class="cal txtEDate" style="width: 120px;">
						</li>
						<li>
							<p>프로젝트 담당자</p>
							<%-- <div class="projectSearch">
								<input type="text" id="userSearch" class="userSearch">
								<div id="userFrame" style="display: none">
									<ul>
										                                       <li class="pgUser">공이현</li>
										                                       <li class="pgUser">김다혜</li>
										                                       <li class="pgUser">김상범</li>
										                                       <li class="pgUser">신승철</li>
										                                       <li class="pgUser">박준철</li>
									</ul>
									<div>
										<p>엔터(Enter), 쉼표(,)를 이용해서 추가해주세요.</p>
										<a href="#">닫기</a>
									</div>

								</div>
								<div id="selectedUser" data-uidx="">
									<span class="chargeSel"></span>
								</div>
								<a href="#"><img src="/resources/images/btn/btn_sch.png" alt="담당자검색"></a>
							</div>
							<div class="projectCharge" data-uidx="">
								<a href="#" onclick="fnCheckListPopUp(3); return false;"> <img src="/resources/images/common/no_Image.jpg" alt="담당자 검색" /> <span class="chargeSel">담당자 검색</span>
								</a>
							</div> --%>
							<div>
	                            <div></div>
	                            <div class="mgB10">
	                            	<input type="text" id="txtNm" name="txtNm" maxlength="100" data-uidx="0" style="padding-right: 50px;" placeholder="담당자 검색 후 선택">
	                            	<a href="#" style="display: block; position: relative; float: right; margin: -30px 5px 0 0;"><img src="/resources/images/btn/btn_sch.png" alt="담당자검색"></a>
	                            	<!-- <a href="#company" class="btn btnS btnBlue" style="display: block; position: relative; float: right; margin: -27px 5px 0 0;" onclick="fnUserAdd('test', 1); return false;">추가</a> -->
	                            	<div id="userSchResult"><!-- 검색 목록 --></div>
	                            </div>
								<div id="projectCharge" class="projectCharge">
									<!-- <div data-uidx=""> 
										<img src="/resources/images/common/no_Image.jpg" alt="담당자 검색" /> 
										<span class="chargeSel">테스트</span>
										<a href="#del" class="btnSchDtAddrDel pdR5" onclick>×</a>
									</div>
									<div> 
										<img src="/resources/images/common/no_Image.jpg" alt="담당자 검색" /> 
										<span class="chargeSel">테스트</span>
										<a href="#del" class="btnSchDtAddrDel pdR5">×</a>
									</div>
									<div> 
										<img src="/resources/images/common/no_Image.jpg" alt="담당자 검색" /> 
										<span class="chargeSel">테스트</span>
										<a href="#del" class="btnSchDtAddrDel pdR5">×</a>
									</div>
									<div> 
										<img src="/resources/images/common/no_Image.jpg" alt="담당자 검색" /> 
										<span class="chargeSel">테스트</span>
										<a href="#del" class="btnSchDtAddrDel pdR5">×</a>
									</div> -->
								</div>
							</div>
						</li>
						<li>
							<p>내용</p> <textarea name="" class="txtDConts" id="" cols="30" rows="25"></textarea>
						</li>
					</ul>
				</div>
				<div class="txtR mgT20">
					<a href="#" style="display: none" class="btn btnRed spgDelBtn" onclick="fnProjectDelete(3,0,0,0,$(this),2); return false;">삭제</a> <a href="#" class="btn btnPoint spgSaveBtn" onclick="fnProjectDetailInput($(this)); return false;">등록</a>
				</div>
			</div>
		</div>
	</section>

	<!-- 카테고리 등록 팝업-->
    <section id="calProject" class="dim-layer" style="display:none;">
        <section class="dimBg"></section>
        <section class="autoSizeLayerBg" style="overflow-y: auto;">
            <div class="autoSizeLayer ui-draggable" style="width: 1000px; margin: 210px auto; position: relative;">
                <div class="autoSizeLayerT">
                    <div class="autoSizeLayerCls"><a href="#popclose" class="btn-layerClose"><img src="/resources/images/btn/btn_popclose.png" alt="닫기"></a></div>
                    <div class="autoSizeLayerTInner"><h4 class="ui-draggable-handle txtC">프로젝트 업무 설정</h4></div>
                </div>
                <div class="autoSizeLayerCont">
                    <div class="autoSizeLayerContBody">
						<div class="tableTitle">
							<p class="mgB10">
								<img src="/resources/images/icon/ic_info_02.png" alt="info">&nbsp; <span class="ftBold ftSize16">프로젝트 업무 정보</span>
							</p>
							<p>
								<span class="tableBtn"> <a href="/_Business/Business_Write_01.aspx" id="addBtn" class="btn btnPoint" onclick="fnProjectAdd(); return false;">추가</a>
								</span>
							</p>
						</div>
						<table class="tableView" id="projectWorkInput">
                            <colgroup>
                                <col style="width:20%">
                                <col style="width:auto">
                                <col style="width:24px">
                            </colgroup>
                            <tbody>
                            <tr>
                                <th>업무명</th>
                                <td><input name="txtConts" class="txtConts"></td>
                                <td><a href="#" onclick="fnProjectDeleteBtn($(this))"><img src="/resources/images/btn/btn_elimination.png" alt="삭제"></a></td>
                            </tr>
                            <!-- <tr>
                                <td colspan="7" style="text-align: center;"><a href="#" class="btn btnWhite" id="addBtn" onclick="fnProjectAdd(); return false;">프로젝트 업무 추가</a></td>
                            </tr> -->
                            </tbody>
                        </table>
                    </div>
                    <div class="autoSizeLayerF">
                        <a id="btnSave" class="btn btnPoint" href="#" onclick="fnProjectWorkInput(); return false;">등록</a>
                        <a href="#popclose" class="btn btnWhite" onclick="fnProjectClose(); return false;">닫기</a>
                    </div>
                </div>
            </div>
        </section>
    </section>
    <!--//카테고리 등록 팝업-->

    <!-- 담당자 선택 팝업 -->
    <section id="CheckList" class="dim-layer">
        <section class="dimBg"></section>
        <section class="autoSizeLayerBg">
            <div class="autoSizeLayer" style="width: 350px;">
                <div class="autoSizeLayerT">
                    <div class="autoSizeLayerCls">
                        <a href="#popclose" class="userAdd" onclick="fnLayerPopupClose('CheckList'); return false;">
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
                                    <input type="checkbox" name="userSelect2" onclick="fnCheckAll();" class="noBorder" />
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
                        <a href="#popclose" id="userAdd" class="btn btnPoint" data-user="0"
                           onclick="fnUserSelect(); return false;">확인</a> <a
                            href="#popclose" class="btn btnWhite"
                            onclick="fnLayerPopupClose('CheckList'); return false;">닫기</a>
                    </div>
                </div>
            </div>
        </section>
    </section>
    <!-- //담당자 선택 팝업 -->

</body>
</html>