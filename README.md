## 🎬 기능 구현 영상
<a href="https://www.youtube.com/watch?v=GjIuis9ayFw" target="_blank" rel="noopener noreferrer">
  <img src="https://img.youtube.com/vi/GjIuis9ayFw/hqdefault.jpg" width="480" height="270" alt="유튜브 썸네일" />
</a>

<br/>

## 🙋 프로젝트 소개
- **주제:**
  View My Startup

- **프로젝트 기간:**
 2025.03.21 ~ 2025.04.10

- **프로젝트 목적**
  - 데이터 중심 웹 애플리케이션 설계/개발
  - 기업 데이터 분석 및 필터링
  - 가상 투자 기능 구현
 
- **프로젝트 기대효과**
  - 스타트업 투자 정보 분산 문제 해결 → 한곳에서 스타트업 정보를 직관적으로 확인 가능
  - 기업 비교 기능 → 여러 스타트업을 기준별로 쉽게 비교할 수 있음 (예: 투자 금액 등)
  - 데이터 시각화 및 요약 정보 제공 → 복잡한 정보를 시각적으로 쉽게 이해 가능
  - 비전문가도 참여할 수 있는 투자 시뮬레이션 → 투자 진입 장벽을 낮춰 더 많은 유저 확보 가능
  
- **기능**
  - MainFullList: 기업 전체 리스트 조회 Page
  - SelectCompany > CompareResult: 나의 기업 비교 선택 Page > 비교 결과 Page
  - InvestStatus: 투자 현황 Page
  - CompareStatus: 비교 현황 Page
  - CompanyDetail: 기업 상세 Page

    <br/>
    
## ⚙️ 기술 스택

- **Language**

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?style=flat&logo=styled-components&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

- **Framework & Libraries**

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Netlify Status](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)
![React Router](https://img.shields.io/badge/React--Router--DOM-CA4245?style=flat&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-orange?style=flat)

<br/>

## 🔗 배포 주소
- **client url:** https://view-my-startup-seven.vercel.app/
- **server url:** https://view-my-startup-waqg.onrender.com

<br/>

## 💾 원본 레포지토리 
https://github.com/6th-ViewMyStartup-5team-FS/FS

  <br/>
  
## 🏷️ 작업공간
- https://zest-kitchen-ec0.notion.site/1bd7be15f9c880c8a9bee89cee58b9dc?v=1bd7be15f9c881a29670000c4644aaee&pvs=4

<br/>

## 🧑‍💻 팀원
- 최지예(팀장) https://github.com/kongduu
- 김다은 https://github.com/fs6-kde
- 김수경 https://github.com/suKyoung25
- 이나경 https://github.com/nagyeong05
- 신수민 https://github.com/Shinmilli

<br/>

## 📁 파일 구조

<pre><code>
FS/
├── client/ # 프론트엔드 (React + Vite)
│ ├── node_modules/
│ ├── public/ # 정적 파일 (필요 시)
│ ├── src/
│ │ ├── api/ # API 호출 함수 모음 (ex. axios)
│ │ ├── assets/ # 이미지, 아이콘 등 정적 리소스
│ │ ├── components/ # 공통 컴포넌트
│ │ ├── hooks/ # 커스텀 훅
│ │ ├── pages/ # 라우팅되는 페이지 컴포넌트
│ │ ├── styles/ # 전역 및 모듈 스타일
│ │ ├── App.jsx # 루트 컴포넌트
│ │ ├── main.jsx # 앱 엔트리포인트
│ │ └── routes.jsx # 라우터 설정
│ ├── .gitignore
│ ├── index.html
│ ├── vite.config.js # Vite 설정 파일
│ ├── netlify.toml # 배포 설정 (Netlify)
│ ├── package.json
│ └── README.md

├── server/ # 백엔드 (Node.js + Express + Prisma)
│ ├── https/ # REST API 테스트용 HTTP 파일
│ ├── node_modules/
│ ├── src/
│ │ ├── db/
│ │ │ └── prisma/
│ │ │ ├── client.prisma.js
│ │ │ ├── schema.prisma
│ │ │ └── seed.js
│ │ ├── modules/ # 기능별 모듈(라우터)
│ │ │ ├── companies.module.js
│ │ │ ├── investments.module.js
│ │ │ ├── rankings.module.js
│ │ │ └── resultCompares.module.js
│ │ ├── app.js  
│ │ └── exceptions.js  
│ ├── .gitignore
│ ├── package.json
│ └── README.md
├── node_modules/  
├── .gitignore
├── package.json  
├── package-lock.json
└── README.md
</code></pre>
