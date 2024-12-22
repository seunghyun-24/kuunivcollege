import json

# 학과 리스트
departments = [
   "미디어학부"
]

# 기본 JSON 구조
base_json = {
    "university": "미디어학부",
    "logo": "미디어학부.jpg",
    "homepage": "",
    "roadmap": ""
}

# 학과별 JSON 파일 생성
for department in departments:
    department_json = base_json.copy()
    department_json["department"] = department
    # 파일명에 학과명을 사용하여 저장
    filename = f"{department}.json"
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(department_json, file, ensure_ascii=False, indent=4)

print("모든 학과에 대한 JSON 파일이 생성되었습니다!")