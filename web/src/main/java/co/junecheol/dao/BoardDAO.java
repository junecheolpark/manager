package co.junecheol.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.junecheol.dto.BoardDTO;
import co.junecheol.dto.FileDTO;

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
	
	// 게시글 등록/수정/조회수
	public Integer boardInput(Map<String, Object> map) {
		return session.insert("board_mapper.boardInput", map);
	}

	// 게시글 삭제
	public Integer boardDelete(Map<String, Object> map) {
		return session.delete("board_mapper.boardDelete", map);
	}

	// 게시판 파일 목록
	public List<FileDTO> boardFileList(Map<String, Object> map) {
		return session.selectList("board_mapper.boardFileList", map);
	}

	// 게시판 파일 등록/수정
	public Integer boardFileInput(Map<String, Object> map) {
		return session.insert("board_mapper.boardFileInput", map);
	}

	// 게시판 파일 삭제
	public Integer boardFileDelete(Map<String, Object> map) {
		return session.delete("board_mapper.boardFileDelete", map);
	}

}
