package edu.kh.project.member.model.service;

import edu.kh.project.member.model.vo.Member;

/* Service Interface 사용 이유
 * 	
 * 	1. 프로젝트에 규칙성을 부여하기 위해서
 * 
 *  2. 클래스간의 결합도를 약화시키기 위함
 *     --> 유지 보수성 향상(객체 지향적 설계)
 *     --> 부모를 오버라이딩 할 경우 부모가 가진 코드만 사용 가능하기 때문에
 *     --> 자식 부분 수정이 용이하다
 *     
 *  3. AOP를 사용하기 위함
 * 	   --> spring-proxy를 이용하여 AOP 코드가 동작하는데
 * 		   이 spring-proxy는 Service 인터페이스를 상속받아 동작 
 * 
 *     
 */
public interface MemberService {
	
	/** 로그인 서비스
	 * @param inputMember(Email/Pw)
	 * @return loginMember
	 */
	public abstract Member login(Member inputMember);

	
	
	/** 회원가입 서비스
	 * @param inputMember
	 * @return result
	 */
	public abstract int signUp(Member inputMember);

}
