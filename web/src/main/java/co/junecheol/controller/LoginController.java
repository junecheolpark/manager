package co.junecheol.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import co.junecheol.common.CommonFunc;

@Controller
@RequestMapping(value = "/login/")
public class LoginController {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	private final Properties siteProps = CommonFunc.siteProp();
	private final String cookieNm = siteProps.getProperty("site.cookieNm");
	private final String cookieAtLi = siteProps.getProperty("site.cookieAtLi");
	private final String cookieSvId = siteProps.getProperty("site.cookieSvId");

	@RequestMapping(value = "login")
	@ResponseBody
	public Integer login(HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.debug("controller login");
		Integer resultCd = 9;
		String id = "pjc";
		String pw = CommonFunc.encryptSHA(1, "pjc")[0];
		Boolean auto_login = false;
		String ip = request.getRemoteAddr();
		String agent = request.getHeader("USER-AGENT");

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("login_tp", 1);
				put("user_id", id);
				put("user_pw", pw);
				put("ip", ip);
				put("browser", agent);
				put("result_cd", 9);
			}
		};
		log.debug("################===");
		log.debug(hashMap.toString());
		log.debug("################===");
		try {

			resultCd = 0;
			log.debug("lodgin chk : " + resultCd.toString());
			if (resultCd == 0) {
				setLogin(2, 0, id, pw, auto_login, request, response);
			}

		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	public void setLogin(Integer l_tp, Integer u_idx, String id, String pw, Boolean at_login,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		log.debug("################============");
		log.debug("Controller setlogin");
		StringBuilder sb = new StringBuilder();
		String encryptCok = "";

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("login_tp", l_tp);
				put("user_idx", u_idx);
				put("user_id", id);
				put("user_pw", pw);
			}
		};
		log.debug(hashMap.toString());
		try {
			sb.append(10);
			sb.append("‡");
			sb.append("pjc");
			sb.append("‡");
			sb.append("박준철");
			sb.append("‡");
			sb.append("01036069430");
			sb.append("‡");
			sb.append("01036069430");
			sb.append("‡");
			sb.append("skswnscjf2@naver.com");
			sb.append("‡");
			sb.append("작업자");
			sb.append("‡");
			sb.append("망원");
			sb.append("‡");
			sb.append("");
			sb.append("‡");
			sb.append(0);
			sb.append("‡");
			sb.append(0);
			sb.append("‡");
			sb.append(0);
			sb.append("‡");
			sb.append(0);

			encryptCok = CommonFunc.encryptAES256(sb.toString());

			// 로그인 성공 처리
			// 쿠키에 시간 정보를 주지 않으면 세션 쿠키 (브라우저 종료 시 모두 종료)
			Cookie cookie = new Cookie(cookieNm, encryptCok);
			cookie.setMaxAge(60 * 60 * 24); // 기간을 하루로 지정(60초 * 60분 * 24시간)
			// cookie.setDomain("admin.rysoft.co.kr"); // 브라우저가 쿠키값을 전송할 서버의 도메인 지정
			cookie.setPath("/"); // 브라우저가 쿠키값을 전송할 URL 지정
			// cookie.setSecure(true); // SSL 통신채널 연결 시에만 쿠키를 전송하도록 설정
			cookie.setHttpOnly(true); // 자바스크립트에서 쿠키값을 읽어가지 못하도록 설정
			response.addCookie(cookie);

			// log.info("encryptCok = " + encryptCok);
		} catch (Exception e) {
			// log.error("error", e);
			e.toString();
		}
		log.debug("################============");
	}
}
