---
layout: post
title: "[Project Reactor] Mono와 Flux 가이드"
excerpt: "Spring Boot"
categories:
  - Blog
tags:
  - [Spring Boot]
  - [Project Reactor]
toc: true
toc_sticky: true
date: 2025-01-24
last_modified_at: 2025-01-26
---
## 1. 개요

Project Reactor는 Spring WebFlux의 핵심 리액티브 라이브러리([공식문서](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html#from-org.reactivestreams.Publisher-))이다. 이 글에서는 Reactor의 두 핵심 타입인 Mono와 Flux의 차이점과 실제 활용 방법에 대해 알아보려고 한다.

![flux.svg](%5BProject%20Reactor%5D%20Mono%E1%84%8B%E1%85%AA%20Flux%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%83%E1%85%B3%20184adff4af2e80e1a3f0edbe0eebb25a/flux.svg)

## 2. Mono vs Flux

### 2.1 기본 개념

- **Mono**: 0-1개의 데이터를 처리하는 Publisher
- **Flux**: 0-N개의 데이터를 처리하는 Publisher

### 2.2 주요 차이점

| 특징 | Mono | Flux |
| --- | --- | --- |
| 데이터 개수 | 0-1개 | 0-N개 |
| 용도 | 단일 응답 | 스트림 데이터 |
| 변환 작업 | 제한적 | 자유로움 |
| 메모리 사용 | 적음 | 상대적으로 많음 |

## 3. Mono 상세 분석

### 3.1 기본 사용법

```java
// 즉시 값 반환
Mono<String> mono = Mono.just("Hello");

// 지연 실행 (subscribe 시점에 실행)
Mono<String> delayed = Mono.fromSupplier(() -> heavyOperation());
```

### 3.2 실행 시점

```java
log.info("시작");
Mono<String> mono = Mono.just("Hello")  // 생성 시점
    .map(s -> s + " World");
log.info("중간");
mono.subscribe(result -> {              // 실제 실행 시점
    log.info("결과: " + result);
});
log.info("종료");
```

## 4. Flux 상세 분석

### 4.1 기본 사용법

```java
// 컬렉션 데이터 스트리밍
Flux<Integer> flux = Flux.just(1, 2, 3, 4, 5);

// 주기적 데이터 생성
Flux<Long> interval = Flux.interval(Duration.ofSeconds(1))
    .take(5);  // 5개만 생성
```

### 4.2 스트리밍 API 구현

```java
@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<Event> streamEvents() {
    return Flux.interval(Duration.ofSeconds(1))
        .map(i -> new Event(i, "Event " + i))
        .take(10);
}
```

## 5. 실전 활용 패턴

### 5.1 단일 응답 API (Mono)

```java
@GetMapping("/user/{id}")
public Mono<User> getUser(@PathVariable String id) {
    return userService.findById(id)
        .map(this::enrichUserData)
        .defaultIfEmpty(new User());
}
```

### 5.2 스트리밍 API (Flux)

```java
@GetMapping(value = "/notifications", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<Notification> streamNotifications() {
    return Flux.interval(Duration.ofSeconds(1))
        .flatMap(i -> notificationService.getLatest())
        .filter(notification -> !notification.isRead());
}
```

### 5.3 데이터 변환

```java
// Mono 변환
Mono<List<Event>> events = Mono.just(List.of(event1, event2))
    .map(list -> list.stream()
        .map(this::enrichEvent)
        .collect(Collectors.toList()));

// Flux 변환
Flux<Event> eventFlux = Flux.fromIterable(events)
    .map(this::enrichEvent)
    .filter(event -> event.isValid());
```

## 6. 성능 고려사항

### 6.1 Mono 사용이 적합한 경우

- 단일 응답 API
- 캐시된 데이터 조회
- 단순 CRUD 작업

### 6.2 Flux 사용이 적합한 경우

- 실시간 데이터 스트리밍
- 대용량 데이터 처리
- 이벤트 기반 알림
- SSE(Server-Sent Events): 단방향 통신

## 7. 주의사항 및 모범 사례

1. **subscribe 호출 시점 주의**
    - WebFlux가 자동으로 subscribe 해주므로 직접 호출 지양
    - 테스트 코드에서만 명시적 subscribe 사용
2. **에러 처리**
    
    ```java
    mono.onErrorResume(error -> Mono.just(fallbackValue))
    flux.onErrorContinue((error, value) -> log.error("Error for value: {}", value))
    ```
    
3. **백프레셔 활용**
    
    ```java
    flux.onBackpressureBuffer()
    flux.onBackpressureDrop()
    ```
    

## 8. 결론

Mono와 Flux는 각각의 사용 목적이 명확하다. 단일 응답이면 Mono를, 스트림 처리가 필요하면 Flux를 선택하는 것이 바람직하며, 두 타입의 특성을 잘 이해하고 적재적소에 활용하면 효율적인 리액티브 프로그래밍이 가능해진다.