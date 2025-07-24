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
import co.junecheol.dto.FileDTO;
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
	
	// 게시글 등록/수정/조회수
		@Override
		public Integer boardInput(Map<String, Object> map) {
			Integer resultCd = 9;

			try {
				resultCd = boardDao.boardInput(map);
			} catch (Exception e) {
				log.error("error", e);
			}

			return resultCd;
		}

		// 게시글 삭제
		@Override
		public Integer boardDelete(Map<String, Object> map) {
			Integer resultCd = 9;

			try {
				resultCd = boardDao.boardDelete(map);
			} catch (Exception e) {
				log.error("error", e);
			}

			return resultCd;
		}

		// 유지보수 파일 목록
		@Override
		public List<FileDTO> boardFileList(Map<String, Object> map) {
			// System.out.println("Service boardFileList");
			List<FileDTO> list = new ArrayList<FileDTO>();

			try {
				list = boardDao.boardFileList(map);
			} catch (Exception e) {
				log.error("error", e);
			}

			return list;
		}

		// 유지보수 파일 등록/수정
		@Override
		public Integer boardFileInput(Map<String, Object> map) {
			Integer resultCd = 9;

			try {
				resultCd = boardDao.boardFileInput(map);
			} catch (Exception e) {
				log.error("error", e);
			}

			return resultCd;
		}

		// 유지보수 파일 삭제
		@Override
		public Integer boardFileDelete(Map<String, Object> map) {
			Integer resultCd = 9;

			try {
				resultCd = boardDao.boardFileDelete(map);
			} catch (Exception e) {
				log.error("error", e);
			}

			return resultCd;
		}
}
