package co.junecheol.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.junecheol.dto.CodeDTO;

@Repository
public class CodeDAO {
	
	@Autowired
	@Resource(name = "sqlSessionTemplate")
	private SqlSession session;

	// 소중대분류
	public List<CodeDTO> codeList(int code_idx) {
		return session.selectList("code_mapper.codeList", code_idx);
	}

	// 코드 등록/수정
	public Integer codeInput(Map<String, Object> map) {
		return session.insert("code_mapper.codeInput", map);
	}

	// 정렬 업데이트
	public Integer codeSort(Map<String, Object> map) {
		System.out.println(map);
		return session.insert("code_mapper.codeSort", map);
	}
	
}
