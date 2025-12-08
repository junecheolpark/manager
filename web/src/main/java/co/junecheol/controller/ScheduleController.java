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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import co.junecheol.dto.HolidayDTO;
import co.junecheol.dto.ScheduleDTO;
import co.junecheol.dto.WorkInoutDTO;
import co.junecheol.service.ScheduleService;

@Controller
@RequestMapping(value = "/schedule/")
public class ScheduleController {
	@Autowired
	private ScheduleService scheduleService;

	// 사내일정 리스트
	@RequestMapping(value = "list", method = RequestMethod.GET)
	@ResponseBody
	public List<ScheduleDTO> scheduleList(@RequestParam final Map<String, Object> map) throws Exception {

		List<ScheduleDTO> list = new ArrayList<ScheduleDTO>();

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("USER_IDX", Integer.valueOf(map.get("uidx").toString()));
					put("SCH_SDATE", (String) map.get("sdate"));
					put("SCH_EDATE", (String) map.get("edate"));
				}
			};
			list = scheduleService.scheduleList(hashMap);
		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return list;
	}

	// 사내일정 뷰
	@RequestMapping(value = "view", method = RequestMethod.POST)
	@ResponseBody
	public ScheduleDTO scheduleView(@RequestBody final Map<String, Object> map) throws Exception {

		ScheduleDTO dto = new ScheduleDTO();

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("SCHEDULE_IDX", (Integer) map.get("sidx"));
					put("USER_IDX", (Integer) map.get("uidx"));
				}
			};
			// System.out.println(hashMap);
			dto = scheduleService.scheduleView(hashMap);
		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return dto;
	}

	// 사내일정 등록/수정
	@RequestMapping(value = "input", method = RequestMethod.POST)
	@ResponseBody
	public Integer scheduleInput(@RequestBody final Map<String, Object> map) throws Exception {
		// System.out.println("controller companyInput");
		Integer resultCd = 9;

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("SCHEDULE_IDX", (Integer) map.get("sidx"));
					put("SCHEDULE_TP", (Integer) map.get("stp"));
					put("SUBJ", (String) map.get("subj"));
					put("CONTS", (String) map.get("conts"));
					put("SDATE", (String) map.get("sdate"));
					put("STIME", (String) map.get("stime"));
					put("EDATE", (String) map.get("edate"));
					put("ETIME", (String) map.get("etime"));
					put("AMPM", (Integer) map.get("ampm"));
					put("APPROVE_STS", (Integer) map.get("asts"));
					put("SCHEDUlE_USER_IDX", (String) map.get("suidx"));
					put("REG_IDX", (Integer) map.get("ridx"));
					put("RESULT_CD", 9);
				}
			};

			// System.out.println(hashMap);
			scheduleService.scheduleInput(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return resultCd;
	}

	// 사내일정 삭제
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Integer scheduleDelete(@RequestBody final Map<String, Object> map) throws Exception {
		Integer resultCd = 9;

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("DEL_TP", (Integer) map.get("deltp"));
					put("SCHEDUlE_USER_IDX", (String) map.get("suidx"));
					put("SCHEDULE_IDX", (Integer) map.get("sidx"));
					put("DEL_IDX", (Integer) map.get("didx"));
					put("RESULT_CD", 9);
				}
			};

			scheduleService.scheduleDelete(hashMap);
			// System.out.println(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return resultCd;
	}

	// 사내일정 파일 등록/수정
	@RequestMapping(value = "fileInput", method = RequestMethod.POST)
	@ResponseBody
	public Integer scheduleFileInput(@RequestBody final Map<String, Object> map) throws Exception {
		// System.out.println("controller scheduleFileInput");
		Integer resultCd = 9;

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("SCHEDULE_IDX", (Integer) map.get("sidx"));
				put("FILE_IDX", (Integer) map.get("fidx"));
				put("FILE_TP", (Integer) map.get("ftp"));
				put("FILE_PATH", (String) map.get("fpath"));
				put("FILE_NM", (String) map.get("fnm"));
				put("REAL_FILE_NM", (String) map.get("rfnm"));
				put("FILE_SIZE", (Integer) map.get("fsize"));
				put("REG_IDX", (Integer) map.get("ridx"));
				put("RESULT_CD", 9);
			}
		};
		scheduleService.scheduleFileInput(hashMap);
		resultCd = (Integer) hashMap.get("RESULT_CD");

		return resultCd;
	}

	// 사내일정 파일 삭제
	@RequestMapping(value = "fileDelete", method = RequestMethod.POST)
	@ResponseBody
	public Integer scheduleFileDelete(@RequestBody final Map<String, Object> map) throws Exception {
		Integer resultCd = 9;

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("DEL_TP", (Integer) map.get("deltp"));
					put("SCHEDULE_IDX", (Integer) map.get("sidx"));
					put("FILE_IDX", (Integer) map.get("fidx"));
					put("DEL_IDX", (Integer) map.get("didx"));
					put("RESULT_CD", 9);
				}
			};

			scheduleService.scheduleFileDelete(hashMap);
			// System.out.println(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return resultCd;
	}

	// 사내일정 뷰
	@RequestMapping(value = "vacationView", method = RequestMethod.GET)
	@ResponseBody
	public ScheduleDTO vacationView(@RequestParam final Map<String, Object> map) throws Exception {

		ScheduleDTO dto = new ScheduleDTO();

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("YEAR", Integer.valueOf(map.get("year").toString()));
					put("USER_IDX", Integer.valueOf(map.get("uidx").toString()));
				}
			};
			// System.out.println(hashMap);
			dto = scheduleService.vacationView(hashMap);
		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return dto;
	}

	// 출퇴근 리스트
	@RequestMapping(value = "workInoutList", method = RequestMethod.POST)
	@ResponseBody
	public List<WorkInoutDTO> workInoutList(@RequestBody final Map<String, Object> map) throws Exception {

		List<WorkInoutDTO> list = new ArrayList<WorkInoutDTO>();

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("USER_IDX", (Integer) map.get("uidx"));
					put("SCH_SDATE", (String) map.get("sdate"));
					put("SCH_EDATE", (String) map.get("edate"));
				}
			};
			list = scheduleService.workInoutList(hashMap);
		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return list;
	}

	// 출퇴근 등록/수정
	@RequestMapping(value = "workInoutInput", method = RequestMethod.POST)
	@ResponseBody
	public Integer workInoutInput(@RequestBody final Map<String, Object> map) throws Exception {
		Integer resultCd = 9;

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("USER_IDX", (Integer) map.get("uidx"));
					put("INOUT_TP", (Integer) map.get("iotp"));
					put("RESULT_CD", 9);
				}
			};

			scheduleService.workInoutInput(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");
			
			if (resultCd.equals(11) || resultCd.equals(12) || resultCd.equals(13)) { // 출근, 퇴근, 조기 퇴근
				resultCd = 0;
			}

		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return resultCd;
	}

	// 공휴일 리스트
	@RequestMapping(value = "holidayList", method = RequestMethod.GET)
	@ResponseBody
	public List<HolidayDTO> holidayList(@RequestParam final Map<String, Object> map) throws Exception {

		List<HolidayDTO> list = new ArrayList<HolidayDTO>();

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("SCH_SDATE", (String) map.get("sdate"));
					put("SCH_EDATE", (String) map.get("edate"));
				}
			};
			list = scheduleService.holidayList(hashMap);
		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return list;
	}

	// 공휴일 등록
	@RequestMapping(value = "holidayInput", method = RequestMethod.POST)
	@ResponseBody
	public Integer holidayInput(@RequestBody final Map<String, Object> map) throws Exception {
		Integer resultCd = 9;

		try {
			// JS에서 보낸 공휴일 배열
			List<Map<String, Object>> holidays = (List<Map<String, Object>>) map.get("holidays");
			
			for (int i = 0; i < holidays.size(); i++) {
			    Map<String, Object> h = holidays.get(i);
			    final int idx = i; 


			    Map<String, Object> hashMap = new HashMap<String, Object>() {
			    	private static final long serialVersionUID = 1L;
			    	{
		    		put("HOLIDAY",  String.valueOf(h.get("locdate")));
			        put("HOLIDAY_IDX", idx);
			        put("HOLIDAY_NM",  String.valueOf(h.get("dateName")));
			        put("REG_IDX", (Integer) map.get("ridx"));
			        put("RESULT_CD", 9);
			    }};
			    scheduleService.holidayInput(hashMap);
				resultCd = (Integer) hashMap.get("RESULT_CD");

			}
			

			//scheduleService.workInoutInput(hashMap);
			//resultCd = (Integer) hashMap.get("RESULT_CD");

		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return resultCd;
	}
}
