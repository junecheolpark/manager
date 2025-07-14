package co.junecheol.controller;

import java.util.Arrays;
import java.util.Properties;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import co.junecheol.common.CommonFunc;

@Controller
public class CommonController {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	private final Properties apiProps = CommonFunc.apiProp();
	private final String cookieNm = CommonFunc.siteProp().getProperty("site.cookieNm");
	private final String uploadPath = CommonFunc.siteProp().getProperty("site.uploadPath");

	// 메인사이트
	@RequestMapping(value = "/index")
	public String goIndex(HttpServletRequest request) {
		Boolean isLogin = false;
		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			log.debug("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/index";
		} else {
			return goErrorLogin();
		}
	}

	// 파라미터 에러
	@RequestMapping(value = "/errorParam")
	public String goErrorParam() {
		return "/exception/error_param";
	}

	// 에러
	@RequestMapping(value = "/error")
	public String goError() {
		return "/exception/error";
	}

	// 로그인 확인
	@RequestMapping(value = "/errorLogin")
	public String goErrorLogin() {
		return "/exception/error_login";
	}

	// 작업예정
	@RequestMapping(value = "/working")
	public String goWorking() {
		return "/exception/working";
	}

	/**
	 * 
	 * @Method Name : findCookie
	 * @작성일 : 2025. 7. 7.
	 * @작성자 : 박준철
	 * @Method 설명 :쿠키 조회
	 * @param request
	 * @param name
	 * @return
	 * 
	 */
	public Cookie findCookie(HttpServletRequest request, String name) {
		if (request.getCookies() == null) {
			return null;
		}
		return Arrays.stream(request.getCookies()).filter(cookie -> cookie.getName().equals(name)).findAny()
				.orElse(null);
	}
	
	
	/*******************/
	/** 업무 보고 **/

	// 주간업무
	@RequestMapping(value = "/report/01")
	public String goReport01(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/report/report_01";
		} else {
			return goErrorLogin();
		}
	}


	/*******************/
	/** 게시판 **/
	// 공지사항
	@RequestMapping(value = "/clipboard/01")
	public String goClipboard01(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/clipboard/clipboard_01";
		} else {
			return goErrorLogin();
		}
	}

	// 자료실
	@RequestMapping(value = "/clipboard/02")
	public String goClipboard02(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/clipboard/clipboard_02";
		} else {
			return goErrorLogin();
		}
	}

	// 업무공유
	@RequestMapping(value = "/clipboard/03")
	public String goClipboard03(HttpServletRequest request) {
		/*
		 * HttpSession session = request.getSession(); if
		 * (CommonFunc.sessionChk(session)) {
		 */
		Boolean isLogin = false;
		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/clipboard/clipboard_03";
		} else {
			return goErrorLogin();
		}
	}

	/*******************/
	/** 일정 관리 **/
	// 사내일정
	@RequestMapping(value = "/schedule/01")
	public String goSchedule01(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/schedule/schedule_01";
		} else {
			return goErrorLogin();
		}
	}

	// 프로젝트
	@RequestMapping(value = "/schedule/02")
	public String goSchedule02(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/schedule/schedule_02";
		} else {
			return goErrorLogin();
		}
	}

	// 프로젝트 뷰
	@RequestMapping(value = "/schedule/02/view")
	public String goSchedule02View(HttpServletRequest request) {
		String pidx = request.getParameter("pidx");
		String cidx = request.getParameter("cidx");
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			if (CommonFunc.isEmpty(pidx) || CommonFunc.isEmpty(cidx)) {
				return goErrorParam();
			} else {
				return "/schedule/schedule_02_view";
			}
		} else {
			return goErrorLogin();
		}
	}

	/*******************/
	// 사용자 관리
	@RequestMapping(value = "/company/01")
	public String goCompany01(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/company/company_01";
		} else {
			return goErrorLogin();
		}
	}

	/*******************/
	/** 시스템 관리 **/
	// 코드 관리
	@RequestMapping(value = "/system/01")
	public String goSystem01(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/system/system_01";
		} else {
			return goErrorLogin();
		}
	}

	// 연차 관리
	@RequestMapping(value = "/system/02")
	public String goSystem02(HttpServletRequest request) {
		Boolean isLogin = false;

		// 쿠키 확인
		Cookie cokChk = findCookie(request, cookieNm);
		if (cokChk == null) {
			// log.info("쿠키 검색 안됨");
			isLogin = false;
		} else {
			isLogin = true;
		}

		if (isLogin) {
			return "/system/system_02";
		} else {
			return goErrorLogin();
		}
	}
	
}
