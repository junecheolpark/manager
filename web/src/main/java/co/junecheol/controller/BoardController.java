package co.junecheol.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import co.junecheol.common.CommonFunc;
import co.junecheol.dto.BoardDTO;
import co.junecheol.service.BoardService;

@Controller
@RequestMapping(value = "/board/")
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	private final String uploadPath = CommonFunc.siteProp().getProperty("site.uploadPath");
	
	
	// 게시글 리스트 개수
	@RequestMapping(value = "listTotal", method = RequestMethod.POST)
	@ResponseBody
	public Integer companyListTotal(@RequestBody final Map<String, Object> map) throws Exception {

		Integer totalCnt = 0;
		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("LIST_TP", (Integer) map.get("ltype"));
				put("PAGE", (Integer) map.get("page"));
				put("PAGESIZE", (Integer) map.get("psize"));
				put("MASTER_BOARD_IDX", (Integer) map.get("midx"));
				put("SEARCH_DATE1", (String) map.get("schd1"));
				put("SEARCH_DATE2", (String) map.get("schd2"));
				put("SEARCH_R_NM", (String) map.get("schrnm"));
				put("SCH_SEL", (Integer) map.get("schsel"));
				put("SCH_TXT", (String) map.get("schtxt"));
				put("ORDER_BY", (Integer) map.get("orderby"));
				put("DESC", (Integer) map.get("desc"));
			}
		};
		// System.out.println(hashMap);
		totalCnt = boardService.boardListTotal(hashMap);

		return totalCnt;
	}

	// 게시글 리스트
	@RequestMapping(value = "list", method = RequestMethod.POST)
	@ResponseBody
	public List<BoardDTO> companyList(@RequestBody final Map<String, Object> map) throws Exception {

		List<BoardDTO> list = new ArrayList<BoardDTO>();

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("LIST_TP", (Integer) map.get("ltype"));
				put("PAGE", (Integer) map.get("page"));
				put("PAGESIZE", (Integer) map.get("psize"));
				put("MASTER_BOARD_IDX", (Integer) map.get("midx"));
				put("SEARCH_DATE1", (String) map.get("schd1"));
				put("SEARCH_DATE2", (String) map.get("schd2"));
				put("SEARCH_R_NM", (String) map.get("schrnm"));
				put("SCH_SEL", (Integer) map.get("schsel"));
				put("SCH_TXT", (String) map.get("schtxt"));
				put("ORDER_BY", (Integer) map.get("orderby"));
				put("DESC", (Integer) map.get("desc"));
			}
		};
		list = boardService.boardList(hashMap);

		return list;
	}

	// 게시글 보기
	@RequestMapping(value = "view", method = RequestMethod.POST)
	@ResponseBody
	public BoardDTO companyView(@RequestBody final Map<String, Object> map) throws Exception {
		// System.out.println("controller companyView");
		BoardDTO dto = new BoardDTO();

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("BOARD_IDX", (Integer) map.get("bidx"));
			}
		};

		dto = boardService.boardView(hashMap);

		return dto;
	}
}
