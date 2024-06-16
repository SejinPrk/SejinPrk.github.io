---
title: "[React].React의 기술적인 특징"
excerpt: "React 기술 공부"

categories:
  - Blog
tags:
  - [React], [Node.js]

toc: true
toc_sticky: true

date: 2024-06-16
last_modified_at: 2024-06-16
---

## React.js의 기술적인 특징

### 1. 컴포넌트를 기반으로 UI를 표현한다.

- 화면을 구성하는 요소 → header, main, footer를 분리해서 각각의 자바 스크립트 파일로 나누어 모듈화한다.
- ex. Header.js / Main.js / Footer.js
- 중복 코드를 관리하는 데 효과적이다.

### 2. 화면 업데이트 구현이 쉽다.

- 업데이트: 사용자의 행동(클릭, 드래그 등)에 따라 웹페이지가 스스로 모습을 바꿔 상호작용하는 것
- 선언형 프로그래밍: 과정은 생략하고 **목적만** 간결히 명시하는 방법
- 리액트는 선언형 프로그래밍 방식을 따르기 때문에 코드가 간결하다.
- ↔ 명령형 프로그래밍: 목적을 이루기 위한 **모든 일련의 과정을 설명**하는 방식
- JS만으로 업데이트를 구현하려면 모든 과정을 다 설명해야 하기 때문에 코드가 길고 복잡하다.

### 3. 화면 업데이트가 빠르게 처리된다.

- 브라우저가 화면에 렌더링되는 과정(Critical Rendering Path)
- HTML → DOM
  ⬇️
  Render Tree → Layout → Painting
  ⬆
  CSS → CSSOM
- DOM: Document Object Model; html을 일종의 객체 모델로 변환 → 요소들의 위치, 배치, 모양에 관한 모든 정보
- CSSOM: CSS Object Model; 요소들의 스타일과 관련된 모든 정보
- Render Tree: DOM과 CSSOM을 합쳐 만듦. 렌더링 되어야 하는 모든 요소를 합친 것
- Layout: 렌더트리 안에 포함되어있는 요소들의 배치를 잡는 작업
- Painting: 실제로 화면에 그려내는 과정.
- ⇒ 업데이트: JS가 DOM을 수정하면 전체 과정이 변경되면서 업데이트가 일어나는 것!
- Layout, Painting은 상당히 오래 걸리는 과정 ⇒ Reflow, Repainting이라고 부른다.
- 따라서 렌더트리 이후의 과정을 다시 수행하면 성능이 악화된다.
- ex. 브라우저 응답없음 페이지(브라우저 마비)
- 리액트에서는 이 과정을 자동으로 진행해주는 Virtual DOM을 이용해 성능을 훨씬 더 개선할 수 있다.
- 다양한 업데이트 → 동시에 발생한 업데이트를 모음 → 다 모였다면 한 번에 수정
- Virtual DOM: DOM을 js 객체로 흉내낸 것. 업데이트가 발생하면 실제 DOM이 아닌 Virtual DOM을 먼저 실행하고, 모인 업데이트를 한 번에 반영해 최종적으로 DOM을 한 번만 수정하는 것이다.
