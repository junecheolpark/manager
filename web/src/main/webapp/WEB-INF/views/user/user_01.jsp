<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/include/common.jsp" %>
	<%@ include file="/WEB-INF/views/include/html_head.jsp" %>	

	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<!--// 달력 -->
	<script src="/resources/plugin/datepicker/datepicker.min.js?ver=20230330103500000"></script>
	<script src="/resources/plugin/datepicker/datepicker.ko-KR.js?ver=20230330103500000"></script>
	<link href="/resources/plugin/datepicker/datepicker.min.css?ver=20230330103500000" rel="stylesheet" />
	<!-- 달력 //-->
	<script src="/resources/js/paging.js?ver=20250624103500000"></script>
	<script src="/resources/js/user/user_01.js?ver=20250624103500000"></script>
    <style>
        #userManagement{display: grid; margin-top: 15px; grid-template-columns: 1fr .7fr;}
        #userManagement > section{padding:15px;}
        #userManagement > section:first-child{margin-right: 10px;}
        
        #btnDelete {display: none;}
    </style>	
</head>
<body>
			<!-- top -->
			<%@ include file="/WEB-INF/views/include/body_top.jsp" %>	
			<!-- left -->
			<%@ include file="/WEB-INF/views/include/body_left.jsp" %>
			<!-- 컨텐츠 -->
            <section class="schBox">
                <p>총 <span id="totalCnt" class="colPoint">0</span>건</p>&nbsp;
                <select id="selSchUserTp" name="selSchUserTp" style="width:120px;">
                    <option value="0">구분</option>
                </select>&nbsp;                
                <select id="selSchUserSts" name="selSchUserSts" style="width:120px;">
                    <option value="0">상태</option>
                </select>&nbsp;
                <input type="text" id="txtSchCom" name="txtSchCom" maxlength="100" style="width:200px;" placeholder="회사">&nbsp;
                <select id="selSch" name="selSch" style="width:120px;">
                    <option value="1">성명</option>
                    <option value="2">사번(ID)</option>
                    <option value="3">연락처</option>
                    <option value="4">이메일</option>
                </select>
                <input type="text" id="txtSch" name="txtSch" style="width:200px;" maxlength="100">&nbsp;
                <input type="submit" id="btnSch" name="btnSch" class="btn btnPoint" value="검색" >            
            </section>
            <section id="userManagement">
                <section class="shadowBox">
                    <section class="tableBody">
                        <table id="userList" class="tableList">
                        	<colgroup>
                        		<col style="" />                        		
                        		<col style="width: 12%" />
                        		<col style="width: 12%" />
                        		<col style="width: 14%" />
                        		<col style="width: 17%" />
                        		<col style="width: 15%" />
                        	</colgroup>
                            <thead>
                                <tr>
                                    <th>회사</th>
                                    <th>성명</th>
                                    <th>직위</th>
                                    <th>ID</th>
                                    <th>연락처</th>
                                    <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
	                            <tr>
	                            	<td colspan="6" class="noData">검색된 사용자가 없습니다.</td>
	                            </tr>
                            </tbody>
                        </table>
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
                </section>
                <section class="shadowBox">
                    <table id="userInput" class="tableView">
                        <tbody>
	                        <tr>
	                            <th><span class="colRed">*</span> 회사</th>
	                            <td colspan="3">
	                            	<input type="text" id="txtComNm" name="txtComNm" value="준철컴퍼니" data-cidx="10" maxlength="100" style="padding-right: 50px;" placeholder="회사명 검색 후 선택">
	                            	<!-- <a href="#company" class="btn btnS btnBlue" style="display: block; position: relative; float: right; margin: -27px 5px 0 0;" onclick="fnNewWindow(1); return false;">추가</a> -->
	                            	<div id="companySchResult"><!-- 검색 목록 --></div>
	                            </td>
	                        </tr>
	                        <tr>
	                            <th><span class="colRed">*</span> 성명</th>
	                            <td><input type="text" id="txtNm" name="txtNm" maxlength="100" data-uidx="0"></td>
	                            <th><span class="colRed">*</span> 구분</th>
	                            <td>
	                                <select id="selUserTp" name="selUserTp">
	                                    <option value="0">선택</option>
	                                </select>
	                            </td>
	                        </tr>
	                        <tr>
	                            <th>부서</th>
	                            <td>
	                                <select id="selDept" name="selDept">
	                                    <option value="0">선택</option>
	                                </select>
	                            </td>
	                            <th>직위</th>
	                            <td>
	                                <select id="selPosi" name="selPosi">
	                                    <option value="0">선택</option>
	                                </select>
	                            </td>
	                        </tr>	                        
	                        <tr>
	                            <th><span class="colRed">*</span> 사번(ID)</th>
	                            <td><input type="text" id="txtID" name="txtID" maxlength="100"></td>
	                            <th><span class="colRed" id="pwRequired">*</span> 비밀번호</th>
	                            <td><input type="password" id="txtPW" name="txtPW" maxlength="100"></td>
	                        </tr>
	                        <tr>
	                            <th>일반전화</th>
	                            <td><input type="text" id="txtPhone" name="txtPhone" maxlength="20" placeholder="숫자만 입력" title="숫자 입력 시 자동으로 입력 형식이 적용 됩니다." onkeyup="fnTelFormat(this);"></td>
	                            <th>휴대전화</th>
	                            <td><input type="text" id="txtMobile" name="txtMobile" maxlength="20" placeholder="숫자만 입력" title="숫자 입력 시 자동으로 입력 형식이 적용 됩니다." onkeyup="fnTelFormat(this);"></td>
	                        </tr>
	                        <tr>
	                            <th>주소 <a href="#addr"><img src="/resources/images/btn/btn_sch.png" alt="검색" style="width:20px" ></a></th>
	                            <td colspan="3">
	                            	<div class="ucTable">
	                            		<div style="width: 70px; padding-right: 5px;"><input type="text" id="txtZipCd" name="txtZipCd" maxlength="10" readonly="readonly"></div>
	                            		<div style="width: 40%; padding-right: 5px;"><input type="text" id="txtAddr" name="txtAddr" maxlength="100" readonly="readonly"></div>
	                            		<div style=""><input type="text" id="txtAddrDetail" name="txtAddrDetail" maxlength="100"></div>
	                            	</div>
	                            </td>
	                        </tr>
	                        <tr>
	                            <th>생년월일</th>
	                            <td><input type="text" id="txtBDate" name="txtBDate" class="cal" value="" maxlength="10" placeholder="숫자만 입력" title="숫자 입력 시 자동으로 입력 형식이 적용 됩니다." onkeyup="fnDateMask(this);"></td>
	                            <th>입사일자</th>
	                            <td><input type="text" id="txtJDate" name="txtJDate" class="cal" value="" maxlength="10" placeholder="숫자만 입력" title="숫자 입력 시 자동으로 입력 형식이 적용 됩니다." onkeyup="fnDateMask(this);"></td>
	                        </tr>
	                         <tr>
	                            <th>이메일</th>
	                            <td colspan="3">
	                            	<div class="ucTable">
	                            		<div style="width: 170px; padding-right: 5px;"><input type="text" id="txtEmail" name="txtEmail" maxlength="50"></div>
	                            		<div style="width: 20px; padding-right: 5px;">@</div>
	                            		<div style="min-width: 200px;">
	                            			<input type="text" id="txtEmailDm" name="txtEmailDm" maxlength="50" placeholder="이메일 검색 후 선택">
	                            			<div id="emailSchResult"><!-- 검색 목록 --></div>
	                            		</div>
	                            	</div>
	                            </td>
	                        </tr>
	                        <tr>
	                            <th><span class="colRed">*</span> 상태</th>
	                            <td>
	                                <select id="selUserSts" name="selUserSts">
	                                    <option value="0">선택</option>
	                                </select>
	                            </td>                        
	                            <th>권한</th>
	                            <td><span id="lblAdTpNm" data-atp="0">-<!-- 일반사용자 --></span><!--  <a href="#system" class="btn btnS btnBlue" style="display: block; position: relative; float: right;" onclick="fnNewWindow(2); return false;">수정</a> --></td>
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
		</section>
	</section>

</body>
</html>	