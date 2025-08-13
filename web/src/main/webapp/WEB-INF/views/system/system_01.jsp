<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<!-- head -->
	<%@ include file="/WEB-INF/views/include/common.jsp" %>
	<%@ include file="/WEB-INF/views/include/html_head.jsp" %>	
	<script src="/resources/js/system/system_01.js?ver=20250624103500000"></script>
    <link href="/resources/css/index.css?ver=20250624103500000" rel="stylesheet">
	<style>
    	#codeManagement{display: grid; margin-top: 15px; grid-template-columns: 1fr 1fr 1fr;}
        #codeManagement > section{padding:15px; margin-right: 10px; }
        #codeManagement > section:last-child{margin-right: 0;}
    </style>
</head>
<body>
	<!-- top -->
    <%@ include file="/WEB-INF/views/include/body_top.jsp" %>	
    <!-- left -->
    <%@ include file="/WEB-INF/views/include/body_left.jsp" %>
    <!-- 컨텐츠 -->
	<section id="codeManagement">
                <section class="shadowBox">
                    <section class="">
                        <div class="tableTitle pdB10">
                            <p class="ftBold">&nbsp;대분류</p>
                        </div>
                        <div>
                            <div class="DivScrollY AllBorder" style="height:500px;">
                                <table class="tableList" id="CateList1">
                                    <colgroup>
                                        <col style="width: 20%">
                                        <col style="width: 60%">
                                        <col style="width: 20%">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>코드</th>
                                            <th>코드명</th>
                                            <th>상태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                    <!-- <%-- list값이 있다면 --%> -->
                                    <c:if test="${list.size() == 0}">
                                    	<tr><td colspan="4" class="colGray2 ftSize12">검색된 내용이 없습니다.</td></tr>
                                    </c:if>
                                    <c:if test="${list.size() > 0}">
                                    	<c:forEach var="list" items="${list}">
                                    		<tr data-idx="${list.CODE_IDX}">
	                                            <td>${list.CODE_IDX}</td>
	                                            <td><a href="#view">${list.CODE_NM}</a></td>
	                                          
	                                            <!-- <%-- STS(상태)가 1이 아니면 미사용 --%> -->
	                                            <c:if test="${list.CODE_STS eq 1}">
	                                            	<td>사용</td>
	                                            </c:if>
	                                            <c:if test="${list.CODE_STS ne 1}">
	                                            	<td>미사용</td>
	                                            </c:if>
	                                            
                                        	</tr>
                                    	</c:forEach>
                                    </c:if>
                                  
                                    </tbody>
                                </table>
                            </div>
                            <div class="pdT10">
                                <table class="tableView">
                                    <colgroup>
                                        <col style="width: 20%">
                                        <col style="width: 30%">
                                        <col style="width: 20%">
                                        <col style="width: 30%">
                                    </colgroup>
                                    <tbody><tr>
                                        <th>코드명</th>
                                        <td colspan="3">
                                        	<input type="text" id="CateName1" name="CateName1" maxlength="50">
                                        	<input type="hidden" id="CateIdx1" name="CateIdx1">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>코드</th>
                                        <td colspan="3">
                                            <input type="text" id="CateCode1" name="CateCode1" >
                                            <input type="hidden" id="CateSort1" name="CateSort1" value="3">
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>사용 여부</th>
                                        <td colspan="3">
                                            <label><input type="radio" name="CateUse1" value="1" checked="checked"> 사용</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <label><input type="radio" name="CateUse1" value="0"> 미사용</label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            <div class="pdT10 btnRight">
                                <a href="#save" onclick="fnCodeInput(1); return false;" id="btnSave1" class="btn btnPoint">추가</a>
                                <a href="#cancel" onclick="fnCancel(1)" class="btn btnWhite">취소</a>
                            </div>
                        </div>
                    </section>
                </section>
                <section class="shadowBox">
                            <section>
                                <div class="tableTitle">
                                    <p class="ftBold pdB10">&nbsp;중분류</p>             
                                </div>
                                <div class="DivScrollY AllBorder" style="height:500px;">
                                    <table class="tableList" id="CateList2">
                                        <colgroup>
                                            <col style="width: 20%">
                                            <col style="width: 60%">
                                            <col style="width: 20%">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>코드</th>
                                                <th>코드명</th>
                                                <th>상태</th>
                                                <th> <!--순위 변경--> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                <tr><td colspan="4" class="colGray2 ftSize12">대분류를 선택해 주세요.</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="pdT10">
                                    <table class="tableView">
                                    <colgroup>
                                        <col style="width: 20%">
                                        <col style="width: 30%">
                                        <col style="width: 20%">
                                        <col style="width: 30%">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>코드명</th>
                                            <td colspan="3">
                                            	<input type="text" id="CateName2" name="CateName2" maxlength="50">
                                            	<input type="hidden" id="CateIdx2" name="CateIdx2">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>코드</th>
                                            <td colspan="3"><input type="text" id="CateCode2" name="CateCode2" ></td>
                                            <!-- <th>정렬</th> -->
                                            <input type="hidden" id="CateSort2" name="CateSort2" maxlength="2">
                                        </tr>
                                        <tr>
                                            <th>사용 여부</th>
                                            <td colspan="3">
                                                <label><input type="radio" name="CateUse2" value="1" checked="checked"> 사용</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label><input type="radio" name="CateUse2" value="0"> 미사용</label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                <div class="pdT10 btnRight">
                                    <a href="#save" onclick="fnCodeInput(2); return false;" id="btnSave2" class="btn btnPoint">추가</a>
                                    <a href="#cancel" onclick="fnCancel(2)" class="btn btnWhite">취소</a>
                                </div>
                                </div>
                            </section>
                </section>
                <section class="shadowBox">
                            <section class="tableBody">
                                <div class="tableTitle">
                                    <p class="ftBold pdB10">&nbsp;소분류</p>             
                                </div>
                                <div class="tableBox">
                                    <div class="DivScrollY AllBorder" style="height:500px;">
                                        <table class="tableList" id="CateList3">
                                            <colgroup>
                                                <col style="width: 20%">
                                                <col style="width: 60%">
                                                <col style="width: 20%">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>코드</th>
                                                    <th>코드명</th>
                                                    <th>상태</th>
                                                    <th> <!--순위 변경--> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td colspan="4" class="colGray2 ftSize12">중분류를 선택해 주세요.</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="pdT10">
                                        <table class="tableView">
                                        <colgroup>
                                            <col style="width: 20%">
                                            <col style="width: 30%">
                                            <col style="width: 20%">
                                            <col style="width: 30%">
                                        </colgroup>
                                        <tbody><tr>
                                            <th>코드명</th>
                                            <td colspan="3">
                                           		<input type="text" id="CateName3" name="CateName3" maxlength="50">
                                           		<input type="hidden" id="CateIdx3" name="CateIdx3">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>코드</th>
                                            <td colspan="3"><input type="text" id="CateCode3" name="CateCode3" ></td>
                                            <!-- <th>정렬</th> -->
                                            <input type="hidden" id="CateSort3" name="CateSort3" maxlength="2">
                                        </tr>
                                        <tr>
                                            <th>사용 여부</th>
                                            <td colspan="3">
                                                <label><input type="radio" name="CateUse3" value="1" checked="checked"> 사용</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label><input type="radio" name="CateUse3" value="0"> 미사용</label>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </div>
                                    <div class="pdT10 btnRight">
                                        <a href="#save" onclick="fnCodeInput(3); return false;" id="btnSave3" class="btn btnPoint">추가</a>
                                        <a href="#cancel" onclick="fnCancel(3)" class="btn btnWhite">취소</a>
                                    </div>
                                </div>
                            </section>
                </section>
            </section>
        </section>
    </section>
            
	<!-- footer -->
</body>
</html>	