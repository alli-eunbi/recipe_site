import json
import os 

# with open('건강관리를 위한 음식 이미지/Training/가지/가지 json/A260161XX_01896.json', 'r', encoding='utf-8') as f:
with open('ai_hub_food_dataset/Training/가리비/가리비 json/A270332XX_00985.json', 'r', encoding='utf-8') as f:
    contents = f.read()
    json_data = json.loads(contents)
    print(*json_data)
    # print()
    for i in range(len(json_data)):
        data = json_data[i]
        x, y, w, h = data['Point(x,y)'].split(',')[0], data['Point(x,y)'].split(',')[1], data['W'], data['H']
        print(f'{x}, {y}, {w}, {h}')

# def print_files_in_dir(root_dir, prefix):
#     files = os.listdir(root_dir)
#     for file in files:
#         path = os.path.join(root_dir, file)
#         print(prefix + path)

# # 텍스트 쓰기
# with open ('./Barbershop/environment/for_dependency.txt', 'w', encoding='UTF-8') as f:
#     for name in remain_in_dependency:
#         f.write(name+'\n')



# if __name__ == "__main__":
#     root_dir = "./건강관리를 위한 음식 이미지/Training/가지/가지 json/"
#     print_files_in_dir(root_dir, "")