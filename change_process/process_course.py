import json
import os

node_height = 50
node_spacing = 50
node_colors = {
    "학문의기초": "#f8f8f8",
    "교양필수": "#C8E6C9",
    "교양선택": "#f8f8f8",
    "전공필수": "#D1C4E9",
    "전공선택": "#f8f8f8",
    "전공필수선택" : "#FFD180",
    "전공인정": "#FFFFFF",
    "기타": "#FFFFFF",
}
node_line_colors = {
    "학문의기초": "#ff3c3c",
    "교양필수": "#92c3a5",
    "교양선택": "#F8BBD0",
    "전공필수": "#9a49c2",
    "전공선택": "#8f8f8f",
    "전공필수선택" : "#dbaf64",
    "전공인정": "#8f8f8f",
    "기타": "#ccc",
}

def calculate_x_position(학년, 학기):
    if 학기 is None  or 학기 == 0 or 학기 == 'NaN':
        학기 = 1.5
    if 학년 is None or 학년 == 0 or 학년 == 'NaN':
        학년 = 1 
    return 학년 * 440 + ((학기) - 1) * 220

def create_year_and_semester_nodes():
    year_nodes = []
    semester_nodes = []
    
    for 학년 in range(1, 5):  # Assuming 4 years
        year_node = {
            "id": f"year-{학년}",
            "position": {"x": calculate_x_position(학년, 1), "y": -120},  
            "data": {"label": f"{학년}학년"},
            "type": "yearNode",
            "style": {
                "borderRadius": "10px",
                "fontWeight": "bold",
                "padding": "15px",
            },
        }
        year_nodes.append(year_node)

        for 학기 in [1, 2]:
            semester_node = {
                "id": f"semester-{학년}-{학기}",
                "position": {"x": calculate_x_position(학년, 학기), "y": -90},
                "data": {"label": f"{학기}학기"},
                "type": "semesterNode",
                "style": {
                    "borderRadius": "10px",
                    "padding": "10px",
                },
            }
            semester_nodes.append(semester_node)
    
    return year_nodes + semester_nodes

def parse_courses(courses):
    nodes = create_year_and_semester_nodes()
    x_groups = {}
    zero_semester_nodes = []

    for course in courses:
        x = calculate_x_position(course["학년"], course["학기"])
        if x not in x_groups:
            x_groups[x] = []
        x_groups[x].append(course)

    for x, group_courses in x_groups.items():
        current_y = 0
        for index, course in enumerate(group_courses):
            color = node_colors.get(course["구분"], node_colors["기타"])
            line_color = node_line_colors.get(course["구분"], node_line_colors["기타"])
            node = {
                "id": course["학수번호"],
                "position": {
                    "x": int(x),
                    "y": current_y + index * (node_height + node_spacing),
                },
                "data": {
                    "label": course["교과목명"],
                    "학수번호": course["학수번호"],
                    "세부전공": course["세부전공"],
                    "전공역량": course["전공역량"],
                    "개설학과": course["개설학과"],
                    "개설횟수": course["개설횟수"],
                    "내용": course["내용"],
                    "메모": course["메모"],
                    "syllabus_kr": course["syllabus_kr"],
                },
                "type": "customNode",
                "sourcePosition": "Right",
                "targetPosition": "Left",
                "style": {
                    "backgroundColor": color,
                    "border": f"2px solid {line_color}",
                    "borderRadius": "5px",
                    "padding": "10px"
                },
            }
            if (course["학기"] == 0 or course["학기"] == 'null'):
                zero_semester_nodes.append(node)
            else:
                nodes.append(node)

    for zero_node in zero_semester_nodes:
        학년 = int(zero_node["id"].split("-")[0])
        first_semester_x = calculate_x_position(학년, 1)
        second_semester_x = calculate_x_position(학년, 2)

        first_y = [
            node["position"]["y"] for node in nodes if node["position"]["x"] == first_semester_x
        ]
        second_y = [
            node["position"]["y"] for node in nodes if node["position"]["x"] == second_semester_x
        ]

        max_y = max(max(first_y, default=0), max(second_y, default=0))

        zero_node["position"] = {
            "x": (first_semester_x + second_semester_x) / 2,  
            "y": max_y + node_height + node_spacing,        
        }
        nodes.append(zero_node)

    edges = []
    for course in courses:
        if course.get("필수선수"):
            for prerequisite in course["필수선수"].split("|"):
                edges.append({
                    "id": f"required-{prerequisite}-{course['학수번호']}",
                    "source": prerequisite,
                    "target": course["학수번호"],
                    "type": "step",
                    "data": {"type": "required"},
                    "markerEnd": {"type": "ArrowClosed"},
                })
        if course.get("권장선수"):
            for prerequisite in course["권장선수"].split("|"):
                edges.append({
                    "id": f"recommended-{prerequisite}-{course['학수번호']}",
                    "source": prerequisite,
                    "target": course["학수번호"],
                    "type": "step",
                    "data": {"type": "recommended"},
                    "markerEnd": {"type": "ArrowClosed"},
                })

    return {"nodes": nodes, "edges": edges}

def process_course_files(directory, save_directory):
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            try:
                with open(os.path.join(directory, filename), "r", encoding="utf-8") as file:
                    courses = json.load(file)
                    result = parse_courses(courses)
                    output_file = os.path.join(save_directory, f"{filename.split('.')[0]}.json")
                    with open(output_file, "w", encoding="utf-8") as outfile:
                        json.dump(result, outfile, ensure_ascii=False, indent=4)
                print(f"Processed {filename} -> {output_file}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")


if __name__ == "__main__":
    directory = "./course_files" 
    save_directory = "../src/assets/college"
    process_course_files(directory, save_directory)