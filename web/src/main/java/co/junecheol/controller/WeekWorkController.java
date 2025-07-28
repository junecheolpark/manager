package co.junecheol.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import co.junecheol.dto.WeekWorkDTO;
import co.junecheol.service.WeekWorkService;

@Controller
@RequestMapping(value = "/weekWork/")
public class WeekWorkController {
	@Autowired
	private WeekWorkService weekWorkService;

	// 주간업무 리스트
	@RequestMapping(value = "list", method = RequestMethod.POST)
	@ResponseBody
	public List<WeekWorkDTO> weekWorkList(@RequestBody final Map<String, Object> map) throws Exception {

		List<WeekWorkDTO> list = new ArrayList<WeekWorkDTO>();

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("PREVE_YEAR", (Integer) map.get("preyyyy"));
					put("PREVE_WEEK_WORK", (Integer) map.get("prewwork"));
					put("YEAR", (Integer) map.get("yyyy"));
					put("WEEK_WORK", (Integer) map.get("wwork"));
					put("USER_IDX", (Integer) map.get("uidx"));
				}
			};
			list = weekWorkService.weekWorkList(hashMap);
		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return list;
	}


	// 주간업무 등록/수정
	@RequestMapping(value = "input", method = RequestMethod.POST)
	@ResponseBody
	public Integer weekWorkInput(@RequestBody final Map<String, Object> map) throws Exception {
		// System.out.println("controller weekWorkInput");
		Integer resultCd = 9;
		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("WEEK_WORK_CONTS_IDX", (Integer) map.get("widx"));
					put("YEAR", (Integer) map.get("yyyy"));
					put("WEEK_WORK", (Integer) map.get("wwork"));
					put("USER_IDX", (Integer) map.get("uidx"));
					put("SDATE", (String) map.get("sdate"));
					put("EDATE", (String) map.get("edate"));
					put("COMPANY_IDX", (Integer) map.get("cidx"));
					put("PREV_CONTS", (String) map.get("pconts"));
					put("NOW_CONTS", (String) map.get("nconts"));
					put("REG_CD", (String) map.get("rcd"));
					put("RESULT_CD", 9);
				}
			};

			System.out.println(hashMap);
			weekWorkService.weekWorkInput(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return resultCd;
	}

	// 주간업무 삭제
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Integer weekWorkDelete(@RequestBody final Map<String, Object> map) throws Exception {
		Integer resultCd = 9;

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("DEL_TP", (Integer) map.get("deltp"));
					put("YEAR", (Integer) map.get("yyyy"));
					put("WEEK_WORK", (Integer) map.get("wwork"));
					put("USER_IDX", (Integer) map.get("uidx"));
					put("DEL_IDX", (Integer) map.get("didx"));
					put("REG_CD", (String) map.get("rcd"));
					put("RESULT_CD", 9);
				}
			};

			weekWorkService.weekWorkDelete(hashMap);
			//System.out.println(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return resultCd;
	}

}
