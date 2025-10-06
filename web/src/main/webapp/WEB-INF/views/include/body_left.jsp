<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<section class="contentsBox">
	<!-- left 메뉴 -->
	<section class="leftMenu">
		<div class="leftBox"><img src="/resources/images/btn/btn_leftmenu_close.png" alt="대메뉴"></div>
		<section class="lmTop">
			<p id="pageNavi" class="ftSize20 ftBold mgB10">
 				&nbsp;&nbsp;<!-- <span class="ftNormal colGray2">중메뉴</span> -->
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
				<div id="leftTopRpt02" class="leftTopConts">
					<div class="ucTable">
						<a href="#inp" class="btn btn100 btnBlue" onclick="fnInput(); return false;">저장</a>
						<a href="#inp" class="btn btn100 btnRed mgT10" onclick="fnattendeesDelete(2); return false;">삭제</a>
		            </div>
				</div>	
				
				<div id="leftTopRpt03" class="leftTopConts">
					<div class="ucTable">
		            	<a href="/report/03/write" class="btn btn100 btnBlue">등록</a>
		            </div>
				</div>	
				<!-- 사내일정 -->
				<div id="leftTopRpt04" class="leftTopConts">
					<div class="ucTable">
		            	<a href="#reg" class="btn btn100 btnBlue" onclick="fnOpenPopUp(); return false;">등록</a>
		            </div>
				</div>									
				<div id="leftTopRpt05" class="leftTopConts">
					<div class="ucTable">
		            	<a href="#reg" class="btn btn100 btnBlue" id="inputBtn">등록</a>
		            </div>
				</div>									
			</div>			
		</section>
		<section class="lmMenu">
			<h3><img src="/resources/images/sub/leftMenu_icon_03.png" alt="대메뉴">&nbsp;&nbsp;<span id="leftMenuTop"><!-- 대메뉴 --></span></h3>
			<ul id="leftMenuList">
				<li><a href="#link">&nbsp;</a></li>
				<!-- class="lmChoice" -->
			</ul>
		</section>
		<footer></footer>
	</section>
	<!-- 컨텐츠 -->
	<section class="contens">