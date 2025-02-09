---
layout: post
title: "[OpenSearch] OpenSearch DB의 이해와 활용: 검색 엔진 데이터베이스의 핵심 가이드"
excerpt: "OpenSearch"
categories:
  - Blog
tags:
  - [OpenSearch]
toc: true
toc_sticky: true
date: 2025-02-07
last_modified_at: 2025-02-09
---
## 1. 서론

최근 데이터 처리와 검색 기능의 중요성이 높아지면서 전통적인 관계형 데이터베이스만으로는 해결하기 어려운 요구사항들이 늘어나고 있다. 특히 대량의 텍스트 데이터를 효율적으로 검색하고 분석해야 하는 현대 애플리케이션에서는 특화된 검색 엔진 데이터베이스의 필요성이 대두되었다. 이러한 배경에서 OpenSearch가 주목받고 있으며, 본 글에서는 OpenSearch의 기본 개념부터 실제 구현까지 상세히 다뤄보고자 한다.

## 2. 본론

### 2.1 OpenSearch란?

OpenSearch는 AWS가 Elasticsearch를 기반으로 개발한 분산형 검색 및 분석 엔진이다. 전통적인 RDBMS와 달리 문서 지향적인 구조를 가지며, JSON 형태로 데이터를 저장한다. 특히 전문 검색(Full-text search)과 실시간 데이터 분석에 강점을 가진다.

### 2.2 주요 특징

1. 유연한 스키마
    - 정형화된 테이블 구조가 아닌 문서 기반 저장
    - 동적 스키마 지원으로 데이터 구조 변경이 자유로움
    - JSON 기반의 데이터 모델링
2. 강력한 검색 기능
    - 전문 검색 지원
    - 형태소 분석을 통한 자연어 처리
    - 퍼지 검색으로 유사 검색어 처리
    - 검색어 하이라이팅
3. 분산 처리
    - 샤딩을 통한 수평적 확장 용이
    - 고가용성을 위한 레플리카 지원
    - 대규모 데이터 처리 가능

### 2.3 OpenSearch 구현 가이드

### 2.3.1 초기 설정 및 연결

OpenSearch 클라이언트를 생성하고 연결하는 기본 코드는 다음과 같다:

```java
protected RestHighLevelClient osClient() {
    CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
    credentialsProvider.setCredentials(AuthScope.ANY,
        new UsernamePasswordCredentials(username, password));

    RestClientBuilder builder = RestClient.builder(
        new HttpHost(host, port, scheme))
        .setHttpClientConfigCallback(httpClientBuilder ->
            httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider));

    return new RestHighLevelClient(builder);
}
```

### 2.3.2 인덱스 생성 및 매핑

검색 효율을 높이기 위한 인덱스 설정과 매핑 정의:

```java
public void createIndex() throws IOException {
    CreateIndexRequest request = new CreateIndexRequest(indexName);

    // 인덱스 설정
    request.settings(Settings.builder()
        .put("index.number_of_shards", 5)
        .put("index.number_of_replicas", 2)
        .put("analysis.analyzer.nori.tokenizer", "nori_tokenizer")
    );

    // 매핑 정의
    XContentBuilder builder = XContentFactory.jsonBuilder();
    builder.startObject();
    {
        builder.startObject("properties");
        {
            builder.startObject("title");
            {
                builder.field("type", "text");
                builder.field("analyzer", "nori");
            }
            builder.endObject();
            builder.startObject("content");
            {
                builder.field("type", "text");
                builder.field("analyzer", "nori");
            }
            builder.endObject();
            builder.startObject("regDate");
            {
                builder.field("type", "date");
                builder.field("format", "yyyy-MM-dd HH:mm:ss.SSS");
            }
            builder.endObject();
        }
        builder.endObject();
    }
    builder.endObject();

    request.mapping(builder);
    client.indices().create(request, RequestOptions.DEFAULT);
}
```

### 2.3.3 검색 기능 구현

1. 기본 검색 결과 처리:

```java
protected Box getList(SearchResponse searchResponse) {
    SearchHits hits = searchResponse.getHits();
    TotalHits totalHits = hits.getTotalHits();
    long total = totalHits.value;

    Box result = new Box();
    result.put("total", total);

    List<Map<String, Object>> dataList = new ArrayList<>();
    for (SearchHit hit : hits.getHits()) {
        Map<String, Object> data = hit.getSourceAsMap();
        data.put("id", hit.getId());
        dataList.add(data);
    }
    result.put("list", dataList);
    return result;
}
```

1. 검색어 하이라이팅 처리:

```java
protected Box getHighlightList(SearchResponse searchResponse) {
    SearchHits hits = searchResponse.getHits();
    List<Map<String, Object>> dataList = Lists.newArrayList();

    for (SearchHit hit : hits.getHits()) {
        Map<String, Object> data = hit.getSourceAsMap();
        Map<String, HighlightField> highlightFields = hit.getHighlightFields();

        // 제목 하이라이팅
        HighlightField titleHighlight = highlightFields.get("title");
        if(titleHighlight != null) {
            Text[] fragments = titleHighlight.fragments();
            data.put("title", fragments[0].string());
        }

        // 내용 하이라이팅
        HighlightField contentHighlight = highlightFields.get("content");
        if(contentHighlight != null) {
            Text[] fragments = contentHighlight.fragments();
            data.put("content", fragments[0].string());
        }

        data.put("score", hit.getScore());
        dataList.add(data);
    }
    return result;
}
```

### 2.3.4 페이징 및 정렬 처리

```java
protected SearchSourceBuilder pagingSort(HashMap<String, Object> params) {
    SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();

    // 페이징 처리
    int page = Integer.parseInt((String) params.getOrDefault("page", "1"));
    int size = Integer.parseInt((String) params.getOrDefault("limit", "10"));
    int from = (page - 1) * size;

    // 정렬 처리
    String orderByField = (String) params.getOrDefault("orderByField", "regDt");
    String orderBySort = (String) params.getOrDefault("orderBySort", "desc");

    sourceBuilder.from(from);
    sourceBuilder.size(size);
    sourceBuilder.sort(new FieldSortBuilder(orderByField)
        .order("asc".equals(orderBySort) ? SortOrder.ASC : SortOrder.DESC));

    return sourceBuilder;
}
```

### 2.4 RDBMS와의 비교 및 활용

| 특성 | OpenSearch | RDBMS |
| --- | --- | --- |
| 데이터 구조 | 문서 기반 (유연함) | 테이블 기반 (고정) |
| 검색 기능 | 전문 검색, 퍼지 검색 | LIKE 검색 위주 |
| 확장성 | 수평적 확장 용이 | 수직적 확장 위주 |
| 트랜잭션 | 제한적 지원 | ACID(Atomicity, Consistency, Isolation, Durability) 완벽 지원 |
| 쿼리 방식 | REST API, JSON | SQL |
| 활용 사례 | 검색 엔진, 로그 분석 | 트랜잭션 처리 |

### 2.5 실제 활용 시나리오

1. 뉴스 검색 시스템
    - 제목, 내용 전문 검색
    - 형태소 분석을 통한 정확한 검색
    - 검색어 하이라이팅
    - 관련도 기반 정렬
2. 로그 분석 시스템
    - 대량의 로그 데이터 저장
    - 실시간 로그 검색
    - 에러 패턴 분석
3. 상품 검색 시스템
    - 상품명, 설명 검색
    - 필터링과 패싯(faceted) 검색
    - 연관 상품 추천

## 3. 결론

OpenSearch는 전문 검색과 실시간 데이터 분석이 필요한 현대 애플리케이션에서 핵심적인 역할을 수행한다. RDBMS를 완전히 대체하는 것이 아니라, 각각의 장점을 살려 상호 보완적으로 사용하는 것이 바람직하다.

특히 다음과 같은 상황에서 OpenSearch의 도입을 고려해볼 수 있다 :

- 대규모 텍스트 데이터의 검색이 필요한 경우
- 실시간 로그 분석이 필요한 경우
- 복잡한 검색 기능이 요구되는 경우
- 데이터의 규모가 지속적으로 증가하는 경우

앞으로도 데이터의 규모와 다양성이 증가함에 따라 OpenSearch와 같은 특화된 데이터베이스의 중요성은 더욱 커질 것으로 전망된다. 

### 참고 자료

- OpenSearch 공식 문서: https://opensearch.org/docs/latest/about/
- AWS OpenSearch Service 문서: https://aws.amazon.com/ko/what-is/opensearch/
- Elasticsearch Guide (OpenSearch의 기반이 된 Elasticsearch 관련 자료): https://aws.amazon.com/ko/what-is/elasticsearch/