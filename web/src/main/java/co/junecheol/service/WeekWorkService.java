package co.junecheol.service;

import java.util.List;
import java.util.Map;

import co.junecheol.dto.WeekWorkDTO;

public interface WeekWorkService {
	public List<WeekWorkDTO> weekWorkList(Map<String, Object> map); // 주간업무 목록
	public Integer weekWorkInput(Map<String, Object> map); // // 주간업무 등록/수정/조회수
	public Integer weekWorkDelete(Map<String, Object> map); // // 주간업무 삭제
}
