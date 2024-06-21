---
layout: post
title: "[Code Tree - Novice Mid] 01-3. 함수: Call by value / Call by reference"
excerpt: "코드트리 문제 풀이 - JAVA"

categories:
  - Blog
tags:
  - [CodeTree]

toc: true
toc_sticky: true

date: 2024-06-21
last_modified_at: 2024-06-21
---

JAVA 문법으로 작성함.

# Novice Mid: 01. 함수 - 3

# Call by value / Call by reference

## 1. 두 정수 값 교환하기

=> 두 개의 정수 n, m이 주어지면 두 개의 숫자에 있는 값을 교환하여 출력하는 프로그램

조건: 1 ≤ n, m ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    // 교환
    public static void swap(int a, int b) {
        int temp = a;
        a = b;
        b = temp;
        System.out.println(a + " " + b);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();

        swap(n, m);
    }
}
```

### 입력:

```
13 8
```

### 출력:

```
8 13
```

## 2. 짝수만 2로 나누기

=> N개의 원소로 이루어진 배열을 인자로 받아 그 중 짝수인 원소만 2로 나눠주는 함수를 작성하고, 해당 함수를 호출 한 후 각 원소의 값을 출력하는 프로그램

조건: 1 ≤ N ≤ 50 / 1 ≤ 주어지는 N개의 정수 ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    // 짝수일 때 2로 나눠서 저장하는 함수
    public static void divideEvenNo(int[] arr, int n) {
        for(int i = 0; i < n; i++) {
            if (arr[i] % 2 == 0) {
                arr[i] /=2;
            }
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        divideEvenNo(arr, n);

        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}

```

### 입력:

```
5
22 5 1 9 8
```

### 출력:

```
11 5 1 9 4
```

### 링크:[코드트리](https://www.codetree.ai/missions/5/problems/to-exchange-two-integer-values?&utm_source=clipboard&utm_medium=text)
