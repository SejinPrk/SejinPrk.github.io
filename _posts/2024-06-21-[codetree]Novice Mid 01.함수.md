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

## 3. palindrome 여부 판단하기

=> 소문자 알파벳으로만 이루어진 문자열 A가 주어졌을 때, 문자열 A가 palindrome인지를 판단하는 프로그램. A가 palindrome라면 Yes, 아니라면 No를 출력한다.

조건: 1 ≤ 문자열 A의 길이 ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    // 문자열 A가 Palindrom인지를 판단하는 함수
    public static boolean isPalindrome(String A) {
        int left = 0;
        int right = A.length() - 1;

        // 문자열의 처음과 끝을 비교
        while (left < right) {
            if (A.charAt(left) != A.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String A = sc.nextLine();

        // 회문인지 여부 검사 후 결과 출력
        if (isPalindrome(A)) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }
    }
}
```

### 입력:

```
aoa
```

### 출력:

```
Yes
```

### 입력:

```
codetree
```

### 출력:

```
No
```

## 4. 두 정수에 대한 연산값

=> 두 개의 정수 a, b가 주어지면 두 개의 숫자 중 큰 수에는 25를 더하고 작은 수에는 2를 곱하여 저장한 후 출력하는 프로그램

조건: 1 ≤ a, b ≤ 200 / a ≠ b

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        compareNo(a, b);
    }

    // 숫자 비교하기
    public static void compareNo(int a, int b) {
        if (a > b) {
            a += 25;
            b *= 2;
        } else {
            a *= 2;
            b += 25;
        }
        System.out.println(a + " " + b);
    }
}
```

### 입력:

```
100 200
```

### 출력:

```
200 225
```

## 5. 절댓값으로 변경

=> N개의 원소로 이루어진 배열을 인자로 받아 각각 절댓값을 씌워주는 함수를 작성하고, 해당 함수를 호출 한 후 각 원소의 값을 출력하는 프로그램

조건: 1 ≤ N ≤ 50 / -100 ≤ 주어지는 N개의 정수 ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        absoluteValue(arr);
    }

    // 배열의 절댓값 구하기
    public static void absoluteValue(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(Math.abs(arr[i]) + " ");
        }
    }
}
```

### 입력:

```
5
-20 20 0 15 -35
```

### 출력:

```
20 20 0 15 35
```

### 링크:[코드트리](https://www.codetree.ai/missions/5/problems/to-exchange-two-integer-values?&utm_source=clipboard&utm_medium=text)
