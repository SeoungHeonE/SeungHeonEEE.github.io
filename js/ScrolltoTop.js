// 기본 스크롤 이벤트를 제거합니다.
window.addEventListener("wheel", function(e) {
  e.preventDefault(); // 스크롤 이벤트 기본 동작을 막음
}, {passive : false});

// 페이지 선언
var $html = $("html"); // html 엘리먼트 선택
var page = 1; // 현재 페이지 번호
var lastPage = $(".content").length; // 마지막 페이지 번호

// 페이지 최상단으로 이동
$html.animate({scrollTop:0},10);

// 스크롤 이벤트 핸들러
$(window).on("wheel", function(e) {
  if($html.is(":animated")) return; // 애니메이션 중일 때 이벤트 중지

  if(e.originalEvent.deltaY > 0) { // 마우스 휠을 아래로 스크롤할 때
    if(page == lastPage) return; // 마지막 페이지이면 이벤트 중지

    page++; // 페이지 번호 증가
  } else if(e.originalEvent.deltaY < 0) {
    if(page == 1) return;

    page--; // 페이지 번호 감소
  }

  // 현재 페이지의 최상단 위치 계산
  var posTop = (page-1) * $(window).height();
  $html.animate({scrollTop: posTop}); // 스크롤 애니메이션
  
  // 탑 버튼 표시 여부 결정
  if (posTop > 20) {
    document.getElementById("topBtn").style.display = "block"; // 20px 이상 스크롤되면 탑 버튼 표시
  } else {
    document.getElementById("topBtn").style.display = "none"; // 20px 미만 스크롤되면 탑 버튼 숨김
  }
});

// 탑 버튼 이벤트 핸들러
function scrolltoTop() {
  window.scrollTo({
    top: 0, // 최상단으로 이동
    behavior: 'smooth' // 스무스하게 이동
  });

  // 페이지 번호를 1로 재설정
  page = 1;
}

var button = document.getElementById('topBtn');
button.addEventListener('click', scrolltoTop); // 탑 버튼 클릭 이벤트

// 스크롤 이벤트 핸들러
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {  // 스크롤이 300px 이상 되면
    button.classList.remove('hidden'); // 탑 버튼 표시
  } else {
    button.classList.add('hidden'); // 스크롤이 300px 미만이면 탑 버튼 숨김
  }
});

// 윈도우 리사이즈 이벤트 핸들러
$(window).on