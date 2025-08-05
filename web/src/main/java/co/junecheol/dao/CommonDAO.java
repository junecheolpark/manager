package co.junecheol.dao;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.junecheol.dto.CodeSelDTO;

@Repository
public class CommonDAO {
	
	@Autowired
	@Resource(name = "sqlSessionTemplate")
	private SqlSession session;
	
	// 코드 목록
	public List<CodeSelDTO> codeSelList(CodeSelDTO dto){
		return session.selectList("common_mapper.codeSelList", dto);
	}
	
}
