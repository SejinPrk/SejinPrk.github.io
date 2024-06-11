---
title:  "[Code Tree - Novice Mid] 01. 함수: 값을 반환하는 함수"
excerpt: "코드트리 문제 풀이 - JAVA"

categories:
  - Blog
tags:
  - [CodeTree]

toc: true
toc_sticky: true
 
date: 2024-06-11
last_modified_at: 2024-06-11
---
## [JAVA 문법으로 작성함.] 

# Novice Mid: 01. 함수
# 값을 반환하는 함수

## 1. 1부터 특정 수까지의 합
#### => 정수 N이 주어지면 1부터 전달받은 수까지의 합을 10으로 나눈값을 반환하는 함수를 작성하고, 함수로 전달하여 출력하는 프로그램
#### 조건: 1 ≤ N ≤ 100

### 코드: 
```java
import java.util.Scanner;

public class Main {
    public static int sumN(int n) {
        int sum = 0;
        for(int i = 1; i <= n; i++) {
            sum+= i;
        }
        return sum / 10;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        System.out.println(sumN(n));
    }
}
```

### 입력:
```
100
```

### 출력: 
```
505
```

### 링크:[코드트리](https://www.codetree.ai/missions/5/problems/sum-from-1-to-a-certain-number?&utm_source=clipboard&utm_medium=text)