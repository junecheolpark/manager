package co.junecheol.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.junecheol.dto.UserDTO;

@Repository
public class LoginDAO {	
	@Autowired
	@Resource(name = "sqlSessionTemplate")
	private SqlSession session;
	
	// 로그인
	public Integer login(Map<String, Object> map){
		return session.selectOne("login_mapper.login", map);
	}	
	
	// 로그인 정보
	public UserDTO loginInfo(Map<String, Object> map){
		return session.selectOne("login_mapper.loginInfo", map);
	}
}
