---
layout: post
title: "[Code Tree - Novice Mid] 04-2. 시뮬레이션 II: 배열 기록"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-08-09
last_modified_at: 2024-08-09
---

JAVA 문법으로 작성함.

# Novice Mid: 05. 시뮬레이션 II

# 2. 배열 기록

## 1. 만나는 그 순간

=> A와 B가 동일한 시작점에서 출발하고 1초에 1m씩 움직이며, A, B는 각각 N번, M번에 걸쳐 주어지는 방향으로 특정 시간만큼 이동한다고 할 때, A, B가 움직임을 시작한 이후에 최초로 만나게 되는 시간은 몇 초 뒤인지를 구하는 프로그램

- 만약 A, B가 움직임을 멈출 때까지 만나지 않는다면 -1을 출력
- A가 총 이동한 시간과 B가 총 이동한 시간은 항상 동일
- 처음 A와 B는 서로 다른 방향으로만 움직임

조건: 1 ≤ N, M ≤ 1,000 / 1 ≤ t ≤ 1,000

### 코드:

```java
import java.util.Scanner;

public class Main {
    private static int findMeetingTime(int[][] moveA, int[][] moveB) {
        int posA = 0, posB = 0; // A, B의 현재 위치
        int timeA = 0, timeB = 0; // A, B의 총 이동시간
        int indexA = 0, indexB = 0; // A, B의 현재 이동 인덱스

        // A, B의 모든 이동을 처리할 때까지 반복
        while (indexA < moveA.length && indexB < moveB.length) {
            // A, B가 같은 위치에 있고 시간이 0보다 크면 만난 것으로 판단
            if (posA == posB && timeA == timeB && timeA > 0) {
                return timeA; // 만난 시간 리턴
            }

            // A의 이동 처리 (B와 같거나 B보다 뒤쳐짐)
            if (timeA <= timeB) {
                posA += moveA[indexA][0]; // 현재 방향으로 이동
                timeA++; // 총 이동 시간 증가
                moveA[indexA][1]--; // 현재 이동의 남은 시간 감소

                // 현재 이동이 끝났으면 다음 이동으로 
                if (moveA[indexA][1] == 0) {
                    indexA++;
                }
            }

            // B의 이동 처리 (A와 같거나 A보다 뒤쳐짐)
            if (timeB <= timeA) {
                posB += moveB[indexB][0]; // 현재 방향으로 이동
                timeB++; // 총 이동 시간 증가
                moveB[indexB][1]--; // 현재 이동의 남은 시간 감소

                // 현재 이동이 끝났으면 다음 이동으로
                if (moveB[indexB][1] == 0) {
                    indexB++;
                }
            }
        }
        // 모든 이동을 처리했지만 만나지 못한 경우
        return -1;   
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int N = sc.nextInt();
        int M = sc.nextInt();

        // [N][0]: i번째 이동의 방향, [N][1]: i번째 이동의 시간 
        int[][] moveA = new int[N][2]; 
        int[][] moveB = new int[M][2];

        // A의 이동 입력
        for (int i = 0; i < N; i++) {
            String dir = sc.next();
            int time = sc.nextInt();
            moveA[i][0] = dir.equals("R")? 1 : -1;
            moveA[i][1] = time;
        }

        // B의 이동 입력
        for (int i = 0; i < M; i++) {
            String dir = sc.next();
            int time = sc.nextInt();
            moveB[i][0] = dir.equals("R") ? 1 : -1;
            moveB[i][1] = time;
        }

        int result = findMeetingTime(moveA, moveB);
        System.out.println(result);

        sc.close();
    }
}
```

### 입력:

```
3 4
R 9
L 3
R 5
L 2
R 2
L 1
R 12
```

### 출력:

```
12
```

---

## 2. 벌금은 누구에게

=> 

조건: 

### 코드:

```java

```

### 입력:

```

```

### 출력:

```

```

---

## 3. 선두를 지켜라

=> 

조건: 

### 코드:

```java

```

### 입력:

```

```

### 출력:

```

```

---

## 4. 좌우로 움직이는 로봇

=>

조건: 

### 코드:

```java

```

### 입력:

```

```

### 출력:

```

```

---

## 5. 악수와 전염병의 상관관계 2

=> 

조건: 

### 코드:

```java

```

### 입력:

```

```

### 출력:

```

```

---

## 6. 선두를 지켜라 3

=> 

조건:

### 코드:

```java

```

### 입력:

```

```

### 출력:

```

```

---

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/the-moment-we-meet?&utm_source=clipboard&utm_medium=text)
