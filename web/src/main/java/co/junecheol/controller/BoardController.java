package co.junecheol.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import co.junecheol.common.CommonFunc;
import co.junecheol.dto.BoardDTO;
import co.junecheol.dto.FileDTO;
import co.junecheol.service.BoardService;

@Controller
@RequestMapping(value = "/board/")
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	private final String uploadPath = CommonFunc.siteProp().getProperty("site.uploadPath");
	
	
	// 게시글 리스트 개수
	@RequestMapping(value = "listTotal", method = RequestMethod.GET)
	@ResponseBody
	public Integer companyListTotal(@RequestParam final Map<String, Object> map) throws Exception {

		Integer totalCnt = 0;
		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("LIST_TP", Integer.valueOf(map.get("ltype").toString()));
				put("PAGE", Integer.valueOf(map.get("page").toString()));
				put("PAGESIZE", Integer.valueOf(map.get("psize").toString()));
				put("MASTER_BOARD_IDX", Integer.valueOf(map.get("midx").toString()));
				put("SEARCH_DATE1", (String) map.get("schd1"));
				put("SEARCH_DATE2", (String) map.get("schd2"));
				put("SEARCH_R_NM", (String) map.get("schrnm"));
				put("SCH_SEL", Integer.valueOf(map.get("schsel").toString()));
				put("SCH_TXT", (String) map.get("schtxt"));
				put("ORDER_BY", Integer.valueOf(map.get("orderby").toString()));
				put("DESC", Integer.valueOf(map.get("desc").toString()));
			}
		};
		// System.out.println(hashMap);
		totalCnt = boardService.boardListTotal(hashMap);

		return totalCnt;
	}

	// 게시글 리스트
	@RequestMapping(value = "list", method = RequestMethod.GET)
	@ResponseBody
	public List<BoardDTO> companyList(@RequestParam final Map<String, Object> map) throws Exception {

		List<BoardDTO> list = new ArrayList<BoardDTO>();

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("LIST_TP", Integer.valueOf(map.get("ltype").toString()));
				put("PAGE", Integer.valueOf(map.get("page").toString()));
				put("PAGESIZE", Integer.valueOf(map.get("psize").toString()));
				put("MASTER_BOARD_IDX", Integer.valueOf(map.get("midx").toString()));
				put("SEARCH_DATE1", (String) map.get("schd1"));
				put("SEARCH_DATE2", (String) map.get("schd2"));
				put("SEARCH_R_NM", (String) map.get("schrnm"));
				put("SCH_SEL", Integer.valueOf(map.get("schsel").toString()));
				put("SCH_TXT", (String) map.get("schtxt"));
				put("ORDER_BY", Integer.valueOf(map.get("orderby").toString()));
				put("DESC", Integer.valueOf(map.get("desc").toString()));
			}
		};
		list = boardService.boardList(hashMap);

		return list;
	}

	// 게시글 보기
	@RequestMapping(value = "view", method = RequestMethod.GET)
	@ResponseBody
	public BoardDTO companyView(@RequestParam final Map<String, Object> map) throws Exception {
		// System.out.println("controller companyView");
		BoardDTO dto = new BoardDTO();

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("BOARD_IDX", Integer.valueOf(map.get("bidx").toString()));
			}
		};

		dto = boardService.boardView(hashMap);

		return dto;
	}

	// 게시글 등록/수정/조회수
		@RequestMapping(value = "input", method = RequestMethod.POST)
		@ResponseBody
		public Integer companyInput(@RequestBody final Map<String, Object> map) throws Exception {
			// System.out.println("controller companyInput");
			Integer resultCd = 9;

			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("BOARD_IDX", (Integer) map.get("bidx"));
					put("MASTER_BOARD_IDX", (Integer) map.get("mbidx"));
					put("REG_NM", (String) map.get("rnm"));
					put("REG_CNT", (Integer) map.get("rcnt"));
					put("SUBJ", (String) map.get("subj"));
					put("CONTS", (String) map.get("conts"));
					put("REG_IDX", (Integer) map.get("ridx"));
					put("RESULT_CD", 9);
				}
			};

			boardService.boardInput(hashMap);
			// System.out.println(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

			return resultCd;
		}

		// 게시글 삭제
		@RequestMapping(value = "delete", method = RequestMethod.POST)
		@ResponseBody
		public Integer companyDelete(@RequestBody final Map<String, Object> map) throws Exception {
			Integer resultCd = 9;

			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("DEL_TP", (Integer) map.get("deltp"));
					put("BOARD_IDX", (Integer) map.get("bidx"));
					put("DEL_IDX", (Integer) map.get("didx"));
					put("RESULT_CD", 9);
				}
			};

			boardService.boardDelete(hashMap);
			// System.out.println(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

			return resultCd;
		}

		// 게시판 파일 목록
		@RequestMapping(value = "fileList", method = RequestMethod.GET)
		@ResponseBody
		public List<FileDTO> boardFileList(@RequestParam final Map<String, Object> map) throws Exception {
			List<FileDTO> list = new ArrayList<FileDTO>();

			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("BOARD_IDX", Integer.valueOf(map.get("bidx").toString()));
					put("FILE_IDX", Integer.valueOf(map.get("fidx").toString()));
					put("FILE_TP", Integer.valueOf(map.get("ftp").toString()));

				}
			};

			list = boardService.boardFileList(hashMap);
			return list;
		}

		// 게시판 파일 등록/수정
		@RequestMapping(value = "fileInput", method = RequestMethod.POST)
		@ResponseBody
		public Integer boardFileInput(@RequestBody final Map<String, Object> map) throws Exception {
	//System.out.println("controller boardFileInput");
			Integer resultCd = 9;

			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("BOARD_IDX", (Integer) map.get("bidx"));
					put("FILE_IDX", (Integer) map.get("fidx"));
					put("FILE_TP", (Integer) map.get("ftp"));
					put("FILE_PATH", (String) map.get("fpath"));
					put("FILE_NM", (String) map.get("fnm"));
					put("REAL_FILE_NM", (String) map.get("rfnm"));
					put("FILE_SIZE", (Integer) map.get("fsize"));
					put("REG_IDX", (Integer) map.get("ridx"));

				}
			};
			 System.out.println("hashMap : " + hashMap);
			boardService.boardFileInput(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

			return resultCd;
		}

		// 게시판 파일 삭제
		@RequestMapping(value = "fileDelete", method = RequestMethod.POST)
		@ResponseBody
		public Integer boardFileDelete(@RequestBody final Map<String, Object> map) throws Exception {
			Integer resultCd = 9;
			String fpt = (String) map.get("furl"), fnm = (String) map.get("fnm");
			fileDataDelete(fpt, fnm);

			Map<String, Object> hashMap = new HashMap<String, Object>() {
				private static final long serialVersionUID = 1L;
				{
					put("DEL_TP", (Integer) map.get("deltp"));
					put("BOARD_IDX", (Integer) map.get("bidx"));
					put("FILE_IDX", (Integer) map.get("fidx"));
					put("DEL_IDX", (Integer) map.get("didx"));
					put("RESULT_CD", 9);
				}
			};

			boardService.boardFileDelete(hashMap);
	//System.out.println(hashMap);
			resultCd = (Integer) hashMap.get("RESULT_CD");

			return resultCd;
		}

		// 지정파일 삭제
		public void fileDataDelete(String fpt, String fnm) throws Exception {
			fpt = CommonFunc.decryptAES256(fpt);
			fnm = CommonFunc.decryptAES256(fnm);
			// System.out.println("fpt :" + fpt);
			// System.out.println("fnm :" + fnm);
			String path = uploadPath + "\\" + fpt, fullPath = path + "\\" + fnm;
			File folder = new File(fullPath);

			if (folder.exists()) {// 파일이있다면
				try {// 파일삭제
					if (folder.delete()) {
						System.out.println("파일삭제 성공");
					} else {
						System.out.println("파일삭제 실패");
					}

				} catch (Exception e) {
					e.getStackTrace();
				}
			} else {
				System.out.println("파일이 존재하지 않습니다.");
			}
		}
}
