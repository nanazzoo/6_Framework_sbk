package edu.kh.project.member.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import edu.kh.project.member.model.service.MyPageService;
import edu.kh.project.member.model.vo.Member;

// 클래스 레벨에 작성된 @RequestMapping
// -> 요청 주소 중 앞에 공통된 부분을 작성하여
//	  해당 유형의 요청을 모두 받아들인다고 알림
@SessionAttributes("loginMember") //탈퇴 성공 시 로그아웃에 사용
@RequestMapping("/member/myPage")
@Controller //bean 등록
public class MyPageController {

	@Autowired
	private MyPageService service;
	
//	내 정보 페이지 이동
	@GetMapping("/info")
	public String info() {
		
		
		return "member/myPage-info";
	}
	
//	내 정보 수정
	@PostMapping("/info")
	public String updateInfo(Member inputMember, String[] memberAddress,
							@SessionAttribute("loginMember") Member loginMember,
							RedirectAttributes ra
							){
		
//		inputMember: 입력받은 memberNickname, MemberTell, MemberAddress(가공 필요)
//		memberAddress: 우편번호, 주소, 상세주소가 담긴 배열
		
	    // 기존 방법
	    //HttpSession session = req.getSession();
	    //Member loginMember = (Member)session.getAttribute("loginMember");	
		
//		@SessionAttribute("loginMember") Member loginMember
//		-> session의 속성중 "loginMember"를 key로 가지는 값을 
//		   매개변수에 대입
		
//		1. 로그인된 회원 정보에서 회원 번호를 얻어와 inputMember에 저장
		inputMember.setMemberNo(loginMember.getMemberNo());
		
//		2. inputMember.memberAddress의 값에 따라 변경
		if(inputMember.getMemberAddress().equals(",,")) { //주소 미작성
			inputMember.setMemberAddress(null);
		} else {
			String address = String.join(",,", memberAddress);
			inputMember.setMemberAddress(address);
		}
		
//		회원 정보 수정 서비스 호출 후 결과 반환받기
		int result = service.updateInfo(inputMember);
		
		String message = null;
		
		if(result > 0) {
			message = "회원 정보가 수정되었습니다.";
			
//			DB - Session 동기화
			loginMember.setMemberNickname(inputMember.getMemberNickname());
			loginMember.setMemberTel(inputMember.getMemberTel());
			loginMember.setMemberAddress(inputMember.getMemberAddress());
			
			
		} else {
			message = "회원 정보 수정 실패";
			
		}
		
		ra.addFlashAttribute("message", message);
		
		
		return "redirect:info"; // 내 정보 페이지 재요청
	}
	
	
	@GetMapping("/changePw")
	public String changePw() {
		return "member/myPage-changePw";
	}
	
//	비밀번호 변경
	@PostMapping("/changePw")
	public String changePw(
			@SessionAttribute("loginMember") Member loginMember,
			// String currentPw, String newPw // 파라미터 각각 전달 받기
			@RequestParam Map<String, Object> paramMap,
			RedirectAttributes ra
			) {
		
//		@RequestParam Map<String, Object> paramMap
//		- 모든 파라미터를 맵 형식으로 얻어와 저장
		
//		1. 로그인 멤버에서 회원번호를 얻어와 paramMap에 추가
		paramMap.put("memberNo", loginMember.getMemberNo());
		
//		2. 서비스 호출 후 결과 반환받기
		int result = service.changePw(paramMap);
		
		String message = null;
		String path = null;
		
		if(result > 0) {
			message = "비밀번호가 변경되었습니다.";
			path = "info";
			
		} else {
			message = "현재 비밀번호가 일치하지 않습니다.";
			path = "changePw";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	
//	회원 탈퇴 페이지 이동
	@GetMapping("/delete")
	public String memberDelete() {
		return "member/myPage-delete";
	}
	
//	회원 탈퇴
	@PostMapping("/delete")
	public String memberDelete(@SessionAttribute("loginMember") Member loginMember,
			String memberPw,
			SessionStatus status,
			RedirectAttributes ra) {
		
//		status.setComplete(); //세션 무효화
//		클래스 레벨에 작성된 @SessionAttributes("key")에 작성된 key가 일치하는 값만 무효화
		
//		ex) session에서 "loginMember"를 없애야 한다
//		== @SessionAttributes("loginMember")
//		---
//		status.setComplete(); loginMember 무효화
		
//		서비스 호출 후 결과 반환 받기
		int result = service.memberDelete(loginMember.getMemberNo(), memberPw);
		
		String path = null;
		String message = null;
		
		if(result > 0) {
			message = "탈퇴되었습니다";
			
//			메인페이지로 이동
			path = "/";
			
//			로그아웃
			status.setComplete();
		} else {
			message = "비밀번호가 일치하지 않습니다.";
			
			path="delete";
		}
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:" + path;
	}
	
	
//	프로필 화면 이동
	
	@GetMapping("/profile")
	public String profile() {
		return "member/myPage-profile";
	}
	

// MultipartFile
// - MultipartResolver에 의해서 반환된 input type="file"
	
//	- 제공 메서드
//	1) getOriginalFilename(): 파일 원본명
//	2) getSize(): 파일 크기
//	3) transferTo(): 메모리에 임시저장된 파일을 지정된 경로에 저장
	
//	프로필 이미지 수정
	@PostMapping("/updateProfile")
	public String updateProfile(@RequestParam(value="profileImage") MultipartFile profileImage,
			@SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra, /*메세지 전달용*/
			HttpServletRequest req /*저장할 서버 경로*/) throws Exception {
		
//		** 업로드된 이미지를 프로젝트 폴더 내부에 저장하는 방법 **
		
//		1) servers -> 지정된 서버 설정 -> Serve modules without publishing 체크
//		2) 파일을 저장할 폴더 생성
//		3) HttpServletRequest를 이용해서 저장할 폴더 절대 경로 얻어오기
//		4) MultipartFile.transferTo()를 이용해서 지정된 경로에 파일 저장
		
//		인터넷 주소로 접근할 수 있는 경로
		String webPath = "/resources/images/memberProfile/";

//		실제 파일이 저장된 컴퓨터 상의 절대 경로
		String filePath = req.getSession().getServletContext().getRealPath(webPath);
//							application scope 객체 얻어오기 == 프로그램 자체의 image 경로
		
		int result = service.updateProfile(webPath, filePath, profileImage, loginMember);
		
		String message = null;
		
		if(result>0) {
			message = "프로필 이미지가 변경되었습니다";
		} else {
			message = "프로필 이미지 변경 실패";
			
		}
		
		ra.addFlashAttribute("message", message);
		
//		상대경로
		return "redirect:profile";
		
//		절대경로
//		member/myPage/profile
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
