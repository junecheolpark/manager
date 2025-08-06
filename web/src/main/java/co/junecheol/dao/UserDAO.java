package co.junecheol.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.junecheol.dto.MemoDTO;
import co.junecheol.dto.UserDTO;

@Repository
public class UserDAO {

	@Autowired
	@Resource(name = "sqlSessionTemplate")
	private SqlSession session;

	// 사용자 목록 개수
	public Integer userListTotal(Map<String, Object> map) {
		return session.selectOne("user_mapper.userListTotal", map);
	}

	// 사용자 목록
	public List<UserDTO> userList(Map<String, Object> map) {
		return session.selectList("user_mapper.userList", map);
	}

	// 사용자 보기
	public UserDTO userView(Map<String, Object> map) {
		return session.selectOne("user_mapper.userView", map);
	}

	// 사용자 비밀번호 수정
	public Integer userInput(Map<String, Object> map) {
		return session.insert("user_mapper.userInput", map);
	}
	
	// 사용자 삭제
	public Integer userDelete(Map<String, Object> map) {
		return session.delete("user_mapper.userDelete", map);
	}

	// 사용자 휴가 권한 개수
	public Integer userVacationTotal(Map<String, Object> map) {
		return session.selectOne("user_mapper.userVacationTotal", map);
	}
	
	// 사용자 휴가 권한
	public List<UserDTO> userVacation(Map<String, Object> map) {
		return session.selectList("user_mapper.userVacation", map);
	}
	
	// 사용자 휴가 등록/수정
	public Integer vacationInput(Map<String, Object> map) {
		return session.insert("user_mapper.vacationInput", map);
	}

	// 사용자 배열
	public String userSel(Map<String, Object> map) {
		return session.selectOne("user_mapper.userSel", map);
	}
	// 사용자 출퇴근 등록/수정
	public Integer workInOutInput(Map<String, Object> map) {
		return session.insert("user_mapper.workInOutInput", map);
	}
	
	// 사용자 출퇴근 설정 시간 개수
	public Integer userWorkTimeTotal(Map<String, Object> map) {
		return session.selectOne("user_mapper.userWorkTimeTotal", map);
	}
	
	// 메모 목록
	public List<MemoDTO> memoList(Map<String, Object> map) {
		return session.selectList("user_mapper.memoList", map);
	}

	// 메모 등록/수정
	public Integer memoInput(Map<String, Object> map) {
		return session.insert("user_mapper.memoInput", map);
	}

	// 메모 삭제
	public Integer memoDelete(Map<String, Object> map) {
		return session.delete("user_mapper.memoDelete", map);
	}
}