# 팀 과제) 영화 검색 사이트 (13조)
## [https://donkim1212.github.io/nbc_ch2_tmdb/](https://donkim1212.github.io/nbc_ch2_tmdb/)

![preview](https://github.com/donkim1212/nbc_ch2_tmdb/assets/32076275/26104eea-3e08-4b56-8163-84c726c4d1dc)
## 개요
순수 Javascript와 HTML만을 사용하여 검색 바를 구현하고, 검색한 영화를
오픈 API인 TMDB(The Movie DB)에서 찾아내고 정보를 받아 임의의 형식으로
출력하는 기능을 구현합니다.

과제 spec:
[https://teamsparta.notion.site/JavaScript-8a862ce7b0e84867b610f83405014115](https://teamsparta.notion.site/JavaScript-b88e8bd5676b4fa9a93163e4cd428d33)

## Wireframe
![wireframe_pj3](https://github.com/donkim1212/nbc_ch2_tmdb/assets/32076275/c327aa6f-d450-4e76-81a2-d18164ebbc62)

## 구현한 것

## 문제점 // 해결 방안




-------------------------------------------------------------



# 개인 과제) 영화 검색 사이트

## [https://donkim1212.github.io/nbc_ch2_tmdb/](https://donkim1212.github.io/nbc_ch2_tmdb/)

![preview](https://github.com/donkim1212/nbc_ch2_tmdb/assets/32076275/26104eea-3e08-4b56-8163-84c726c4d1dc)

## 개요

순수 Javascript와 HTML만을 사용하여 검색 바를 구현하고, 검색한 영화를
오픈 API인 TMDB(The Movie DB)에서 찾아내고 정보를 받아 임의의 형식으로
출력하는 기능을 구현합니다.

과제 spec:
https://teamsparta.notion.site/JavaScript-8a862ce7b0e84867b610f83405014115

## Wireframe

![wireframe](https://github.com/donkim1212/nbc_ch2_tmdb/assets/32076275/1f12b0c6-a6f5-42c5-881e-93f0c99b9df5)

## 구현한 것

1. 상기한 과제 spec 내의 'grid 사용하기' 외 모든 과제(선택 포함)를 완수했습니다.
2. 포스터 목록을 카드 형식으로 보이도록 만들었습니다.
   - 카드의 앞면(영화 포스터)과 뒷면(영화 제목, Overview, 별점)을 추가하고 css의 hover를 이용해서
     마우스가 카드 위로 올라오면 transform의 rotate를 통해 카드가 뒤집히게 하여 뒷면의 영화 정보를 확인할 수 있도록 했습니다.
3. DB 요청을 자주 호출하지 않도록 첫 번째 호출의 결과를 cache하여 사용하도록 했습니다.

## 문제점 // 해결 방안

- 모듈간의 의존성 // 추가 모듈을 생성하여 해당 모듈에서 나머지 모듈을 한번에 다룰 수 있도록 수정하기
- cache된 데이터의 갱신 주기 // setInterval 등으로 주기적으로 캐시를 삭제하기

### 피드백 이후 수정사항 (수정일: 2024-04-26)

- index.html에 작성된 script를 별도의 파일(js/index.js)에서 관리하도록 함
- 코드 수정 실수로 영화 검색이 case-sensitive 하게 됐던 문제를 수정
- 영화 목록의 캐시를 window.sessionStorage에 저장하도록 변경
- (js/cards.js) createCard의 template literal에서 onclick attribute를 추가하지 않도록 변경
  - 대신 addCard에서 addEventListener를 추가해 click 이벤트를 관리하도록 변경
- (js/cards.js) createCard의 template literal에서 style attribute를 제거하고 img 태그를 사용하도록 변경
  - (css/mystyle.css) .card-front가 카드의 포스터 이미지 overflow를 관리하도록 변경
