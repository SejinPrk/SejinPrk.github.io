---
layout: post
title: "[Code Tree - Novice Mid] 02-2. 재귀함수: 값을 반환하는 재귀함수 - 1"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-07-01
last_modified_at: 2024-07-21
---

JAVA 문법으로 작성함.

# Novice Mid: 02. 재귀함수 - 2

# 값을 반환하는 재귀함수 - 1

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

## 3. 1이 되는 순간까지

=> 정수 N이 짝수이면 2로 나누고, 홀수이면 3으로 나눈 몫을 취하는 작업을 반복하다가 그 값이 1이 되면 그때까지 진행한 작업의 횟수를 구하는 프로그램

조건: 1 ≤ N ≤ 1,000,000

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int F(int n) {
        // Default 케이스: N이 1이면 작업 종료
        if (n == 1) {
            return 0;
        }
        // 짝수인 경우: 2로 나눈다
        else if (n % 2 == 0) {
            return 1 + F(n / 2);
        }
        // 홀수인 경우: 3으로 나눈 몫을 취한다
        else {
            return 1 + F(n / 3);
        }
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
230
```

### 출력:

```
6
```

---

## 4. 재귀함수를 이용한 피보나치 수

=> N번째 피보나치 수를 구하는 프로그램

조건: 1 ≤ N ≤ 20

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int F(int n) {
        // 종료 조건
        if (n == 0)
            return 0;
        if(n == 1)
            return 1;

        int[] fib = new int[n + 1];
        fib[0] = 0;
        fib[1] = 1;

        for (int i = 2; i <= n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }

        return fib[n];
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
8
```

### 출력:

```
21
```

---

## 5. Factorial

=> 재귀함수를 이용하여 n!(팩토리얼) 값을 구하는 프로그램

조건: 1 ≤ N ≤ 10

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        System.out.println(factorial(n));
    }
}
```

### 입력:

```
5
```

### 출력:

```
120
```

---

## 6. 홀수 짝수에 따른 출력값

=> 정수 N이 홀수인 경우에는 1부터 N까지의 홀수를, N이 짝수인 경우에는 2부터 N까지의 짝수의 합을 출력하는 프로그램을(재귀 함수)

조건: 1 ≤ N ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int sumOdds(int n) {
        // n이 홀수일 때
        if (n <= 0) {
            return 0;
        } else if (n % 2 != 0) {
            return n + sumOdds(n - 2);
        } else {
            return sumOdds(n - 1);
        }
    }

    // n이 짝수일 때
    public static int sumEvens(int n) {
        if (n < 2) {
            return 0;
        } else if (n % 2 == 0) {
            return n + sumEvens(n - 2);
        } else {
            return sumEvens(n - 1);
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

    if (n % 2 == 0)
        System.out.println(sumEvens(n));
    else
        System.out.println(sumOdds(n));
    }
}
```

### 입력:

```
8
```

### 출력:

```
20
```

---

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/sum-from-1-to-a-certain-number-2?&utm_source=clipboard&utm_medium=text)
