package edu.kh.project.member.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.kh.project.member.model.vo.Member;

@Service
public interface AjaxService {

	/** 이메일 중복 검사 서비스
	 * @param memberEmail
	 * @return result
	 */
	int emailDupCheck(String memberEmail);

	/** 닉네임 중복 검사 서비스
	 * @param memberNickname
	 * @return result
	 */
	int nicknameDupCheck(String memberNickname);

	/** 이메일 회원 정보 조회 서비스
	 * @param email
	 * @return member
	 */
	Member selectEmail(String email);

	/** 회원 목록 조회 서비스
	 * @return memberList
	 */
	List<Member> selectMemberList();

}
