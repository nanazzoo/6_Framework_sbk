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
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&family=Sunflower:wght@500&family=Source+Sans+Pro:wght@600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <main>
      
      <jsp:include page="/WEB-INF/views/common/header.jsp"/>

      <section class="myPage-content">
        
        <jsp:include page="/WEB-INF/views/member/sideMenu.jsp"/>

        <section class="myPage-main">
          <h1 class="myPage-title">프로필</h1>
          <span class="myPage-subject">
            프로필 이미지를 변경할 수 있습니다.
          </span>

          <%-- 현재 경로: memeber/myPage/profile --%>
          <%-- 요청 경로: memeber/myPage/updateProfile --%>

          <%-- form 태그에 enctype 속성
                - 서버로 제출되는 데이터의 인코딩 방법을 지정

                  1) application/x-www-form-urlencoded
                      -> 모든 문자를 서버로 전송하기 전에 인코딩
                      == 제출되는 데이터를 모두 문자열 형식으로 인코딩
                      == 문자 형식만 제출 가능한 방식(파일X)

                  2) multipart/form-data (** 무조건 POST 방식만 가능!!!)
                      -> 모든 문자를 인코딩하지 않음
                      == 제출되는 데이터를 인코딩하지 않음
                      == 파일은 파일, 문자열은 문자열로 전달
                      (단, 서버에서 파일/문자열에 대한 별도 처리가 필요)
          --%>
          <form action="updateProfile" method="post" name="myPage-frm" enctype="multipart/form-data">
            <div class="profile-image-area">
            <c:if test="${empty loginMember.profileImage}">
              <img src="/resources/images/user.png" id="profile-image" />
            </c:if>
            <c:if test="${not empty loginMember.profileImage}">
              <img src="${loginMember.profileImage}" id="profile-image" />
            </c:if>
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
              <span>${loginMember.memberEmail}</span>
            </div>

            <div class="myPage-row">
              <label>가입일</label>
              <span>${loginMember.enrollDate}</span>
            </div>
          </form>
        </section>
      </section>
    </main>
    
    <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

    <script src="/resources/js/member/myPage.js"></script>

  </body>
</html>
