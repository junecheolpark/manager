package co.junecheol.service;

import java.util.Map;

import co.junecheol.dto.UserDTO;

public interface LoginService {
	public Integer login(Map<String, Object> map); // 로그인 확인
	public UserDTO loginInfo(Map<String, Object> map); // 로그인 정보
}
