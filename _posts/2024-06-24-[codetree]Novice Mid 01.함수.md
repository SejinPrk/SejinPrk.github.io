---
layout: post
title: "[Code Tree - Novice Mid] 01-3. 함수: "변수의 영역"
excerpt: "코드트리 문제 풀이 - JAVA"

categories:
  - Blog
tags:
  - [CodeTree]

toc: true
toc_sticky: true

date: 2024-06-24
last_modified_at: 2024-06-24
---

JAVA 문법으로 작성함.

# Novice Mid: 01. 함수 - 4

# 변수의 영역

## 1. 함수를 이용한 부분 문자열의 위치 구하기

=> 주어진 입력 문자열에 대하여 목적 문자열이 부분 문자열로 존재하는 경우, 부분 문자열의 시작 인덱스를 출력하는 프로그램 (인덱스는 0부터 시작)

조건: 1 ≤ 목적 문자열의 길이(M) ≤ 입력 문자열의 길이 (N) ≤ 1,000

- 목적 문자열이 부분 문자열로 존재하지 않는 경우 -1을 출력

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String inputString = sc.nextLine();
        String targetString = sc.nextLine();

        // 부분 문자열의 시작 인덱스를 찾기
        int result = findSubstring(inputString, targetString);

        // 결과 출력
        System.out.println(result);
    }

    public static int findSubstring(String inputString, String targetString) {
        // inputString에서 targetString의 첫 등장 위치를 반환
        return inputString.indexOf(targetString);
    }
}
```

### 입력:

```
codetree
ee
```

### 출력:

```
6
```

### 링크:[코드트리] https://www.codetree.ai/missions/5/problems/find-the-location-of-a-substring-using-a-function?&utm_source=clipboard&utm_medium=text
