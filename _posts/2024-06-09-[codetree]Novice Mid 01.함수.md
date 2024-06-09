---
title:  "[Code Tree - Novice Mid] 01. 함수"
excerpt: "코드트리 문제 풀이 - JAVA"

categories:
  - Blog
tags:
  - [CodeTree]

toc: true
toc_sticky: true
 
date: 2024-06-09
last_modified_at: 2024-06-09
---
## [JAVA 문법으로 작성함.] 

# Novice Mid

## 1. 별 찍는 것을 5번 반복하기
#### => 별 10개를 찍는 것을 5번 반복하는 프로그램
#### 기본 단계와 달리 별 10개를 출력하는 함수를 따로 만들고, 이 함수를 5번 호출해야 한다. 

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

#### => 정수 N을 입력받아 N개의 줄에 걸쳐 '12345^&*()_'를 출력하는 프로그램
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


### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/repeat-shooting-the-stars-five-times?&utm_source=clipboard&utm_medium=text)