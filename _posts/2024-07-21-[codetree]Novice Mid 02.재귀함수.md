---
layout: post
title: "[Code Tree - Novice Mid] 02-2. 재귀함수: 값을 반환하는 재귀함수 - 2"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-07-21
last_modified_at: 2024-07-21
---

JAVA 문법으로 작성함.

# Novice Mid: 02. 재귀함수 - 2

# 값을 반환하는 재귀함수 - 2

## 7. 재귀함수를 이용한 최댓값
 
=> n개의 원소 중 최댓값을 구하는 프로그램(재귀 함수)

조건: 1 ≤ 원소의 범위 ≤ 100 / 1 ≤ n ≤ 100


### 코드:

```java
import java.util.Scanner;

public class Main {

    public static int findMax(int[] array) {
        return findMaxHelper(array, array.length - 1);
    }

    private static int findMaxHelper(int[] array, int n) {
        if (n == 0) {
            return array[0];
        }
        int maxInRest = findMaxHelper(array, n - 1);

        return Math.max(array[n], maxInRest);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] array = new int[n];
        
        for (int i = 0; i < n; i++) {
            array[i] = sc.nextInt();
        }

         int max = findMax(array);
        System.out.println(max);
    }
}

```

### 입력:

```
6
1 5 7 9 2 6
```

### 출력:

```
9
```

---

## 8. 큰 숫자 자리수의 합

=> 3자리로 이루어진 정수 3개가 주어지면 그 세 숫자들을 곱한 후, 그 결과값의 각 자리 숫자들의 합을 구하여 출력하는 프로그램(재귀 함수)

조건: 100 ≤ 3개의 정수 ≤ 999

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int sumDigits(int n) {
        if (n < 10) {
            return n;
        }
        return n % 10 + sumDigits(n / 10);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] arr = new int[3];

        for (int i = 0; i < 3; i++) {
            arr[i] = sc.nextInt();
        }

        int mul = arr[0] * arr[1] * arr[2];

        int sumOfDigits = sumDigits(mul);
        
        System.out.println(sumOfDigits);
    }
}
```

### 입력:

```
123 456 789
```

### 출력:

```
27
```

---

## 9. 재귀함수를 이용한 3n + 1 수열

=> 자연수 n에서 시작하여 n이 짝수면 2로 나누고, n이 홀수면 3을 곱하고 1을 더하는 것을 n이 1이 되기 전까지 계속 반복하려고 할 때 총 몇 번을 반복해야 1이 되는지를 계산하는 프로그램(재귀함수)

조건: 1 ≤ n ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {

    // 콜라츠 추측을 재귀적으로 계산하는 함수
    public static int collatzSteps(int n) {
        if (n == 1) {
            return 0;
        }

        if (n % 2 == 0) {
           return 1 + collatzSteps(n / 2);
        } else {
            return 1 + collatzSteps(n * 3 + 1);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        int steps = collatzSteps(n);
        System.out.println(steps);
    }
}
```

### 입력:

```
3
```

### 출력:

```
7
```

---

## 10. 100으로 나눈 나머지의 수열

=> 첫 번째는 2, 두 번째는 4, 세 번째부터는 앞의 두 수의 곱을 100으로 나눈 나머지로 이루어진 수열이 있을 때, 100 이하의 정수 N을 입력받아 재귀함수를 이용하여 N번째 값을 구하여 출력하는 프로그램

조건: 1 ≤ N ≤ 20

### 코드:

```java
import java.util.Scanner;

public class Main {

    public static int calculate(int n) {
        if (n == 1) return 2;
        if (n == 2) return 4;

        return (calculate(n-2) * calculate(n-1)) % 100;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        int result = calculate(n);
        System.out.println(result);
    }
}
```

### 입력:

```
5
```

### 출력:

```
56
```

---

## 11. 이상한 수열

=> 첫 번째 수는 1이고, 두 번째 수는 2이고, N 번째 수는 [N/3]번째 수와 (N-1)번째 수의 합으로 나열된 수열이 있을 때, 정수 N이 주어지면 재귀호출을 이용하여 이 수열에서 N번째 수를 구하는 프로그램

조건: 1 ≤ N ≤ 15

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int strangeNum(int n) {
        if (n == 1) return 1;
        if (n == 2) return 2;

        return strangeNum(n/3) + strangeNum(n-1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int result = strangeNum(n);

        System.out.println(result);
    }
}
```

### 입력:

```
7
```

### 출력:

```
9
```

---

## 12. 재귀함수를 이용한 최소공배수

=> n개의 수가 주어졌을 때 이 수들의 최소공배수를 구하는 프로그램(재귀 함수)

조건: 1 ≤ n ≤ 10 / 1 ≤ 원소의 범위 ≤ 10

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
        
        int result = lcmArray(arr, n);
        System.out.println(result);
    }

    // 최대 공약수 계산
    public static int gcd(int a, int b) {
        if (b == 0) {
            return a;
        }
        return gcd(b, a % b);
    }

    // 최소 공배수 계산
    public static int lcm(int a, int b) {
        return (a * b) / gcd(a, b);
    }

    // 배열의 최소 공배수 계산
    public static int lcmArray(int[] arr, int n) {
        if (n == 1) {
            return arr[0];
        }
        return lcm(arr[n - 1], lcmArray(arr, n - 1));
    }
}
```

### 입력:

```
6
1 5 7 9 2 6
```

### 출력:

```
630
```

---

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/sum-from-1-to-a-certain-number-2?&utm_source=clipboard&utm_medium=text)
