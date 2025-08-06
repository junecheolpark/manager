package co.junecheol.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import co.junecheol.dao.UserDAO;
import co.junecheol.dto.MemoDTO;
import co.junecheol.dto.UserDTO;
import co.junecheol.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());

	@Inject
	UserDAO userDao;

	// 사용자 목록
	@Override
	public Integer userListTotal(Map<String, Object> map) {
		// System.out.println("Service userListTotal");
		Integer totalCnt = 0;

		try {
			totalCnt = userDao.userListTotal(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return totalCnt;
	}

	// 사용자 목록
	@Override
	public List<UserDTO> userList(Map<String, Object> map) {
		// System.out.println("Service userList");
		List<UserDTO> list = new ArrayList<UserDTO>();

		try {
			list = userDao.userList(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return list;
	}

	// 사용자 정보
	@Override
	public UserDTO userView(Map<String, Object> map) {
		UserDTO userDto = new UserDTO();

		try {
			userDto = userDao.userView(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return userDto;
	}

	// 사용자 등록/수정
	@Override
	public Integer userInput(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = userDao.userInput(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 사용자 삭제
	@Override
	public Integer userDelete(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = userDao.userDelete(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 사용자 휴가권한 개수
	@Override
	public Integer userVacationTotal(Map<String, Object> map) {
		Integer totalCnt = 0;

		try {
			totalCnt = userDao.userVacationTotal(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return totalCnt;
	}

	// 사용자 휴가 권한
	@Override
	public List<UserDTO> userVacation(Map<String, Object> map) {
		List<UserDTO> list = new ArrayList<UserDTO>();

		try {
			list = userDao.userVacation(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return list;
	}

	// 사용자 출퇴근 등록/수정
	@Override
	public Integer workInOutInput(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = userDao.workInOutInput(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 사용자 휴가 등록/수정
	@Override
	public Integer vacationInput(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = userDao.vacationInput(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 사용자 배열
	@Override
	public String userSel(Map<String, Object> map) {
		String str = "";
		try {
			str = userDao.userSel(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return str;
	}

	// 메모 목록
	@Override
	public List<MemoDTO> memoList(Map<String, Object> map) {
		// System.out.println("Service userList");
		List<MemoDTO> list = new ArrayList<MemoDTO>();

		try {
			list = userDao.memoList(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return list;
	}

	// 메모 등록/수정
	@Override
	public Integer memoInput(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = userDao.memoInput(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

	// 메모 삭제
	@Override
	public Integer memoDelete(Map<String, Object> map) {
		Integer resultCd = 9;

		try {
			resultCd = userDao.memoDelete(map);
		} catch (Exception e) {
			log.error("error", e);
		}

		return resultCd;
	}

}