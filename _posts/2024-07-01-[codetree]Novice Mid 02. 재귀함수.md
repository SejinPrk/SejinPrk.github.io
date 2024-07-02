---
layout: post
title: "[Code Tree - Novice Mid] 02-2. 재귀함수: 값을 반환하는 재귀함수"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-07-01
last_modified_at: 2024-07-02
---
JAVA 문법으로 작성함.

# Novice Mid: 02. 재귀함수 - 2

# 값을 반환하는 재귀함수

## 1. 1부터 특정 수까지의 합 2

=> 정수 N이 주어지면 재귀함수를 이용하여 1부터 N까지의 합을 구하여 출력하는 프로그램

조건: 1 ≤ N ≤ 100

### 코드:
```java
import java.util.Scanner;

public class Main {
    public static int fact(int n) {
        if(n == 1)
            return 1;
        
        return fact(n - 1) + n;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(fact(n));
    }
}
```

### 입력:

```
100
```

### 출력:

```
5050
```
---

## 2. 각 자리 숫자의 제곱

=> 8자리 이하의 정수 N이 주어지면 재귀함수를 이용하여 각 자리 숫자의 제곱의 합을 출력하는 프로그램

조건: 1 ≤ N ≤ 99,999,999

### 코드:
```java
import java.util.Scanner;

public class Main {
    public static int F(int n) {
        if(n < 10)
            return n * n;

        int digit = n % 10; // 마지막 자리 숫자
        return (digit * digit) + F(n / 10);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        System.out.println(F(n));
    }
}
```

### 입력:

```
654321
```

### 출력:

```
91
```
---

## 3. 각 자리 숫자들 중 짝수를 제외한 합

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/sum-from-1-to-a-certain-number-2?&utm_source=clipboard&utm_medium=text)