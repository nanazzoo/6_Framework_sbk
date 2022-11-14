package edu.kh.project.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.kh.project.member.model.dao.AjaxDAO;
import edu.kh.project.member.model.vo.Member;

@Service
public class AjaxServiceImpl implements AjaxService{
	
	@Autowired
	private AjaxDAO dao;
	
//	이메일 중복검사
	@Override
	public int emailDupCheck(String memberEmail) {
		return dao.emailDupCheck(memberEmail);
	}

	@Override
	public int nicknameDupCheck(String memberNickname) {
		return dao.nicknameDupCheck(memberNickname);
	}
	
	@Override
	public Member selectEmail(String email) {
		return dao.selectEmail(email);
	}
	
	@Override
	public List<Member> selectMemberList() {
		return dao.selectMemberList();
	}
}
