import os
import random
import shutil
import json 


label_dict = {'파프리카':0, '녹색피망':1, '로메인상추':2 }

def get_files_count(folder_path):
	dirListing = os.listdir(folder_path)
	return len(dirListing)

def train_test_split_over_2200(folder_path):
    folder_of_json = folder_path + f'{target_folder} json'

    # json 파일만 리스트로 받아오기
    files_json = [_ for _ in os.listdir(folder_of_json) if _.endswith('.json')]
    count = 0
    for file in files_json[:2200]: # [:2200]
        save_json_data = []
        path = os.path.join(folder_of_json, file)
        with open(path, 'r', encoding='utf-8') as f:
            json_contents = f.read()
            json_data = json.loads(json_contents)
            # print(*json_data)
            # print()
            texted_annotation = []
            for i in range(len(json_data)):
                data = json_data[i]
                x, y, w, h = data['Point(x,y)'].split(',')[0], data['Point(x,y)'].split(',')[1], data['W'], data['H']
                # print(f'{x}, {y}, {w}, {h}')

                # 여기다 이미지 클래스 라벨 번호도 써야 함
                texted_annotation.append(f'{label_dict[target_folder]} {x} {y} {w} {h}')
        with open(path.split('.json')[0] + '.txt', 'w', encoding='UTF-8') as f:
            for annotation in texted_annotation:
                f.write(annotation + '\n')
        # target_text = path.split('.json')[0] + '.txt'
        # copy text file
        file_name_txt = data['Code Name'].split('.')[0] + '.txt'
        file_name_jpg = data['Code Name']
        origin_txt = path.split('.json')[0] + '.txt'
        origin_img = f'./dataset_process/{target_folder}/{target_folder}/{file_name_jpg}'
        

        copy_to_images_dir_txt = f'./yolov4/custom_data/images/{file_name_txt}'
        copy_to_labels_dir_txt = f'./yolov4/custom_data/labels/{file_name_txt}'
        copy_to_image_dir_img = f'./yolov4/custom_data/images/{file_name_jpg}'

        
        # put image dir into train set until 2000
        if count <= 2000:
            train_txt_file = f'./yolov4/custom_data/train.txt'
            with open(train_txt_file, 'a', encoding='UTF-8') as f:
                f.write('./yolov4/custom_data/images/' + file_name_jpg + '\n')
            count += 1
        else:
            test_txt_file = f'./yolov4/custom_data/test.txt'
            with open(test_txt_file, 'a', encoding='UTF-8') as f:
                f.write('./yolov4/custom_data/images/' + file_name_jpg + '\n')
            count += 1


        shutil.copy(origin_txt, copy_to_images_dir_txt)
        shutil.copy(origin_txt, copy_to_labels_dir_txt)
        shutil.copy(origin_img, copy_to_image_dir_img)

        if count == 0 or count % 100 == 0:
            print(f'working on {target_folder} -- {count} steps')


def train_test_split_under_2200(folder_path, file_len, split_ratio=0.2):
    folder_of_json = folder_path + f'{target_folder} json'

    # json 파일만 리스트로 받아오기
    files_json = [_ for _ in os.listdir(folder_of_json) if _.endswith('.json')]
    count = 0

    split_benchmark_int = int(len(files_json - len(files_json)*split_ratio))
    for file in files_json: 
        save_json_data = []
        path = os.path.join(folder_of_json, file)
        with open(path, 'r', encoding='utf-8') as f:
            json_contents = f.read()
            json_data = json.loads(json_contents)
            # print(*json_data)
            texted_annotation = []
            for i in range(len(json_data)):
                data = json_data[i]
                x, y, w, h = data['Point(x,y)'].split(',')[0], data['Point(x,y)'].split(',')[1], data['W'], data['H']
                # print(f'{x}, {y}, {w}, {h}')

                # 여기다 이미지 클래스 라벨 번호도 써야 함
                texted_annotation.append(f'{label_dict[target_folder]} {x} {y} {w} {h}')
        with open(path.split('.json')[0] + '.txt', 'w', encoding='UTF-8') as f:
            for annotation in texted_annotation:
                f.write(annotation + '\n')
        # target_text = path.split('.json')[0] + '.txt'
        # copy text file
        file_name_txt = data['Code Name'].split('.')[0] + '.txt'
        file_name_jpg = data['Code Name']
        origin_txt = path.split('.json')[0] + '.txt'
        origin_img = f'./dataset_process/{target_folder}/{target_folder}/{file_name_jpg}'
        

        copy_to_images_dir_txt = f'./yolov4/custom_data/images/{file_name_txt}'
        copy_to_labels_dir_txt = f'./yolov4/custom_data/labels/{file_name_txt}'
        copy_to_image_dir_img = f'./yolov4/custom_data/images/{file_name_jpg}'

        
        # put image dir into train set until 2000
        if count <= split_benchmark_int:
            train_txt_file = f'./yolov4/custom_data/train.txt'
            with open(train_txt_file, 'a', encoding='UTF-8') as f:
                f.write('./yolov4/custom_data/images/' + file_name_jpg + '\n')
            count += 1
        else:
            test_txt_file = f'./yolov4/custom_data/test.txt'
            with open(test_txt_file, 'a', encoding='UTF-8') as f:
                f.write('./yolov4/custom_data/images/' + file_name_jpg + '\n')
            count += 1


        shutil.copy(origin_txt, copy_to_images_dir_txt)
        shutil.copy(origin_txt, copy_to_labels_dir_txt)
        shutil.copy(origin_img, copy_to_image_dir_img)
        
        if count == 0 or count % 100 == 0:
            print(f'working on {target_folder} -- {count} steps')

if __name__ == "__main__":

    # 딕셔너리에 있는거 몰아서 하기 
    # 한번에 돌리기 위해서는 file_match_test로 모든 폴더 한 번 순회 시켜줘야 함
        # label_dict = {'파프리카':0, '녹색피망':1, '로메인상추':2 } 위에 선언 됨
    target_folder_list = list(label_dict.keys()) 
    process_record_list = []
    for target_folder in target_folder_list:

        file_path = f'./dataset_process/{target_folder}/'

        file_len = get_files_count(file_path + f'{target_folder} json/')

        if file_len >= 2000:
            train_test_split_over_2200(file_path)
        else:
            train_test_split_under_2200(file_path, file_len)

        process_record = f'{target_folder}의 파일: {file_len}'
        process_record_list.append(process_record)
    
    print('train_test_split 결과')
    for i in process_record_list:
        print('=================================================')
        print(i)
            # print(target_folder)

    # # 딕셔너리를 인덱스로 불러와서 하나씩 돌리기
    # target_folder = list(label_dict.keys())[0] # 0번 함. 1번 함 . 2번 함
    # file_path = f'./dataset_process/{target_folder}/'

    # file_len = get_files_count(file_path + f'{target_folder} json/')

    # if file_len >= 2000:
    #     train_test_split_over_2200(file_path)
    # else:
    #     train_test_split_under_2200(file_path, file_len)

    # print(f'{target_folder}의 파일: {file_len}')
    #     # print(target_folder)