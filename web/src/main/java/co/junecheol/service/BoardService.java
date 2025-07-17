package co.junecheol.service;

import java.util.List;
import java.util.Map;

import co.junecheol.dto.BoardDTO;

public interface BoardService {
	public Integer boardListTotal(Map<String, Object> map); // 게시글 개수
	public List<BoardDTO> boardList(Map<String, Object> map); // 게시글 목록
	public BoardDTO boardView(Map<String, Object> map); // 게시글 뷰
}
