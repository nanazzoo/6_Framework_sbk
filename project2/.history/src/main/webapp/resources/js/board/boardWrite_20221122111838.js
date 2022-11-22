// 이미지 미리보기

const inputImage = document.getElementsByClassName("inputImage");
const preview = document.getElementsByClassName("preview");
const deleteImage = document.getElementsByClassName("delete-image");

// 미리보기와 관련된 모든 요소의 개수는 5개로 동일
// == index번호를 통해서 하나의 그룹을 지정할 수 있음

for (let i = 0; i < inputImage.length; i++) {
  // inputImage[i] 요소의 값이 변했을 때
  inputImage[i].addEventListener("change", (event) => {
    // event.target.files: 선택된 파일의 정보가 배열 형태로 반환
    if (event.target.files[0] != undefined) {
      // 선택된 파일이 있을 경우

      const reader = new FileReader(); //파일을 읽는 객체-> 메모리에 임시 저장

      reader.onload = (event) => {};
    } else {
      // 취소를 누를 경우
      // 미리보기 지우기
      preview[i].removeAttribute("src");
    }
  });
}
