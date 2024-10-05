---
layout: post
title: Postman을 이용해 ChatGPT(Open AI) API 사용하기
excerpt: "Postman 활용"
categories:
  - Blog
tags:
- postman
- api
toc: true
toc_sticky: true
date: 2024-10-04
last_modified_at: 2024-10-05
---

Postman을 사용해서 Rest 방식으로 간단하게 챗 gpt의 API를 호출해서 사용하는 방식을 알아보려고 한다.

# 1. Key 받아오기

[OpenAI의 홈페이지](https://platform.openai.com/chat-completions)에 들어가면 개발자 공간이 있는데, 대시보드에서 새 시크릿 API 키를 발급받을 수 있다.

![%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2024-10-04_141544](https://github.com/user-attachments/assets/2d2db653-b5a3-4a6c-8370-bf114f1c6580)


키는 한 번 발급받으면 다시 볼 수 없으니 미리 메모장 같은 곳에 저장해두는 게 좋다.

# 2. post 요청 URL

URL: [https://api.openai.com/v1/chat/completions](https://api.openai.com/v1/chat/completions) 

경로를 정확히 이렇게 설정한 후 POST 요청으로 변경한다.

![%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2024-10-04_141726](https://github.com/user-attachments/assets/d8a51041-ee6d-4b55-9f3c-2ff6763ca726)


# 3. Header 설정

먼저 Authorization에는 값으로 <Bearer $API_KEY>를 입력해준다.

Bearer 사이에 한 칸 띄워야 한다!

콘텐츠 타입은 application/json이다.

| key | value |
| --- | --- |
| Authorization | Bearer {api 키 값} |
| Content-Type | application/json |

![%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2024-10-04_143435](https://github.com/user-attachments/assets/df2efe52-863e-4b47-a487-525e2f21a65e)


# 4. Body 설정

헤더 세팅을 완료했으면 바디는 raw data로 두고 예시 값을 넣어둔다. 

chatGPT가 알려준 값을 그대로 넣었다.

```json
{
    "model": "gpt-3.5-turbo",
    "messages": [
        {
            "role": "user",
            "content": "Hello, how can I use the ChatGPT API?"
        }
    ],
    "temperature": 0.7
}

```

# 5. API 호출

다 완료되었으면 send를 눌러 API가 정상적으로 호출되는지 확인해볼 수 있다.

아래처럼 긴 결과값이 나오면 정상이다.

```json
{
    "id": "chatcmpl-AEUWYzcUeSS01hRp1fnVwvpWquO9P",
    "object": "chat.completion",
    "created": 1728017290,
    "model": "gpt-3.5-turbo-0125",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "To use the ChatGPT API, you will need to sign up for an API key from OpenAI, the organization behind ChatGPT. Once you have obtained your API key, you can make requests to the API using HTTP requests. Here is a general overview of how to use the ChatGPT API:\n\n1. Get your API key: Sign up on the OpenAI website and get your API key.\n\n2. Make API requests: You can make API requests using various programming languages like Python, JavaScript, etc. Here is an example of how to make a request in Python using the requests library:\n\n```python\nimport requests\n\napi_key = 'YOUR_API_KEY'\nurl = 'https://api.openai.com/v1/engines/davinci/completions'\nheaders = {\n    'Content-Type': 'application/json',\n    'Authorization': f'Bearer {api_key}'\n}\ndata = {\n    'prompt': 'Once upon a time',\n    'max_tokens': 100\n}\nresponse = requests.post(url, headers=headers, json=data)\n\nprint(response.json())\n```\n\n3. Handle the API response: The API response will contain the generated text based on the prompt you provided. You can then use this generated text in your application as needed.\n\nKeep in mind that there are limits on the number of API requests you can make, so be sure to check OpenAI's documentation for more details on usage limits and pricing.",
                "refusal": null
            },
            "logprobs": null,
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 19,
        "completion_tokens": 291,
        "total_tokens": 310,
        "prompt_tokens_details": {
            "cached_tokens": 0
        },
        "completion_tokens_details": {
            "reasoning_tokens": 0
        }
    },
    "system_fingerprint": null
}
```

## * 참고: insufficient quota 에러 발생 시 대처법

```json
{
    "error": {
        "message": "You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.",
        "type": "insufficient_quota",
        "param": null,
        "code": "insufficient_quota"
    }
}
```

![%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2024-10-04_143005](https://github.com/user-attachments/assets/185c9c50-d978-42a3-aeb0-cb8e939743af)


GPT 3.5버전의 API를 받아오기 위해 새로 open AI 계정도 팠으나 현재 사용 중인 요금제가 할당된 쿼터를 초과했다는 에러 메세지가 자꾸만 떴다. 

이유를 찾아보니 결제 수단을 등록하지 않아서였다.

현재 0으로 설정되어 있는 license limit을 올리도록 카드를 등록하고 5달러 + 수수료 0.5달러까지 충전하고 나면 그 뒤로 결과값이 잘 나온다.

![%ED%99%94%EB%A9%B4_%EC%BA%A1%EC%B2%98_2024-10-04_142153](https://github.com/user-attachments/assets/6267813f-0d02-463a-b0bf-42a47b17fc40)
