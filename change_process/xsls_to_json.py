import os
import pandas as pd
import json

folder_path = "./course_xsls"
output_folder = "./course_files"  

os.makedirs(output_folder, exist_ok=True)

for file_name in os.listdir(folder_path):
    if file_name.endswith(".xlsx"):
        try:
            _, _, department, _ = file_name.split("_")
            department_name = department.split(".")[0]  # 확장자 제거
        except ValueError:
            print(f"파일 이름 {file_name}은 예상 형식과 다릅니다. 스킵합니다.")
            continue
        
        file_path = os.path.join(folder_path, file_name)

        try:
            df = pd.read_excel(file_path)
            df = df.where(pd.notnull(df), None)
            data = df.to_dict(orient="records")
            
            json_path = os.path.join(output_folder, f"{department_name}.json")
            with open(json_path, "w", encoding="utf-8") as json_file:
                json.dump(data, json_file, ensure_ascii=False, indent=4)
            
            print(f"{file_name} -> {department_name}.json 변환 완료")
        except Exception as e:
            print(f"파일 {file_name} 처리 중 오류 발생: {e}")