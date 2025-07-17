package co.junecheol.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.junecheol.dto.BoardDTO;

@Repository
public class BoardDAO {

	@Autowired
	@Resource(name = "sqlSessionTemplate")
	private SqlSession session;

	// boardlist
	public List<BoardDTO> boardList(Map<String, Object> map) {
		return session.selectList("board_mapper.boardList", map);
	}

	// boardlistTotal
	public Integer boardListTotal(Map<String, Object> map) {
		return session.selectOne("board_mapper.boardListTotal", map);
	}

	// boardlist
	public BoardDTO boardView(Map<String, Object> map) {
		return session.selectOne("board_mapper.boardView", map);
	}

}
