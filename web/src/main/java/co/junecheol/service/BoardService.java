package co.junecheol.service;

import java.util.List;
import java.util.Map;

import co.junecheol.dto.BoardDTO;
import co.junecheol.dto.FileDTO;

public interface BoardService {
	public Integer boardListTotal(Map<String, Object> map); // 게시글 개수
	public List<BoardDTO> boardList(Map<String, Object> map); // 게시글 목록
	public BoardDTO boardView(Map<String, Object> map); // 게시글 뷰
	public Integer boardInput(Map<String, Object> map); // // 게시글 등록/수정/조회수
	public Integer boardDelete(Map<String, Object> map); // // 게시글 삭제
	
	public List<FileDTO> boardFileList(Map<String, Object> map); // 게시판 첨부파일 목록
	public Integer boardFileInput(Map<String, Object> map); // 게시판 첨부파일 등록/수정
	public Integer boardFileDelete(Map<String, Object> map); // 게시판 첨부파일 삭제
}
