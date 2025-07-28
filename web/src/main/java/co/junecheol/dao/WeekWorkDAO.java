package co.junecheol.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.junecheol.dto.WeekWorkDTO;

@Repository
public class WeekWorkDAO {
	
	@Autowired
	@Resource(name = "sqlSessionTemplate")
	private SqlSession session;

	// 주간업무list
	public List<WeekWorkDTO> weekWorkList(Map<String, Object> map) {
		return session.selectList("weekwork_mapper.weekWorkList", map);
	}
	
	// 주간업무 등록/수정/
	public Integer weekWorkInput(Map<String, Object> map){
		return session.insert("weekwork_mapper.weekWorkInput", map);
	}	
	
	// 주간업무 삭제
	public Integer weekWorkDelete(Map<String, Object> map){
		System.out.println(map);
		return session.delete("weekwork_mapper.weekWorkDelete", map);
	}	
}
