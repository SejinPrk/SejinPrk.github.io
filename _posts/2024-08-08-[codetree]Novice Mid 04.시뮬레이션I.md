---
layout: post
title: "[Code Tree - Novice Mid] 04-4. 시뮬레이션 I: 사각형 칠하기"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-08-08
last_modified_at: 2024-08-08
---

JAVA 문법으로 작성함.

# Novice Mid: 04. 시뮬레이션 I

# 4. 사각형 칠하기

## 1. 사각형의 총 넓이 2
 
=> 2차 평면 위에 N개의 직사각형이 주어질 때 이 직사각형들이 만들어내는 총 넓이를 구하는 프로그램

조건: 1 ≤ N ≤ 10 / -100 ≤ x1 < x2 ≤ 100 / -100 ≤ y1 < y2 ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static final int MAX_N = 10;
    public static final int MAX_R = 200;
    public static final int OFFSET = 100;

    public static int n;
    public static int[] x1 = new int[MAX_N];
    public static int[] y1 = new int[MAX_N];
    public static int[] x2 = new int[MAX_N];
    public static int[] y2 = new int[MAX_N];

    public static int[][] checked = new int[MAX_R + 1][MAX_R + 1];

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // 입력
        n = sc.nextInt();

        for(int i = 0; i < n; i++) {
            x1[i] = sc.nextInt();
            y1[i] = sc.nextInt();
            x2[i] = sc.nextInt();
            y2[i] = sc.nextInt();

            // OFFSET을 더해줍니다.
            x1[i] += OFFSET;
            y1[i] += OFFSET;
            x2[i] += OFFSET;
            y2[i] += OFFSET;
        }

        // 직사각형을 칠해줍니다.
        // 격자 단위로 진행하는 문제이므로
        // x2, y2에 등호가 들어가지 않음에 유의합니다.
        for(int i = 0; i < n; i++)
            for(int x = x1[i]; x < x2[i]; x++)
                for(int y = y1[i]; y < y2[i]; y++)
                    checked[x][y]++;
        
        // 직사각형 넓이의 총 합을 구합니다.
        int area = 0;
        for(int x = 0; x <= MAX_R; x++)
            for(int y = 0; y <= MAX_R; y++)
                if(checked[x][y] > 0)
                    area++;
        
        // 출력
        System.out.print(area);
    }
}
```

### 입력:

```
2
0 1 4 5
2 2 6 4
```

### 출력:

```
20
```

---

## 2. 겹치지 않는 사각형의 넓이

=> 좌표평면위에 직사각형 A, B를 먼저 붙이고 그 위에 직사각형 M을 붙였을 때, 아직 남아있는 (M으로 덮이지 못한) 직사각형 A, B의 넓이의 합을 구하는 프로그램

- A, B는 겹치지 않게 주어진다고 가정

조건: -1,000 ≤ x1 < x2 ≤ 1,000 / -1,000 ≤ y1 < y2 ≤ 1,000

### 코드:

```java
import java.util.Scanner;

public class Main {
    private static final int OFFSET = 1000;
    private static final int SIZE = 2001; // -1000 ~ 1000, plus OFFSET

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[][] grid = new int[SIZE][SIZE];

        // 직사각형 A 입력 및 그리기
        int ax1 = scanner.nextInt() + OFFSET;
        int ay1 = scanner.nextInt() + OFFSET;
        int ax2 = scanner.nextInt() + OFFSET;
        int ay2 = scanner.nextInt() + OFFSET;
        drawRectangle(grid, ax1, ay1, ax2, ay2, 1);

        // 직사각형 B 입력 및 그리기
        int bx1 = scanner.nextInt() + OFFSET;
        int by1 = scanner.nextInt() + OFFSET;
        int bx2 = scanner.nextInt() + OFFSET;
        int by2 = scanner.nextInt() + OFFSET;
        drawRectangle(grid, bx1, by1, bx2, by2, 1);

        // 직사각형 M 입력 및 그리기 (덮어쓰기)
        int mx1 = scanner.nextInt() + OFFSET;
        int my1 = scanner.nextInt() + OFFSET;
        int mx2 = scanner.nextInt() + OFFSET;
        int my2 = scanner.nextInt() + OFFSET;
        drawRectangle(grid, mx1, my1, mx2, my2, 0);

        // 남은 넓이 계산
        int remainingArea = countRemainingArea(grid);

        System.out.println(remainingArea);
        scanner.close();
    }

    private static void drawRectangle(int[][] grid, int x1, int y1, int x2, int y2, int value) {
        for (int i = x1; i < x2; i++) {
            for (int j = y1; j < y2; j++) {
                grid[i][j] = value;
            }
        }
    }

    private static int countRemainingArea(int[][] grid) {
        int count = 0;
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (grid[i][j] == 1) {
                    count++;
                }
            }
        }
        return count;
    }
}
```

### 입력:

```
1 2 3 5
6 0 10 4
2 1 8 3
```

### 출력:

```
17
```

---

## 3. 색종이의 총 넓이

=> 좌표평면위에 가로세로 길이가 8이고 넓이가 64인 색종이를 N장 입력받아 각 좌측하단의 꼭지점이 주어지면 모든 색종이가 붙여진 이후의 총 넓이를 구하는 프로그램

- 좌표평면위에서 (-100, -100)을 좌측하단으로 (100, 100)을 우측상단으로 하는 정사각형 범위를 벗어나지 않음

조건: 1 ≤ N ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    private static final int OFFSET = 100;
    private static final int SIZE = 201; // -100 ~ 100 + OFFSET
    private static final int PAPER_SIZE = 8;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        boolean[][] grid = new boolean[SIZE][SIZE];
        int N = sc.nextInt();

        for (int i = 0; i < N; i++) {
            int x = sc.nextInt() + OFFSET;
            int y = sc.nextInt() + OFFSET;
            fillPaper(grid, x, y); //  각 색종이의 영역을 true로 채운다.
        }

        int totalArea = countArea(grid); //  grid에서 true로 표시된 칸의 개수를 세어 총 넓이를 계산
        System.out.println(totalArea);

        sc.close();
    }

    private static void fillPaper(boolean[][] grid, int x, int y) {
        for (int i = x; i < x + PAPER_SIZE; i++) {
            for (int j = y; j < y + PAPER_SIZE; j++) {
                grid[i][j] = true;
            }
        }
    }

    private static int countArea(boolean[][] grid) {
        int cnt = 0;
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (grid[i][j]) {
                    cnt++;
                }
            }
        }
        return cnt;
    }
}
```

### 입력:

```
3
0 0
4 0
0 4
```

### 출력:

```
128
```

---

## 4. 잔해물을 덮기 위한 사각형의 최소 넓이

=> 첫 번째 직사각형이 먼저 놓여 있고, 두 번째 직사각형이 그 다음 놓아졌을 때 그 이후에 남아있는 첫 번째 직사각형의 잔해물을 덮기 위한 최소 직사각형의 넓이를 구하는 프로그램

조건: -1,000 ≤ x1 < x2 ≤ 1,000 / -1,000 ≤ y1 < y2 ≤ 1,000

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static final int OFFSET = 1000;
    public static final int MAX_R = 2000;
    public static final int N = 2;
    
    public static int[] x1 = new int[N];
    public static int[] y1 = new int[N];
    public static int[] x2 = new int[N];
    public static int[] y2 = new int[N];
    
    public static int[][] checked = new int[MAX_R + 1][MAX_R + 1];

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 입력
        for(int i = 0; i < N; i++) {
            x1[i] = sc.nextInt();
            y1[i] = sc.nextInt();
            x2[i] = sc.nextInt();
            y2[i] = sc.nextInt();
            
            // OFFSET을 더해줍니다.
            x1[i] += OFFSET;
            y1[i] += OFFSET;
            x2[i] += OFFSET;
            y2[i] += OFFSET;
        }
        
        // 직사각형에 주어진 순으로 1, 2 번호를 붙여줍니다.
        // 격자 단위로 진행하는 문제이므로
        // x2, y2에 등호가 들어가지 않음에 유의합니다.
        for(int i = 0; i < N; i++)
            for(int x = x1[i]; x < x2[i]; x++)
                for(int y = y1[i]; y < y2[i]; y++)
                    checked[x][y] = i + 1;
        
        // 1, 2 순으로 붙였는데도
        // 아직 숫자 1로 남아있는 곳들 중 최대 최소 x, y 값을 전부 계산합니다.
        int minX = MAX_R, maxX = 0, minY = MAX_R, maxY = 0;
        boolean firstRectExist = false;
        for(int x = 0; x <= MAX_R; x++)
            for(int y = 0; y <= MAX_R; y++)
                if(checked[x][y] == 1) {
                    firstRectExist = true;
                    minX = Math.min(minX, x);
                    maxX = Math.max(maxX, x);
                    minY = Math.min(minY, y);
                    maxY = Math.max(maxY, y);
                }
        
        // 넓이를 계산합니다.
        int area;
        // Case 1. 첫 번째 직사각형이 전혀 남아있지 않다면 넓이는 0입니다.
        if(!firstRectExist)
            area = 0;
        // Case 2. 첫 번째 직사각형이 남아있다면, 넓이를 계산합니다.
        else
            area = (maxX - minX + 1) * (maxY - minY + 1);

        System.out.print(area);
    }
}
```

### 입력:

```
2 1 7 4
5 -1 10 3
```

### 출력:

```
15
```

---

## 5. 계속 중첩되는 사각형

=> 좌표평면위에 총 n개의 직사각형이 주어질 때 파란색 영역의 총 넓이를 구하는 프로그램

- 처음에 주어지는 직사각형은 빨간색이고, 그 다음에 주어지는 직사각형은 파란색
- 이와 같이 빨간색, 파란색 순으로 번갈아 가며 주어지고, 겹치는 위치가 있다면 가장 마지막에 덮힌 색으로 취급함.

조건: 1 ≤ n ≤ 10 / -100 ≤ x1 < x2 ≤ 100 / -100 ≤ y1 < y2 ≤ 100

### 코드:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int[][] rectangles = new int[n][4];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < 4; j++) {
                rectangles[i][j] = scanner.nextInt();
            }
        }

        int result = calculateBlueArea(n, rectangles);
        System.out.println(result);

        scanner.close();
    }

    public static int calculateBlueArea(int n, int[][] rectangles) {
        int[][] grid = new int[201][201];

        for (int i = 0; i < n; i++) {
            int color = i % 2 + 1; // 1: 빨간색, 2: 파란색
            int x1 = rectangles[i][0] + 100;
            int y1 = rectangles[i][1] + 100;
            int x2 = rectangles[i][2] + 100;
            int y2 = rectangles[i][3] + 100;

            for (int x = x1; x < x2; x++) {
                for (int y = y1; y < y2; y++) {
                    grid[x][y] = color;
                }
            }
        }

        int blueArea = 0;
        for (int[] row : grid) {
            for (int cell : row) {
                if (cell == 2) {
                    blueArea++;
                }
            }
        }

        return blueArea;
    }
}
```

### 입력:

```
2
2 1 7 4
5 -1 10 3
```

### 출력:

```
20
```

---


### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/total-width-of-a-rectangle2?&utm_source=clipboard&utm_medium=text)
