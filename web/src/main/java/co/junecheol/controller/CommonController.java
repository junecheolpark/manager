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
		return "/_exception/error_param";
	}

	// 에러
	@RequestMapping(value = "/error")
	public String goError() {
		return "/_exception/error";
	}

	// 로그인 확인
	@RequestMapping(value = "/errorLogin")
	public String goErrorLogin() {
		return "/_exception/error_login";
	}

	// 작업예정
	@RequestMapping(value = "/working")
	public String goWorking() {
		return "/_exception/working";
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
	
	
}
