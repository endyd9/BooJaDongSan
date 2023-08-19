# 부동산 거래내역 조회 및 가격 비교 서비스 부자동산 [Link](https://boo-ja-dong-san.vercel.app/)

### 공공데이터 국토교통부 아파트매매 실거래 상세 자료 사용
 공공데이터 포털의 [국토교통부_아파트매매 실거래 상세 자료](https://www.data.go.kr/data/15057511/openapi.do)를 활용한 모바일 플랫폼 아파트 거래 내역 조회 및 가격 비교 서비스입니다.  
 사람들이 많이 조회하거나 많은 사람들이 관심 거래 내역으로 등록한 실거래 자료나(메인화면) 가격 상승률이 가장 높거나 매매가가 가장 높은 거래 내역(Top10)을 확인 할 수 있고,  
 검색페이지에서 아파트 이름, 평 형, 거래일자 등으로 검색조건을 통해 조회도 가능합니다.  
 거래내역 상세페이지에서는 거래일, 거래가격 등 아파트의 거래 정보와 건축년도, 주소 등 아파트의 정보를 확인 가능하고 카카오 지도를 통해 지도에서 아파트 위치를 확인 할 수 있습니다.
 

# ToDo

- undefined

## Page 명세

- 메인✅ `/`  
- 회원가입✅ `/join`  
- 로그인✅ `/login`  
- 거래내역 검색✅ `/search`  
- 마이페이지✅ `/profile/:id`  
- 내 정보 수정✅ `/profile/edit`  
- 거래 상세✅ `/apt/:id`  
- Top10✅ `/rise`

## DB 명세

### User

- id : number(auto)
- createdAt : DateTime
- updatedAt : DateTime
- email : string
- password : string
- nickName : string
- address : string
- Like : Like[]

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
- treadDate : string
- treadAmount : number
- cityCode : string
- dong : string
- roadName : string
- buildingNumber : number
- buildingMinorNumber : number
- view : number
- Like : Like[]


## 개발환경

- OS: `MacOS13`
- Editor: `VSCode`
- Language: `NodeJS(v20.4.0)`
- Framework: `Next.JS(v13.4.12)`
- DB: `Postgresql 15` & `vercel-postgres Beta`
- Deploy `Vercel` 


