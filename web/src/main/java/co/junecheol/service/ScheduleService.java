package co.junecheol.service;

import java.util.List;
import java.util.Map;

import co.junecheol.dto.ScheduleDTO;
import kr.co.rysoft.dto.HolidayDTO;
import kr.co.rysoft.dto.MyScheduleDTO;
import kr.co.rysoft.dto.WorkInoutDTO;

public interface ScheduleService {
	public List<ScheduleDTO> scheduleList(Map<String, Object> map); //  사내일정 불러오기
	public ScheduleDTO scheduleView(Map<String, Object> map); //  사내일정 뷰
	public Integer scheduleInput(Map<String, Object> map); //  사내일정 등록/수정
	public Integer scheduleDelete(Map<String, Object> map); //  사내일정 삭제
	public Integer scheduleFileInput(Map<String, Object> map); //  사내일정 파일 등록/수정
	public Integer scheduleFileDelete(Map<String, Object> map); //  사내일정 파일 삭제
	
	public ScheduleDTO vacationView(Map<String, Object> map); //  // 연차 및 시간설정 뷰
	
	public List<WorkInoutDTO> attendanceList(Map<String, Object> map); //  근태관리 리스트
	
	public List<WorkInoutDTO> workInoutList(Map<String, Object> map); //  출퇴근 불러오기
	public Integer workInoutInput(Map<String, Object> map); //  출퇴근 등록/수정
	
	public MyScheduleDTO mySchduleCheck(Map<String, Object> map); //  일정체크 불러오기
	
	public List<HolidayDTO> holidayList(Map<String, Object> map); //  공휴일 	불러오기
}
