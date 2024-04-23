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
2. 추가로 포스터 목록을 '미니프로젝트1' 때와 마찬가지로 포토카드 형식으로 보이도록 만들었습니다.
 - 다만, 지난번과는 다르게 mousemove와 mouseleave 이벤트는 사용하지 않았습니다.
 - 카드의 앞면(영화 포스터)과 뒷면(영화 제목, Overview, 별점)을 추가하고 css의 hover를 이용해서
   마우스가 카드 위로 올라오면 transform의 rotate를 통해 카드가 뒤집히게 하여 뒷면의 영화 정보를 확인할 수 있도록 했습니다.

## 문제점 / 해결 방안
 - 문제점: 모듈간의 의존성이 강합니다.
 - 해결 방안: 추가 모듈을 생성하여 해당 모듈에서 나머지 모듈을 한번에 다룰 수 있도록 수정하는 방법이 있습니다.




