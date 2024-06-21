---
layout: post
title: "[Code Tree - Novice Mid] 01-2. 함수: 값을 반환하는 함수 - 1"
excerpt: "코드트리 문제 풀이 - JAVA"

categories:
  - Blog
tags:
  - [CodeTree]

toc: true
toc_sticky: true

date: 2024-06-11
last_modified_at: 2024-06-16
---

JAVA 문법으로 작성함.

# Novice Mid: 01. 함수 - 1

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

## 2. 정수의 최솟값

#### => 세 정수 a, b, c가 주어지면 그 수를 전달받아 최솟값을 구하여 출력하는 프로그램

#### 조건: -100 ≤ a, b, c ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int minN(int a, int b, int c) {
       int min = a;
        if (b < min) {
            min = b;
        }
        if (c < min) {
            min = c;
        }
        return min;
    }


    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();

        System.out.println(minN(a, b, c));
    }
}
```

### 입력:

```
-17 38 0
```

### 출력:

```
-17
```

## 3. 짝수이면서 합이 5인 배수인 수

#### => 2자리 숫자 n이 주어졌을 때, n이 짝수이면서 각 자리 숫자의 합이 5의 배수이면 "Yes"를, 아니라면 "No"를 출력하는 프로그램

#### 조건: 9 < n < 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void isMagicNumber(int n) {
        if (((n / 10) + n % 10) % 5 == 0 && n % 2 == 0) {
                System.out.println("Yes");
        } else {
            System.out.println("No");
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        isMagicNumber(n);
    }
}
```

### 입력:

```
28
```

### 출력:

```
Yes
```

## 4. 함수를 이용한 369 게임

#### => 정수 a이상 b이하 수들 중 3, 6, 9 중에 하나가 들어가 있거나 그 숫자 자체가 3의 배수인 숫자의 개수를 세는 프로그램

#### 조건: 1 ≤ a ≤ b ≤ 1,000,000

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static boolean contains369(int i) {
        String str = Integer.toString(i);
        return str.contains("3") || str.contains("6") || str.contains("9");
    }

    public static int count369Multiples(int a, int b) {
        int cnt = 0;
            for(int i = a; i <= b; i++) {
                if(contains369(i) || i % 3 == 0)
                    cnt++;
            }
        return cnt;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();

        int result = count369Multiples(a, b);

        System.out.println(result);
    }
}
```

### 입력:

```
22 33
```

### 출력:

```
9
```

#### 5. 함수를 이용한 소수 판별

#### => 정수 a이상 b이하 소수들의 합을 구해주는 프로그램

#### 조건: 1 ≤ a ≤ b ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    // 소수 판별 함수
    public static boolean isPrime(int num) {
        if (num < 2) {
            return false;
        }
        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    // 소수의 합을 계산하는 함수
    public static int addPrime(int a, int b) {
        int sum = 0;
        for (int i = a; i <= b; i++) {
            if (isPrime(i)) {
                sum += i;
            }
        }
        return sum;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        System.out.println(addPrime(a, b));
    }
}
```

### 입력:

```
5 19
```

### 출력:

```
72
```

#### 6. 함수를 이용한 윤년 판별

#### => y년이 윤년인지를 판단하는 프로그램

#### 조건: 1 ≤ y ≤ 2021

#### 풀이: 윤년의 조건: 4로 나누어 떨어지는 해. 예외적으로 100으로 나누어 떨어지면서 400으로 나누어 떨어지지 않는 해는 평년이다.

### 코드:

```java
import java.util.Scanner;

public class Main {
    // 윤년을 구하는 함수
    public static boolean isLeapYear(int y) {
        if(y % 4 == 0) {
            if (y % 100 == 0 && y % 400 != 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int y = sc.nextInt();

       if(isLeapYear(y)) {
        System.out.println("true");
       } else {
        System.out.println("false");
       }
    }
}

```

### 입력:

```
2020
```

### 출력:

```
true
```

#### 7. 두 수의 거듭제곱

#### => 두 정수 a^b의 값을 출력하는 프로그램

#### 조건: 1 ≤ a, b ≤ 10

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static int multiply(int a, int b) {
        int result = 1;

        for (int i = 0; i < b; i++) {
            result *= a;
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        System.out.println(multiply(a, b));
    }
}
```

### 입력:

```
3 4
```

### 출력:

```
81
```

#### 8. 사칙연산 함수

#### => 각 사칙연산에 해당하는 총 4개의 함수를 작성하고 정수의 연산식이 주어지면 적절한 함수를 호출하여 4칙연산의 연산결과를 출력하는 프로그램

#### 단, '/'의 결과는 정수 부분만 출력하고, 사칙연산자 이외의 문자가 주어지는 경우에는 False을 출력

#### 조건: 1 ≤ a, c ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        char o = sc.next().charAt(0);
        int c = sc.nextInt();

        int result = Calculator(a, o, c);

        if(result != Integer.MIN_VALUE) {
            System.out.println(a + " " + o + " " + c + " = " + result);
        } else {
            System.out.println("False");
        }
    }

    // 사칙연산을 계산하는 함수
    public static int Calculator(int a, int o, int c) {
        switch (o) {
            case '+':
                return add(a, c);
            case '-' :
                return sub(a, c);
            case '*' :
                return mul(a, c);
            case '/' :
                return div(a, c);
            default:
                return Integer.MIN_VALUE;
        }
    }

    public static int add(int a, int c) {
        return a + c;
    }

    public static int sub(int a, int c) {
        return a - c;
    }

    public static int mul(int a, int c) {
        return a * c;
    }

    public static int div(int a, int c) {
        if (c == 0) {
            return Integer.MIN_VALUE;
        }
        return a / c;
    }
}
```

### 입력:

```
10 * 3
```

### 출력:

```
10 * 3 = 30
```

### 입력:

```
5 ^ 4
```

### 출력:

```
False
```

### 링크:[코드트리](https://www.codetree.ai/missions/5/problems/sum-from-1-to-a-certain-number?&utm_source=clipboard&utm_medium=text)
