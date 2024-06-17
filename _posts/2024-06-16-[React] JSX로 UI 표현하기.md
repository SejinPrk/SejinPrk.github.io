---
title: "[REACT] JSX로 UI 표현하기"
excerpt: "React 기술 공부"
categories:
  - Blog
tags:
  - React
  - Node.js
toc: true
toc_sticky: true
date: 2024-06-17
last_modified_at: 2024-06-17
---

React Component

```jsx
function Footer {
	return (
		<footer>
			<h1>footer</h1>
		</footer>
	);
}
// JavaScript에서는 함수가 HTML을 리턴하는 것을 문법적인 오류로 판단함. 
// 그러나 React.js에서는 JSX 문법을 사용하므로 적법하다고 판단함.
```

## 💬 JSX: JavaScript Extensions

= 확장된 자바 스크립트 문법

- js와 HTML을 혼용하여 사용할 수 있다.

```jsx
const Main = () => {

  const number = 10;

  return (
    <main>
      <h1>main</h1>
      <h2>{number}</h2>
    </main>
  );
};

export default Main;
```

- 이렇게 동적으로 특정 변수를 선언해서 HTML 에 렌더링(중괄호 안에 작성)하는 것도 가능하다.
    - 결과:
    
    ![스크린샷 2024-06-17 오후 3.16.30.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/04669512-c029-4691-a6e7-e5dadd129cde/5f1d2a1e-7dd0-4a27-8743-9a02d27beef5/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.16.30.png)
    

- {number} 안에서 연산을 하는 것도 가능하다.

```jsx
<h2>{number + 10}</h2>
=> 결과: 20

// 삼항 연산자도 가능
<h2>{number % 2 === 0 ? "짝수" : "홀수"}</h2>
=> 결과: 짝수

```

## *🚨 JSX 주의 사항*

*1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다.*

- *js 표현식? {10}, {number}처럼 **한 줄의 코드**가 특정한 값으로 평가될 수 있는 식*
- *if문이나 for문을 중괄호 안에 작성하면 오류가 난다!*

1. 숫자, 문자열, 배열 값만 렌더링된다. 
- {true}, {undefined}, {null} 는 렌더링되지 않는다.
- {obj}같은 객체를 렌더링하려고 하면 오류가 발생(백지화)한다.
    - 개발자 도구를 읽어보면 이유를 알 수 있다.

![스크린샷 2024-06-17 오후 3.24.24.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/04669512-c029-4691-a6e7-e5dadd129cde/f7245679-8b12-4bf5-b0fe-d2999de123c5/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.24.24.png)

![스크린샷 2024-06-17 오후 3.25.10.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/04669512-c029-4691-a6e7-e5dadd129cde/70d98363-ab97-463a-9d70-be1a7c75eda4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.25.10.png)

- 따라서 점표기법 - {obj.a}을 이용해서 문자열이나 숫자값으로 바꿔줘야 한다.

*3. 모든 태그는 닫혀있어야 한다.* 

- HTML에서는 <img>같은 태그를 닫히지 않은 상태로 두어도 괜찮았지만 React에서는 반드시 모든 태그를 닫아 주어야 한다.

1. 최상위 태그는 반드시 하나만 허용한다. 
- 최상위 태그? 리턴문의 소괄호 안에 가장 높은 위치에 있는 태그
- ex. <main>태그 외에 <div>를 붙이면 오류가 난다.
    
    ![스크린샷 2024-06-17 오후 3.29.20.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/04669512-c029-4691-a6e7-e5dadd129cde/1e67cd3e-f78f-4851-a878-e6c23ea06d92/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.29.20.png)
    
- 만약 최상위 태그로 감쌀 만한 마땅한 태그가 없다면 빈 태그를 두어도 된다.

```jsx
  return (
    <>
      <h1>main</h1>
      <h2>{number % 2 === 0 ? "짝수" : "홀수"}</h2>
      {10}
      {number}
      {[1, 2, 3]}
      {true}
      {undefined}
      {null}
      {obj.a}
    </>
  );
};
```

- 다만, 렌더링될 때에는 최상위 태그가 없는 것처럼 렌더링 되어 개발자 도구로 확인해보면 모든 요소들이 흩뿌려져 있다.
    - 메인 태그가 존재할 때: 요소들이 메인 태그 안에 묶여있다.
        
        ![스크린샷 2024-06-17 오후 3.32.48.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/04669512-c029-4691-a6e7-e5dadd129cde/18c3a27f-e1e8-47e2-99cb-4da0a0efe024/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.32.48.png)
        
    - 빈 태그를 사용했을 때: 요소들이 묶여있지 않다.
        
        ![스크린샷 2024-06-17 오후 3.33.12.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/04669512-c029-4691-a6e7-e5dadd129cde/93feec20-1e96-4bfa-a4a6-2fed4ae7dc40/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-17_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.33.12.png)
        
- 선호에 따라 태그를 둘지 비울지 선택하면 된다.

1. React에서는 js와 html을 함께 쓰고 있기 때문에 자바 스크립트의 예약어인 “class”를 사용할 수 없다. 
- <div *className*="logout">로그아웃</div>; 여기서 class를 사용할 수 없기 때문에 “className”을 사용한다.
