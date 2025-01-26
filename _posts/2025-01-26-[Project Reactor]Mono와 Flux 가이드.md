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

![flux](https://github.com/user-attachments/assets/70f32e97-1bd8-4025-9920-cd2fff4ba366)<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="20 79 907 417" width="907" height="417" id="svg151">
 <defs id="defs16">
  <font-face font-family="'Tahoma','Nimbus Sans L'" font-size="24" panose-1="2 11 5 2 2 1 4 2 2 3" units-per-em="1000" underline-position="-75" underline-thickness="50" slope="0" x-height="450" cap-height="687" ascent="918" descent="-230" font-weight="400" id="font-face2" stemv="0" stemh="0" accent-height="0" ideographic="0" alphabetic="0" mathematical="0" hanging="0" v-ideographic="0" v-alphabetic="0" v-mathematical="0" v-hanging="0" strikethrough-position="0" strikethrough-thickness="0" overline-position="0" overline-thickness="0">
   <font-face-src>
    <font-face-name name="Tahoma"/>
   </font-face-src>
  </font-face>
  <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker" stroke-miterlimit="10" viewBox="-1 -5 11 10" markerWidth="11" markerHeight="10" color="#34302c" stroke-linejoin="miter">
   <g id="g6">
    <path d="M8 0L0-3v6z" id="path4" fill="currentColor" stroke="currentColor" stroke-width="1"/>
   </g>
  </marker>
  <font-face font-family="'Tahoma','Nimbus Sans L'" font-size="24" panose-1="2 11 9 2 3 0 4 2 2 3" units-per-em="1000" underline-position="-75" underline-thickness="50" slope="0" x-height="501" cap-height="682" ascent="923" descent="-235" font-weight="700" id="font-face9" stemv="0" stemh="0" accent-height="0" ideographic="0" alphabetic="0" mathematical="0" hanging="0" v-ideographic="0" v-alphabetic="0" v-mathematical="0" v-hanging="0" strikethrough-position="0" strikethrough-thickness="0" overline-position="0" overline-thickness="0">
   <font-face-src>
    <font-face-name name="Tahoma-Bold"/>
   </font-face-src>
  </font-face>
  <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_2" stroke-miterlimit="10" viewBox="-1 -6 14 12" markerWidth="14" markerHeight="12" color="#34302c" stroke-linejoin="miter">
   <g id="g13">
    <path d="M12 0L0-4v9z" id="path11" fill="currentColor" stroke="currentColor" stroke-width="1"/>
   </g>
  </marker>
  <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker-3" stroke-miterlimit="10" viewBox="-1 -6 14 12" markerWidth="14" markerHeight="12" color="#34302c" stroke-linejoin="miter">
   <g id="g6-6">
    <path d="M12 0L0-4v9z" id="path4-7" fill="currentColor" stroke="currentColor" stroke-width="1"/>
   </g>
  </marker>
  <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="FilledArrow_Marker_2-5" stroke-miterlimit="10" viewBox="-1 -5 11 10" markerWidth="11" markerHeight="10" color="#34302c" stroke-linejoin="miter">
   <g id="g11">
    <path d="M8 0L0-3v6z" id="path9" fill="currentColor" stroke="currentColor" stroke-width="1"/>
   </g>
  </marker>
  <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="marker1339" stroke-miterlimit="10" viewBox="-1 -5 11 10" markerWidth="11" markerHeight="10" color="#34302c" stroke-linejoin="miter">
   <g id="g1337">
    <path d="M8 0L0-3v6z" id="path1335" fill="currentColor" stroke="currentColor" stroke-width="1"/>
   </g>
  </marker>
  <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="marker1345" stroke-miterlimit="10" viewBox="-1 -5 11 10" markerWidth="11" markerHeight="10" color="#34302c" stroke-linejoin="miter">
   <g id="g1343">
    <path d="M8 0L0-3v6z" id="path1341" fill="currentColor" stroke="currentColor" stroke-width="1"/>
   </g>
  </marker>
  <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="marker1351" stroke-miterlimit="10" viewBox="-1 -5 11 10" markerWidth="11" markerHeight="10" color="#34302c" stroke-linejoin="miter">
   <g id="g1349">
    <path d="M8 0L0-3v6z" id="path1347" fill="currentColor" stroke="currentColor" stroke-width="1"/>
   </g>
  </marker>
  <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="marker1357" stroke-miterlimit="10" viewBox="-1 -5 11 10" markerWidth="11" markerHeight="10" color="#34302c" stroke-linejoin="miter">
   <g id="g1355">
    <path d="M8 0L0-3v6z" id="path1353" fill="currentColor" stroke="currentColor" stroke-width="1"/>
   </g>
  </marker>
  <marker orient="auto" overflow="visible" markerUnits="strokeWidth" id="marker1363" stroke-miterlimit="10" viewBox="-1 -5 11 10" markerWidth="11" markerHeight="10" color="#34302c" stroke-linejoin="miter">
   <g id="g1361">
    <path d="M8 0L0-3v6z" id="path1359" fill="currentColor" stroke="currentColor" stroke-width="1"/>
   </g>
  </marker>
 </defs>
 <path id="line1092" d="M267 147h383" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" stroke-opacity="1" marker-end="url(#FilledArrow_Marker-3)"/>
 <path d="M281 241h378l1 1v72l-1 1H281l-1-1v-72z" id="path37" fill="#fff" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" stroke-opacity="1"/>
 <path id="line52" d="M267 387h382" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" stroke-opacity="1" marker-end="url(#FilledArrow_Marker-3)"/>
 <path id="path70" d="M624 123l2 2v44l-2 2-2-2v-44z" fill="#34302c" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1"/>
 <circle id="ellipse55" cy="147" cx="354" r="23" fill="#6cb33e" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1"/>
 <circle id="ellipse57" cy="147" cx="354" r="23" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" stroke-opacity="1"/>
 <path id="line73" d="M355 172l-1 47" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.99999995,5.99999985" stroke-opacity="1" marker-end="url(#FilledArrow_Marker_2-5)"/>
 <circle id="ellipse60" cy="147" cx="452" r="23" fill="#e6ba31" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1"/>
 <circle id="ellipse62" cy="147" cx="452" r="23" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" stroke-opacity="1"/>
 <circle id="ellipse65" cy="147" cx="549" r="23" fill="#45b8de" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1"/>
 <circle id="ellipse67" cy="147" cx="549" r="23" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" stroke-opacity="1"/>
 <text id="text41" x="132" y="263" fill="#34302c" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1">
  <tspan font-size="24" font-weight="700" x="392" y="285" id="tspan39" font-family="Tahoma,'Nimbus Sans L'" fill="#34302c">operator (...)</tspan>
 </text>
 <path id="line1094" d="M452 172v47" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.99999995,5.99999985" stroke-opacity="1" marker-end="url(#FilledArrow_Marker_2-5)"/>
 <path id="line1096" d="M550 172l-1 47" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.99999995,5.99999985" stroke-opacity="1" marker-end="url(#FilledArrow_Marker_2-5)"/>
 <path id="line1098" d="M625 172l-1 47" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.99999995,5.99999985" stroke-opacity="1" marker-end="url(#FilledArrow_Marker_2-5)"/>
 <text y="92" x="49" id="text1102" fill="#34302c" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1">
  <tspan id="tspan1100" y="114" x="308" font-weight="400" font-size="16" style="-inkscape-font-specification:'Tahoma, Nimbus Sans L, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" font-style="normal" font-variant="normal" font-stretch="normal" font-family="Tahoma,'Nimbus Sans L'" writing-mode="lr-tb" text-anchor="start" fill="#34302c">These are the items emitted by the Flux</tspan>
 </text>
 <circle cx="354" cy="387" id="ellipse1144" r="23" fill="#6cb33e" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1"/>
 <circle cx="354" cy="387" id="ellipse1146" r="23" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" stroke-opacity="1"/>
 <circle cx="452" cy="387" id="ellipse1148" r="23" fill="#e6ba31" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1"/>
 <circle cx="452" cy="387" id="ellipse1150" r="23" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="none" stroke-opacity="1"/>
 <path id="line1152" d="M355 318l-1 24" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.99999994,5.99999983" stroke-opacity="1" marker-end="url(#FilledArrow_Marker_2-5)"/>
 <path id="line1154" d="M452 318v24" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.99999994,5.99999983" stroke-opacity="1" marker-end="url(#FilledArrow_Marker_2-5)"/>
 <path id="line1156" d="M550 319l-1 40" fill="none" fill-opacity="1" stroke="#34302c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1.99999992,5.99999978" stroke-opacity="1" marker-end="url(#FilledArrow_Marker_2-5)"/>
 <path id="path1034" d="M567 403l-2 2h-3l-31-31v-3l2-2h3l31 31z" fill="#ef2200" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1"/>
 <path id="path1036" d="M565 369l2 2v3l-31 31h-3l-2-2v-3l31-31z" fill="#ef2200" fill-opacity="1" stroke="none" stroke-dasharray="none" stroke-opacity="1"/>
 <text xml:space="preserve" style="line-height:1.25;-inkscape-font-specification:Tahoma;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" x="674" y="230" id="text1193" font-style="normal" font-variant="normal" font-weight="400" font-stretch="normal" font-size="16" letter-spacing="0" word-spacing="0" font-family="Tahoma,'Nimbus Sans L'" writing-mode="lr-tb" text-anchor="start" fill="#000" fill-opacity="1" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-opacity="1">
  <tspan x="674" y="230" id="tspan1197" fill="#34302c" fill-opacity="1">These dotted lines and this box</tspan><tspan x="674" y="250" id="tspan1204" fill="#34302c" fill-opacity="1">indicate that a transformation</tspan><tspan x="674" y="270" id="tspan1206" fill="#34302c" fill-opacity="1">is being applied to the Flux</tspan><tspan x="674" y="310" id="tspan1210" fill="#34302c" fill-opacity="1">The text inside the box shows</tspan><tspan x="674" y="330" id="tspan1212" fill="#34302c" fill-opacity="1">the nature of the transformation</tspan>
 </text>
 <text id="text1226" y="101" x="618" style="line-height:1.25;-inkscape-font-specification:Tahoma;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve" font-style="normal" font-variant="normal" font-weight="400" font-stretch="normal" font-size="16" letter-spacing="0" word-spacing="0" font-family="Tahoma,'Nimbus Sans L'" writing-mode="lr-tb" text-anchor="start" fill="#000" fill-opacity="1" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-opacity="1">
  <tspan id="tspan1224" y="101" x="618" fill="#34302c" fill-opacity="1">This vertical line indicates that</tspan><tspan y="121" x="618" id="tspan1248" fill="#34302c" fill-opacity="1">the Flux has completed successfully</tspan>
 </text>
 <text xml:space="preserve" style="line-height:1.25;-inkscape-font-specification:Tahoma;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" x="244" y="141" id="text1265" font-style="normal" font-variant="normal" font-weight="400" font-stretch="normal" font-size="16" letter-spacing="0" word-spacing="0" font-family="Tahoma,'Nimbus Sans L'" writing-mode="lr-tb" text-anchor="start" fill="#000" fill-opacity="1" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-opacity="1">
  <tspan id="tspan1263" x="244" y="141" style="text-align:end" text-anchor="end" fill="#34302c" fill-opacity="1">This is the timeline of the Flux</tspan><tspan x="244" y="161" style="text-align:end" id="tspan1269" text-anchor="end" fill="#34302c" fill-opacity="1">Time flows from left to right</tspan>
 </text>
 <text id="text1275" y="383" x="244" style="line-height:1.25;-inkscape-font-specification:Tahoma;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" xml:space="preserve" font-style="normal" font-variant="normal" font-weight="400" font-stretch="normal" font-size="16" letter-spacing="0" word-spacing="0" font-family="Tahoma,'Nimbus Sans L'" writing-mode="lr-tb" text-anchor="start" fill="#000" fill-opacity="1" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-opacity="1">
  <tspan id="tspan1273" style="text-align:end" y="383" x="244" text-anchor="end" fill="#34302c" fill-opacity="1">This Flux is the result</tspan><tspan style="text-align:end" y="403" x="244" id="tspan1279" text-anchor="end" fill="#34302c" fill-opacity="1">of the transformation</tspan>
 </text>
 <text xml:space="preserve" style="line-height:1.25;-inkscape-font-specification:Tahoma;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:start" x="528" y="443" id="text1285" font-style="normal" font-variant="normal" font-weight="400" font-stretch="normal" font-size="16" letter-spacing="0" word-spacing="0" font-family="Tahoma,'Nimbus Sans L'" writing-mode="lr-tb" text-anchor="start" fill="#000" fill-opacity="1" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-opacity="1">
  <tspan x="528" y="443" style="text-align:start" id="tspan1289" text-anchor="start" fill="#34302c" fill-opacity="1">If for some reason the Flux terminates</tspan><tspan x="528" y="463" style="text-align:start" id="tspan1293" text-anchor="start" fill="#34302c" fill-opacity="1">abnormally, with an error, the vertical</tspan><tspan x="528" y="483" style="text-align:start" id="tspan1295" text-anchor="start" fill="#34302c" fill-opacity="1">line is replaced by an X</tspan>
 </text>
</svg>


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