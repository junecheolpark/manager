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

import co.junecheol.dto.CodeDTO;
import co.junecheol.service.CodeService;

@Controller
@RequestMapping(value = "/code/")
public class CodeController {
	@Autowired
	private CodeService codeService;

	// 리스트 조회
	@ResponseBody
	@RequestMapping(value = "list")
	public List<CodeDTO> codeList(@RequestBody Map<String, Object> map) throws Exception {
		Integer cidx = (Integer) map.get("idx");

		List<CodeDTO> list = new ArrayList<CodeDTO>();
		list = codeService.codeList(cidx);
		return list;
	}

	// 등록 및 업데이트
	@RequestMapping(value = "input", method = RequestMethod.POST)
	@ResponseBody
	public Integer codeInput(@RequestBody final Map<String, Object> map) throws Exception {
		Integer resultCd = 9;

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("CODE_IDX", (Integer) map.get("cidx"));
				put("PARENT_IDX", (Integer) map.get("pidx"));
				put("CODE_ID", (String) map.get("cid"));
				put("CODE_NM", (String) map.get("cnm"));
				put("CODE_DEPTH", (Integer) map.get("cdep"));
				put("CODE_STS", (Integer) map.get("csts"));
				put("CODE_SORT", (Integer) map.get("csor"));
				put("RED_IDX", (Integer) map.get("ridx"));
				put("RESULT_CD", 9);
			}
		};
		// System.out.println(hashMap);
		codeService.codeInput(hashMap);
		resultCd = (Integer) hashMap.get("RESULT_CD");

		return resultCd;
	}

	// 정렬 업데이트
	@RequestMapping(value = "sort", method = RequestMethod.POST)
	@ResponseBody
	public Integer codeSort(@RequestBody final Map<String, Object> map) throws Exception {
		Integer resultCd = 9;

		Map<String, Object> hashMap = new HashMap<String, Object>() {
			private static final long serialVersionUID = 1L;
			{
				put("CODE_IDX", (Integer) map.get("cidx"));
				put("PARENT_IDX", (Integer) map.get("pidx"));
				put("CHANGE_SORT", (Integer) map.get("chsort"));
				put("CODE_SORT", (Integer) map.get("sort"));
				put("RESULT_CD", 9);
			}
		};
		System.out.println(hashMap);
		codeService.codeSort(hashMap);
		resultCd = (Integer) hashMap.get("RESULT_CD");

		return resultCd;
	}
}
