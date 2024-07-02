---
layout: post
title: "[Code Tree - Novice Mid] 02-1. 재귀함수: 값을 반환하지 않는 재귀함수"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-06-27
last_modified_at: 2024-06-29
---

JAVA 문법으로 작성함.

# Novice Mid: 02. 재귀함수 - 1

# 값을 반환하지 않는 재귀함수

## 1. 반복 출력하기 2

=> 정수 N이 주어지면 재귀함수를 이용해서 문자열 "HelloWorld"를 N번 출력하는 프로그램

조건: 1 ≤ N ≤ 20

### 코드:

```java
import java.util.Scanner;

public class Main {
    // 1부터 n번째 줄까지 문자열을 출력하는 함수
    public static void printString(int n) { 
        if(n == 0)          
            return;                       
        
        printString(n - 1);                
        System.out.println("HelloWorld");      
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        printString(n);
    }
}

```

### 입력:

```
4
```

### 출력:

```
HelloWorld
HelloWorld
HelloWorld
HelloWorld

```
---


## 2. 숫자 차례로 출력하기

=> 정수 N이 주어지면 재귀함수를 2개 작성하여 첫 번째 재귀함수를 이용하여 1부터 N까지 숫자를 차례대로 출력하고, 두 번째 재귀함수를 이용하여 N부터 1까지 차례로 출력하는 프로그램

조건: 1 ≤ N ≤ 100


### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void printNumber1(int n) { 
        if(n == 0)                          
            return;                         

        printNumber1(n - 1);  
        System.out.print(n + " ");
    }

    public static void printNumber2(int n) { 
        if(n == 0)                          
            return;                         

        System.out.print(n + " ");
        printNumber2(n - 1);  
    }

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        // 1~7까지 출력하는 함수
        printNumber1(n);
        System.out.println();
        // 7~1까지 출력하는 함수
        printNumber2(n);
	}
}
```

### 입력:

```
7
```

### 출력:

```
1 2 3 4 5 6 7
7 6 5 4 3 2 1
```
---

## 3. 재귀함수를 이용한 별 출력

=> 1번째 N번째 줄까지 별 출력을 다음 모양으로 재귀함수를 이용해 출력하는 프로그램

조건: 1 ≤ n ≤ 100


### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        printStar(n);
    }

    // 1부터 n번째 줄까지 별을 출력하는 함수
    public static void printStar(int n) { 

        if(n == 0)                 
            return;
        
        printStar(n - 1);   // 1부터 n - 1번째 줄까지 출력하는 함수
        for(int i = 0; i < n; i++)    
            System.out.print("*");
        System.out.println();
    }
}
```

### 입력:

```
5
```

### 출력:

```
*
**
***
****
*****

```
---

## 4. 재귀함수의 꽃

=> N이 주어지면 재귀함수를 단 하나만 이용하여 다음과 같이 출력하는 프로그램

조건: 1 ≤ n ≤ 100


### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void printRecursive(int n) {  
        if (n > 0) {
            System.out.print(n + " ");
        printRecursive(n - 1);
            System.out.print(n + " ");
        } 
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        printRecursive(n);
    }
}
```

### 입력:

```
5
```

### 출력:

```
5 4 3 2 1 1 2 3 4 5
```
---

## 6. 재귀함수를 이용한 별 출력 2

=> 정수 n의 값을 입력받아 별 출력을 다음 모양으로 재귀함수를 이용해 출력하는 프로그

조건: 1 ≤ N ≤ 100


### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        printStar(n);
    }

    public static void printStar(int n) {
        if(n == 0)
            return;
        
        for(int i = 0; i < n; i++)
            System.out.print("* ");
        System.out.println();
        printStar(n - 1);
        for(int i = 0; i < n; i++)
            System.out.print("* ");
        System.out.println();
    }
}
```

### 입력:

```
5
```

### 출력:

```
* * * * *
* * * *
* * *
* *
*
*
* *
* * *
* * * *
* * * * *
```
---

### 링크:[코드트리](https://www.codetree.ai/missions/5/problems/repeated-output-2?&utm_source=clipboard&utm_medium=text)