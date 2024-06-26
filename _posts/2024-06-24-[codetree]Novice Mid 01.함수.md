---
layout: post
title: "[Code Tree - Novice Mid] 01-3. 함수: 변수의 영역"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-06-24
last_modified_at: 2024-06-26
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

## 2. 나누고 빼면서 합하기

=> n개의 원소로 이루어진 수열 A가 주어지고 숫자 m이 주어질 때, m이 1이 되기 전까지 m이 홀수면 1을 빼고, 짝수면 2로 나누는 걸 계속 반복하면서 A의 m번째 원소를 계속 더해 출력하는 프로그램

조건: 1 ≤ m ≤ n ≤ 100 / 1 ≤ 원소 값 ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        int result = sumElementsByRule(n, m, arr);
        System.out.println(result);

        sc.close();
    }

    public static int sumElementsByRule(int n, int m, int[] arr) {
        int totalSum = 0;
        while(m > 1) {
            totalSum += arr[m-1]; // m번째 원소 더하기
            if (m % 2 == 0) { // m이 짝수면 2로 나눈다.
                m /= 2;
            } else { // m이 홀수면 1을 뺀다.
                m -= 1;
            }
        }
        totalSum += arr[0]; // 마지막으로 m이 1이 되었을 때 첫번째 원소를 더한다.
        return totalSum;
    }
}
```

### 입력:

```
5 4
5 4 3 2 1
```

### 출력:

```
11
```

## 3.특정 구간의 합

=> n개의 원소로 이루어진 수열 A가 주어지고 m개의 두 숫자쌍 a1, a2가 주어질 때, m번에 걸쳐 수열 A의 a1번째 수부터 a2까지 합을 구해 출력하는 프로그램

조건: 1 ≤ n, m ≤ 100 / 1 ≤ 원소 값 ≤ 100 / 1 ≤ a1 ≤ a2 ≤ n

### 코드:

```java
import java.util.Scanner;

public class Main {
    static int[] A;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();

        A = new int[n];

        for (int i = 0; i < n; i++) {
            A[i] = sc.nextInt();
        }

        for (int i = 0; i < m; i++) {
            int a1 = sc.nextInt();
            int a2 = sc.nextInt();
            int result = calculateSum(a1, a2);
            System.out.println(result);
        }
    }

    // 수열 A의 a1번째 수부터 a2까지 합
    public static int calculateSum (int a1, int a2) {
        int sum = 0;
        for (int i = a1 -1; i < a2; i++) {
            sum += A[i];
        }
        return sum;
    }
}
```

### 입력:

```
6 4
6 5 4 3 2 1
1 2
2 4
3 4
5 6
```

### 출력:

```
11
12
7
3
```

### 링크:[코드트리] https://www.codetree.ai/missions/5/problems/find-the-location-of-a-substring-using-a-function?&utm_source=clipboard&utm_medium=text
