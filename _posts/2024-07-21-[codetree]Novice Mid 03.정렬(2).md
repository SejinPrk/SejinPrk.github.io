---
layout: post
title: "[Code Tree - Novice Mid] 03-2. 정렬: 객체"
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

# Novice Mid: 03. 정렬 - 2

# 객체

## 1. 007
 
=> "비밀 코드", "접선 장소", "시간"이 주어지면 입출력 예제 같이 출력하는 프로그램

조건: 1 ≤ "비밀코드"의 길이 ≤ 10

### 코드:

```java
import java.util.Scanner;

class SecretMeeting {
    private String secretCode;
    private char meetingPoint;
    private int time;

    public SecretMeeting(String secretCode, char meetingPoint, int time) {
        this.secretCode = secretCode;
        this.meetingPoint = meetingPoint;
        this.time = time;
    }

    public void printMeetingInfo() {
        System.out.println("secret code : " + secretCode);
        System.out.println("meeting point : " + meetingPoint);
        System.out.println("time : " + time);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 전체 입력 라인을 읽고 공백으로 분리
        String input = scanner.nextLine();
        String[] parts = input.split(" ");

        // 각 부분을 변수에 할당
        String secretCode = parts[0];
        char meetingPoint = parts[1].charAt(0);
        int time = Integer.parseInt(parts[2]);

        // SecretMeeting 객체 생성
        SecretMeeting meeting = new SecretMeeting(secretCode, meetingPoint, time);
        
        // 정보 출력
        meeting.printMeetingInfo();

        scanner.close();
    }
}

```

### 입력:

```
codetree L 13
```

### 출력:

```
secret code : codetree
meeting point : L
time : 13
```

---

## 2.Next Level

=> "아이디", "레벨"을 같이 저장할 수 있는 형태(c언어의 경우 구조체를, 다른 언어의 경우 class)를 정의하고, 2개의 객체를 선언한 후, 하나의 객체는 아이디에 "codetree", 레벨에 "10"으로 각각 초기화하고 다른 객체는 새롭게 입력받은 값을 넣어 입출력 예제와 같이 출력하는 프로그램

조건: 1 ≤ "아이디"의 길이 ≤ 10 / 1 ≤ "레벨" ≤ 30

### 코드:

```java
import java.util.Scanner;

class User {
    String id;
    int level;

    User(String id, int level) {
        this.id = id;
        this.level = level;
    }

    void printInfo() {
        System.out.println("user " + id + " lv " + level);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // 첫 번째 객체 생성 및 초기화
        User user1 = new User("codetree", 10);

        // 두 번째 객체를 위한 입력 받기
        String id = sc.next();
        int level = sc.nextInt();

        // 두 번째 객체 생성
        User user2 = new User(id, level);

        // 정보 출력
        user1.printInfo();
        user2.printInfo();

        sc.close();
    }
}
```

### 입력:

```
hello 28
```

### 출력:

```
user codetree lv 10
user hello lv 28
```

---

## 3. 코드네임

=> 5명의 코드네임과 점수를 입력받아 점수가 제일 낮은 요원의 정보를 출력하는 프로그램

조건: 1 ≤ 점수 ≤ 100

### 코드:

```java
import java.util.Scanner;

class Agent {
    private String codename;
    private int score;

    public Agent(String codename, int score) {
        this.codename = codename;
        this.score = score;
    }

    public String getCodename() {
        return codename;
    }

    public int getScore() {
        return score;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Agent[] agents = new Agent[5];

        // 5명의 요원 정보 입력받기
        for (int i = 0; i < 5; i++) {
            String codename = scanner.next();
            int score = scanner.nextInt();
            agents[i] = new Agent(codename, score);
        }

        // 점수가 가장 낮은 요원 찾기
        Agent lowestScoreAgent = agents[0];
        for (int i = 1; i < 5; i++) {
            if (agents[i].getScore() < lowestScoreAgent.getScore()) {
                lowestScoreAgent = agents[i];
            }
        }

        // 결과 출력
        System.out.println(lowestScoreAgent.getCodename() + " " + lowestScoreAgent.getScore());

        scanner.close();
    }
}
```

### 입력:

```
A 50
B 80
C 79
Z 90
F 100
```

### 출력:

```
A 50
```

---

## 4. 폭탄 해제

=> 필요한 "해제 코드", 끊어야하는 "선의 색", "특정 초"가 주어지면 입출력 예제 같이 출력하는 프로그램

조건: 1 ≤ "해제 코드"의 길이 ≤ 10 / 1 ≤ "특정 초" ≤ 60

### 코드:

```java
import java.util.Scanner;

class BombDefuser {
    private String code;
    private String color;
    private int sec;

    public BombDefuser(String code, String color, int sec) {
        this.code = code;
        this.color = color;
        this.sec = sec;
    }

    public void printInfo() {
        System.out.println("code : " + code);
        System.out.println("color : " + color);
        System.out.println("second : " + sec);
    }
}
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String code = sc.next();
        String color = sc.next();
        int sec = sc.nextInt();

        BombDefuser defuser = new BombDefuser(code, color, sec);
        defuser.printInfo();

        sc.close();
    }
}
```

### 입력:

```
branch G 34
```

### 출력:

```
code : branch
color : G
second : 34
```

---

## 5. 상품 코드

=> "상품명", "상품 코드"를 같이 저장할 수 있는 형태(c언어의 경우 구조체를, 다른 언어의 경우 class)를 정의하고, 2개의 객체를 선언한 후, 하나의 객체는 상품명에 "codetree", 상품코드에 "50"으로 각각 초기화하고 다른 객체는 새롭게 입력받은 값을 넣어 입출력 예제와 같이 출력하는 프로그램

조건: 1 ≤ "상품명" 길이 ≤ 10 / 1 ≤ "상품코드" ≤ 100
### 코드:

```java
import java.util.Scanner;

class ProductSaver {
    private String product;
    private int code;

    public ProductSaver(String product, int code) {
        this.product = product;
        this.code = code;
    }

    public void printInfo() {
        System.out.println("product " + code + " is " + product);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ProductSaver saver1 = new ProductSaver("codetree", 50);

        String product = sc.next();
        int code = sc.nextInt();

        ProductSaver saver2 = new ProductSaver(product, code);
        
        saver1.printInfo();
        saver2.printInfo();

        sc.close();
    }
}
```

### 입력:

```
leebros 88
```

### 출력:

```
product 50 is codetree
product 88 is leebros
```

---

## 6. 사는 지역

=> 이름, 번지수, 지역에 대한 n명의 자료가 주어지면, 사전순으로 이름이 가장 느린 사람의 자료를 출력하는 프로그램

조건:1 ≤ n ≤ 10 / 1 ≤ 이름, 지역의 길이 ≤ 10

### 코드:

```java
import java.util.*;

// 각 사람의 이름, 주소, 도시 정보를 저장
class Person implements Comparable<Person> {
    // Comparable 인터페이스를 구현하여 이름을 기준으로 비교
    String name;
    String addr;
    String city;

    public Person(String name, String addr, String city) {
        this.name = name;
        this.addr = addr;
        this.city = city;
    }

    @Override
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }
}
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine(); // 개행문자 제거

        List<Person> people = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String[] info = sc.nextLine().split(" ");
            people.add(new Person(info[0], info[1], info[2]));
        }
        // 이름이 사전순으로 가장 마지막인 사람을 찾기
        Person lastPerson = Collections.max(people);

        System.out.println("name " + lastPerson.name);
        System.out.println("addr " + lastPerson.addr);
        System.out.println("city " + lastPerson.city);

        sc.close();
    }
}
```

### 입력:

```
3
kim 987-123 Seoul
lee 888-345 Busan
park 743-866 Daegu
```

### 출력:

```
name park
addr 743-866
city Daegu
```

---
## 7. 비오는 날

=> 미래의 기상을 예측한 데이터가 n개 주어지고 각 데이터에는 날짜, 요일, 날씨의 정보가 순서대로 담겨있을 때, 가장 근 시일내에 비가 오는 날을 찾아 출력하는 프로그램

조건:  2,000 ≤ Y ≤ 2,100 / 1 ≤ n ≤ 100, n 개의 데이터 중에서 비가 오는 날이 적어도 하루 존재함

### 코드:

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;


//  각 날의 날짜, 요일, 날씨 정보를 저장
class WeatherInfo implements Comparable<WeatherInfo> {
    // Comparable 인터페이스를 구현하여 날짜를 기준으로 비교
    LocalDate date; // LocalDate를 사용하여 날짜를 파싱하고 저장
    String day;
    String weather;

    public WeatherInfo(String dateStr, String day, String weather) {
        this.date = LocalDate.parse(dateStr);
        this.day = day;
        this.weather = weather;
    }

    @Override
    public int compareTo(WeatherInfo other) {
        return this.date.compareTo(other.date);
    }

    @Override
    public String toString() {
        return this.date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")) + " " + day + " " + weather;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine(); // 개행문자 제거

        List<WeatherInfo> weatheInfoList = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String[] info = sc.nextLine().split(" ");
            weatheInfoList.add(new WeatherInfo(info[0], info[1], info[2]));
        }
        
        Collections.sort(weatheInfoList);
        
        WeatherInfo nearestRain = null;
        for (WeatherInfo info : weatheInfoList) {
            if ("Rain".equals(info.weather)) {
                nearestRain = info;
                break;
            }
        }

        if (nearestRain != null) {
            System.out.println(nearestRain);
        }

        sc.close();
    }
}
```

### 입력:

```
4
2036-12-27 Sun Snow
2052-08-28 Wed Rain
2043-03-21 Sat Sun
2077-08-19 Thu Rain
```

### 출력:

```
2052-08-28 Wed Rain
```
---

### 링크: [코드트리](https://www.codetree.ai/missions/5/problems/007?&utm_source=clipboard&utm_medium=text)
