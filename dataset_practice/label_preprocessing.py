import os
import json 

def get_files_count(folder_path):
	dirListing = os.listdir(folder_path)
	return len(dirListing)

def traverse_file_over_2000(folder_path, prefix):
    files = os.listdir(folder_path)
    for file in files[:2000]:
        path = os.path.join(folder_path, file)
        with open(path, 'r', encoding='utf-8') as f:
            contents = f.read()
            json_data = json.loads(contents)
            print(*json_data)
            # print()
            texted_annotation = []
            for i in range(len(json_data)):
                data = json_data[i]
                x, y, w, h = data['Point(x,y)'].split(',')[0], data['Point(x,y)'].split(',')[1], data['W'], data['H']
                # print(f'{x}, {y}, {w}, {h}')

                # 여기다 이미지 클래스 라벨 번호도 써야 함
                texted_annotation.append(f'{x}, {y}, {w}, {h}')
        with open(path.split('.json')[0] + '.txt', 'w', encoding='UTF-8') as f:
            for annotation in texted_annotation:
                f.write(annotation + '\n')



def traverse_file_under_2000(folder_path, prefix):
    files = os.listdir(folder_path)
    for file in files:
        path = os.path.join(folder_path, file)
        with open(path, 'r', encoding='utf-8') as f:
            contents = f.read()
            json_data = json.loads(contents)
            print(*json_data)
            # print()
            texted_annotation = []
            for i in range(len(json_data)):
                data = json_data[i]
                x, y, w, h = data['Point(x,y)'].split(',')[0], data['Point(x,y)'].split(',')[1], data['W'], data['H']
                # print(f'{x}, {y}, {w}, {h}')

                # 여기다 이미지 클래스 라벨 번호도 써야 함
                texted_annotation.append(f'{x}, {y}, {w}, {h}')
        with open(path.split('.json')[0] + '.txt', 'w', encoding='UTF-8') as f:
            for annotation in texted_annotation:
                f.write(annotation + '\n')



# 음식 즐찾에 move 함수 이용해서 파일 위치 옮기기 os로도 가능

target_folder = '가리비'
path = f'./ai_hub_food_dataset/Training/{target_folder}/{target_folder} json/'
file_len = get_files_count(path)

if file_len >= 2000:
    traverse_file_over_2000(path, '')
else :
    traverse_file_under_2000(path, '')

print(f'{target_folder}의 개수 {file_len}')

