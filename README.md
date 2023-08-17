# 부동산 거래내역 조회 및 가격 비교 서비스

### 공공데이터 국토교통부 아파트매매 실거래 상세 자료 사용

# ToDo

- 거래일자 타입 바꾸거나 포멧 바꾸기
- 외부 로그인 API (구글 or 카카오 둘 다 하면 좋음)
- 커뮤니티기능(넣을지 말지 고민중)

## Page 명세

- 메인 -> 구현✅
- 회원가입 -> 구현✅
- 로그인, 로그아웃 -> 구현✅
- 거래내역 검색 -> 구현✅
- 마이페이지 -> 구현✅
- 내 정보 수정 -> 구현✅
- 거래 상세 -> 구현✅
- 가격상승률 -> 구현✅

## DB 명세

### User

- id : number(auto)
- createdAt : DateTime
- updatedAt : DateTime
- email : string
- password : string
- nickName : string

### Like

- id : number(auto)
- createdAt : DateTime
- updatedAt : DateTime
- user : User
- Apt : Apt

### Apt

- id : number(auto)
- name : string
- dedicatedArea : number
- floor : number
- buildYear : number
- treadDate : number
- treadAmount : number
- cityCode : string
- dong : string
- roadName : string
- buildingNumber : number
- buildingMinorNumber : number
- view : number
