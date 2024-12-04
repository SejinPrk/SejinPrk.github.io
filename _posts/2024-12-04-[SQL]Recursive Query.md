---
layout: post
title: "[SQL]단방향 통신으로 채팅 기능 구현하기"
excerpt: "SQL"
categories:
  - Blog
tags:
  - [SQL]
toc: true
toc_sticky: true
date: 2024-12-04
last_modified_at: 2024-12-04
---
# SQL 재귀 쿼리 (Recursive Query) 완벽 가이드

관리자 프로젝트를 작업하던 도중 재귀 쿼리를 마주하는 일이 생겼다. 

이전까지 다양한 조인은 해봤어도 리커시브 쿼리는 처음 듣는데, 사원 정보를 조회할 때 테이블에 이에 대한 컬럼이 없어 계층을 타고 타고 들어가야 하는 상황(부서 → 팀 → 유닛)이 생겼고 처음으로 재귀 쿼리에 대해 알게 되었다. 일반 CRUD 작업보다 쿼리 작성이나 디버깅이 어려워서 따로 재귀 쿼리에 대해서만 정리를 해보기로 했다. 

## 1. 재귀 쿼리(Recursive Query)란?

프로그래밍 언어에 함수 내부에서 자신을 직접 호출하는 재귀 함수(ex. factorial)가 있는 것처럼 SQL 문법에서도 WITH RECURSIVE와 UNION을 통해 반복 처리를 하는 재귀 쿼리가 있다. 재귀 쿼리는 자기 참조(self-referencing) 방식으로 데이터를 반복적으로 처리하는 SQL 쿼리로, 주로 계층적 데이터나 그래프 구조의 데이터를 처리할 때 사용된다.

### 주요 활용 분야

- 조직도/직원 계층 구조
- 카테고리 트리
- 파일 시스템 경로
- 네트워크 관계도
- 댓글의 대댓글 구조

## 2. WITH RECURSIVE 문법

기본 문법 구조:

```sql
WITH RECURSIVE cte_name AS (
    -- 기본 케이스(Base case)
    SELECT columns
    FROM table
    WHERE condition

    UNION [ALL]

    -- 재귀 케이스(Recursive case)
    SELECT columns
    FROM table
    INNER JOIN cte_name ON condition
)
SELECT * FROM cte_name;

```

### 구성 요소 설명

1. **기본 케이스**
    - 재귀의 시작점
    - 초기 데이터 집합 정의
    - WHERE 절로 시작 조건 지정
2. **재귀 케이스**
    - CTE를 참조하여 다음 단계 데이터 생성
    - JOIN 조건으로 재귀 관계 정의
    - 종료 조건 포함 필요

## 3. 사용 사례

### (1) 직원 조직도 조회

```sql
WITH RECURSIVE emp_hierarchy AS (
    -- 최상위 관리자 (기본 케이스)
    SELECT employee_id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- 하위 직원 (재귀 케이스)
    SELECT e.employee_id, e.name, e.manager_id, h.level + 1
    FROM employees e
    INNER JOIN emp_hierarchy h ON e.manager_id = h.employee_id
)
SELECT * FROM emp_hierarchy;

```

### (2) 카테고리 전체 경로 생성

```sql
WITH RECURSIVE category_path AS (
    -- 최하위 카테고리 (기본 케이스)
    SELECT id, name, parent_id, name as path
    FROM categories
    WHERE id = 5  -- 특정 카테고리

    UNION ALL

    -- 상위 카테고리 탐색 (재귀 케이스)
    SELECT c.id, c.name, c.parent_id,
           c.name || ' > ' || cp.path
    FROM categories c
    INNER JOIN category_path cp ON c.id = cp.parent_id
)
SELECT path FROM category_path
WHERE parent_id IS NULL;

```

### (3) 숫자 시퀀스 생성

```sql
WITH RECURSIVE sequence AS (
    -- 시작 숫자 (기본 케이스)
    SELECT 1 as number

    UNION ALL

    -- 다음 숫자 생성 (재귀 케이스)
    SELECT number + 1
    FROM sequence
    WHERE number < 10
)
SELECT * FROM sequence;

```

## 4. 성능 고려사항

1. **종료 조건의 중요성**
    - 명확한 종료 조건 필수
    - 무한 루프 방지
    - MAXRECURSION 옵션 활용
2. **인덱스 최적화**
    - 재귀 조인 컬럼에 인덱스 생성
    - 실행 계획 분석
3. **메모리 사용**
    - 재귀 깊이에 따른 메모리 사용량 증가
    - 데이터 볼륨 고려

## 5. 주의사항과 모범 사례

### ⚠️ 주의사항

1. **순환 참조(Circular Reference) 방지 *** 
- 순환참조란? db에서 레코드들이 서로를 참조하며 순환하는 구조를 의미한다.
- 이런 순환 구조는:
    1. 무한 루프 발생 위험
    2. 데이터 일관성 저해
    3. 재귀 쿼리 시 성능 문제
    
    때문에 보통 데이터 설계 시 순환 참조가 발생하지 않도록 제약조건을 설정한다.
    

```jsx
직원 A의 매니저 → 직원B
직원 B의 매니저 → 직원C
직원 C의 매니저 → 직원A  (순환 발생)
```

- 데이터 정합성 확인
- CYCLE 감지 로직 구현
1. **깊이 제한**
    - 최대 재귀 깊이 설정
    - 성능 저하 방지

### 😁 모범 사례

1. **명확한 종료 조건**

```sql
WHERE level <= 10  -- 명시적 깊이 제한
WHERE number < 100 -- 명확한 범위 지정
```

1. **데이터 검증**

```sql
-- 순환 참조 검사
WITH RECURSIVE cycle_check AS (
    SELECT id, parent_id, ARRAY[id] as path
    FROM tree_table
    WHERE id = 1

    UNION ALL

    SELECT t.id, t.parent_id, c.path || t.id
    FROM tree_table t
    JOIN cycle_check c ON t.parent_id = c.id
    WHERE NOT t.id = ANY(c.path)
)
SELECT * FROM cycle_check;
```

1. **성능 최적화**
    - 필요한 컬럼만 선택
    - 적절한 인덱스 사용
    - 중간 결과 임시 테이블 활용

### 디버깅 팁

1. 단계별 실행 결과 확인
2. 실행 계획 분석
3. 소규모 데이터로 테스트

## 6. 결론

재귀 쿼리는 적절한 종료 조건과 성능 고려사항을 염두에 두고 구현하면 복잡한 데이터 구조를 효율적으로 처리할 수 있는 계층적 데이터 처리에 강력한 도구이다. 재귀 쿼리를 작성할 때에는 신중한 설계와 최적화가 필수적이다. 

+) 참고로 재귀 쿼리에 대한 개념은 SQLP(전문가) 시험에 나온다. 나는 SQLD까지만 땄기 때문에 책을 아무리 뒤져도 개념이 안나와서 당황했는데 생각보다 고급 개념인 것 같다.