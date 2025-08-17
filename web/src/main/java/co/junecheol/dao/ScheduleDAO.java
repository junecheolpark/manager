package co.junecheol.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.junecheol.dto.HolidayDTO;
import co.junecheol.dto.MyScheduleDTO;
import co.junecheol.dto.ScheduleDTO;
import co.junecheol.dto.WorkInoutDTO;

@Repository
public class ScheduleDAO {

	@Autowired
	@Resource(name = "sqlSessionTemplate")
	private SqlSession session;

	// 사내일정 불러오기
	public List<ScheduleDTO> scheduleList(Map<String, Object> map) {
		return session.selectList("schedule_mapper.scheduleList", map);
	}

	// 사내일정 뷰
	public ScheduleDTO scheduleView(Map<String, Object> map) {
		return session.selectOne("schedule_mapper.scheduleView", map);
	}

	// 사내일정 등록/수정
	public Integer scheduleInput(Map<String, Object> map) {
		return session.insert("schedule_mapper.scheduleInput", map);
	}

	// 사내일정 삭제
	public Integer scheduleDelete(Map<String, Object> map) {
		return session.delete("schedule_mapper.scheduleDelete", map);
	}

	// 사내일정 파일 등록/수정
	public Integer scheduleFileInput(Map<String, Object> map) {
		return session.insert("schedule_mapper.scheduleFileInput", map);
	}

	// 사내일정 파일 삭제
	public Integer scheduleFileDelete(Map<String, Object> map) {
		return session.delete("schedule_mapper.scheduleFileDelete", map);
	}

	// 연차 및 시간설정 뷰
	public ScheduleDTO vacationView(Map<String, Object> map) {
		return session.selectOne("schedule_mapper.vacationView", map);
	}

	// 출퇴근 불러오기
	public List<WorkInoutDTO> workInoutList(Map<String, Object> map) {
		return session.selectList("schedule_mapper.workInoutList", map);
	}

	// 출퇴근 등록/수정
	public Integer workInoutInput(Map<String, Object> map) {
		return session.insert("schedule_mapper.workInoutInput", map);
	}

	// 일정체크 불러오기
	public MyScheduleDTO mySchduleCheck(Map<String, Object> map) {
		return session.selectOne("schedule_mapper.mySchduleCheck", map);
	}

	// 공휴일
	public List<HolidayDTO> holidayList(Map<String, Object> map) {
		return session.selectList("schedule_mapper.holidayList", map);
	}

}
