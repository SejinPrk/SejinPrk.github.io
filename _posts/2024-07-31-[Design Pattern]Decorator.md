---
layout: post
title: "[Design Pattern] 상속 대신 Decorator 패턴 적용하기"
excerpt: "디자인 패턴"
categories:
  - Blog
tags:
  - designPattern
  - java
toc: true
toc_sticky: true
date: 2024-07-31
last_modified_at: 2024-07-31
---

# 입출력 기능 확장에 상속 대신 Decorator 패턴을 적용하기

## 0. Decorator 패턴이란? 

: 객체 지향 프로그래밍에서 사용되는 디자인 패턴 중 하나

(1) 목적: 객체에 동적으로 새로운 책임(기능)을 추가할 수 있게 합니다.
(2) 구조:
- Component: 기본 기능을 정의하는 인터페이스 또는 추상 클래스
- ConcreteComponent: 기본 기능을 구현한 클래스
- Decorator: Component를 참조하는 추상 클래스
- ConcreteDecorator: Decorator를 상속받아 추가 기능을 구현한 클래스

(3) 작동 방식:
- 데코레이터 객체가 원본 객체를 감싸고 있다.
- 데코레이터는 원본 객체와 동일한 인터페이스를 구현한다.
- 클라이언트의 요청을 데코레이터가 중간에서 처리하고, 필요시 원본 객체에 전달한다.

(4) 장점:
- 기존 코드를 수정하지 않고 기능을 확장할 수 있다(개방-폐쇄 원칙).
- 런타임에 동적으로 기능을 추가하거나 제거할 수 있다.
- 여러 데코레이터를 조합하여 복잡한 기능을 구현할 수 있다.

(5) 단점:
- 작은 객체들이 많이 생성되어 코드가 복잡해질 수 있다.
- 데코레이터를 너무 많이 사용하면 디버깅이 어려워질 수 있다.

---

## 1. 상속 vs. Decorator 패턴(GoF)

- 상속: 기능 확장 용이
- decorator: 기능 확장 및 제거 용이
  - BufferedDataInputStream 분해: BufferedInputStream, DataInputStream, FileInputStream
  - BufferedDataOutputStream 분해: BufferedOutputStream, DataOutputStream, FileOutputStream
    ​
    자바에서 제공하는 기능: Java I/O Stream API를 사용해 실습을 해보려고 한다.

---

## 2. 상속을 이용한 기능 확장 방식의 문제점

- FileInputStream
  ↪️ DataInputStream - byte 데이터: byte, short, int, long, float, double, boolean, String
  ↪️ BufferedDataInputStream - 버퍼 기능 추가
  ↪️ BufferedFileInputStream - 버퍼 기능 추가
  => 서브 클래스 간의 기능이 중복됨!
  ​
  (1) 상속을 이용해 다양한 기능을 추가시키다 보면 <u>다양한 조합의 서브 클래스들이 대량으로 생성</u>되는 문제 발생
  (2) 이 과정 속에서 <u>서브 클래스끼리 기능이 중복</u>되는 문제 발생

---

## 3. 위임과 포함을 이용한 기능 확장

설명:
https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/io/FileInputStream.html

✴️InputStream
"component"
↪️ FileInputStream
↪️ ByteArrayInputStream
↪️ PipedInputStream
↪️ ... 말단부품 component
<span style="background-color: yellow;">
↪️ FilterInputStream 중간부품 "Decorator"
↪️ BufferedInputStream
↪️ DataInputStream
↪️ CiperInputStream
↪️ ...
</span>
이 전체가 Decorator!

---

## 4. 예시

(1) 파일 읽기 기본 기능
----사용----> FileInputStream

```java
FileInputStream in = new FileInputStream("-");
in.read();
```

(2) 파일 읽기 + Buffer
FileInputStream --사용--> ↪️ BufferedInputStream

```java
FileInputStream in = new FileInputStream("-");
BufferedInputStream in2 = new BufferdInputStream(in);
in2.read();
```

(3) 파일 읽기 + 버퍼 + 데이터 가공
FileInputStream ---4.읽기---> 파일 3. read( )
↪️ BufferedInputStream 2. read( )
↪️ DataInputStream <---1.사용---

---

## 5. 실습

```java
void saveAssignment() {
    try (FileOutputStream out0 = new FileOutputStream("assignment.data");
        DataOutputStream out = new DataOutputStream(out0)) {
        ...
      }
}
```

위 코드를 아래처럼 더 간결하게 줄일 수 있다.

```java
void saveAssignment() {
    try (DataOutputStream out0 = new DataOutputStream( new FileOutputStream("assignment.data"))) {
        ...
    }
}
```

\*\* 이 코드는 아래의 복잡하고 긴 코드를 간결하게 줄인 것이다.

```java
try (FileInputStream in0 = new FileInputStream("assignment.data");
      BufferedInputStream in1 = new BufferedInputStream(in0);
      DataInputStream in = new DataInputStream(in1)) {
      ...
      }
```

BufferedInputStream도 중간에 넣어 연결시킨다.

```java
 void loadAssignment() {
    try (DataInputStream in = new DataInputStream(new BufferedInputStream(new FileInputStream("assignment.data")))) {
      ...
    }
 }
```

```java
try(FileOutputStream out0 = new FileOutputStream("assignment.data");
```

---

## save/load Assignment 전체 코드

```java
// DataInputStream을 사용하여 "assignment.data" 파일에서 데이터를 읽어온다.
 void loadAssignment() {
    try (DataInputStream in = new DataInputStream(new BufferedInputStream(new FileInputStream("assignment.data")))) {

      long start = System.currentTimeMillis();
      int size = in.readInt();

      for (int i = 0; i < size; i++) {
        Assignment assignment = new Assignment();
        assignment.setTitle(in.readUTF());
        assignment.setContent(in.readUTF());
        assignment.setDeadline(Date.valueOf(in.readUTF()));
        assignmentRepository.add(assignment);
      }
     long end = System.currentTimeMillis();
      System.out.printf("걸린 시간: %d\n", end - start);

    } catch (Exception e) {
      System.out.println("과제 데이터 로딩 중 오류 발생!");
      e.printStackTrace();
    }
  }

// DataOutputStream을 사용하여 "assignment.data" 파일에 데이터를 저장
  void saveAssignment() {
    try (DataOutputStream out = new DataOutputStream(new BufferedOutputStream( new FileOutputStream("assignment.data")))) {
      long start = System.currentTimeMillis(); // 성능 측정
      out.writeInt(assignmentRepository.size());

      for (Assignment assignment : assignmentRepository) {
        out.writeUTF(assignment.getTitle());
        out.writeUTF(assignment.getContent());
        out.writeUTF(assignment.getDeadline().toString());
      }

      long end = System.currentTimeMillis(); 
      System.out.printf("걸린 시간: %d\n", end - start);

    } catch (Exception e) {
      System.out.println("과제 데이터 저장 중 오류 발생!");
      e.printStackTrace();
    }
  }
```
