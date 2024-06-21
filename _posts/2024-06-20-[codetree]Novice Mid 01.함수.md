---
layout: post
title: "[Code Tree - Novice Mid] 01-2. 함수: 값을 반환하는 함수 - 2"
excerpt: "코드트리 문제 풀이 - JAVA"

categories:
  - Blog
tags:
  - [CodeTree]

toc: true
toc_sticky: true

date: 2024-06-20
last_modified_at: 2024-06-20
---

JAVA 문법으로 작성함. (너무 글이 길어져서 2편으로 나눴다. )

# Novice Mid: 01. 함수 - 2

# 값을 반환하는 함수

## 9. 함수를 이용한 온전수 판별

=> 정수 a와 b가 주어지면, a이상 b이하 온전수의 개수를 세는 프로그램

온전수란?
- 2로 나누어 떨어지는 경우
- 일의 자리가 5인 경우
- 3으로 나누어 떨어지면서 9로는 나누어 떨어지지 않는 수

조건: 1 ≤ a ≤ b ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        System.out.println(WholeNumber(a, b));
    }

    // 온전수를 구하는 함수
    public static int WholeNumber(int a, int b) {
        int cnt = 0;
        for (int i = a; i <= b; i++) {
            if (i % 2 == 0 || i % 10 == 5 || (i % 3 == 0 && i % 9 != 0)) {
                continue;
            } else {
                cnt++;
            }
        }
        return cnt;
    }

}
```

### 입력:

```
20 30
```

### 출력:

```
3
```

## 10. 함수를 이용한 합과 소수 판별

=> 정수 a와 b가 주어지면, a이상 b이하 수 중 소수이면서 모든 자릿수의 합이 짝수인 수의 개수를 구하는 프로그램

조건: 1 ≤ a ≤ b ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        System.out.println(countSpecialPrimes(a, b));
    }

    // 소수이면서 모든 자릿수의 합이 짝수인 수의 개수를 구하는 함수
    public static int countSpecialPrimes(int a, int b) {
        int cnt = 0;

        for (int i = a; i <= b; i++) {
         if (isPrime(i) && isDigitSumEven(i)) {
                cnt++;
            }
        }
        return cnt;
    }

    // 소수 판별 함수
    public static boolean isPrime(int num) {
        if (num < 2) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    // 모든 자릿수의 합이 짝수인 수 판별 함수
    public static boolean isDigitSumEven(int num) {
        int sum = 0;
        while (num > 0) {
            sum += num % 10;
            num /= 10;
        }
        return sum % 2 == 0;
    }
}
}
```

### 입력:

```
10 30
```

### 출력:

```
4
```

## 11. 함수를 이용한 연속부분수열 여부 판단하기

=> n1개의 원소로 이루어져 있는 수열 A의 정보와, n2개의 원소로 이루어져 있는 수열 B의 정보가 주어졌을 때 수열 B가 수열 A의 연속부분수열인지를 판단하는 프로그램 : 수열 B가 수열 A의 연속부분수열이라면 Yes, 아니라면 No를 출력

연속부분수열이란? 수열 B가 수열 A의 원소들을 연속하게 뽑았을 때 나올 수 있는 수열

조건: 1 ≤ n1, n2 ≤ 100 / 1 ≤ 주어지는 원소 ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {

    // 수열 B가 수열 A의 연속부분수열인지를 판단하는 함수
    public static boolean isSubArray(int[] A, int[] B) {
        int n1 = A.length;
        int n2 = B.length;

        // B의 길이가 A보다 길면 B는 A의 연속부분수열이 될 수 없음
        if (n2 > n1) {
            return false;
        }

        // A의 모든 연속부분수열 확인
        for (int i = 0; i <= n1 - n2; i++) {
            boolean isSubArray = true;
            for (int j = 0; j < n2; j++) {
                if (A[i + j] != B[j]) {
                    isSubArray = false;
                    break;
                }
            }
            if (isSubArray) {
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // n1과 n2 입력
        int n1 = sc.nextInt();
        int n2 = sc.nextInt();

        // 배열 A 구성
        int[] A = new int[n1];
        for (int i = 0; i < n1; i++) {
            A[i] = sc.nextInt();
        }

        // 배열 B 구성
        int[] B = new int[n2];
        for (int i = 0; i < n2; i++) {
            B[i] = sc.nextInt();
        }

        // 결과 출력
        boolean result = isSubArray(A, B);
        if (result) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }

        sc.close();
    }
}
```

### 입력:

```
6 3
2 4 6 8 5 7
4 6 8
```

### 출력:

```
Yes
```

## 12. 2021년 날짜의 유무

=> 두 개의 정수 M과 D가 주어지면, 2021년의 날짜중 M월 D일이 존재하면 "Yes", 존재하지 않는다면 "No"를 출력하는 프로그램

참고: 2021년 2월은 28일까지이다.

조건: 1 ≤ M ≤ 20 / 1 ≤ D ≤ 50

### 코드:

```java
import java.util.Scanner;

public class Main {

    //  M월 D일이 존재하는지를 판단하는 함수
    public static String isValidDate(int M, int D) {
        // 각 달의 일수를 저장한 배열 (0번 인덱스는 사용하지 않음)
        int[] daysInMonth = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

        // M이 1 이상 12 이하인지 확인
        if (1 <= M && M <= 12) {
            // D가 해당 달의 일수 내에 있는지 확인
            if (1 <= D && D <= daysInMonth[M]) {
                return "Yes";
            } else {
                return "No";
            }
        } else {
            return "No";
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // M, D 입력
        int M = sc.nextInt();
        int D = sc.nextInt();

        // 결과 출력
        System.out.println(isValidDate(M, D));
        sc.close();
    }
}
```

### 입력:

```
8 15
```

### 출력:

```
Yes
```

### 입력:

```
2 31
```

### 출력:

```
No
```

## 13. 그 계절, 그 날

=> 연도, 월, 일이 차례로 3개의 정수 Y, M, D로 주어졌을 때, Y 해에 M월 D일이 존재한다면 어떤 계절인지를 출력하고, 만약 존재하지 않는다면 -1을 출력하는 프로그램

참고: 3~5월이 봄, 6~8월이 여름, 9~11월이 가을, 12~2월이 겨울이라 가정

조건: 1 ≤ Y ≤ 3,000 / 1 ≤ M ≤ 12 / 1 ≤ D ≤ 31

출력형식
- 봄: Spring
- 여름: Summer
- 가을: Fall
- 겨울: Winter

### 코드:

```java
import java.util.Scanner;

public class Main {

    // 윤년을 판별하는 함수
    public static boolean isLeapYear(int y) {
        if (y % 4 == 0) {
            if (y % 100 == 0) {
                if (y % 400 == 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    // 입력받은 연도, 월, 일에 따라 계절을 판별하는 함수
    public static int detectSeason(int y, int m, int d) {
        if (m < 1 || m > 12) {
            return -1; // 잘못된 월 입력
        }

        // 월별로 계절을 판별
        if (m >= 3 && m <= 5) {
            return 1; // 봄
        } else if (m >= 6 && m <= 8) {
            return 2; // 여름
        } else if (m >= 9 && m <= 11) {
            return 3; // 가을
        } else {
            return 4; // 겨울
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // 연도, 월, 일 입력
        int y = sc.nextInt();
        int m = sc.nextInt();
        int d = sc.nextInt();

        // 유효한 날짜인지 체크 (=> 윤년 여부에 따른 2월의 일 수 체크)
        boolean validDate = true;
        if (m == 2) {
            if (isLeapYear(y)) {
                if (d < 1 || d > 29) {
                    validDate = false;
                }
            } else {
                if (d < 1 || d > 28) {
                    validDate = false;
                }
            }
        } else if (m == 4 || m == 6 || m == 9 || m == 11) {
            if (d < 1 || d > 30) {
                validDate = false;
            }
        } else {
            if (d < 1 || d > 31) {
                validDate = false;
            }
        }

        if (!validDate) {
            System.out.println("-1"); // 잘못된 날짜 입력
        } else {
            int seasonCode = detectSeason(y, m, d);
            switch (seasonCode) {
                case 1:
                    System.out.println("Spring");
                    break;
                case 2:
                    System.out.println("Summer");
                    break;
                case 3:
                    System.out.println("Fall");
                    break;
                case 4:
                    System.out.println("Winter");
                    break;
                default:
                    System.out.println("-1"); // 이 부분은 실제로는 실행되지 않음
                    break;
            }
        }
    }
}

```

### 입력:

```
2020 2 29
```

### 출력:

```
Winter
```

### 링크:[코드트리](https://www.codetree.ai/missions/5/problems/determining-the-whole-number-using-a-function?&utm_source=clipboard&utm_medium=text)
