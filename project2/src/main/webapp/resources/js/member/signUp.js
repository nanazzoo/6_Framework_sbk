// JS 객체를 이용한 유효성 검사 결과 저장 객체
// JS 객체 = {"K":V, "K":V, ...} (MAP 형식)

// 변수명.key 또는 변수명["key"]
const checkObj = {
  memberEmail: false,
  memberPw: false,
  memberPwConfirm: false,
  memberNickname: false,
  memberTel: false,
};

document
  .getElementById("signUp-frm")
  .addEventListener("submit", function (event) {
    // checkObj의 속성 중 하나라도 false가 있다면 제출 이벤트 제거
    //
    // for in 구문: 객체의 key값을 순서대로 접근하는 반복문
    // [작성법]
    // for( let 변수명 in 객체명 )
    //           ==key
    //  -> 객체에서 순서대로 key를 하나씩 꺼내 왼쪽 변수에 저장

    for (let key in checkObj) {
      let str;

      // checkObj 속성 하나를 꺼내서 값을 검사했는데 false인 경우
      if (!checkObj[key]) {
        switch (key) {
          case "memberEmail":
            str = "이메일 형식이 유효하지 않습니다.";
            break;
          case "memberPw":
            str = "비밀번호 형식이 유효하지 않습니다.";
            break;
          case "memberPwConfirm":
            str = "비밀번호가 일치하지 않습니다.";
            break;
          case "memberNickname":
            str = "닉네임 형식이 유효하지 않습니다.";
            break;
          case "memberTel":
            str = "전화번호 형식이 유효하지 않습니다.";
            break;
        }

        alert(str);
        document.getElementById(key).focus();
        event.preventDefault();
        return;
      }
    }
  });

// 이메일 유효성 검사

const memberEmail = document.getElementById("memberEmail");
const emailMessage = document.getElementById("emailMesagge");

// input 이벤트: input 태그에 입력이 되었을 경우(모든 입력 인식)
memberEmail.addEventListener("input", function () {
  // 문자가 입력되지 않은 경우(방향키 등 입력)
  if (memberEmail.value.trim().length == 0) {
    // confirm, error 클래스 제거 -> 검정색 글씨로 만들기
    emailMessage.classList.remove("error", "confirm");

    emailMessage.innerText = " 메일을 받을 수 있는 이메일을 입력해주세요.";

    memberEmail.value = "";

    checkObj.memberEmail = false;
    return;
  }

  // 정규 표현식을 이용한 유효성 검사
  const regEx = /^[A-Za-z\d\-\_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;

  if (regEx.test(memberEmail.value)) {
    //유효한 경우
    // emailMessage.innerText = "유효한 이메일 형식입니다.";
    // emailMessage.classList.add("confirm");
    // emailMessage.classList.remove("error");
    // checkObj.memberEmail = true;
    //
    //
    // 이메일이 유효한 형식이라면 중복되는 이메일이 있는지 검사
    //  -> Ajax 이용
    //
    // JQuery를 이용한 ajax 코드
    //  $.ajax(JS 객체)
    //
    // $: jQuery 기호
    // $.ajax(): jQUery에서 제공하는 ajax라는 이름의 함수
    // JS 객체: {K:V, K:V, K:V, ...}
    //
    // * $.ajax() 함수의 매개변수로 전달되는 객체에는
    //  반드시 "url"이라는 key가 포함되어야 하며,
    //  선택적으로 data, type, dataType, success, error, complete, async 등을
    //  포함시킬 수 있다.

    $.ajax({
      url: "/emailDupCheck", //비동기 통신 진행 서버 요청 주소
      data: { memberEmail: memberEmail.value }, // JS -> 서버로 전달할 값(여러개 가능)
      type: "GET", //데이터 전달 방식
      // 비동기 통신을 성공해서 응답을 받았을 때
      success: (result) => {
        // result: 서버로 부터 전달 받은 응답 데이터

        if (result == 0) {
          emailMessage.innerText = "사용 가능한 이메일 입니다.";
          emailMessage.classList.add("confirm");
          emailMessage.classList.remove("error");
          checkObj.memberEmail = true;
        } else {
          emailMessage.innerText = "이미 사용중인 이메일 입니다.";
          emailMessage.classList.remove("confirm");
          emailMessage.classList.add("error");
          checkObj.memberEmail = false;
        }
      },
      // 비동기 통신이 실패했을 때 수행
      error: () => {
        console.log("ajax 통신 실패");
      },
      // success, error 수행 여부 관계 없이 무조건 수행
      complete: () => {
        console.log("중복 검사 수행 완료");
      },
    });
  } else {
    // 유효하지 않은 경우
    emailMessage.innerText = "유효하지 않은 이메일 형식입니다.";

    emailMessage.classList.add("error");
    emailMessage.classList.remove("confirm");

    checkObj.memberEmail = false;
  }
});

// 비밀번호 유효성 검사
const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwMessage = document.getElementById("pwMessage");

// 비밀번호 입력 시
memberPw.addEventListener("input", function () {
  // 비밀번호가 입력되지 않은 경우
  if (memberPw.value.trim().length == 0) {
    pwMessage.innerText =
      "영어,숫자,특수문자(!,@,#,-,_)를 사용해서 6~20글자 사이로 입력해주세요.";
    memberPw.value = "";
    pwMessage.classList.remove("confirm", "error"); // 검정 글씨로 변환
    checkObj.memberPw = false;
    return;
  }

  // 비밀번호 정규표현식 검사
  const regEx = /^[a-zA-Z\d!@#-_]{6,20}$/;

  if (regEx.test(memberPw.value)) {
    // 유효한 비밀번호
    checkObj.memberPw = true;

    // 유효한 비밀번호 + 확인 작성 X
    if (memberPwConfirm.value.trim().length == 0) {
      pwMessage.innerText = "유효한 비밀번호 형식입니다.";
      pwMessage.classList.add("confirm");
      pwMessage.classList.remove("error");
    } else {
      // 유효한 비밀번호 + 확인 작성 O -> 같은지 비교

      // 비밀번호가 입력 될 때
      // 비밀번호 확인에 작성된 값과 일치하는 경우
      if (memberPw.value == memberPwConfirm.value) {
        pwMessage.innerText = "비밀번호가 일치합니다.";
        pwMessage.classList.add("confirm");
        pwMessage.classList.remove("error");
        checkObj.memberPwConfirm = true;
      } else {
        // 일치하지 않는 경우
        pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confrim");
        checkObj.memberPwConfirm = false;
      }
    }
  } else {
    // 유효하지 않음
    pwMessage.innerText = "비밀번호 형식이 유효하지 않습니다.";
    pwMessage.classList.add("error");
    pwMessage.classList.remove("confirm");
    checkObj.memberPw = false;
  }
});

// 비밀번호 확인 유효성 검사
memberPwConfirm.addEventListener("input", function () {
  // 비밀번호가 유효할 경우에만
  // 비밀번호, 비밀번호 확인 같은지 검사
  if (checkObj.memberPw) {
    if (memberPw.value == memberPwConfirm.value) {
      pwMessage.innerText = "비밀번호가 일치합니다.";
      pwMessage.classList.add("confirm");
      pwMessage.classList.remove("error");
      checkObj.memberPwConfirm = true;
    } else {
      pwMessage.innerText = "비밀번호가 일치하지 않습니다.";
      pwMessage.classList.add("error");
      pwMessage.classList.remove("confirm");
      checkObj.memberPwConfirm = false;
    }
  } else {
    checkObj.memberPwConfirm = false;
  }
});

//닉네임 유효성 검사
const memberNickname = document.getElementById("memberNickname");
const nickMessage = document.getElementById("nickMessage");

memberNickname.addEventListener("input", function () {
  // 닉네임에 문자가 입력되지 않은 경우
  if (memberNickname.value.trim().length == 0) {
    nickMessage.innerText =
      "한글, 영어, 숫자를 사용하여 2~10 글자 사이로 입력해주세요(특수문자 사용 불가)";

    nickMessage.classList.remove("confirm", "error");

    checkObj.memberNickname = false;
    return;
  }

  const regEx = /^[가-힣\w]{2,10}$/;

  if (regEx.test(memberNickname.value)) {
    // 유효한 경우
    //
    // ** 닉네임 중복 검사 코드 추가 예정 **

    nickMessage.innerText = "유효한 닉네임 형식입니다.";

    nickMessage.classList.add("confirm");
    nickMessage.classList.remove("error");

    checkObj.memberNickname = true;
  } else {
    //유효하지 않을 경우
    nickMessage.innerText = "유효하지 않은 닉네임 형식입니다.";

    nickMessage.classList.remove("confirm");
    nickMessage.classList.add("error");

    checkObj.memberNickname = false;
  }
});

// 전화번호 유효성 검사
const memberTel = document.getElementById("memberTel");
const telMessage = document.getElementById("telMessage");

memberTel.addEventListener("input", function () {
  if (memberTel.value.trim().length == 0) {
    telMessage.innerText = "전화번호를 입력해주세요.(- 제외)";
    telMessage.classList.remove("confirm", "error");
    telMessage.value = "";

    checkObj.memberTel = false;
  }

  // 전화번호 정규 표현식 검사
  const regEx = /^0(1[01679]|2|[3-6][1-5]|70)[1-9]\d{2,3}\d{4}$/;

  if (regEx.test(memberTel.value)) {
    telMessage.innerText = "유효한 전화번호 형식입니다";

    telMessage.classList.add("confirm");
    telMessage.classList.remove("error");

    checkObj.memberTel = true;
  } else {
    telMessage.innerText = "유효하지 않은 전화번호 형식입니다";

    telMessage.classList.add("error");
    telMessage.classList.remove("confirm");

    checkObj.memberTel = false;
  }
});
