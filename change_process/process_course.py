import json
import os

node_height = 50
node_spacing = 50
node_colors = {
    "학문의기초": "#FFECB3",
    "교양필수": "#C8E6C9",
    "교양선택": "#B3E5FC",
    "전공필수": "#D1C4E9",
    "전공선택": "#F8BBD0",
    "기타": "#FFFFFF",
}

def calculate_x_position(학년, 학기):
    # if 학기 == 0 or 학기 == 'null':
    #     return 학년 * 440
    # return 학년 * 440 + (학기 - 1) * 220
    if 학기 is None  or 학기 == 0:
        학기 = 1
    if 학년 is None or 학년 == 0:
        학년 = 1 #일단 떼움..
    return 학년 * 440 + ((학기) - 1) * 220

def parse_courses(courses):
    x_groups = {}
    nodes = []
    zero_semester_nodes = []

    # Group courses by x position
    for course in courses:
        x = calculate_x_position(course["학년"], course["학기"])
        if x not in x_groups:
            x_groups[x] = []
        x_groups[x].append(course)

    # Process grouped courses
    for x, group_courses in x_groups.items():
        current_y = 0
        for index, course in enumerate(group_courses):
            color = node_colors.get(course["구분"], node_colors["기타"])
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
                },
                "type": "customNode",
                "sourcePosition": "Right",
                "targetPosition": "Left",
                "style": {
                    "backgroundColor": color,
                    "borderRadius": "5px",
                    "padding": "10px"
                },
            }
            if (course["학기"] == 0 or course["학기"] == 'null'):
                zero_semester_nodes.append(node)
            else:
                nodes.append(node)

    # Handle zero semester nodes
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
            "x": (first_semester_x + second_semester_x) / 2,  # X는 중간값
            "y": max_y + node_height + node_spacing,         # Y는 가장 아래값 + 간격
        }
        nodes.append(zero_node)

    # Create edges
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

# Process all course files
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