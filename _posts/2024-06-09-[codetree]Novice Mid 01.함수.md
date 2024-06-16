---
layout: post
title: "[Code Tree - Novice Mid] 01-1. 함수: 값을 반환하지 않는 함수"
excerpt: "코드트리 문제 풀이 - JAVA"

categories:
  - Blog
tags:
  - [CodeTree]

toc: true
toc_sticky: true

date: 2024-06-09
last_modified_at: 2024-06-16
---

### JAVA 문법으로 작성함.

# Novice Mid: 01. 함수

# 값을 반환하지 않는 함수

## 1. 별 찍는 것을 5번 반복하기

#### => 별 10개를 찍는 것을 5번 반복하는 프로그램

#### 기본 단계와 달리 별 10개를 출력하는 함수를 따로 만들고, 이 함수를 5번 호출해야 함.

### 코드:

```java
public class Main {
    public static void print5Stars() {
        for(int i = 0; i < 10; i++)
            System.out.print("*");
        System.out.println();
    }

    public static void main(String[] args) {
        for(int i = 0; i < 5; i++)
            print5Stars();
    }
}
```

### 출력 결과:

```
**********
**********
**********
**********
**********
```

## 2. 반복 출력하기

#### => 정수 N을 입력받아 N개의 줄에 걸쳐 '12345^&\*()\_'를 출력하는 프로그램

#### 조건: 1 ≤ N ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void printNLines(int n) {
        for(int i = 0; i < n; i++) {
            System.out.println("12345^&*()_");
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int rowNum = sc.nextInt();
        printNLines(rowNum);
    }
}
```

### 입력:

```
3
```

### 출력:

```
12345^&*()_
12345^&*()_
12345^&*()_
```

## 3. 함수를 이용해 직사각형 만들기

#### => n, m이 주어졌을 때, 전부 1로 이루어져 있는 n \* m 크기의 직사각형을 출력하는 프로그램

#### 조건: 1 ≤ n, m ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void printRect(int n, int m) {
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++)
                System.out.print("1");
            System.out.println();
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int rowNum = sc.nextInt();
        int colNum = sc.nextInt();
        printRect(rowNum, colNum);
    }
}
```

### 입력:

```
2 3
```

### 출력:

```
111
111
```

## 4. 숫자로 이루어진 사각형

#### => 일의 자리 숫자로 이루어진 N \* N 모양 사각형을 출력하는 프로그램

#### 조건: 1 ≤ N ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void printRect(int n) {
        int cnt = 1;
        for(int i = 1; i <= n; i++) {
            for(int j = 1; j <= n; j++) {
                System.out.print(cnt + " ");
                cnt++;
                if(cnt == 10)
                    cnt = 1;
            }
            System.out.println();
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        printRect(n);
    }
}
```

### 입력:

```
4
```

### 출력:

```
1 2 3 4
5 6 7 8
9 1 2 3
4 5 6 7
```

# 5. 최대공약수 구하기(gcd)

#### => n, m이 주어졌을 때, n과 m의 최대공약수를 출력하는 프로그램

#### 조건: 1 ≤ n, m ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void gcd(int n, int m) {
        int max = 0;
        for(int i = 1; i <= n && i <= m; i++) {
            if(n % i == 0 && m % i == 0){
                max = i;
            }
        }
        System.out.println(max);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        gcd(n, m);
    }
}
```

### 입력:

```
12 18
```

### 출력:

```
6
```

# 6. 최소공배수 구하기(lcd)

#### => n, m이 주어졌을 때, n과 m의 최소 공배수를 출력하는 프로그램

#### 조건: 1 ≤ n, m ≤ 100

#### 최대공약수를 먼저 구하면 그 뒤로 최소공배수를 구하는 건 훨씬 쉬워진다.

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void lcd(int n, int m) {
        int max = 0;
        for(int i = 1; i <= n && i <= m; i++) {
            if(n % i == 0 && m % i == 0){
                max = i;
            }
        }

        int min = (n * m) / max;
        System.out.println(min);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        lcd(n, m);
    }
}
```

### 입력:

```
12 18
```

### 출력:

```
36
```

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/repeat-shooting-the-stars-five-times?&utm_source=clipboard&utm_medium=text)
