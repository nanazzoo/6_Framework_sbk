// 비밀번호 변경 유효성 검사

// 비밀번호 변경 form 요소
const changePwForm = document.getElementById("changePwForm");

if (changePwForm != null) {
  //changePwForm 요소가 존재할 때
  changePwForm.addEventListener("submit", function (event) {
    // ** 이벤트 핸들러 매개변수 event || e **
    // -> 현재 발생한 이벤트 정보를 가지고있는 event 객체가 전달됨
    console.log(event);

    // 비밀번호 변경에 사용되는 input요소 모두 얻어오기
    const currentPw = document.getElementById("currentPw");
    const newPw = document.getElementById("newPw");
    const newPwConfirm = document.getElementById("newPwConfirm");

    // 현재 비밀번호가 작성되지 않았을 때
    if (currentPw.value.trim().length == 0) {
      alertAndFocus(currentPw, "현재 비밀번호를 입력해주세요");

      //return false; --> 인라인 이벤트 모델 onsubmit = "return 함수명()" 에서만 가능

      event.preventDefault();
      // -> 이벤트를 수행하지 못하게하는 함수
      // -> 기본 이벤트 삭제
      return;
    }

    if (newPw.value.trim().length == 0) {
      alertAndFocus(newPw, "새 비밀번호를 입력해주세요");

      //return false; --> 인라인 이벤트 모델 onsubmit = "return 함수명()" 에서만 가능

      event.preventDefault();
      // -> 이벤트를 수행하지 못하게하는 함수
      // -> 기본 이벤트 삭제
      return;
    }

    if (newPwConfirm.value.trim().length == 0) {
      alertAndFocus(newPwConfirm, "새 비밀번호 확인을 입력해주세요");

      event.preventDefault();
      return;
    }

    // 비밀번호 정규식 검사

    // 새 비밀번호, 새 비밀번호 확인이 같은지 검사
    if (newPw.value != newPwConfirm.value) {
      alert("새 비밀번호가 일치하지 않습니다");

      newPwConfirm.focus();

      event.preventDefault();
      return;
    }
  });
}

function alertAndFocus(input, str) {
  alert(str);
  input.focus();
  input.value = "";
}

// 회원 탈퇴 유효성 검사
//  - 인라인 이벤트 모델 또는 표준 이벤트 모델로 작성

// 1) 비밀번호 미작성 -> 비밀번호를 입력해주세요 alert 출력 후
//                      포커스 이동(내용도 같이 삭제)

//  2) 동의 체크가 되지 않은 경우 -> "탈퇴 동의하시면 체크해주세요" alert 출력 후
// 포커스 이동

//  3) 1번 ,2번이 모두 유효할 때
//     정말 탈퇴를 진행할 것인지 확인하는 confirm 출력
// (확인 클릭 -> 탈퇴 / 취소 -> 탈퇴 취소)

/*
const memberDeleteForm = document.getElementById("memberDeleteForm");

if (memberDeleteForm != null) {
  memberDeleteForm.addEventListener("submit", function (event) {
    const memberPw = document.getElementById("memberPw");
    const agree = document.getElementById("agree");

    // 비밀번호 미입력 시 경고
    if (memberPw.value.trim().length == 0) {
      alertAndFocus(memberPw, "비밀번호를 입력해주세요");

      event.preventDefault();
      return;
    }

    // 약관 동의 미체크 시 경고
    if (!agree.checked) {
      alert("탈퇴 약관 동의에 체크해주세요");
      agree.focus();

      event.preventDefault();
      return;
    }

    // 탈퇴 버튼 클릭 시 정말 탈퇴하시겠습니까? 컨펌창
    if (!confirm("정말 탈퇴하시겠습니까?")) {
      event.preventDefault();
      return;
    }
  });
}
*/

// 인라인 이벤트 모델로 탈퇴 처리
function memberDeleteValidate() {
  const memberPw = document.getElementById("memberPw");

  if (memberPw.value.trim().length == 0) {
    alert("비밀번호를 입력해주세요");
    memberPw.focus();
    memberPw.value = "";
    return false;
  }

  const agree = document.getElementById("agree");

  if (!agree.checked) {
    alert("탈퇴 약관 동의에 체크해주세요");
    agree.focus;
    return false;
  }

  if (!confirm("정말 탈퇴하시겠습니까?")) {
    alert("탈퇴를 취소합니다");
    return false;
  }
}

// --------------------------------------------------------------------------------
// 프로필 수정

const profileImage = document.getElementById("profile-image");
const deleteImage = document.getElementById("delete-image");
const imageInput = document.getElementById("image-input");

// TODO: 프로필 수정 화면일 경우
if (imageInput != null) {
  // 이미지가 선택되었을 때 미리보기
}
