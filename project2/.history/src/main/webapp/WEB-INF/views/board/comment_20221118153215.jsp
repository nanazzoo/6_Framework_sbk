<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<div id="comment-area">
    <!-- 댓글 목록 -->
    <div class="comment-list-area">
        
        <ul id="comment-list">

            <c:forEach var="comment" items="${board.commentList}">
                <li class="comment-row  <c:if test="${comment.parentNo != 0 }"> child-comment </c:if>">
                    <p class="comment-writer">

                        <c:if test="${empty comment.profileImage}">
                            <!-- 프로필 이미지가 없을 경우 -->
                            <img src="/resources/images/user.png">
                        </c:if>

                        <c:if test="${!empty comment.profileImage}">
                            <!-- 프로필 이미지가 있을 경우 -->
                            <img src="${comment.profileImage}">
                        </c:if>

                        <span>${comment.memberNickname}</span>
                        <span class="comment-date">(${comment.commentCreateDate})</span>
                    </p>
                    
                    <p class="comment-content">${comment.commentContent}</p>


                    <c:if test="${!empty loginMember}">
                        <div class="comment-btn-area">
                            <button>답글</button>   
                             
                          <c:if test="${loginMember.memberNo == comment.memberNo}">
                                  <button>수정</button>     
                                  <button>삭제</button>
                          </c:if>
                          
                        </div>
                    </c:if>
                    
                    

                </li>
            </c:forEach>
            
        </ul>
    </div>
    

    <!-- 댓글 작성 부분 -->
    <div class="comment-write-area">
        <textarea id="commentContent"></textarea>
        <button id="addComment">
            댓글<br>
            등록
        </button>

    </div>

</div>