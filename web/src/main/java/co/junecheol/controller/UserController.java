package co.junecheol.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import co.junecheol.common.CommonFunc;
import co.junecheol.dto.MemoDTO;
import co.junecheol.dto.UserDTO;
import co.junecheol.service.UserService;

@Controller
@RequestMapping(value = "/user/")
public class UserController {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	@Autowired
	private UserService userService;

	private final Properties apiProps = CommonFunc.apiProp();	
	private final String uploadPath = CommonFunc.siteProp().getProperty("site.uploadPath");

	// 사용자 목록 개수
	@RequestMapping(value = "listTotal", method = RequestMethod.POST)
	@ResponseBody
	public Integer userListTotal(@RequestBody final Map<String, Object> map) throws Exception {

		Integer totalCnt = 0;

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("LIST_TP", (Integer) map.get("ltype"));
				put("PAGE", (Integer) map.get("page"));
				put("PAGE_SIZE", (Integer) map.get("psize"));
				put("USER_TP", (Integer) map.get("usertp"));
				put("USER_STS", (Integer) map.get("usersts"));
				put("ADMIN_TP", (Integer) map.get("admintp"));
				put("COMPANY_IDX", (Integer) map.get("cidx"));
				put("COMPANY_NM", (String) map.get("cnm"));
				put("SCH_DATE_TP", (Integer) map.get("datetp"));
				put("SDATE", (String) map.get("sdate"));
				put("EDATE", (String) map.get("edate"));
				put("SCH_SEL", (Integer) map.get("schsel"));
				put("SCH_TXT", (String) map.get("schtxt"));
				put("ORDER_BY", (Integer) map.get("orderby"));
				put("DESC", (Integer) map.get("desc"));
			}
		};

		totalCnt = userService.userListTotal(hashMap);

		return totalCnt;
	}

	// 사용자 목록
	@RequestMapping(value = "list", method = RequestMethod.POST)
	@ResponseBody
	public List<UserDTO> userList(@RequestBody final Map<String, Object> map) throws Exception {

		List<UserDTO> list = new ArrayList<UserDTO>();

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("LIST_TP", (Integer) map.get("ltype"));
				put("PAGE", (Integer) map.get("page"));
				put("PAGE_SIZE", (Integer) map.get("psize"));
				put("USER_TP", (Integer) map.get("usertp"));
				put("USER_STS", (Integer) map.get("usersts"));
				put("ADMIN_TP", (Integer) map.get("admintp"));
				put("COMPANY_IDX", (Integer) map.get("cidx"));
				put("COMPANY_NM", (String) map.get("cnm"));
				put("SCH_DATE_TP", (Integer) map.get("datetp"));
				put("SDATE", (String) map.get("sdate"));
				put("EDATE", (String) map.get("edate"));
				put("SCH_SEL", (Integer) map.get("schsel"));
				put("SCH_TXT", (String) map.get("schtxt"));
				put("ORDER_BY", (Integer) map.get("orderby"));
				put("DESC", (Integer) map.get("desc"));
			}
		};
		list = userService.userList(hashMap);

		return list;
	}

	// 사용자 보기
	@RequestMapping(value = "view", method = RequestMethod.POST)
	@ResponseBody
	public UserDTO userView(@RequestBody final Map<String, Object> map) throws Exception {
//System.out.println("controller userView");		
		UserDTO dto = new UserDTO();

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("USER_IDX", (Integer) map.get("uidx"));
			}
		};

		dto = userService.userView(hashMap);

		return dto;
	}

	// 사용자 등록/수정
	@RequestMapping(value = "input", method = RequestMethod.POST)
	@ResponseBody
	public Integer userInput(@RequestBody final Map<String, Object> map) throws Exception {
//System.out.println("controller userInput");
		Integer resultCd = 9;
		String pw = (String) map.get("pw");

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("USER_IDX", (Integer) map.get("uidx"));
				put("USER_TP", (Integer) map.get("usertp"));
				put("USER_ID", (String) map.get("id"));
				put("USER_PW", (pw == null || pw.isEmpty() ? "" : CommonFunc.encryptSHA(1, pw)[0]));
				put("NM", (String) map.get("nm"));
				put("POSI_IDX", (Integer) map.get("pidx"));
				put("DEPT_IDX", (Integer) map.get("didx"));
				put("PHONE", (String) map.get("phone"));
				put("MOBILE", (String) map.get("mobile"));
				put("EMAIL", (String) map.get("email"));
				put("ZIPCODE", (String) map.get("zcode"));
				put("ADDR", (String) map.get("addr"));
				put("ADDR_DETAIL", (String) map.get("addrdt"));
				put("USER_STS", (Integer) map.get("usersts"));
				put("COMPANY_IDX", (Integer) map.get("cidx"));
				put("ADMIN_TP", (Integer) map.get("admintp"));
				put("JOIN_DATE", (String) map.get("jdate"));
				put("REG_IDX", (Integer) map.get("ridx"));
				put("RESULT_CD", 9);
			}
		};

		userService.userInput(hashMap);
//System.out.println(hashMap);
		resultCd = (Integer) hashMap.get("RESULT_CD");

		return resultCd;
	}

	// 사용자 삭제
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Integer userDelete(@RequestBody final Map<String, Object> map) throws Exception {
//System.out.println("controller userDelete");
		Integer resultCd = 9;

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("DEL_TP", (Integer) map.get("deltp"));
				put("USER_IDX", (Integer) map.get("uidx"));
				put("DEL_IDX", (Integer) map.get("didx"));
				put("RESULT_CD", 9);
			}
		};

		userService.userDelete(hashMap);
//System.out.println(hashMap);
		resultCd = (Integer) hashMap.get("RESULT_CD");

		return resultCd;
	}


	// 사용자 휴가 권한 개수
	@RequestMapping(value = "VacationTotal", method = RequestMethod.POST)
	@ResponseBody
	public Integer userVacationTotal(@RequestBody final Map<String, Object> map) throws Exception {

		Integer totalCnt = 0;

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("LIST_TP", (Integer) map.get("ltype"));
				put("PAGE", (Integer) map.get("page"));
				put("PAGE_SIZE", (Integer) map.get("psize"));
				put("COMPANY_IDX", (Integer) map.get("cidx"));
				put("YEAR", (Integer) map.get("year"));
				put("USER_STS", (Integer) map.get("usersts"));
				put("SCH_SEL", (Integer) map.get("schsel"));
				put("SCH_TXT", (String) map.get("schtxt"));
				put("ORDER_BY", (Integer) map.get("orderby"));
				put("DESC", (Integer) map.get("desc"));
			}
		};

		totalCnt = userService.userVacationTotal(hashMap);

		return totalCnt;
	}

	// 사용자 휴가 권한
	@RequestMapping(value = "vacationList", method = RequestMethod.POST)
	@ResponseBody
	public List<UserDTO> userVacation(@RequestBody final Map<String, Object> map) throws Exception {

		List<UserDTO> list = new ArrayList<UserDTO>();

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("LIST_TP", (Integer) map.get("ltype"));
				put("PAGE", (Integer) map.get("page"));
				put("PAGE_SIZE", (Integer) map.get("psize"));
				put("COMPANY_IDX", (Integer) map.get("cidx"));
				put("YEAR", (Integer) map.get("year"));
				put("USER_STS", (Integer) map.get("usersts"));
				put("SCH_SEL", (Integer) map.get("schsel"));
				put("SCH_TXT", (String) map.get("schtxt"));
				put("ORDER_BY", (Integer) map.get("orderby"));
				put("DESC", (Integer) map.get("desc"));
			}
		};

		list = userService.userVacation(hashMap);

		return list;
	}


	/**/
	// 사용자 휴가 등록/수정
	@RequestMapping(value = "vacationInput", method = RequestMethod.POST)
	@ResponseBody
	public Integer vacationInput(@RequestBody final Map<String, Object> map) throws Exception {
		Integer resultCd = 9;

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("USER_IDX", (String) map.get("uidx"));
				put("YEAR", (Integer) map.get("year"));
				put("NOMAL_CNT", (String) map.get("ncnt"));
				put("REG_IDX", (Integer) map.get("ridx"));
				put("RESULT_CD", 9);
			}
		};

		userService.vacationInput(hashMap);
		// System.out.println(hashMap);
		resultCd = (Integer) hashMap.get("RESULT_CD");

		return resultCd;
	}

	// 사용자 배열
	@RequestMapping(value = "userSel", method = RequestMethod.POST)
	@ResponseBody
	public String userSel(@RequestBody final Map<String, Object> map) throws Exception {
		String str = "";
		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("COMPANY_IDX", (Integer) map.get("cidx"));
			}
		};
		str = userService.userSel(hashMap);

		return str;
	}

	// 메모 목록
	@RequestMapping(value = "memoList", method = RequestMethod.POST)
	@ResponseBody
	public List<MemoDTO> memoList(@RequestBody final Map<String, Object> map) throws Exception {

		List<MemoDTO> list = new ArrayList<MemoDTO>();

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("USER_IDX", (Integer) map.get("uidx"));
				put("SHOW_TP", (Integer) map.get("showtp"));
			}
		};
		list = userService.memoList(hashMap);

		return list;
	}

	// 메모 등록/수정
	@RequestMapping(value = "memoInput", method = RequestMethod.POST)
	@ResponseBody
	public Integer memoInput(@RequestBody final Map<String, Object> map) throws Exception {
		Integer resultCd = 9;

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("REG_DATE", (String) map.get("rdate"));
				put("USER_IDX", (Integer) map.get("uidx"));
				put("MEMO", (String) map.get("memo"));
				put("SHOW_TP", (Integer) map.get("showtp"));
				put("REG_IDX", (Integer) map.get("ridx"));
				put("RESULT_CD", 9);
			}
		};

		userService.memoInput(hashMap);
		System.out.println(hashMap);
		resultCd = (Integer) hashMap.get("RESULT_CD");

		return resultCd;
	}

	// 메모 삭제
	@RequestMapping(value = "memoDelete", method = RequestMethod.POST)
	@ResponseBody
	public Integer memoDelete(@RequestBody final Map<String, Object> map) throws Exception {
		// System.out.println("controller userDelete");
		Integer resultCd = 9;

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("DEL_TP", (Integer) map.get("deltp"));
				put("REG_DATE", (String) map.get("rdate"));
				put("USER_IDX", (Integer) map.get("uidx"));
				put("DEL_IDX", (Integer) map.get("didx"));
				put("RESULT_CD", 9);
			}
		};

		userService.memoDelete(hashMap);
		// System.out.println(hashMap);
		resultCd = (Integer) hashMap.get("RESULT_CD");

		return resultCd;
	}
	
}