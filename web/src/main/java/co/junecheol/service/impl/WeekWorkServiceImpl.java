package co.junecheol.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import co.junecheol.dao.WeekWorkDAO;
import co.junecheol.dto.WeekWorkDTO;
import co.junecheol.service.WeekWorkService;

@Service
public class WeekWorkServiceImpl implements WeekWorkService {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	
	@Inject
	WeekWorkDAO weekWorkDao;

	//목록
	@Override
	public List<WeekWorkDTO> weekWorkList(Map<String, Object> map) {
		List<WeekWorkDTO> list = new ArrayList<WeekWorkDTO>();

		try {
			list = weekWorkDao.weekWorkList(map);
		} catch (Exception e) {
			log.error("error", e);
		}
		return list;
	}


	
	// 주간업무 등록/수정
    @Override
    public Integer weekWorkInput(Map<String, Object> map) {
    	Integer resultCd = 9;
    	
		try {
			resultCd = weekWorkDao.weekWorkInput(map);
		} catch (Exception e) {
			log.error("error", e);
		}
    	
		return resultCd;
    }
    
	// 주간업무 삭제
    @Override
    public Integer weekWorkDelete(Map<String, Object> map) {
    	Integer resultCd = 9;
    	
		try {
			resultCd = weekWorkDao.weekWorkDelete(map);
		} catch (Exception e) {
			log.error("error", e);
		}
    	
		return resultCd;
    }    
}
