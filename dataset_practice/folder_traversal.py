import os 

# dir_name_list 결과
'''
'가리비', '가지', '게맛살', '고구마', '고등어', '고추', '고추장', '그린올리브', 
'김', '까망베르치즈', '꼬막', '노랑파프리카', '녹색피망', '다시마', '단호박', '달걀', '닭가슴살', 
'닭날개', '당근', '대파', '두부', '땅콩버터', '랍스타', '레몬', '로메인 상추', '리코타 치즈', 
'마요네즈', '만두', '모짜렐라치즈', '무우', '문어', '물미역', 
'미트볼', '바게트', '바게트빵', '밥', '방울토마토', '버터', '베이글', '베이컨', '브로콜리', 
'비엔나소시지', '빵', '삶은달걀', '삼겹살', '새우', '샐러리', '스파게티면', '양배추', '잡곡식빵', 
'전복', '토마토파스타소소', '풋고추' 
'''



def get_files_count(folder_path):
	dirListing = os.listdir(folder_path)
	return len(dirListing)

def print_files_in_dir(root_dir, prefix):
    # print('================')
    dir_name_list = []

    files = os.listdir(root_dir)
    for file in files:
        path = os.path.join(root_dir, file)
        # print(prefix + path)
        dir_name_list.append(path.split('/')[-1].split('.')[0])
        # print(path.split('/')[-1])


        # if os.path.isdir(path):
        #     print_files_in_dir(path, prefix + "    ")
    dir_name_list = set(dir_name_list)
    print(dir_name_list)

if __name__ == "__main__":
    root_dir = "./ai_hub_food_dataset/Training/"
    print_files_in_dir(root_dir, "")
