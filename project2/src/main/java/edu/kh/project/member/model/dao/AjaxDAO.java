package edu.kh.project.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AjaxDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
//	SqlSessionTemplate: 커넥션 + 마이바티스 + 스프링 TX 제어


	/** 이메일 중복검사 DAO
	 * @param memberEmail
	 * @return
	 */
	public int emailDupCheck(String memberEmail) {
		return sqlSession.selectOne("ajaxMapper.emailDupCheck", memberEmail);
	}
	

}
