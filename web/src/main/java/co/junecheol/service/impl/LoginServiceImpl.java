package co.junecheol.service.impl;

import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import co.junecheol.dao.LoginDAO;
import co.junecheol.dto.UserDTO;
import co.junecheol.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	
	@Inject
	LoginDAO loginDAO;
	
	// 로그인
    @Override
    public Integer login(Map<String, Object> map) {
    	Integer resultCd = 9;
    	
		try {
			resultCd = loginDAO.login(map);
		} catch (Exception e) {
			log.error("error", e);
		}
    	
		return resultCd;
    }   	
	
	// 로그인 정보
	@Override
    public UserDTO loginInfo(Map<String, Object> map) {
		UserDTO dto = new UserDTO();
//		   System.out.println("Service menuList");   	

		try {
			dto = loginDAO.loginInfo(map);
		} catch (Exception e) {
			dto.setUSER_IDX(0);
			log.error("error", e);
		}        
 
        return dto; 
    }
}
