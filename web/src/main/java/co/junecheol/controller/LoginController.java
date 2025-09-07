package co.junecheol.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import co.junecheol.common.CommonFunc;
import co.junecheol.dto.UserDTO;
import co.junecheol.service.LoginService;

@Controller
@RequestMapping(value = "/login/")
public class LoginController {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	private final Properties siteProps = CommonFunc.siteProp();
	private final String cookieNm = siteProps.getProperty("site.cookieNm");
	private final String cookieAtLi = siteProps.getProperty("site.cookieAtLi");
	private final String cookieSvId = siteProps.getProperty("site.cookieSvId");
	
	@Autowired
	private LoginService loginService;


	/**
	
	  * @Method Name : login
	  * @작성일 : 2025. 7. 19.
	  * @작성자 : 박준철
	  * @Method 설명 : 로그인
	  * @param request
	  * @param response
	  * @return
	  * @throws Exception
	
	  */
	@RequestMapping(value = "login")
	@ResponseBody
	public Integer login(@RequestBody final Map<String, Object> map, HttpServletRequest request
			, HttpServletResponse response) throws Exception {
		System.out.println("controller login");;
		Integer resultCd = 9;
		String id = (String) map.get("id");
		String pw = CommonFunc.encryptSHA(1, (String) map.get("pw"))[0];
		Boolean auto_login = (Boolean) map.get("at_login");
		String ip = request.getRemoteAddr();
		String agent = request.getHeader("USER-AGENT");

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("login_tp", (Integer) map.get("ltp"));
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
			loginService.login(hashMap);
			
			resultCd = (Integer) hashMap.get("result_cd");
			log.debug("lodgin chk : " + resultCd.toString());
			if (resultCd == 0) {
				setLogin(2, 0, id, pw, auto_login, request, response);
			}

		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}
	
	/**
	
	  * @Method Name : loginCok
	  * @작성일 : 2025. 7. 19.
	  * @작성자 : 박준철
	  * @Method 설명 : 로그인 쿠키 정보
	  * @param request
	  * @return
	  * @throws Exception
	
	  */
	@RequestMapping(value = "loginCok", method = RequestMethod.POST)
	@ResponseBody
	public UserDTO loginCok(HttpServletRequest request) throws Exception {
		String cokLogin = "";
		String cokAutoLogin = "";
		UserDTO dto = new UserDTO();

		Cookie[] list = request.getCookies();
		for (Cookie cookie : list) {
			if (cookie.getName().equals(cookieNm)) {
				cokLogin = cookie.getValue();
			} else if (cookie.getName().equals(cookieAtLi)) {
				cokAutoLogin = cookie.getValue();
			}
		}

		// 로그인 사용자 정보
		if (!CommonFunc.isEmpty(cokLogin)) {
			cokLogin = CommonFunc.decryptAES256(cokLogin);
			String[] arrCokLogin = cokLogin.split("‡");

			dto.setUSER_IDX(Integer.valueOf(arrCokLogin[0]));
			dto.setUSER_ID(arrCokLogin[1]);
			dto.setNM(arrCokLogin[2]);
			dto.setPHONE(arrCokLogin[3]);
			dto.setMOBILE(arrCokLogin[4]);
			dto.setEMAIL(arrCokLogin[5]);
			dto.setPOSI_NM(arrCokLogin[6]);
			dto.setDEPT_NM(arrCokLogin[7]);
			dto.setADMIN_NM(arrCokLogin[8]);
			dto.setADMIN_TP(Integer.valueOf(arrCokLogin[9]));
			dto.setSIGN_TP(Integer.valueOf(arrCokLogin[10]));
			dto.setCOMPANY_IDX(Integer.valueOf(arrCokLogin[11]));
			dto.setUSER_IMG_NUM(Integer.valueOf(arrCokLogin[12]));

		}
		log.debug("################========");
		return dto;
	}
	
	

	/**
	
	  * @Method Name : setLogin
	  * @작성일 : 2025. 7. 19.
	  * @작성자 : 박준철
	  * @Method 설명 : 로그인 쿠키 생성
	  * @param l_tp
	  * @param u_idx
	  * @param id
	  * @param pw
	  * @param at_login
	  * @param request
	  * @param response
	  * @throws Exception
	
	  */
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
			UserDTO dto = loginService.loginInfo(hashMap);
			sb.append(dto.getUSER_IDX());
			sb.append("‡");
			sb.append(dto.getUSER_ID());
			sb.append("‡");
			sb.append(dto.getNM());
			sb.append("‡");
			sb.append(dto.getPHONE());
			sb.append("‡");
			sb.append(dto.getMOBILE());
			sb.append("‡");
			sb.append(dto.getEMAIL());
			sb.append("‡");
			sb.append(dto.getPOSI_NM());
			sb.append("‡");
			sb.append(dto.getDEPT_NM());
			sb.append("‡");
			sb.append(dto.getADMIN_NM());
			sb.append("‡");
			sb.append(dto.getADMIN_TP());
			sb.append("‡");
			sb.append(dto.getSIGN_TP());
			sb.append("‡");
			sb.append(dto.getCOMPANY_IDX());
			sb.append("‡");
			sb.append(dto.getUSER_IMG_NUM());
			
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
	
	/**
	 * 
	 * @Method Name : cokDelProc
	 * @작성일 : 2025. 9. 7.
	 * @작성자 : 박준철
	 * @Method 설명 : 쿠키 삭제 처리
	 * @param tp
	 * @param response
	 * 
	 */
	public void cokDelProc(HttpServletResponse response) {
		log.debug("################");
		log.debug("Controller cokDelProc");
		String cok = "";

		cok = cookieNm;
		log.debug("cok : " + cok);
		Cookie cookie = new Cookie(cok, null);
		cookie.setMaxAge(0);
		cookie.setPath("/");
		response.addCookie(cookie);
		log.debug("################");
	}

	/**
	
	  * @Method Name : logout
	  * @작성일 : 2025. 9. 7.
	  * @작성자 : 박준철
	  * @Method 설명 :로그아웃
	  * @param response
	  * @return "redirect:/"
	  * @throws Exception
	
	  */
	@RequestMapping(value = "logout")
	public String logout(HttpServletResponse response) throws Exception {

		cokDelProc(response);
		return "redirect:/";
	}
	
	
}




