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

import co.junecheol.dto.HolidayDTO;
import co.junecheol.dto.MyScheduleDTO;
import co.junecheol.dto.ScheduleDTO;
import co.junecheol.dto.WorkInoutDTO;
import co.junecheol.service.ScheduleService;

@Controller
@RequestMapping(value = "/schedule/")
public class ScheduleController {
	@Autowired
	private ScheduleService scheduleService;

	// 사내일정 리스트
	@RequestMapping(value = "list", method = RequestMethod.POST)
	@ResponseBody
	public List<ScheduleDTO> scheduleList(@RequestBody final Map<String, Object> map) throws Exception {

		List<ScheduleDTO> list = new ArrayList<ScheduleDTO>();

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("USER_IDX", (Integer) map.get("uidx"));
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
	@RequestMapping(value = "vacationView", method = RequestMethod.POST)
	@ResponseBody
	public ScheduleDTO vacationView(@RequestBody final Map<String, Object> map) throws Exception {

		ScheduleDTO dto = new ScheduleDTO();

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("YEAR", (Integer) map.get("year"));
					put("USER_IDX", (Integer) map.get("uidx"));
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
		// System.out.println("controller companyInput");
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

			// System.out.println(hashMap);
			scheduleService.workInoutInput(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return resultCd;
	}

	// 일정체크 불러오기
	@RequestMapping(value = "mySchedule", method = RequestMethod.POST)
	@ResponseBody
	public MyScheduleDTO mySchduleCheck(@RequestBody final Map<String, Object> map) throws Exception {

		MyScheduleDTO dto = new MyScheduleDTO();

		try {
			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("USER_IDX", (Integer) map.get("uidx"));
					put("YEAR", (Integer) map.get("yyyy"));
					put("S_WEEK", (String) map.get("sweek"));
					put("E_WEEK", (String) map.get("eweek"));
					put("S_YEAR", (String) map.get("syear"));
					put("E_YEAR", (String) map.get("eyear"));
				}
			};
			// System.out.println(hashMap);
			dto = scheduleService.mySchduleCheck(hashMap);
		} catch (Exception e) {
			System.out.println(e.toString());
		}

		return dto;
	}

	// 공휴일 리스트
	@RequestMapping(value = "holidayList", method = RequestMethod.POST)
	@ResponseBody
	public List<HolidayDTO> holidayList(@RequestBody final Map<String, Object> map) throws Exception {

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
}
