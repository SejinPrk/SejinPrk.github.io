---
layout: post
title: "[Code Tree - Novice Mid] 03-1. 정렬: 일반 정렬"
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

# Novice Mid: 03. 정렬 - 1

# 일반 정렬

## 1. 오름 내림차순 정렬
 
=> n개의 원소가 주어졌을 때, 처음에는 오름차순으로 정렬하여 출력하고, 그 다음에는 내림차순으로 정렬하여 출력하는 프로그램

조건: 1 ≤ n ≤ 100 / 1 ≤ 원소 값 ≤ 100

### 코드:

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n]; 

        for (int i = 0; i < n; i++)
            arr[i] = sc.nextInt();

        Arrays.sort(arr, 0, n);
        for(int i = 0; i < n; i++) 
            System.out.print(arr[i] + " ");
        System.out.println();

        Integer[] arr2 = Arrays.stream(arr).boxed().toArray(Integer[]::new);
        Arrays.sort(arr2, Collections.reverseOrder());

        for(int i = 0; i < n; i++) 
            System.out.print(arr2[i] + " ");
    }
}
```

### 입력:

```
5
3 8 17 5 6
```

### 출력:

```
3 5 6 8 17
17 8 6 5 3
```

---

## 2. 문자열 정렬

=> 소문자 알파벳으로만 이루어진 문자열이 하나 주어졌을 때, 알파벳이 앞선 것이 더 먼저 나오도록 정렬하여 출력하는 프로그램

조건: 1 ≤ 문자열 길이 ≤ 100

### 코드:

```java
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();
        // 입력받은 문자열을 문자 배열로 전환
        char[] charArray = input.toCharArray();

        // 문자 배열을 정렬
        Arrays.sort(charArray);
        
        // 정렬된 문자 배열을 문자열로 변환
        String sortedString = new String(charArray);
        System.out.println(sortedString);
    }
}
```

### 입력:

```
ababccaa
```

### 출력:

```
aaaabbcc
```

---

## 3. 단어 정렬

=> 소문자 알파벳으로만 이루어져 있는 단어가 n개 주어졌을 때, 사전순으로 앞선 알파벳이 더 먼저 나오도록 정렬하여 출력하는 프로그램

조건: 1 ≤ n ≤ 100 / 1 ≤ 단어의 길이 ≤ 100

### 코드:

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        // 개행 문자 처리
        sc.nextLine();
        
        String[] words = new String[n];

        for (int i = 0; i < n; i++) {
            words[i] = sc.nextLine();
        }  
        // 단어들을 사전순으로 정렬
        Arrays.sort(words);
        
        // 정렬된 단어들 출력
        for (String word : words) {
            System.out.println(word);
        }
        
    }
}
```

### 입력:

```
7
aba
a
cf
ab
ba
bd
ad
```

### 출력:

```
a
ab
aba
ad
ba
bd
cf
```

---

## 4. Top k 숫자 구하기

=> N개의 숫자가 주어졌을 때, 오름차순으로 정렬했을 때 k번째 숫자를 출력하는 프로그램

조건: 1 ≤ k ≤ N ≤ 1,000 / 1 ≤ 원소 ≤ 1,000

### 코드:

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] nums = new int[n];

        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }  
        Arrays.sort(nums);
        
        System.out.println(nums[k-1]);
    }
}
```

### 입력:

```
4 3
1 5 4 2
```

### 출력:

```
4
```

---

## 5. 두 개의 동일한 수열

=> n개의 원소로 이루어진 수열 A와 n개의 원소로 이루어진 수열 B가 주어졌을 때, 두 수열이 서로 같은 원소들로 이루어져 있는지를 판단하는 프로그램

조건: 1 ≤ n ≤ 100 / 1 ≤ 원소 값 ≤ 100

### 코드:

```java
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        int[] A = new int[n];
        for (int i = 0; i < n; i++) {
            A[i] = sc.nextInt();
        }

        int[] B = new int[n];
        for (int i = 0; i < n; i++) {
            B[i] = sc.nextInt();
        }

        Arrays.sort(A);
        Arrays.sort(B);

        // 두 수열 비교
        if (Arrays.equals(A, B)) {
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
3
1 2 3
3 1 2
```

### 출력:

```
Yes
```

### 입력:

```
3
1 2 5
3 1 2
```

### 출력:

```
No
```

---

## 6. 2개씩 그룹짓기

=> 2 * N개의 숫자가 주어졌을 때, 겹치지 않으면서 2개의 원소가 하나의 그룹을 이루도록 하여 총 N개의 그룹을 만들어 각 그룹에 있는 원소의 합 중 최댓값이 최소가 되도록 하는 프로그램

조건: 1 ≤ N ≤ 1,000 / 1 ≤ 원소 ≤ 1,000

### 코드:

```java
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 그룹의 수 N
        int N = sc.nextInt();
        
        // 2 * N개의 숫자
        int[] numbers = new int[2 * N];
        for (int i = 0; i < 2 * N; i++) {
            numbers[i] = sc.nextInt();
        }
        
        // 숫자들을 오름차순으로 정렬
        Arrays.sort(numbers);
        
        // 그룹을 만들어 각 그룹의 합 중 최댓값을 찾음
        int maxGroupSum = 0;
        for (int i = 0; i < N; i++) {
            int groupSum = numbers[i] + numbers[2 * N - 1 - i];
            if (groupSum > maxGroupSum) {
                maxGroupSum = groupSum;
            }
        }
        
        // 결과 출력
        System.out.println(maxGroupSum);
        
        sc.close();
    }
}
```

### 입력:

```
2
3 5 5 2
```

### 출력:

```
8
```

---
## 7. 순서를 바꾸었을 때 같은 단어인지 판별하기

=> 두 개의 단어가 입력으로 주어질 때 두 단어에 속하는 문자들의 순서를 바꾸어 동일한 단어로 만들 수 있는지 여부를 출력하는 프로그램

조건: 1 ≤ 단어의 길이(n) ≤ 100,000 / 각 단어는 대소문자 알파벳과 숫자로만 이루어져 있음

### 코드:

```java
import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str1 = sc.next();
        String str2 = sc.next();

        char[] chars1 = str1.toCharArray();
        Arrays.sort(chars1);
        String sortedStr1 = new String(chars1);

        char[] chars2 = str2.toCharArray();
        Arrays.sort(chars2);
        String sortedStr2 = new String(chars2); 

        if(sortedStr1.equals(sortedStr2))
            System.out.print("Yes");
        else
            System.out.print("No");
    }
}
```

### 입력:

```
aba
aab
```

### 출력:

```
Yes
```

---

## 8. k번째로 신기한 문자열

=> 단어가 n개 주어졌을 때, 문자열 T로 시작하는 단어들 중 사전순으로 정렬했을 때의 k번째 문자열을 출력하는 프로그램

조건: 1 ≤ n ≤ 100 / 1 ≤ k ≤ n / 1 ≤ 문자열 T의 길이 ≤ 100 / 1 ≤ 주어지는 각 단어의 길이 (L) ≤ 100

### 코드:

```java
import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        String T = sc.next();
        String[] words = new String[n]; // 단어들을 저장할 배열

        for (int i = 0; i < n; i++) {
            words[i] = sc.next(); // 단어 입력 받기
        }
        
        List<String> startsWithT = new ArrayList<>();
        for (String word : words) {
            if (word.startsWith(T)) {
                startsWithT.add(word);
            }
        }
        
        // 사전순으로 정렬
        Collections.sort(startsWithT);

        // k번째 단어 출력
        if (k > 0 && k <= startsWithT.size()) {
            System.out.println(startsWithT.get(k - 1));
        }
    }
}
```

### 입력:

```
7 3 ap
apple
appreciate
banana
appearance
app
candy
abracadabra
```

### 출력:

```
apple
```

---

## 9. 중앙값 계산 2

=> n개의 숫자가 주어졌을 때, 순서대로 숫자를 읽다가 홀수 번째의 원소가 주어질 때마다 지금까지 입력받은 값의 중앙값을 출력하는 프로그램

조건: 1 ≤ n ≤ 100, n은 홀수 / 0 ≤ 주어지는 숫자 ≤ 100,000

### 코드:

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner (System.in);
        int n = sc.nextInt();
        List<Integer> nums = new ArrayList<>();
        List<Integer> medians = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            int num = sc.nextInt();
            nums.add(num);

            if(i % 2 == 0) {
                List<Integer> currentNums = new ArrayList<>(nums);
                Collections.sort(currentNums);
                int median = currentNums.get(i / 2);
                medians.add(median);
            }
        }

        for (int median : medians) {
            System.out.print(median + " ");
        }
    }
}
```

### 입력:

```
5
1 2 3 4 5

```

### 출력:

```
1 2 3
```

---

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/inc-dec-sorting?&utm_source=clipboard&utm_medium=text)
