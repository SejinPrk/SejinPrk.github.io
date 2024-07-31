---
layout: post
title: "[Code Tree - Novice Mid] 04-2. 시뮬레이션 I: Notation"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-07-31
last_modified_at: 2024-07-31
---

JAVA 문법으로 작성함.

# Novice Mid: 04. 시뮬레이션 I

# 2. Notation

## 1. 2진수로 변환하기
 
=> 십진수 n이 주어지면 0과 1로만 이루어진 2진수로 그 수를 변환하여 출력하는 프로그램

조건: 0 ≤ n ≤ 100,000

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] digits = new int[20];
        int cnt = 0;

        while (true) {
            if(n < 2) {
                digits[cnt++] = n;
                break;
            }
        
            digits[cnt++] = n % 2;
            n /= 2;
        }
        
        // 2진수 출력
        for(int i = cnt - 1; i >= 0; i--)
            System.out.print(digits[i]);
    }
}
```

### 입력:

```
29
```

### 출력:

```
11101
```

---

## 2. 10진수로 변환하기

=> 0과 1로 이루어진 2진수로 n이 주어지면 그 수를 십진수로 변환하여 출력하는 프로그램

조건: n은 8자리 이하의 2진수

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String binaryString = sc.nextLine();
        int num = 0;

        for(int i = 0; i < binaryString.length(); i++) {
            num = num * 2 + (binaryString.charAt(i) - '0');
        }

        System.out.print(num);
    }
}
```

### 입력:

```
11101
```

### 출력:

```
29
```

---

## 3. 여러가지 진수변환

=> 정수 N이 주어지고, 바꿀 진수 B가 주어지면, 10진수인 정수 N을 B진수로 변경하여 출력하는 프로그램
- B: 4, 8만 가능

조건: 1 ≤ N ≤ 1000

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int B = sc.nextInt();

        String result = convertToBase(N, B); //  N을 B진수로 변환하는 메서드
        System.out.println(result);
        
        sc.close();
    }

    public static String convertToBase(int N, int B) {
        StringBuilder sb = new StringBuilder();

        while (N > 0) {
            int remainder = N % B; // N을 B로 나눈 나머지
            sb.insert(0, remainder); // 나머지를 결과 문자열의 맨 앞에 삽입
            N /= B; // N을 B로 나눈다.
        }

        return sb.length() == 0 ? "0" : sb.toString();
    }
}
```

### 입력:

```
111 4
```

### 출력:

```
1233
```

### 입력:

```
64 8
```

### 출력:

```
100
```
---

## 4. 십진수와 이진수 2

=> 이진수 N이 주어지면 십진수로 바꿔 17배를 하고 다시 이진수로 나타내어 출력하는 프로그램

조건: N의 최대 자리수: 10 

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static final int MAX_DIGIT = 20;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String binaryInput = sc.next();

        // 이진수 -> 십진수
        int decimal = 0;
        for (int i = 0; i < (int)binaryInput.length(); i++) {
            decimal = decimal * 2 + (binaryInput.charAt(i) - '0');
        }

        // *17
        decimal *= 17;

        // 다시 이진수로 변환
        int[] digits = new int[MAX_DIGIT];
        int cnt = 0;

        while (true) {
            if (decimal < 2) {
                digits[cnt++] = decimal;
                break;
            }

            digits[cnt++] = decimal % 2;
            decimal /= 2;
        }

        // 이진수 출력
        for (int i = cnt - 1; i >= 0; i--) {
            System.out.print(digits[i]);
        }
        sc.close();
    }
}
```

### 입력:

```
10011
```

### 출력:

```
101000011
```

---

## 5. 진수 to 진수

=> 정수 a와 b가 주어지고, a진수로 표현된 어떤 수 n이 주어지면, n을 b진수로 변환하여 출력하는 프로그램

조건: 2 ≤ a,b ≤ 9 / 1 ≤ n의 자리수 ≤ 9

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();
        String n = sc.next();
        int decimal = 0;

        for (int i = 0; i < n.length(); i++) {
            decimal = decimal * a + (n.charAt(i) - '0');
        }

        // 10진수 -> b진수
        StringBuilder result = new StringBuilder();
        while (decimal > 0) {
            result.insert(0, decimal % b);
            decimal /= b;
        }

        System.out.println(result.length() > 0? result.toString() : "0");

        sc.close();
    }
}
```

### 입력:

```
8 2
11
```

### 출력:

```
1001
```

---

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/convert-to-binary?&utm_source=clipboard&utm_medium=text)
