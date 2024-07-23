---
layout: post
title: "[Code Tree - Novice Mid] 03-3. 정렬: 객체 정렬"
excerpt: "코드트리 문제 풀이 - JAVA"
categories:
  - Blog
tags:
  - [CodeTree]
toc: true
toc_sticky: true
date: 2024-07-22
last_modified_at: 2024-07-23
---

JAVA 문법으로 작성함.

# Novice Mid: 03. 정렬 - 3

# 객체 정렬

## 1. 키를 기준으로 정렬

=> n명의 이름, 키, 몸무게가 주어지면 키를 기준으로 오름차순으로 정렬하여 출력하는 프로그램

조건: 1 ≤ n ≤ 10 / 1 ≤ 이름의 길이 ≤ 10 / 100 ≤ 키 ≤ 200 / 20 ≤ 몸무게 ≤ 100

### 코드:

```java
import java.util.*;
class Person implements Comparable<Person> {
    String name;
    int height;
    int weight;

    Person(String name, int height, int weight) {
        this.name = name;
        this.height = height;
        this.weight = weight;
    }

    @Override
    public int compareTo(Person other) {
        return this.height - other.height;
    }

    @Override
    public String toString() {
        return name + " " + height + " " + weight;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();

        List<Person> people = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            String[] input = sc.nextLine().split(" ");
            String name = input[0];
            int height = Integer.parseInt(input[1]);
            int weight = Integer.parseInt(input[2]);
            people.add(new Person(name, height, weight));
        }

        Collections.sort(people);

        for(Person person : people) {
            System.out.println(person);
        }

        sc.close();
    }
}
```

### 입력:

```
5
lee 167 40
kim 149 32
park 161 53
choi 183 70
jung 155 45
```

### 출력:

```
kim 149 32
jung 155 45
park 161 53
lee 167 40
choi 183 70
```

---

## 2. 국영수 순이지

=> n명인 학생 수의 이름과 국어, 영어, 수학 세 과목의 점수가 주어지면 국어, 영어, 수학 순서대로 우선순위로 하여 과목 점수가 높은 학생부터 출력하는 프로그램

조건: 1 ≤ n ≤ 10 / 1 ≤ 이름의 길이 ≤ 10 / 1 ≤ 점수 ≤ 100

### 코드:

```java
import java.util.*;
class Student implements Comparable<Student> {
    String name;
    int korean;
    int english;
    int math;

    Student(String name, int korean, int english, int math) {
        this.name = name;
        this.korean = korean;
        this.english = english;
        this.math = math;
    }

    @Override
    public int compareTo(Student other) {
        if (this.korean != other.korean) {
            return other.korean - this.korean;
        } else if (this.english != other.english) {
            return other.english - this.english;
        } else {
            return other.math - this.math;
        }
    }

    @Override
    public String toString() {
        return name + " " + korean + " " + english + " " + math;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();

        List<Student> students = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            String[] input = sc.nextLine().split(" ");
            String name = input[0];
            int korean = Integer.parseInt(input[1]);
            int english = Integer.parseInt(input[2]);
            int math = Integer.parseInt(input[3]);

            students.add(new Student(name, korean, english, math));
        }

        Collections.sort(students);

        for(Student student : students) {
            System.out.println(student);
        }

        sc.close();
    }
}
```

### 입력:

```
4
lee 80 70 50
kim 70 60 70
june 70 80 50
park 80 70 60
```

### 출력:

```
park 80 70 60
lee 80 70 50
june 70 80 50
kim 70 60 70
```

---

## 3. 총점 비교

=> n명인 학생수의 이름과 세 과목의 점수가 주어지면 총점이 낮은 순으로 정렬하여 출력하는 프로그램

조건: 1 ≤ n ≤ 10 / 1 ≤ 이름의 길이 ≤ 10 / 1 ≤ 점수 ≤ 100

### 코드:

```java
import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

class Student implements Comparable<Student> {
    String name;
    int score1, score2, score3;
    int total;

    public Student(String name, int score1, int score2, int score3){
        this.name = name;
        this.score1 = score1;
        this.score2 = score2;
        this.score3 = score3;
        this.total = score1 + score2 + score3;
    }

    @Override
    public int compareTo(Student other) {
        return this.total - other.total;
    }

    @Override
    public String toString() {
        return name + " " + score1 + " " + score2 + " " + score3;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();

        List<Student> students = new ArrayList<>();

        for(int i = 0; i < n; i++) {
            String[] input = sc.nextLine().split(" ");
            String name = input[0];
            int score1 = Integer.parseInt(input[1]);
            int score2 = Integer.parseInt(input[2]);
            int score3 = Integer.parseInt(input[3]);
            students.add(new Student(name, score1, score2, score3));
        }

        Collections.sort(students);

        for(Student student : students) {
            System.out.println(student);
        }

        sc.close();
    }
}
```

### 입력:

```
3
lee 50 60 70
kim 70 80 70
park 80 70 55
```

### 출력:

```
lee 50 60 70
park 80 70 55
kim 70 80 70
```

---

## 4. 줄 세우기

=> N명의 학생에 대해 키, 몸무게 정보가 주어졌을 때, 다음의 규칙에 따라 정렬한다.

- 키가 더 큰 학생이 앞에 온다.
- 키가 동일하다면, 몸무게가 더 큰 학생이 앞에 온다.
- 키와 몸무게가 동일하다면, 번호가 작은 학생이 앞에 온다.
- 번호는 정보가 따로 주어지진 않고 입력된 순서대로 부여된다.

=> 주어진 규칙에 따라 정렬한 이후 학생의 키, 몸무게, 번호를 출력하는 프로그램

조건: 1 ≤ N ≤ 1,000

### 코드:

```java
import java.util.*;
class Student implements Comparable<Student> {
    int h, w, num;

    public Student(int h, int w, int num) {
        this.h = h;
        this.w = w;
        this.num = num;
    }

    @Override
    public int compareTo(Student student) {
        if (this.h != student.h) {
            return student.h - this.h; // 키가 큰 순서대로
        } else if (this.w != student.w) {
            return student.w - this.w; // 몸무게가 큰 순서대로
        } else {
            return this.num - this.num; // 번호가 작은 순서대로
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Student[] students = new Student[n];

        for (int i = 0; i < n; i++) {
            int h = sc.nextInt();
            int w = sc.nextInt();
            students[i] = new Student(h, w, i+1);
        }

        Arrays.sort(students);

        for (Student s : students) {
            System.out.println(s.h + " " + s.w + " " + s.num);
        }

        sc.close();
    }
}
```

### 입력:

```
4
1 5
1 7
3 6
1 7
```

### 출력:

```
3 6 3
1 7 2
1 7 4
1 5 1
```

---

## 5. 개인정보

=> 5명의 이름, 키, 몸무게가 주어지면 이름순으로 정렬하여 출력하고, 키가 큰 순으로 정렬하여 출력하는 프로그램

조건: 1 ≤ 이름의 길이 ≤ 10 / 100 ≤ 키 ≤ 200 / 20 ≤ 몸무게 ≤ 100

### 코드:

```java
import java.util.*;

class Person implements Comparable<Person> { //이름순 정렬
    String name;
    int height;
    double weight;

    public Person(String name, int height, double weight) {
        this.name = name;
        this.height = height;
        this.weight = weight;
    }

    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }

    @Override
    public String toString() { // 출력 형식에 맞게 문자열을 반환
        return String.format("%s %d %.1f", name, height, weight);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 5명의 정보를 입력받아 Person 객체 리스트를 생성
        List<Person> people = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            String name = sc.next();
            int height = sc.nextInt();
            double weight = sc.nextDouble();

            people.add(new Person(name, height, weight));
        }

        // 이름순 정렬 및 출력
        Collections.sort(people);
        System.out.println("name");

        for (Person p : people) {
            System.out.println(p);
        }

        // 키 순 정렬 및 출력
        System.out.println("\nheight");
        people.sort((p1, p2) -> p2.height - p1.height);

        for (Person p : people) {
            System.out.println(p);
        }

        sc.close();
    }
}
```

### 입력:

```
lee 167 40.1
kim 149 32.9
park 161 53.1
choi 183 70.3
jung 155 45.7
```

### 출력:

```
name
choi 183 70.3
jung 155 45.7
kim 149 32.9
lee 167 40.1
park 161 53.1

height
choi 183 70.3
lee 167 40.1
park 161 53.1
jung 155 45.7
kim 149 32.9
```

---

## 6. 키, 몸무게를 기준으로 정렬

=> n명의 이름, 키, 몸무게가 주어지면 키를 기준으로 오름차순으로 정렬하여 출력하는 프로그램

- 키가 동일한 경우에는 몸무게가 더 큰 사람이 먼저 나오도록 정렬

조건: 1 ≤ n ≤ 10 / 1 ≤ 이름의 길이 ≤ 10 / 100 ≤ 키 ≤ 200 / 20 ≤ 몸무게 ≤ 100

### 코드:

```java
import java.util.*;
class Person implements Comparable<Person> {
    String name;
    int height;
    int weight;

    Person (String name, int height, int weight) {
        this.name = name;
        this.height = height;
        this.weight = weight;
    }

    @Override
    public int compareTo(Person other) {
        if (this.height != other.height) {
            return this.height - other.height;
        }
        return other.weight - this.weight;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();

        List<Person> people = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            String[] input = sc.nextLine().split(" ");

            String name = input[0];
            int height = Integer.parseInt(input[1]);
            int weight = Integer.parseInt(input[2]);

            people.add(new Person(name, height, weight));
        }

        Collections.sort(people);

        for (Person person : people) {
            System.out.println(person.name + " " + person.height + " " + person.weight);
        }
        sc.close();
    }
}
```

### 입력:

```
5
lee 167 40
kim 148 32
park 161 53
choi 148 70
jung 148 45
```

### 출력:

```
choi 148 70
jung 148 45
kim 148 32
park 161 53
lee 167 40
```

---

## 7. 원점으로부터의 거리

=> 2차 평면 위에 N개의 점이 주어졌을 때, 원점에서 가까운 점부터 순서대로 번호를 출력하는 프로그램

- 멘하턴 거리: 두 점 (x1, y1), (x2, y2) 사이의 멘하턴 거리는 |x1 - x2| + |y1 - y2|로 정의

조건: 1 ≤ N ≤ 1,000

### 코드:

```java
import java.util.*;

class Point implements Comparable<Point> {
    int num;
    int x;
    int y;
    int distance;

    Point(int num, int x, int y) {
        this.num = num;
        this.x = x;
        this.y = y;
        this.distance = Math.abs(x) + Math.abs(y); // 거리 계산
    }

    @Override
    public int compareTo (Point other) {
        if (this.distance != other.distance) {
            return Integer.compare(this.distance, other.distance);
        }
        return Integer.compare(this.num, other.num);
    }
}


public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();

        List<Point> points = new ArrayList<>();

        for (int i = 1; i <= N; i++) {
            int x = sc.nextInt();
            int y = sc.nextInt();

            points.add(new Point(i, x, y));
        }

        Collections.sort(points);

        for (Point point : points) {
            System.out.println(point.num);
        }

        sc.close();
    }
}
```

### 입력:

```
4
1 8
3 4
5 5
-7 0
```

### 출력:

```
2
4
1
3
```

---

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/sort-by-height?&utm_source=clipboard&utm_medium=text)
