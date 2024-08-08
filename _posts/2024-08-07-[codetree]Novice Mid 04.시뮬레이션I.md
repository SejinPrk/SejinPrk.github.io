---
layout: post
title: "[Code Tree - Novice Mid] 04-3. 시뮬레이션 I: 구간 칠하기"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-08-07
last_modified_at: 2024-08-08
---

JAVA 문법으로 작성함.

# Novice Mid: 04. 시뮬레이션 I

# 3. 구간 칠하기

## 1. 블럭쌓는 명령2
 
=> 1 ~ N번째 칸까지 순서대로 총 N개의 칸이 있고 이 중 Ai번째 칸부터 Bi번째 칸까지 각각 블럭을 1씩 쌓으라는 명령이 총 K번 주어질 때, 명령을 다 수행한 이후 1번 칸부터 N번 칸까지 쌓인 블럭의 수 중 최댓값을 출력하는 프로그램

조건: 1 ≤ i ≤ K / 1 ≤ N ≤ 100 / 1 ≤ K ≤ 100 / 1 ≤ Ai ≤ Bi	≤ N

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] blocks = new int[n + 1]; // 1번 칸부터 시작하므로 n + 1 크기로 생성

        for (int i = 1; i <= k; i++) {
            int a = sc.nextInt();
            int b = sc.nextInt();

            for (int j = a; j <= b; j++) {
                blocks[j]++;
            }
        }

        int maxBlocks = 0; // 최대 블록 수
        
        for (int i = 1; i <= n; i++) {
            if (blocks[i] > maxBlocks) {
                maxBlocks = blocks[i];
            }
        }

        System.out.println(maxBlocks);
        sc.close();
    }
}
```

### 입력:

```
7 4
5 5
2 4
4 6
3 5
```

### 출력:

```
3
```

---

## 2. 최대로 겹치는 구간

=> 1차원 직선 상에 n개의 선분이 놓여 있을 때 가장 많이 겹치는 구간에서는, 몇 개의 선분이 겹치는지를 구하는 프로그램

- 끝점에서 닿는 경우는 겹치는 것으로 생각하지 않음.

조건: 2 ≤ n ≤ 100 / -100 ≤ x1 < x2 ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        final int OFFSET = 100; // -100에서 100까지 설정: 모든 좌표를 양수로 변환
        int[] line = new int[201]; // 0에서 200까지

        // n개의 선분 처리
        for (int i = 0; i < n; i++) {
            int x1 = sc.nextInt() + OFFSET;
            int x2 = sc.nextInt() + OFFSET;

            line[x1]++; // 시작점에서 +1
            line[x2]--; // 끝점 다음에서 -1
        }

        int maxOverlap = 0; // 최대 겹치는 횟수
        int currOverlap = 0; 
        for (int i = 0; i <= 200; i++) {
            currOverlap += line[i];
            maxOverlap = Math.max(maxOverlap, currOverlap);
        }

        System.out.println(maxOverlap);
        sc.close();
    }
}
```

### 입력:

```
3
1 5 
4 6
2 4
```

### 출력:

```
2
```

---

## 3. 최대로 겹치는 지점

=> 1차원 직선 상에 n개의 선분이 놓여 있을 때, 가장 많이 겹치는 곳에서는 몇 개의 선분이 겹치는지를 구하는 프로그램

조건: 2 ≤ n ≤ 100 / 1 ≤ x1 < x2 ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        final int OFFSET = 100; // -100에서 100까지 설정: 모든 좌표를 양수로 변환
        int[] line = new int[202]; // 0에서 201(끝점 다음 인덱스)까지

        // n개의 선분 처리
        for (int i = 0; i < n; i++) {
            int x1 = sc.nextInt() + OFFSET;
            int x2 = sc.nextInt() + OFFSET;

            line[x1]++; // 시작점에서 +1
            line[x2 + 1]--; // 끝점 다음에서 -1 (끝점 포함)
        }

        int maxOverlap = 0; // 최대 겹치는 횟수
        int currOverlap = 0; 
        for (int i = 0; i <= 201; i++) {
            currOverlap += line[i];
            maxOverlap = Math.max(maxOverlap, currOverlap);
        }

        System.out.println(maxOverlap);
        sc.close();
    }
}
```

### 입력:

```
3
1 5 
4 6
2 4
```

### 출력:

```
3
```

---

## 4. 왔다 갔던 구역 2

=> 위치 0에서 시작하여 n번의 명령에 걸쳐 움직인 뒤, 2번 이상 지나간 영역의 크기를 출력하는 프로그램

- 명령은 “x L“, “x R” 형태로 주어짐
- "x L" 의 경우 왼쪽으로 x만큼 이동, "x R"의 경우 오른쪽으로 x만큼 이동함을 의미

조건: 1 ≤ n ≤ 100 / 1 ≤ x ≤ 10

### 코드:

```java
import java.util.Scanner;

public class Main {    
    public static final int OFFSET = 1000;  // 음수를 피하기 위한 OFFSET
    public static final int MAX_R = 2000;   // 최대 배열 크기 (OFFSET*2)
    public static final int MAX_N = 100;    // 최대 명령 수
    
    public static int n;  // 명령 수
    public static int[] x1 = new int[MAX_N]; // 각 명령의 시작점
    public static int[] x2 = new int[MAX_N]; // 각 명령의 끝점
    
    public static int[] checked = new int[MAX_R + 1]; // 방문 횟수 기록 배열

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 명령 수 입력
        n = sc.nextInt();
        
        // 현재 위치 초기화
        int cur = 0;
        
        for(int i = 0; i < n; i++) {
            int distance = sc.nextInt();  // 이동 거리
            char direction = sc.next().charAt(0); // 이동 방향 (L 또는 R)
            
            if(direction == 'L') {
                // 왼쪽으로 이동할 경우: cur - distance ~ cur까지 경로 이동
                x1[i] = cur - distance;
                x2[i] = cur;
                cur -= distance;
            } else {
                // 오른쪽으로 이동할 경우: cur ~ cur + distance까지 경로 이동
                x1[i] = cur;
                x2[i] = cur + distance;
                cur += distance;
            }
            
            // OFFSET을 더하여 배열 인덱스 음수 방지
            x1[i] += OFFSET;
            x2[i] += OFFSET;
        }
        
        // 각 구간을 칠하기 (x2[i]에는 등호가 들어가지 않음)
        for(int i = 0; i < n; i++)
            for(int j = x1[i]; j < x2[i]; j++)
                checked[j]++;
        
        // 2번 이상 지나간 영역의 크기 계산
        int cnt = 0;
        for(int i = 0; i <= MAX_R; i++)
            if(checked[i] >= 2)
                cnt++;
        
        // 결과 출력
        System.out.print(cnt);
    }
}
```

### 입력:

```
6
2 R
6 L
1 R
8 L
1 R
2 R
```

### 출력:

```
6
```

---

## 5. 흰검 칠하기

=> 일직선으로 무한히 나열된 타일이 있을 때 아무 타일에서 시작하여 n번의 명령에 걸쳐 움직이고 각 명령 이후에는 마지막으로 칠한 타일 위치에 서있는다고 가정함. 타일의 색은 덧칠해지면 마지막으로 칠해진 색으로 바뀌는데, 만약 타일 하나가 순서 상관없이 흰색과 검은색으로 각각 두 번 이상 칠해지면 회색으로 바뀌고 더 이상 바뀌지 않음. 
모든 명령을 실행한 뒤의 흰색, 검은색, 회색의 타일 수를 각각 출력하는 프로그램

- 명령은 "x L", "x R" 형태로만 주어짐
- "x L"의 경우 왼쪽으로 이동하면서 현재 위치 타일 포함 총 x칸의 타일을 흰색으로 연속하게 칠하고, "x R"의 경우 오른쪽으로 이동하면서 현재 위치 타일 포함 총 x칸의 타일을 검은색으로 연속하게 칠함.

조건: 1 ≤ n ≤ 1,000 / 1 ≤ x ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static final int MAX_K = 100000;
    
    // 변수 선언
    public static int n;
    public static int[] a = new int[2 * MAX_K + 1];
    public static int[] cntB = new int[2 * MAX_K + 1];
    public static int[] cntW = new int[2 * MAX_K + 1];
    public static int b, w, g;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 명령의 수 입력
        n = sc.nextInt();

        // 시작 위치 설정 (중앙)
        int cur = MAX_K;
        for (int i = 1; i <= n; i++) {
            int x = sc.nextInt();
            char c = sc.next().charAt(0);
            if (c == 'L') {
                // x칸 왼쪽으로 칠하기
                while (x-- > 0) {
                    a[cur] = 1; // 흰색
                    cntW[cur]++;
                    if (x > 0) cur--;
                }
            } else {
                // x칸 오른쪽으로 칠하기
                while (x-- > 0) {
                    a[cur] = 2; // 검은색
                    cntB[cur]++;
                    if (x > 0) cur++;
                }
            }
        }

        // 타일의 색상 결정
        for (int i = 0; i <= 2 * MAX_K; i++) {
            // 검은색과 흰색으로 두 번 이상 칠해진 타일은 회색
            if (cntB[i] >= 2 && cntW[i] >= 2) g++;
            // 현재 색 == 타일의 색
            else if (a[i] == 1) w++;
            else if (a[i] == 2) b++;
        }

        System.out.print(w + " " + b + " " + g);
    }
}
```

### 입력:

```
4
4 R
5 L
7 R
4 L
```

### 출력:

```
2 3 2
```

---

## 6. 신기한 타일 뒤집기

=> 일직선으로 무한히 나열된 회색 타일이 있을 때, (현재 타일의 색이 어떤 색인지와는 상관없이) 왼쪽으로 뒤집으면 흰색으로 바뀌고, 오른쪽으로 뒤집으면 검은색으로 바뀜. 아무 타일에서 시작하여 n번의 명령에 걸쳐 움직일 때, 각 명령 이후에는 마지막으로 뒤집은 타일 위치에 서있는다고 가정함.
모든 명령을 실행한 뒤의 흰색, 검은색 타일 수를 각각 출력하는 프로그램

- 명령은 "x L", "x R" 형태로만 주어짐.
- "x L"의 경우 왼쪽으로 이동하며 순서대로 현재 위치 타일포함 총 x칸의 타일을 왼쪽으로 뒤집고, "x R"의 경우 오른쪽으로 이동하며 순서대로 현재 위치 타일포함 총 x칸의 타일을 오른쪽으로 뒤집음.

조건: 1 ≤ n ≤ 1000 / 1 ≤ x ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static final int MAX_K = 100000;
    // 변수 선언
    public static int n;
    public static int[] tiles = new int[2 * MAX_K + 1]; // 0: 회색, 1: 흰색, 2: 검은색
    public static int white, black;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // 명령의 수 입력
        n = sc.nextInt();
        
        // 시작 위치 설정 (중앙)
        int cur = MAX_K;
        
        for (int i = 1; i <= n; i++) {
            int x = sc.nextInt();
            char c = sc.next().charAt(0);
            
            if (c == 'L') {
                // x칸 왼쪽으로 뒤집기
                while (x-- > 0) {
                    tiles[cur] = 1; // 흰색
                    if (x > 0) cur--;
                }
            } else {
                // x칸 오른쪽으로 뒤집기
                while (x-- > 0) {
                    tiles[cur] = 2; // 검은색
                    if (x > 0) cur++;
                }
            }
        }
        
        // 타일의 색상 계산
        for (int i = 0; i <= 2 * MAX_K; i++) {
            if (tiles[i] == 1) white++;
            else if (tiles[i] == 2) black++;
        }
        
        System.out.print(white + " " + black);
    }
}
```

### 입력:

```
4
4 R
5 L
7 R
4 L
```

### 출력:

```
4 3
```

### 입력:

```
2
10 R
11 L
```

### 출력:

```
11 0
```
---

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/block-stacking-commands2?&utm_source=clipboard&utm_medium=text)
