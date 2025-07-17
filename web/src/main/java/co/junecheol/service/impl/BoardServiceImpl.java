package co.junecheol.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import co.junecheol.dao.BoardDAO;
import co.junecheol.dto.BoardDTO;
import co.junecheol.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService {
	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	
	@Inject
	BoardDAO boardDao;

	// 개수
	@Override
	public Integer boardListTotal(Map<String, Object> map) {
		Integer total = 0;
		try {
			total = boardDao.boardListTotal(map);
		} catch (Exception e) {
			log.error("error", e);
		}
		return total;
	}

	// 목록
	@Override
	public List<BoardDTO> boardList(Map<String, Object> map) {
		List<BoardDTO> list = new ArrayList<BoardDTO>();

		try {
			list = boardDao.boardList(map);
		} catch (Exception e) {
			log.error("error", e);
		}
		return list;
	}

	// 게시글 뷰
	@Override
	public BoardDTO boardView(Map<String, Object> map) {
		BoardDTO dto = new BoardDTO();

		try {
			dto = boardDao.boardView(map);
		} catch (Exception e) {
			log.error("error", e);
		}
		return dto;
	}
}
