---
title: "[React] Event Handling과 합성 이벤트 객체"
excerpt: "React 기술 공부"
categories:
  - Blog
tags:
  - React
  - Node.js
toc: true
toc_sticky: true
date: 2024-06-18
last_modified_at: 2024-06-18
---

## Event Handling이란?

1. Event = 웹 내부에서 발생하는 사용자의 행동

   ex. 버튼 클릭, 메세지 입력, 스크롤 등등

2. Handling: 이벤트가 발생했을 때 그것을 처리하는 것

   ex. 버튼 클릭 시 경고창 노출

   기존에 만든 button.jsx 파일에 onClick 이벤트를 추가해보겠다.

   ```jsx
   const Button = ({ text, color, children }) => {
     return (
       <button
         onClick={() => {
           console.log(text);
         }}
         style={{ color: color }}
       >
         {text} - {color.toUpperCase()}
         {children}
       </button>
     );
   };

   Button.defaultProps = {
     color: "black",
   };

   export default Button;
   ```

   <img width="660" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-06-18%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011 13 23" src="https://github.com/WalkiePaw/walkie-paw/assets/150787016/6d962cea-b181-473f-b161-7d5d3e9ca6ac">

   이렇게 클릭과 같은 이벤트가 발생했을 때 실행될 수 있도록 설정된 애로우 함수를 이벤트 핸들러라고 부른다.

   <img width="197" alt="스크린샷 2024-06-18 오전 11 15 29" src="https://github.com/WalkiePaw/walkie-paw/assets/150787016/790315ad-a137-44f0-becd-e5d0e002a7d4">

   아래 방식처럼 변수를 선언하는 것도 가능하다.

   ```jsx
   const Button = ({ text, color, children }) => {
     const onClickButton = () => {
       console.log(text);
     };

     return (
       <button onClick={onClickButton} style={{ color: color }}>
         {text} - {color.toUpperCase()}
         {children}
       </button>
     );
   };

   Button.defaultProps = {
     color: "black",
   };

   export default Button;
   ```

## 합성 이벤트 객체(Synthetic Base Event)

- onClickButton 함수에서 e라는 매개 변수를 선언하고 콘솔에 출력하면 아래와 같이 SyntheticBaseEvent라는 객체가 출력된다.

```jsx
const onClickButton = (e) => {
  console.log(e);
  console.log(text);
};
```

<img width="298" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-06-18%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011 26 14" src="https://github.com/WalkiePaw/walkie-paw/assets/150787016/66e2c93c-ade1-4818-bfc5-5fa381fe95eb">

### 합성 이벤트 객체(Synthetic Base Event)란?

**= 모든 웹 브라우저의 규격을 참고해서 이벤트 객체를 하나의 포맷으로 통일한 형태**

이미 세상에 너무나 많은 브라우저가 있고 브라우저를 만드는 회사들이 전부 다르기 때문에 동작하는 방식도 조금씩 다르다.

예시로, 현재는 없어진 인터넷 익스플로러에서는 최신 자바 스크립트 기능을 거의 쓸 수 없다.

또한 크롬에서는 이벤트 객체(현재 이벤트가 발생한 요소)를 target이라 부르는데, 사파리에서는 ETarget으로 부르는 등 서로 다르다.

이렇게 브라우저마다 스펙(규격과 동작 방식)이 달라서 생기는 문제를 **Cross Browsing Issue**라고 부른다.

리액트에서는 ‘합성 이벤트 객체’라는 통합 규격을 사용해 Cross Browsing Issue로부터 비교적 자유롭다.
