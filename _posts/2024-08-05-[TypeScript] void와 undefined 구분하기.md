---
layout: post
title: "[TypeScript] void와 undefined 구분하기"
excerpt: "타입스크립트"
categories:
  - Blog
tags:
  - TypeScript
  - JavaScript
toc: true
toc_sticky: true
date: 2024-08-05
last_modified_at: 2024-08-05
---

# [TypeScript] void와 undefined 구분하기

# 1. 함수 타입(Function Type)

함수 타입(function type)은 프로그래밍 언어에서 함수의 형태나 서명을 설명하는 개념으로, 주로 TypeScript와 같은 정적 타입 언어에서 사용되며 함수의 매개변수 타입과 반환 값의 타입을 지정한다. 함수 타입의 주요 아이디어는 다음과 같다 : 

1. 타입 안전성: 함수가 올바른 수와 타입의 인자로 사용되고, 반환 값이 적절하게 처리되도록 보장함.
2. 문서화: 함수가 어떤 입력을 기대하고 어떤 출력을 생성할지 명확하게 보여주는 인라인 문서 역할을 함.
3. 추상화: 함수를 일급 객체로 취급하여 구현을 지정하지 않고도 인자로 전달하거나 다른 함수에서 반환할 수 있도록 함.
4. 다형성: 특정 서명과 일치하는 모든 함수와 작동할 수 있는 더 일반적인 코드를 작성할 수 있게 함.
5. 컴파일러 지원: IDE와 컴파일러가 더 나은 자동 완성, 오류 검사, 리팩토링 지원을 제공하는 데 도움을 줌.

예시) `any` 타입의 `response` 매개변수를 받고 아무것도 반환하지 않는(`void`) 함수

```tsx
(response: any) => void
```

# 2. TypeScript의 함수 타입에서 void와 undefined의 의미

## (1) Void

- 함수가 어떤 값도 반환하지 않음을 명시적으로 나타낸다.
- 주로 함수의 부작용(side effect)에 의미가 있는 경우 사용한다.
- `return` 문을 사용하지 않거나, 값 없이 `return;`만 사용할 수 있다.

## (2) Undefined

- 함수가 명시적으로 `undefined` 값을 반환함을 나타낸다.
- 함수가 실제로 `undefined`를 반환해야 한다.

### * 주요 차이점:

1. 반환(리턴) 값 처리:
    - `void` 함수의 반환 값은 무시된다.
    - `undefined`를 반환하는 함수의 반환 값은 `undefined`로 처리된다.
2. 할당 가능성:
    - `void`를 반환하는 함수는 `undefined`를 반환하는 함수에 할당할 수 있다.
    - 그러나 그 반대는 불가능하다!
3. 사용 목적:
    - `void`는 주로 함수가 아무것도 반환하지 않음을 명확히 하기 위해 사용한다.
    - `undefined`는 함수가 특정 조건에서 값을 반환하지 않을 수 있음을 나타내기 위해 사용한다.
4. 예시

```tsx
// void 반환 타입
function logMessage(message: string): void {
    console.log(message);
}

// undefined 반환 타입
function findItem(id: number): string | undefined {
    const item = /* 아이템 찾기 로직 */;
    return item ? item.name : undefined;
}
```

# 3. JS와 TS에서 void, undefined를 다루는 방식의 차이

JavaScript에서는 `void`와 `undefined`의 처리가 TypeScript와는 다르다. 

JavaScript에서는 이 둘을 구분하지 않기 때문이다.

1. `void` = 연산자:
    - `void` 연산자는 어떤 표현식을 평가한 후 항상 `undefined`를 반환한다.
    - 주로 즉시 실행 함수(IIFE)나 `href="javascript:void(0)"`와 같은 곳에서 사용된다.
2. 함수 반환:
    - JS에서 명시적인 `return` 문 없이 함수가 종료되면, 자동으로 `undefined`를 반환한다.
    - `return;`만 사용해도 `undefined`가 반환된다.
    

예시: 자바 스크립트에서 모든 함수는 값을 명시적으로 반환하지 않으면 `undefined`를 반환한다.

```tsx
// 둘 다 undefined를 반환합니다
function noReturn() {}
function emptyReturn() { return; }

console.log(noReturn()); // undefined
console.log(emptyReturn()); // undefined

// void 연산자 사용
console.log(void 0); // undefined
console.log(void(0)); // undefined
console.log(void "hello"); // undefined
```

⇒ 이러한 차이는 TypeScript가 정적 타입 검사를 위해 추가한 개념이며, JavaScript 런타임에서는 이 구분이 의미가 없다. TypeScript의 `void`는 컴파일 시간에 타입 체크를 위해 사용되는 개념입니다.