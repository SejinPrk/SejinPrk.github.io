---
layout: post
title: "[Java] 람다 표현식(Java Lambda Expressions)"
excerpt: "Java"
categories:
  - Blog
tags:
  - [Java]
toc: true
toc_sticky: true
date: 2024-07-22
last_modified_at: 2024-07-22
---

# 람다(lambda) 표현식

## 람다 표현식이란?

 Java 8부터 도입된 기능으로, 간결하게 함수형 인터페이스의 인스턴스를 생성할 수 있게 해준다. 주로 메서드를 하나의 식으로 표현하는 데 사용된다.

## 기본 구조

```java
(parameters) -> { body }
```

- `parameters` : 메서드의 매개변수
- `>` : 람다 연산자로, 매개변수와 몸체를 구분
- `body` : 실행될 코드

## 예시

1. 매개변수가 없는 경우

```java
() -> System.out.println("Hello, World!")
```

2. 매개변수가 하나인 경우(괄호 생략 가능)

```java
n -> n * n
```

3. 매개변수가 여러 개인 경우

```java
(x, y) -> x + y
```

4. 본문이 여러 줄인 경우

```java
(x, y) -> {
    int sum = x + y;
    return sum;
}
```

람다 표현식은 주로 함수형 인터페이스와 함께 사용한다. 

예시) `Comparator` 인터페이스 구현 시 람다 표현식을 사용한 경우

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.sort((a, b) -> a.compareTo(b));
```

람다 표현식을 사용하면 코드를 더 간결하고 읽기 쉽게 만들 수 있으며, 함수형 프로그래밍 스타일을 Java에서 구현할 수 있다.