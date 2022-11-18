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
    }
  } else {
    // 썸네일이 존재하지 않을 경우
  }
})();
