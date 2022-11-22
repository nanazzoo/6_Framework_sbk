// 목록으로 버튼
const goToListBtn = document.getElementById("goToListBtn");

goToListBtn.addEventListener("click", () => {
  // location: 주소, 주소창과 관련된 내장 객체
  // location.href: 현재 주소(전체)
  // location.href = "주소": 해당 주소 요청
  // location.pathname: 현재 요청 주소만을 반환(프로토콜, ip, port 제외, 쿼리스트링 제외)
  // location.search: 쿼리스트링만 반환

  console.log(location.pathname);
  console.log(location.search);
});
