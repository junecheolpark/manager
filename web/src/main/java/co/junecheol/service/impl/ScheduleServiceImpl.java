package co.junecheol.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import co.junecheol.dao.ScheduleDAO;
import co.junecheol.dto.HolidayDTO;
import co.junecheol.dto.MyScheduleDTO;
import co.junecheol.dto.ScheduleDTO;
import co.junecheol.dto.WorkInoutDTO;
import co.junecheol.service.ScheduleService;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	@Inject
	ScheduleDAO scheduleDao;

	// 사내일정 불러오기
	@Override
	public List<ScheduleDTO> scheduleList(Map<String, Object> map) {
		List<ScheduleDTO> list = new ArrayList<ScheduleDTO>();

		try {
			list = scheduleDao.scheduleList(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return list;
	}

	// 사내일정 뷰
	@Override
	public ScheduleDTO scheduleView(Map<String, Object> map) {
		ScheduleDTO dto = new ScheduleDTO();

		try {
			dto = scheduleDao.scheduleView(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return dto;
	}

	// 사내일정 등록/수정
	@Override
	public Integer scheduleInput(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = scheduleDao.scheduleInput(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 사내일정 삭제
	@Override
	public Integer scheduleDelete(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = scheduleDao.scheduleDelete(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 사내일정 첨부파일 등록/수정
	@Override
	public Integer scheduleFileInput(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = scheduleDao.scheduleFileInput(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 사내일정 파일 삭제
	@Override
	public Integer scheduleFileDelete(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = scheduleDao.scheduleFileDelete(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 연차 및 시간설정 뷰
	@Override
	public ScheduleDTO vacationView(Map<String, Object> map) {

		ScheduleDTO dto = new ScheduleDTO();
		try {
			dto = scheduleDao.vacationView(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return dto;
	}

	// 출퇴근 불러오기
	@Override
	public List<WorkInoutDTO> workInoutList(Map<String, Object> map) {
		List<WorkInoutDTO> list = new ArrayList<WorkInoutDTO>();

		try {
			list = scheduleDao.workInoutList(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return list;
	}

	// 출퇴근 등록/수정
	@Override
	public Integer workInoutInput(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = scheduleDao.workInoutInput(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 공휴일 불러오기
	@Override
	public List<HolidayDTO> holidayList(Map<String, Object> map) {
		List<HolidayDTO> list = new ArrayList<HolidayDTO>();

		try {
			list = scheduleDao.holidayList(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return list;
	}

}
