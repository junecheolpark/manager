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
	                            <th><span class="colRed">*</span> 아이디</th>
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
	                            <th>주소 <a href="#addr"><img src="/resources/images/btn/btn_sch.png" alt="검색" style="width:20px" onclick="fnAddrSch(); return false;"></a></th>
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
                        <a href="#reg" class="btn btnPoint" id="btnInput" onclick="fnUserInput(); return false;">등록</a> 
                        <a href="#del" class="btn btnRed" id="btnDelete" onclick="fnUserDelete(); return false;">삭제</a>
                        <a href="#can" class="btn btnWhite" onclick="fnUserCancel(); return false;">취소</a>
                    </div>
            	</section>
        	</section>
		</section>
	</section>
	
	<!-- iOS에서는 position:fixed 버그가 있음, 적용하는 사이트에 맞게 position:absolute 등을 이용하여 top,left값 조정 필요 -->
	<div id="addrSchView" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;">
		<img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="fnAddrSchClose()" alt="닫기 버튼">	
	</div>
	
	<script>
	    // 우편번호 찾기 화면을 넣을 element
	    var element_layer = document.getElementById('addrSchView');
	
	    function fnAddrSchClose() {
	        // iframe을 넣은 element를 안보이게 한다.
	        element_layer.style.display = 'none';
	    }
	
	    function fnAddrSch() {
	        new daum.Postcode({
	            oncomplete: function(data) {
	                // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
	                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	                var addr = ''; // 주소 변수
	                var extraAddr = ''; // 참고항목 변수
	
	                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                    addr = data.roadAddress;
	                } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                    addr = data.jibunAddress;
	                }
	
	                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
	                if(data.userSelectedType === 'R'){
	                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
	                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
	                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
	                        extraAddr += data.bname;
	                    }
	                    // 건물명이 있고, 공동주택일 경우 추가한다.
	                    if(data.buildingName !== '' && data.apartment === 'Y'){
	                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                    }
	                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
	                    if(extraAddr !== ''){
	                        extraAddr = ' (' + extraAddr + ')';
	                    }
	                    // 조합된 참고항목을 해당 필드에 넣는다.
	                    //document.getElementById("txtAddrDetail").value = extraAddr;
	                
	                } else {
	                    //document.getElementById("txtAddrDetail").value = '';
	                }
	
	                // 우편번호와 주소 정보를 해당 필드에 넣는다.
	                document.getElementById('txtZipCd').value = data.zonecode;
	                document.getElementById("txtAddr").value = addr + '' + extraAddr;
	                // 커서를 상세주소 필드로 이동한다.
	                document.getElementById("txtAddrDetail").focus();
	
	                // iframe을 넣은 element를 안보이게 한다.
	                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
	                element_layer.style.display = 'none';
	            },
	            width : '100%',
	            height : '100%',
	            maxSuggestItems : 5
	        }).embed(element_layer);
	
	        // iframe을 넣은 element를 보이게 한다.
	        element_layer.style.display = 'block';
	
	        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
	        initLayerPosition();
	    }
	
	    // 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
	    // resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
	    // 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
	    function initLayerPosition(){
	        var width = 300; //우편번호서비스가 들어갈 element의 width
	        var height = 400; //우편번호서비스가 들어갈 element의 height
	        var borderWidth = 2; //샘플에서 사용하는 border의 두께
	
	        // 위에서 선언한 값들을 실제 element에 넣는다.
	        element_layer.style.width = width + 'px';
	        element_layer.style.height = height + 'px';
	        element_layer.style.border = borderWidth + 'px solid';
	        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
	        element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
	        element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
	    }
	</script>

</body>
</html>	