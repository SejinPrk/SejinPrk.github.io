---
layout: post
title: "[Code Tree - Novice Mid] 04-1. 시뮬레이션 I: 날짜와 시간 계산"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree], [Java]
toc: true
toc_sticky: true
date: 2024-07-28
last_modified_at: 2024-07-28
---

JAVA 문법으로 작성함.

# Novice Mid: 04. 시뮬레이션 I

# 1. 날짜와 시간 계산

## 1. Time to Time

=> 2011년 11월 11일 a시 b분에서 시작하여 2011년 11월 11일 c시 d분까지 몇 분이 걸리는지를 계산하는 프로그램

조건: 0 ≤ a, c ≤ 23 / 0 ≤ b, d ≤ 59

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        int d = sc.nextInt();
        
        sc.close();

        // 시간을 분으로 변환
        int startTime = a * 60 + b;
        int endTime = c * 60 + d;
    
        int elapsedTime = 0;

        if (endTime >= startTime) {
            elapsedTime = endTime - startTime;
        } 
        // else { // 자정을 지날 경우
        //     elapsedTime = (24 * 60 - startTime) + endTime;
        // }
        
        System.out.print(elapsedTime);
    }
}
```

### 입력:

```
2 5 4 1
```

### 출력:

```
116
```

---

## 2. Date to Date

=> 2011년 m1월 d1일로부터 2011년 m2월 d2일까지는 총 며칠이 있는지를 계산하는 프로그램
- 2011년 : 윤년이 아니기 때문에 2월 28일까지 있음
- 시작일 포함해서 날짜 계산

조건: 1 ≤ m1, m2 ≤ 12 / 1 ≤ d1, d2 ≤ 31

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m1 = sc.nextInt();
        int d1 = sc.nextInt();
        int m2 = sc.nextInt();
        int d2 = sc.nextInt();

        sc.close();

        int totalDays = 0;
        int[] num_of_days = new int[]{0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
 
        if(m1 == m2) {
            totalDays = d2 - d1 + 1; // 시작일 포함
        } else {
            totalDays += num_of_days[m1] - d1 + 1;
            
            for (int month = m1 + 1; month < m2; month++ ){
                totalDays += num_of_days[month];
            }
            totalDays += d2;
        }

        System.out.print(totalDays);
    }
}

```

### 입력:

```
11 5 12 21
```

### 출력:

```
47
```

---

## 3. DateTime to DateTime

=> 2011년 11월 11일 11시 11분에서 시작하여 2011년 11월 a일 b시 c분까지 몇 분이 걸리는지를 계산하는 프로그램
- 단, a일 b시 c분이 11일 11시 11분보다 더 앞서다면 -1을 출력

조건: 11 ≤ a ≤ 14 / 0 ≤ b ≤ 23 / 0 ≤ c ≤ 59

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();

        // 분 단위 변환 
        int startTime = 0; // 2011년 11월 11일 11시 11분
        int endTime = (a - 11) * 24 * 60 + (b - 11) * 60 + (c - 11); // 2011년 11월 a일 b시 c분부터의 경과 시간

        if (endTime < 0) {
            System.out.println(-1);
        } else {
            System.out.println(endTime);
        }

        sc.close();
    }
}
```

### 입력:

```
12 13 14
```

### 출력:

```
1563
```

---

## 4. 요일 맞추기

=> 2011년 m1월 d1일이 월요일 이었다면, 2011년 m2월 d2은 어떤 요일인지를 구하는 프로그램

조건: 1 ≤ m1, m2 ≤ 12 / 1 ≤ d1, d2 ≤ 31

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int numOfDays(int m, int d) {
        int[] days = new int[]{0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int totalDays = 0;

        for(int i = 1; i < m; i++)
            totalDays += days[i];
        
        // m월에 d일이 있음
        totalDays += d;
        
        return totalDays;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 변수 선언 및 입력
        int m1 = sc.nextInt();
        int d1 = sc.nextInt();
        int m2 = sc.nextInt();
        int d2 = sc.nextInt();
        
        // 두 날짜간의 차이 계산
        int diff = numOfDays(m2, d2) - numOfDays(m1, d1);
        
        // 음수인 경우
        while(diff < 0)
            diff += 7;
        
        String[] dayOfWeek = new String[]{"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        System.out.print(dayOfWeek[diff % 7]);
    }
}
```

### 입력:

```
5 4 5 3
```

### 출력:

```
Sun
```

---

## 5. 그 요일은

=> 2024년 m1월 d1일이 월요일 이었다면, 2024년 m2월 d2까지 A 요일은 몇 번 등장하는지 구하는 프로그램
- 2024년은 윤년이기 때문에 2월은 29일까지 있음

조건: 1 ≤ m1 ≤ m2 ≤ 12 / 1 ≤ d1, d2 ≤ 31

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int numOfDays (int m, int d) {
        int[] days = new int[]{0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int totalDays = 0;

        for (int i = 1; i < m; i++) {
            totalDays += days[i];
        }

        totalDays += d;
        return totalDays;
    }

    public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    // 변수 선언 및 입력
    int m1 = sc.nextInt();
    int d1 = sc.nextInt();
    int m2 = sc.nextInt();
    int d2 = sc.nextInt();
    sc.nextLine(); // 개행문자 제거
    String A = sc.nextLine();

    String[] daysOfWeek = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
    int targetDayIndex = 0;
    
    for (int i = 0; i < 7; i++) {
        if (daysOfWeek[i].equals(A)) {
            targetDayIndex = i;
            break;
        }
    }

    // 두 날짜 간의 총 일수 계산
    int startDay = numOfDays(m1, d1);
    int endDay = numOfDays(m2, d2);
    int totalDays = endDay - startDay + 1;

    // 목표 요일이 총 몇 번 등장하는지 계산
    int count = 0;
    for (int i = 0; i < totalDays; i++) {
        int currentDayIndex = i % 7;
        if (currentDayIndex == targetDayIndex) {
            count++;
        }
    }
    System.out.println(count);
    }
}
```

### 입력:

```
2 5 3 9
Sat
```

### 출력:

```
5
```

---


### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/time-to-time?&utm_source=clipboard&utm_medium=text)
