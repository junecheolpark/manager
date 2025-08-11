package co.junecheol.service;

import java.util.List;
import java.util.Map;

import co.junecheol.dto.CodeDTO;

public interface CodeService {
	public List<CodeDTO> codeList(int code_idx); // 코드 목록
	public Integer codeInput(Map<String, Object> map);// 코드 등록, 수정
	public Integer codeSort(Map<String, Object> map);// 정렬

}
