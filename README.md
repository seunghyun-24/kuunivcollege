# Course Management and Visualization System

---

## 프로젝트 설명

이 프로젝트는 고려대학교 학부대학 학생이 선택할 수 있는 43개 학과의 이수 체계도를 관리하고 시각화하는 시스템입니다. 학과별 데이터를 변환, 처리한 후 간단히 시각적으로 렌더링하는 기능을 제공합니다. Python 스크립트를 사용하여 데이터를 처리하며, React 기반 UI를 통해 사용자가 데이터를 쉽게 탐색할 수 있도록 합니다. 학교 자료 및 학과 행정실을 통해 제공받은 공식적인 자료를 통해 제작한 자료입니다. 학과별로 개별적인 전공 및 교양 이수 선택 사항과 전공 인정에 대한 정보가 누락되어 있을 수 있으니, 자세한 사항은 학과 홈페이지를 참고하시기 바랍니다.

---

## 프로젝트 구조

### 1. 데이터 처리

데이터 변환 및 처리와 관련된 스크립트와 파일이 포함됩니다. Raw Data는 csv형식 혹은 xsls 형식으로 제작되어야 하며, 데이터 편집 후 `(사용한 데이터 형식)_to_json.py`코드를 실행합니다. 정상적으로 course_filse에 Json파일로 변환된 것을 확인한 뒤, `process_course.py`를 실행합니다.

필요한 데이터 구조 및 정보가 변환된 경우, 각 `(사용한 데이터 형식)_to_json.py`코드와 `process_course.py`가 변환되어야 합니다.

\types의 `Course.ts`를 참고하여 데이터 구조를 변환하십시오.

```
change_process
├─ course_csv     # Raw Data
│  ├─ 00_정보대학_컴퓨터학과.csv
│  ├─ ...
│  └─ 42_심리학부_심리학부.csv
├─ course_files   # 변환된 JSON 파일 (렌더링 전 상태)
│  ├─ 건축사회환경공학부.json
│  ├─ ...
│  └─ 환경생태공학부.json
├─ course_xsls    # Raw Data
│  ├─ 00_정보대학_컴퓨터학과_updated.xlsx
│  ├─ ...
│  └─ 42_심리학부_심리학부_updated.xlsx
├─ csv_to_json.py       #course_csv -> course_files
├─ process_course.py    #JSON 데이터를 렌더링 용도로 변환
└─ xsls_to_json.py      #course_xsls -> course_files
```

---

### 2. 데이터 시각화

React를 사용하여 개발된 프론트엔드 UI 코드가 포함됩니다.
\assets\collegeInfo와 \assets에서 필요한 이미지 및 학과 사이트, 교육 정보를 편집할 수 있습니다. 데이터 처리 후 최종적으로 렌더링에 사용되는 Json 파일은 \assets\college에 저장되고 있습니다.

```
src
├─ App.test.tsx
├─ App.tsx
├─ assets
│ ├─ black2positive.gif
│ ├─ college         # 랜더링에 사용되는 Json 파일
│ │ ├─ 건축사회환경공학과.json
│ │ ├─ ...
│ │ └─ 환경생태공학부.json
│ ├─ collegeInfo     # 각 단과대 별 세부적인 정보 저장
│ │ ├─ collegeLogo   # 단과대학 심볼
│ │ │ ├─ 경영대학.jpg
│ │ │ ├─ ...
│ │ │ └─ 심리학부.jpg
│ │ ├─ roadmap       # 일부 학과들만 roadmap 이미지 제공
│ │ │ ├─ 건축사회환경공학부.png
│ │ │ ├─ ...
│ │ │ └─ 화공생명공학과.png
│ │ ├─ 건축사회환경공학부.json
│ │ ├─ ...
│ │ └─ 환경생태공학부.json
│ ├─ logo.png
│ └─ logo_uc.svg
├─ components
│ ├─ DownloadButton.tsx
│ ├─ Footer.tsx
│ ├─ GraphRenderer.tsx
│ ├─ Header.tsx
│ ├─ ImageSlider.tsx
│ ├─ InformationBox.tsx
│ ├─ MainContent.tsx
│ ├─ SelectionBar.tsx
│ └─ SideBar.tsx
├─ index.css
├─ index.tsx
├─ logo.svg
├─ react-app-env.d.ts
├─ reportWebVitals.ts
├─ setupTests.ts
├─ styles
│ ├─ App.css
│ ├─ CustomNode.tsx
│ ├─ Footer.module.css
│ ├─ GroupNode.tsx
│ ├─ Header.module.css
│ ├─ ImageSlider.css
│ ├─ MainContent.module.css
│ ├─ ReactFlowStyles.css
│ ├─ SelectionBar.module.css
│ └─ SideBar.module.css
├─ types
│ ├─ Course.ts
│ └─ Graph.ts
└─ utils
   ├─ calculateRelationCourses.ts
   └─ layoutEngine.ts
```

## 주요 기능

1. **데이터 변환 및 처리**:

   - CSV 또는 Excel 데이터를 JSON으로 변환.
   - 학과별 이수 체계 데이터를 효율적으로 관리.

2. **데이터 시각화**:

   - React와 `react-flow` 라이브러리를 사용하여 학과별 그래프를 시각적으로 렌더링.

3. **사용자 인터페이스**:

   - 학과 선택, 정보 조회, 변환된 데이터를 이미지로 다운로드 기능 제공.

---

## 기술 스택

- 프론트엔드: React, TypeScript, React-Flow, Bootstrap
- 백엔드/데이터 처리: Python, Pandas
- 스타일링: CSS Modules
- 빌드 도구: Webpack

## 유지보수 및 업데이트

- Python Scripts: 데이터 형식이 변경될 경우 관련 Python 스크립트를 업데이트해야 합니다.
- React Components: 새로운 기능 추가 시 컴포넌트를 생성하거나 기존 코드를 수정.
- 코드 수정과 관련된 자세한 문의는 제작자 https://github.com/seunghyun-24
- 자료와 관련된 문의는 학부대학 행정실에 하시길 바랍니다.
