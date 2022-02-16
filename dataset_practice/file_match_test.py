import os
import collections 

label_dict = {'파프리카':0, '녹색피망':1, '로메인상추':2 }


def file_match_test(folder_path):
    folder_of_json = folder_path + f'{target_folder} json'
    folder_of_img = folder_path + f'{target_folder}'

    files_json = os.listdir(folder_of_json)
    files_img = os.listdir(folder_of_img)

    file_list = []
    for file in files_json:
        file_name = file.split('.')[0]
        file_list.append(file_name)
    for file in files_img:
        file_name = file.split('.')[0]
        file_list.append(file_name)
    
    file_count = collections.Counter(file_list)

    not_match = [k for k, v in file_count.items() if v == 1]
    print(not_match)

    deleted_count = 0

    for file in not_match:
        file_to_delete = folder_of_json + '/' + file + '.json' 
        if os.path.isfile(file_to_delete):
            os.remove(file_to_delete)
            deleted_count += 1
    if len(not_match) == 0:
        print(f'No unmatched file')
    else:
        print(f'{deleted_count} files are removed from  {target_folder} json folder or are already removed.')

target_folder = list(label_dict.keys())[0] # 0번 함. 1번 함. 2번 함
file_path = f'./dataset_process/{target_folder}/'

file_match_test(file_path)