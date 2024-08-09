---
layout: post
title: "[Code Tree - Novice Mid] 04-1. 시뮬레이션 II: 최장 연속 부분 수열"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-08-08
last_modified_at: 2024-08-09
---

JAVA 문법으로 작성함.

# Novice Mid: 05. 시뮬레이션 II

# 1. 최장 연속 부분 수열

## 1. 연속되는 수 2
 
=> N개의 숫자들이 주어졌을 때, 연속하여 동일한 숫자가 나오는 횟수 중 최대를 구하는 프로그램

조건: 1 ≤ N ≤ 1,000 / 0 ≤ 입력으로 주어지는 숫자 ≤ 1,000


### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt(); 
        } 
        
        int maxCount = 0;
        int currentCount = 0;
        
        for (int i = 0; i < n; i++) {
            if (i == 0 || nums[i] == nums[i - 1]) {
                currentCount++;
            } else {
                maxCount = Math.max(maxCount, currentCount);
                currentCount = 1;
            }
        }
        maxCount = Math.max(maxCount, currentCount);

        System.out.println(maxCount);
        sc.close();
    }
}
```

### 입력:

```
7
2
7
7
7
7
5
7
```

### 출력:

```
4
```

---

## 2. 연속되는 수 3

=> 0이 아닌 N개의 숫자들이 주어졌을 때, 부호가 동일한 숫자로만 이루어진 연속 부분 수열 중 최대 길이를 구하는 프로그램

-  연속 부분 수열: 어떤 수열에서 특정 구간에 속하는 숫자들을 모두 뽑았을 때 나오는 부분 수열

조건: 1 ≤ N ≤ 1,000 / -1,000 ≤ 입력으로 주어지는 숫자 ≤ 1,000

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }

        int maxLength = 0;
        int currLength = 0;

        for (int i = 0; i < n; i++) {
            if (i == 0 || nums[i] * nums[i - 1] > 0) {
                currLength++;
            } else {
                maxLength = Math.max(maxLength, currLength);
                currLength = 1;
            }
        }
        maxLength = Math.max(maxLength, currLength);

        System.out.println(maxLength);
        sc.close();
    }
}
```

### 입력:

```
7
2
-1
-5
-2
-3
5
8
```

### 출력:

```
4
```

---

## 3. 연속되는 수 4

=> N개의 숫자들이 주어졌을 때, 증가하는 연속 부분 수열 중 최대 길이를 구하는 프로그램

조건: 1 ≤ N ≤ 1,000 / 1 ≤ 입력으로 주어지는 숫자 ≤ 1,000

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int longestIncreasingSubSeq(int[] seq) {
        if (seq == null || seq.length == 0) {
            return 0;
        }
        int maxLength = 1;
        int currLength = 1;

        for (int i = 1; i< seq.length; i++) {
            if (seq[i] > seq[i - 1]) {
                currLength++;
                maxLength = Math.max(maxLength, currLength);
            } else {
                currLength = 1;
            }
        }
        return maxLength;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] seq = new int[n];

        for (int i = 0; i < n; i++) {
            seq[i] = sc.nextInt();
        }

        int result = longestIncreasingSubSeq(seq);
        System.out.println(result);

        sc.close();
    }
}
```

### 입력:

```
7
1
5
2
3
5
8
8
```

### 출력:

```
4
```

---

## 4.T를 초과하는 연속 부분 수열

=> n개의 수로 이루어진 수열 정보와 정수 t가 주어졌을 때, t보다 큰 수로만 이루어진 연속 부분 수열 중 최대 길이를 구하는 프로그램

조건: 1 ≤ n ≤ 1,000 / 1 ≤ t ≤ 1,000 / 1 ≤ 원소 값 ≤ 1,000

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int longestSubseq(int[] seq, int t) {
        int maxLength = 0;
        int currLength = 0;

        for (int num : seq) {
            if (num > t) {
                currLength++;
                maxLength = Math.max(maxLength, currLength);
            } else {
                currLength = 0;
            }
        }
        return maxLength;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int t = sc.nextInt();

        int[] seq = new int[n];
        for (int i = 0; i < n; i++) {
            seq[i] = sc.nextInt();
        }

        int result = longestSubseq(seq, t);
        
        System.out.println(result);
        sc.close();
    }
}
```

### 입력:

```
7 3
1 6 7 8 3 4 5
```

### 출력:

```
3
```
---

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/continuous-number2?&utm_source=clipboard&utm_medium=text)
