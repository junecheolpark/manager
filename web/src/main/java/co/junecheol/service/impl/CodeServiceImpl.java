package co.junecheol.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import co.junecheol.dao.CodeDAO;
import co.junecheol.dto.CodeDTO;
import co.junecheol.service.CodeService;

@Service
public class CodeServiceImpl implements CodeService {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	@Inject
	CodeDAO codeDao;

	@Override
	public List<CodeDTO> codeList(int code_idx) {
		List<CodeDTO> list = new ArrayList<CodeDTO>();

		try {
			list = codeDao.codeList(code_idx);
		} catch (Exception e) {
			log.error("error", e);
		}
		return list;
	}

	// 코드 등록/수정
	@Override
	public Integer codeInput(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = codeDao.codeInput(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 정렬 업데이트
	@Override
	public Integer codeSort(Map<String, Object> map) {
		Integer resultCd = 9;
		try {
			resultCd = codeDao.codeSort(map);

		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}
}
