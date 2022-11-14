<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>마이 페이지</title>
    <link rel="stylesheet" href="/resources/css/main-style.css" />
    <link rel="stylesheet" href="/resources/css/myPage-style.css" />
  </head>
  <body>
    <main>
      header.jsp include

      <section class="myPage-content">
        <section class="left-side">
          사이드메뉴
          <ul class="list-group">
            <!-- 절대 경로 -->
            <li><a href="/member/myPage/profile">프로필</a></li>
            <li><a href="/member/myPage/info">내정보</a></li>
            <li><a href="/member/myPage/changePw">비밀번호 변경</a></li>
            <li><a href="/member/myPage/delete">회원 탈퇴</a></li>
          </ul>
        </section>

        <section class="myPage-main">
          <h1 class="myPage-title">프로필</h1>
          <span class="myPage-subject">
            프로필 이미지를 변경할 수 있습니다.
          </span>

          <form action="#" method="post" name="myPage-frm">
            <div class="profile-image-area">
              <img src="../resources/images/user.png" id="profile-image" />
            </div>
            <span id="delete-image">&times;</span>

            <div class="profile-btn-area">
              <label for="image-input">이미지 선택</label>

              <!-- accept 속성: 업로드 가능한 파일의 타입을 제한하는 속성 -->
              <input
                type="file"
                name="profileImage"
                id="image-input"
                accept="image/*"
              />

              <button>변경하기</button>
            </div>

            <div class="myPage-row">
              <label>이메일</label>
              <span>user01@kh.or.kr</span>
            </div>

            <div class="myPage-row">
              <label>가입일</label>
              <span>2022년 10월 27일 10시 39분 12초</span>
            </div>
          </form>
        </section>
      </section>
    </main>
    footer.jsp

    <!-- 다음 주소 api 추가 -->
  </body>
</html>