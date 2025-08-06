package co.junecheol.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import co.junecheol.dto.MemoDTO;
import co.junecheol.dto.UserDTO;

public interface UserService {
    
	//HttpSession은 사용자 인증정보를 처리하는 클래스
	public Integer userListTotal(Map<String, Object> map); // 사용자 목록 개수
	public List<UserDTO> userList(Map<String, Object> map); // 사용자 목록
	
	public UserDTO userView(Map<String, Object> map); // 사용자 보기
	public Integer userInput(Map<String, Object> map); // 사용자 등록/수정
	public Integer userDelete(Map<String, Object> map); // 사용자 삭제
	
	public Integer userVacationTotal(Map<String, Object> map); // 사용자 휴가권한 개수
	public List<UserDTO> userVacation(Map<String, Object> map); // 사용자 휴가권한
	public Integer vacationInput(Map<String, Object> map); // 사용자 휴가 등록/수정

	public String userSel(Map<String, Object> map); // 사용자 배열
	
	public Integer workInOutInput(Map<String, Object> map); // 사용자 출퇴근 등록/수정
	
	public List<MemoDTO> memoList(Map<String, Object> map); // 메모 목록
	public Integer memoInput(Map<String, Object> map); // 메모 등록/수정
	public Integer memoDelete(Map<String, Object> map); // 메모 삭제  
}
