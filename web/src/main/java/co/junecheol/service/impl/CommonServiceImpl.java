package co.junecheol.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import co.junecheol.dao.CommonDAO;
import co.junecheol.dto.CodeSelDTO;
import co.junecheol.service.CommonService;

@Service
public class CommonServiceImpl implements CommonService {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	
	@Inject
	CommonDAO commonDAO;
	
	// 코드 목록
	@Override
	public List<CodeSelDTO> codeSelList(CodeSelDTO dto) {
		//System.out.println("Service companyList");
		List<CodeSelDTO> list = new ArrayList<CodeSelDTO>();   	
		 
		try {
			list = commonDAO.codeSelList(dto);
		} catch (Exception e) {
			log.error("error", e);
		}        
 
        return list;		 
	}
}
