---
layout: post
title: "[TroubleShooting] React, MySQL: 데이터의 일부를 수정하면  DB에서 전체를 덮어 씌우는 문제"
excerpt: "Trouble shooting: React, SQL"
categories:
  - Blog
tags:
  - [React, MySQL]
toc: true
toc_sticky: true
date: 2024-07-05
last_modified_at: 2024-07-05
---

## 문제상황:

마이페이지에서 회원 정보 수정 기능을 다룰 때, 비밀번호는 팝업창을 통해 수정하도록 했었다.

그런데 비밀번호를 업데이트할 때, 다른 사용자 정보들도 함께 업데이트되어 전체 데이터가 덮어씌워진다는 문제가 발생했다.

<img width="1168" alt="스크린샷 2024-07-05 오후 5 52 13" src="https://github.com/SejinPrk/SejinPrk/assets/150787016/1d84e147-4e1f-472e-904e-a57bb99ed517">

<img width="1054" alt="스크린샷 2024-07-05 오후 5 52 20" src="https://github.com/SejinPrk/SejinPrk/assets/150787016/d660a897-a3ab-4e07-9fdb-f8a2bc6c5d9b">

SQL 문을 날려보면 김철수에 대한 다른 정보들이 누락된 것을 볼 수 있다.

```sql

SELECT * FROM member;
```

<img width="565" alt="스크린샷 2024-07-05 오후 5 56 19" src="https://github.com/SejinPrk/SejinPrk/assets/150787016/8894f739-27d5-4d74-ad33-5790dd452a85">

## 해결방안:

1. **비밀번호 변경 기능 분리**: 비밀번호 변경은 다른 정보들과 별도로 처리되므로 비밀번호 변경 시에 사용자의 다른 정보들은 건드리지 않고 비밀번호만 업데이트할 수 있도록 백엔드에서 dto를 하나 더 만들었다.

```java
import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class MemberPasswdUpdateRequest {
    private String password;
}
```

1. **새로운 API 엔드포인트 생성**: 비밀번호 변경을 위해 별도로  `/api/v1/members/{memberId}/passwordUpdate` 라는 API 엔드포인트를 컨트롤러에 추가했다.

```java
    @Operation(summary = "멤버 비밀번호 수정")
    @PatchMapping("/{id}/passwordUpdate")
    public ResponseEntity<Void> updateMemberPasswd(@PathVariable("id") final Integer memberId, @RequestBody final MemberPasswdUpdateRequest request) {
        memberService.updatePasswd(memberId, request);
        return ResponseEntity.noContent().build();
    }
```

1. **프론트엔드 수정**: React 코드를 수정하여, MyInformation과 passwordSchema를 분리했다.

```java

import * as yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

// 비밀번호 유효성 검사 스키마
export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .required("비밀번호는 필수 입력 사항입니다."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
});

const MySwal = withReactContent(Swal);

// 비밀번호 변경 처리 함수
export const handleChangePassword = async () => {
  const { value: formValues } = await MySwal.fire({
    title: '새 비밀번호 입력',
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="비밀번호 입력" type="password">' +
      '<input id="swal-input2" class="swal2-input" placeholder="비밀번호 재확인" type="password">',
    focusConfirm: false,
    preConfirm: () => {
      return {
        password: document.getElementById('swal-input1').value,
        passwordConfirm: document.getElementById('swal-input2').value
      };
    }
  });

  if (formValues) {
    try {
      // 입력 받은 값들을 yup 스키마로 유효성 검사
      await passwordSchema.validate(formValues, { abortEarly: false });
      // 비밀번호 변경 API 호출
      const memberId = 1; // 혹은 다른 방식으로 회원 ID 가져오기
      const response = await axios.patch(`http://localhost:8080/api/v1/members/${memberId}/passwordUpdate`, {
        password: formValues.password
      });
      // 유효성 검사 통과 시 SweetAlert2로 성공 메시지 표시
      MySwal.fire({
        icon: 'success',
        title: '성공',
        text: '비밀번호가 성공적으로 변경되었습니다!',
      });
      // TODO: 여기에 비밀번호 변경 API 호출 로직 추가
    } catch (err) {
      // 유효성 검사 실패 시 각 입력 필드에 대한 오류 메시지를 표시
      const errors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});

      MySwal.fire({
        icon: 'error',
        title: '오류',
        html: Object.values(errors).join('<br>'),
      });
    }
  }
};

const MyComponent = () => {
  return (
    <div>
      {/* 비밀번호 변경 버튼 */}
      <button
        type="button"
        className="px-4 py-2 bg-[#E8C5A5] text-black rounded-md focus:outline-none"
        onClick={handleChangePassword}
      >
        비밀번호 변경
      </button>
    </div>
  );
};

export default MyComponent;
```

그리고 기존의 내 정보 컴포넌트에 passwordSchema를 임포트해줬다.

```java
// 내 정보 수정
import React, { useState, useEffect } from 'react';
// 팝업창, 모달: sweetalert 적용
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useForm } from 'react-hook-form';
// 유효성 검사: yup 적용
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// 비밀번호 변경 컴포넌트 임포트
import { handleChangePassword } from './PasswordSchema';
// ImageUpload 컴포넌트 임포트
import ImageUpload from '../../components/ImageUpload';
// 도로명 주소 모달 임포트
import AddressModal from '../../components/OAuth/AddressModal';
// axios 임포트
import axios from 'axios';

const MySwal = withReactContent(Swal);

// 유효성 검사
const schema = yup.object().shape({
  name: yup.string().required("이름은 필수 입력 사항입니다."),
  nickname: yup.string().required("닉네임은 필수 입력 사항입니다."),
  email: yup.string().email("올바른 이메일 주소를 입력해주세요.").required("이메일은 필수 입력 사항입니다."),
  phoneNumber: yup
    .string()
    .required("전화번호는 필수 입력 사항입니다."),
  address: yup.string().required("주소는 필수 입력 사항입니다."),
  birth: yup.date().required("생년월일은 필수 입력 사항입니다."),
});

const MyInformation = () => {
  // 유효성 검사
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState("");
  const [birth, setBirth] = useState("");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // 회원 정보 불러오기
  useEffect(() => {
    const memberId = 1; // 임의로 지정한 ID, 실제로는 로그인 정보에서 가져와야 함

    axios.get(`http://localhost:8080/api/v1/members/${memberId}`)
      .then(response => {
        const memberData = response.data;
        setValue('name', memberData.name);
        setValue('nickname', memberData.nickname);
        setValue('phoneNumber', memberData.phoneNumber);
        setValue('address', memberData.address);
        setValue('birth', memberData.birth);
        setValue('email', memberData.email);
        setValue('profile', memberData.profile);
      })
      .catch(error => {
        console.error('There was an error fetching the member data!', error);
      });
  }, [setValue]);

    // 업데이트된 정보를 서버로 보내는 함수
    const saveInformation = () => {
      const memberId = localStorage.getItem('memberId');
      const updatedData = {
        name: name,
        nickname: nickname,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        profile: profile,
        birth: birth,
        password: password,
        // 기타 필요한 정보들도 동일하게 추가
      };

      axios.patch(`http://localhost:8080/api/v1/members/${memberId}`, updatedData)
        .then(response => {
          console.log('User information updated successfully:', response.data);
          // 저장 후 필요한 작업 추가
        })
        .catch(error => {
          console.error('Error updating user information:', error);
        });
    };

    // 회원 정보 저장(제출)
    const [isFormValid, setIsFormValid] = useState(false);

    const onSubmit = async (data) => {
      try {
        const memberId = 1; // 임의로 지정한 ID
        await axios.patch(`http://localhost:8080/api/v1/members/${memberId}`, data);
        MySwal.fire({
          title: "회원 정보를 저장했습니다",
          icon: "success",
          confirmButtonText: "확인",
        });
        console.log('회원 정보가 성공적으로 업데이트되었습니다.');
        // 성공 메시지 또는 리다이렉션 등 추가적인 로직
      } catch (error) {
        console.error('회원 정보 업데이트 중 오류가 발생했습니다:', error);
        // 실패 시 처리 로직
      }
    };

    // 닉네임 중복 검사
    const handleCheckDuplicate = () => {
      if (nickname === "existingNickname") {
        MySwal.fire({
          title: "중복 확인 결과",
          text: "이미 사용중인 닉네임입니다.",
          icon: "warning",
          confirmButtonText: "확인",
        });
      } else {
        MySwal.fire({
          title: "중복 확인 결과",
          text: "사용 가능한 닉네임입니다.",
          icon: "success",
          confirmButtonText: "확인",
        });
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValue(name, value); // react-hook-form의 setValue로 입력 필드 상태 업데이트

      if (name === 'phoneNumber') {
        let formattedValue = value.replace(/[^0-9]/g, '');
        if (formattedValue.length > 3 && formattedValue.length <= 7) {
          formattedValue = formattedValue.replace(/(\d{3})(\d+)/, '$1-$2');
        } else if (formattedValue.length > 7) {
          formattedValue = formattedValue.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
        }
        setValue('phoneNumber', formattedValue);
        setPhoneNumber(formattedValue);
      }

      // 모든 필수 입력 필드에 값이 있는지 확인
      const formData = getValues(); // useForm 훅에서 추출한 getValues 함수 사용
      setIsFormValid(schema.isValidSync(formData)); // yup 스키마에 따라 유효성 검사 수행
    };

    // 주소 검색 모달 열기
    const handleAddressSearch = () => {
      setIsAddressModalOpen(true);
    };

    // 주소 선택 처리
    const handleAddressSelect = (selectedAddress) => {
      setValue('address', selectedAddress);
      setAddress(selectedAddress);
      setIsAddressModalOpen(false);
    };

    const handleAddressComplete = (newAddress) => {
      setValue('address', newAddress);
      setAddress(newAddress);
      setIsAddressModalOpen(false);
    };

    // 이미지 변경
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        console.log('Selected image:', file);
      }
    };

    return (
      <div className="max-h-screen overflow-y-auto p-4">
        <h1 className="text-3xl font-bold mb-5">회원 정보 수정</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="block mb-1">이름</label>
            <div className="flex space-x-4">
              <input
                type="text"
                name="name"
                {...register("name")}
                onChange={handleInputChange}
                placeholder="이름"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block mb-1">닉네임</label>
            <div className="flex space-x-2">
              <input
                type="nickname"
                name="nickname"
                placeholder="닉네임"
                {...register("nickname")}
                onChange={handleInputChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="px-4 py-2 bg-[#E8C5A5] text-black rounded-md focus:outline-none"
                onClick={handleCheckDuplicate}
              >
                중복확인
              </button>
            </div>
            {errors.nickname && (
              <p className="text-red-500">{errors.nickname.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block mb-1">비밀번호</label>
            <button
              type="button"
              name="password"
              {...register("password")}
              className="px-4 py-2 bg-[#E8C5A5] text-black rounded-md focus:outline-none"
              onClick={handleChangePassword}
            >
              비밀번호 변경
            </button>
          </div>
          <div className="mb-3">
            <label className="block mb-1">이메일 주소</label>
            <div className="flex space-x-2">
              <input
                type="email"
                name="email"
                {...register("email")}
                placeholder="xxxx@xxxx.com"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <button
                type="button"
                className="px-4 py-2 bg-[#E8C5A5] text-black rounded-md focus:outline-none"
              >
                인증
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="block mb-1">전화번호</label>
            <input
              type="text"
              name="phoneNumber"
              {...register("phoneNumber")}
              onChange={handleInputChange}
              placeholder="전화번호는 숫자로만 입력해주세요('-'제외)"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block mb-1">주소</label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="address"
                {...register("address")}
                value={address}
                placeholder="주소를 검색해주세요"
                readOnly
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="px-4 py-2 bg-[#E8C5A5] text-black rounded-md focus:outline-none"
                onClick={handleAddressSearch}
              >
                {address ? "주소 재검색" : "주소 검색"}
              </button>
            </div>
            {errors.address && (
              <p className="text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="block mb-1">생년월일</label>
            <input
              type="date"
              name="birth"
              {...register("birth")}
              onChange={handleInputChange}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <label className="block mb-1">프로필 사진</label>
          <ImageUpload onImageChange={handleImageChange} />
          <div className="mb-3">
            <label className="block mb-1">소개</label>
            <div className="flex space-x-4">
              <textarea
                name="profile"
                type="profile"
                placeholder="소개를 작성해주세요."
                {...register("profile")}
                className="w-2/3 h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 bg-[#43312A] text-white rounded-md hover:bg-yellow-700 ${
                Object.keys(errors).length !== 0 &&
                "opacity-50 cursor-not-allowed"
              }`}
              disabled={Object.keys(errors).length !== 0}
            >
              저장
            </button>
          </div>
          {/* 도로명 주소 */}
          <AddressModal
            visible={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            onComplete={handleAddressComplete}
          />
        </form>
        {/* 페이지 하단에 여백주기 */}
        <div className="mt-8 pb-8"></div>
      </div>
    );
}

export default MyInformation;
```

## 결과

비밀번호가 성공적으로 변경되었고 다른 요소들을 덮어씌우지 않는다! 🥳🥳

<img width="1079" alt="스크린샷 2024-07-05 오후 6 16 30" src="https://github.com/SejinPrk/SejinPrk/assets/150787016/96b88a70-f45d-4b8b-bff1-c33603aecbfd">

기존 비번: $2a$10$umqRfxN53GHqOUXD8I37vuYI9s0pesTTSTIqqbpqfNcOW9mu2r9nG

변경된 비번: $2a$10$29G27qYRR4D..RyjcIXbEO.4X/ioK4DizaW5PFFa2fjq/LFYx1XRq

### +추가) 변경해도 비밀번호의 앞부분이 항상 $2a$10$인 이유는 아래와 같다.

(출처: chatGPT)

"$2a$10$"은 bcrypt 해시 함수에서 생성된 해시 문자열의 시작 부분입니다.

bcrypt는 암호 해싱 함수로, 비밀번호와 같은 중요한 데이터를 안전하게 저장하기 위해 사용됩니다.

이 함수는 해시된 비밀번호와 함께 솔트(salt)를 사용하여 보안을 강화합니다.

해시된 비밀번호의 형식은 보통 다음과 같습니다: "$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 여기서 "x"는 실제 해시된 비밀번호를 나타냅니다.

- **"$2a$10$"**: 이 부분은 해시 알고리즘의 버전 및 솔트와 관련된 정보를 포함합니다.
- **실제 해시된 비밀번호**: 이 부분은 입력된 비밀번호를 기반으로 생성된 해시값입니다.

bcrypt는 강력한 해시 함수로 알려져 있으며, 높은 보안 수준을 제공합니다. 솔트를 사용하여 레인보우 테이블 공격과 같은 일반적인 해시 공격을 방지하고, 해시된 결과물의 길이가 일정하여 두 개의 동일한 비밀번호가 같은 해시값을 가지는 경우를 방지합니다.

따라서 "$2a$10$"은 bcrypt 해시 함수의 정규 형식이며, 이를 통해 안전하고 신뢰할 수 있는 비밀번호 보안을 유지할 수 있습니다.