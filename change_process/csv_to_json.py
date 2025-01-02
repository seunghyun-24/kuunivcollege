# csv 파일을 json 파일로 변환하는 코드입니다.

import pandas as pd
import re
import os

# 처리할 CSV 파일 이름 리스트 (43개 학과)
csv_files = [
    # "00_정보대학_컴퓨터학과.csv",
    # "01_경영대학_경영학과.csv",
    # "02_문과대학_국어국문학과.csv",
    # "03_문과대학_철학과.csv",
    # "04_문과대학_한국사학과.csv",
    # "05_문과대학_사학과.csv",
    # "06_문과대학_사회학과.csv",
    # "07_문과대학_한문학과.csv",
    # "08_문과대학_영어영문학과.csv",
    # "09_문과대학_독어독문학과.csv",
    # "10_문과대학_불어불문학과.csv",
    # "11_문과대학_중어중문학과.csv",
    # "12_문과대학_노어노문학과.csv",
    # "13_문과대학_일어일문학과.csv",
    # "14_문과대학_서어서문학과.csv",
    # "15_문과대학_언어학과.csv",
    # "16_생명과학대학_생명과학부.csv",
    # "17_생명과학대학_생명공학부.csv",
    # "18_생명과학대학_식품공학과.csv",
    # "19_생명과학대학_환경생태공학부.csv",
    # "20_생명과학대학_식품자원경제학과.csv",
    # "21_정경대학_정치외교학과.csv",
    # "22_정경대학_경제학과.csv",
    # "23_정경대학_통계학과.csv",
    # "24_정경대학_행정학과.csv",
    # "25_이과대학_수학과.csv",
    # "26_이과대학_물리학과.csv",
    # "27_이과대학_화학과.csv",
    # "28_이과대학_지구환경과학과.csv",
    "29_공과대학_화공생명공학과.csv",
    "30_공과대학_신소재공학부.csv",
    # "31_공과대학_건축사회환경공학부.csv",
    # "32_공과대학_기계공학부.csv",
    # "33_공과대학_산업경영공학부.csv",
    "34_공과대학_전기전자공학부.csv",
    # "35_국제대학_국제학부.csv",
    # "36_국제대학_글로벌한국융합학부.csv",
    # "37_미디어대학_미디어학부.csv",
    # "38_보건과학대학_바의오의공학부.csv",
    # "39_보건과학대학_바이오시스템의과학부.csv",
    # "40_보건과학대학_보건환경융합과학부.csv",
    # "41_보건과학대학_보건정책관리학부.csv",
    # "42_심리학부_심리학부.csv"
]

input_directory = "./course_csv"
output_directory = "./course_files"
os.makedirs(output_directory, exist_ok=True)

for csv_file in csv_files:
    try:
        csv_file_path = os.path.join(input_directory, csv_file)
        
        #data = pd.read_csv(csv_file, encoding='euc-kr')
        data = pd.read_csv(csv_file_path, encoding='utf-8')  

        json_data = data.to_json(orient='records', force_ascii=False, indent=4)
        
        department_name = re.search(r"_([^_]+)\.csv", csv_file).group(1)

        json_file_name = f"{department_name}.json"
        json_file_path = os.path.join(output_directory, json_file_name)

        with open(json_file_path, "w", encoding="utf-8") as json_file:
            json_file.write(json_data)

    except Exception as e:
        print(f"파일 처리 중 오류 발생: {csv_file}, 오류: {e}")
