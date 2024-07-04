---
layout: post
title: "[TroubleShooting] React, CSS: Header, Footer의 영역을 사이드 바가 침범하는 문제"
excerpt: "Trouble shooting: css"
categories:
  - Blog
tags:
  - [CSS, Tailwind.css, React]
toc: true
toc_sticky: true
date: 2024-07-04
last_modified_at: 2024-07-04
---

# [TroubleShooting] React, CSS: Header, Footer의 영역을 사이드 바가 침범하는 문제

문제상황: 

**사이드바를 헤더와 푸터 사이에 끼우고 싶은데** 

1. 헤더가 사이드바를 가림
2. 사이드바가 푸터를 가림
3. 모든 화면에 사이드바가 필요한 것은 아님. 마이페이지, 대시보드, 관리자페이지에서만 사용하는 컴포넌트

<img width="1006" alt="스크린샷 2024-07-04 오후 4 29 19" src="https://github.com/SejinPrk/SejinPrk/assets/150787016/b636356e-363f-48e5-a464-56ecc6fe74cb">

<img width="1220" alt="스크린샷 2024-07-04 오후 5 01 19" src="https://github.com/SejinPrk/SejinPrk/assets/150787016/cb24c72e-5eaa-4b3a-a623-3a75dfabe877">

## 원인

처음에는 z-index의 문제인 줄 알고 숫자를 바꿔보고 layout.jsx 코드도 수정해보았지만 원인이 아니었다. 

진짜 이유는 사이드바를 만들려고 최상단에 설정해둔 CSS(Tailwind.css 사용)의 문제였다. 

```jsx
<div *className*={`**fixed top-0 left-0 h-full** bg-gray-100 p-4 transition-transform transform ${*isSidebarOpen* ? 'translate-x-0' : '-translate-x-full'} duration-300 z-40`}>
```

각각의 요소들의 의미는 다음과 같다. 

1. **`fixed`**:
    - **의미**: `position: fixed;`
    - **설명**: 이 속성은 요소를 고정 위치에 배치한다. 요소는 뷰포트에 대해 상대적으로 배치되며, 페이지를 스크롤하더라도 항상 뷰포트 내의 같은 위치에 머무르게 된다.
2. **`top-0`**:
    - **의미**: `top: 0;`
    - **설명**: 요소의 상단을 부모 요소의 상단(또는 뷰포트의 상단)에 고정한다.
3. **`left-0`**:
    - **의미**: `left: 0;`
    - **설명**: 요소의 왼쪽을 부모 요소의 왼쪽(또는 뷰포트의 왼쪽)에 고정한다.
4. **`h-full`**:
    - **의미**: `height: 100%;`
    - **설명**: 요소의 높이를 부모 요소(또는 뷰포트)의 전체 높이와 동일하게 설정한다.
    

위 클래스들을 함께 사용하면 요소가 뷰포트의 왼쪽 상단에 고정되고, 높이가 뷰포트 전체 높이와 같아진다. 

이 클래스들로 사이드바를 만들면 사이드바가 항상 화면의 왼쪽에 고정되고, 페이지를 스크롤하더라도 화면의 전체 높이를 차지하게 되는 것이다. 

그런데 현재 만들고 있는 웹 사이트에서는 사이드바가 모든 화면에 적용되는 것이 아니기 때문에 불필요한 작업이었다. 

그래서 className에 들어갈 클래스들을 바꿔주었다. 

1. **`w-80`**:
    - **의미**: `width: 20rem;`
    - **설명**: 이 클래스는 요소의 너비를 20rem로 설정한다. Tailwind CSS에서 숫자 값은 기본적으로 rem 단위로 해석되는데, `80`은 Tailwind CSS의 스페이싱 스케일에서 정의된 값으로, `80`에 해당하는 크기는 기본적으로 20rem(즉, 320px, 기본 폰트 크기가 16px일 경우)이다.
2. **`h-screen`**:
    - **의미**: `height: 100vh;`
    - **설명**: 이 클래스는 요소의 높이를 뷰포트 높이의 100%로 설정한다. `vh` 단위는 뷰포트 높이의 백분율을 나타내며, `100vh`는 전체 뷰포트 높이를 의미한다.

```jsx

<div className={`**w-80 h-screen** bg-gray-100 p-4 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} duration-300 z-40`}>

```

이 두 클래스를 함께 사용해서 요소가 너비 20rem(320px)이고, 높이는 뷰포트의 전체 높이와 동일하게 설정된 결과물을 얻었다. 

이렇게 고정된 너비와 전체 높이를 가지는 사이드바를 만드는 데에 성공했다! 🥹

<img width="1242" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-07-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205 33 15" src="https://github.com/SejinPrk/SejinPrk/assets/150787016/3ba01510-79aa-42c4-b823-1b245f26043f">

<img width="1241" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-07-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205 33 41" src="https://github.com/SejinPrk/SejinPrk/assets/150787016/496ea662-2198-41a7-986f-b66c66c4c4ba">