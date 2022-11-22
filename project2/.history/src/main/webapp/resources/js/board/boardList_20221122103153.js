// 썸네일 클릭 시 Modal창으로 출력하기

// 즉시 실행 함수
(() => {
  const thumbnails = document.getElementsByClassName("list-thumbnail");

  if (thumbnails.length > 0) {
    // 썸네일이 존재할 경우

    // 모달 관련 요소 얻어오기
    const modal = document.querySelector(".modal");
    const modalClose = document.getElementById("modal-close");
    const modalImage = document.getElementById("modal-image");

    for (let thumbnail of thumbnails) {
      thumbnail.addEventListener("click", () => {
        // modal창에 show클래스가 없으면 추가 있으면 삭제
        modal.classList.toggle("show");

        const imageUrl = thumbnail.getAttribute("src");
        modalImage.setAttribute("src", imageUrl);
      });
    }

    modalClose.addEventListener("click", () => {
      modal.classList.toggle("hide");
      setTimeout(() => {
        modal.classList.remove("show", "hide");
      }, 500);
    });
  } else {
    // 썸네일이 존재하지 않을 경우
  }
})();

(() => {
  const insertBtn = document.getElementById("insertBtn");
})();
