# -*- coding: utf-8 -*-
"""

@refered from : abhilash
"""

import numpy as  np
import cv2
import os
#import label_translator as lt

import json
import argparse

translated_dict = {'scallop': '가리비', 'eggplant': '가지', 'potato': '감자', 'crabstick': '게맛살', 'sweetpotato': '고구마', 'mackerel': '고등어', 
                'chili': '고추', 'gochujang': '고추장', 'greenolive': '그린올리브', 'koreangim': '김', 'cockle': '꼬막', 'oystermushroom': '느타리버섯', 
                'kelp': '다시마', 'sweetpumpkin': '단호박', 'egg': '달걀', 'carrot': '당근', 'koreanleek': '대파', 'tofu': '두부', 'peanutbutter': '땅콩버터', 
                'lobster': '랍스타', 'lemon': '레몬', 'romaine': '로메인상추', 'ricottacheese': '리코타치즈', 'garlic': '마늘', 'mayonnaise': '마요네즈', 
                'dumpling': '만두', 'radish': '무우', 'octopus': '문어', 'baquette': '바게트', 'steamedrice': '밥', 'cherrytomato': '방울토마토', 'napacabbage': '배추', 
                'napacabbagekimchi': '배추김치', 'butter': '버터', 'bagel': '베이글', 'broccoli': '브로콜리', 'blueberry': '블루베리', 'apple': '사과', 
                'shrimp': '새우', 'salary': '샐러리', 'plainnoodles': '소면', 'mungbeansprout': '숙주나물', 'spaghettinoodles': '스파게티면', 'spinach': '시금치', 
                'almond': '아몬드', 'avocado': '아보카도', 'squash': '애호박', 'cabbage': '양배추', 'onion': '양파', 'lotusroot': '연근', 'cucumber': '오이', 
                'squid': '오징어', 'waffle': '와플', 'milk': '우유', 'cerealbread': '잡곡식빵', 'earsheel': '전복', 'cheddarcheese': '체다치즈', 'chicory': '치커리', 
                'chilisauce': '칠리소스', 'kale': '케일', 'ketchup': '케첩', 'tomato': '토마토', 'tomatopastasauce': '토마토파스타소스', 'parsley': '파슬리', 
                'pineapple': '파인애플', 'paprika': '파프리카', 'enokimushroom': '팽이버섯', 'shiitakemushroom': '표고버섯', 'walnut': '호두', 'whitemushroom': '양송이버섯',
                'beansprout': '콩나물', 'pimento': '피망'} # 콩나물 피망은 학습 안된거 - 숙주 때 콩나물도 추가하고, 파프리카 때 피망 추가

kor_labeler = {'가리비': 0, '가지': 1, '감자': 2, '게맛살': 3, '고구마': 4, '고등어': 5, '고추': 6, '고추장': 7, 
            '그린올리브': 8, '김': 9, '꼬막': 10, '느타리버섯': 11, '다시마': 12, '단호박': 13, '달걀': 14, '당근': 15, 
            '대파': 16, '두부': 17, '땅콩버터': 18, '랍스타': 19, '레몬': 20, '로메인상추': 21, '리코타치즈': 22, 
            '마늘': 23, '마요네즈': 24, '만두': 25, '무우': 26, '문어': 27, '바게트': 28, '밥': 29, '방울토마토': 30, 
            '배추': 31, '배추김치': 32, '버터': 33, '베이글': 34, '브로콜리': 35, '블루베리': 36, '사과': 37, '새우': 38, 
            '샐러리': 39, '소면': 40, '숙주나물': 41, '스파게티면': 42, '시금치': 43, '아몬드': 44, '아보카도': 45, 
            '애호박': 46, '양배추': 47, '양파': 48, '연근': 49, '오이': 50, '오징어': 51, '와플': 52, '우유': 53, 
            '잡곡식빵': 54, '전복': 55, '체다치즈': 56, '치커리': 57, '칠리소스': 58, '케일': 59, '케첩': 60, '토마토': 61, 
            '토마토파스타소스': 62, '파슬리': 63, '파인애플': 64, '파프리카': 65, '팽이버섯': 66, '표고버섯': 67, '호두': 68,
            '양송이버섯': 69, '콩나물':70, '피망':71}


# predicted_set_list = ['scallop', 'tomato']

# kor_to_label_num_dict = {}

# translated_label_list = []
# for label in predicted_set_list:
#     translated_label_list.append(translated_dict[label])

# print(translated_label_list)

# for i, v in enumerate(translated_dict.values()):
#     kor_to_label_num_dict[v] = i

# print(kor_to_label_num_dict)



# file_path = './predict_65_classes/predicted_result.json'
def jsonifier(eng_label_list, file_path):
    translated_label_list = []
    for label in eng_label_list:
        if label == 'mungbeansprout':
            translated_label_list.append(translated_dict[label])
            translated_label_list.append(translated_dict['beansprout'])
        elif label == 'paprika':
            translated_label_list.append(translated_dict[label])
            translated_label_list.append(translated_dict['pimento'])
        else:
            translated_label_list.append(translated_dict[label])

    data = {}
    data['predicted_objects'] = []
    for object in translated_label_list:
        data['predicted_objects'].append({
            int(f'{kor_labeler[object]}'): f'{list(kor_labeler.keys())[kor_labeler[object]]}'
        })
    print(data)
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file)
    # return print(f'json file saved to {file_path}')

# jsonifier(predicted_set_list, file_path)



absolutepath = os.path.abspath(__file__)
# print(absolutepath)
dir_name = os.path.dirname(absolutepath)
# print(dir_name)

def img_predictor(img_path_for_prediction, json_path_for_save_data):

    img_to_detect = cv2.imread(img_path_for_prediction)
    img_height = img_to_detect.shape[0]
    img_width = img_to_detect.shape[1]

    # convert to blob to pass into model
    img_blob = cv2.dnn.blobFromImage(img_to_detect, 0.003922, (416, 416), swapRB=True, crop=False)
    #recommended by yolo authors, scale factor is 0.003922=1/255, width,height of blob is 320,320
    #accepted sizes are 320×320,416×416,608×608. More size means more accuracy but less speed

    class_labels = ['scallop', 'eggplant', 'potato', 'crabstick', 'sweetpotato', 'mackerel', 'chili', 'gochujang', 'greenolive', 'koreangim', 
                'cockle', 'oystermushroom', 'kelp', 'sweetpumpkin', 'egg', 'carrot', 'koreanleek', 'tofu', 'peanutbutter', 'lobster', 'lemon', 
                'romaine', 'ricottacheese', 'garlic', 'mayonnaise', 'dumpling', 'radish', 'octopus', 'baquette', 'steamedrice', 'cherrytomato', 
                'napacabbage', 'napacabbagekimchi', 'butter', 'bagel', 'broccoli', 'blueberry', 'apple', 'shrimp', 'celery', 'plainnoodles', 
                'mungbeansprout', 'spaghettinoodles', 'spinach', 'almond', 'avocado', 'squash', 'cabbage', 'onion', 'lotusroot', 'cucumber', 
                'squid', 'waffle', 'milk', 'cerealbread', 'earshell', 'cheddarcheese', 'chicory', 'chilisauce', 'kale', 'ketchup', 'tomato', 
                'tomatopastasauce', 'parsley', 'pineapple', 'paprika', 'enokimushroom', 'shiitakemushroom', 'walnut', 'whitemushroom']



    #Declare only a single color
    class_colors = ["0,255,0", "255, 0, 0", "0, 0, 255", "255, 200, 0", "0, 255, 255", "255, 0, 255"]
    class_colors = [np.array(every_color.split(",")).astype("int") for every_color in class_colors]
    class_colors = np.array(class_colors)
    class_colors = np.tile(class_colors,(16,1))

    # input preprocessed blob into model and pass through the model
    # obtain the detection predictions by the model using forward() method

    # 확인 check
    # 여기 이제 cfg 폴더에 swish 모델 200MB 짜리 구글 드라이브에서 받아서 넣고 경로(이름)도 맞게 설정해야 함
    # 모델 바뀌어도 딱 이 아래 코드 한줄만 바뀜 - 바뀐 모델 이름 

    # old
    # yolo_model = cv2.dnn.readNetFromDarknet(f'{dir_name}/cfg/yolov4-tiny_65_classes_64_4.cfg', f'{dir_name}/cfg/yolov4-tiny_64_4_last_81300.weights') 
    
    # new - swish
    yolo_model = cv2.dnn.readNetFromDarknet(f'{dir_name}/cfg/yolov4-csp-swish_64_16.cfg', f'{dir_name}/cfg/yolov4-csp-swish_64_16_14000.weights') 


    # Get all layers from the yolo network
    # Loop and find the last layer (output layer) of the yolo network 
    yolo_layers = yolo_model.getLayerNames()
    yolo_output_layer = [yolo_layers[yolo_layer - 1] for yolo_layer in yolo_model.getUnconnectedOutLayers()]

    # input preprocessed blob into model and pass through the model
    yolo_model.setInput(img_blob)
    # obtain the detection layers by forwarding through till the output layer
    obj_detection_layers = yolo_model.forward(yolo_output_layer)


    ############## NMS Change 1 ###############
    # initialization for non-max suppression (NMS)
    # declare list for [class id], [box center, width & height[], [confidences]
    class_ids_list = []
    boxes_list = []
    confidences_list = []
    ############## NMS Change 1 END ###########


    # loop over each of the layer outputs
    for object_detection_layer in obj_detection_layers:
        # loop over the detections
        for object_detection in object_detection_layer:
            
            # obj_detections[1 to 4] => will have the two center points, box width and box height
            # obj_detections[5] => will have scores for all objects within bounding box
            all_scores = object_detection[5:]
            predicted_class_id = np.argmax(all_scores)
            prediction_confidence = all_scores[predicted_class_id]
        
            # take only predictions with confidence more than 20%
            if prediction_confidence > 0.20:
                #get the predicted label
                predicted_class_label = class_labels[predicted_class_id]
                #obtain the bounding box co-oridnates for actual image from resized image size
                bounding_box = object_detection[0:4] * np.array([img_width, img_height, img_width, img_height])
                (box_center_x_pt, box_center_y_pt, box_width, box_height) = bounding_box.astype("int")
                start_x_pt = int(box_center_x_pt - (box_width / 2))
                start_y_pt = int(box_center_y_pt - (box_height / 2))
                
                ############## NMS Change 2 ###############
                #save class id, start x, y, width & height, confidences in a list for nms processing
                #make sure to pass confidence as float and width and height as integers
                class_ids_list.append(predicted_class_id)
                confidences_list.append(float(prediction_confidence))
                boxes_list.append([start_x_pt, start_y_pt, int(box_width), int(box_height)])
                ############## NMS Change 2 END ###########
                
    ############## NMS Change 3 ###############
    # Applying the NMS will return only the selected max value ids while suppressing the non maximum (weak) overlapping bounding boxes      
    # Non-Maxima Suppression confidence set as 0.5 & max_suppression threhold for NMS as 0.4 (adjust and try for better perfomance)
    max_value_ids = cv2.dnn.NMSBoxes(boxes_list, confidences_list, 0.2, 0.5)
    predicted_list = []
    # loop through the final set of detections remaining after NMS and draw bounding box and write text
    for max_valueid in max_value_ids:
        max_class_id = max_valueid
        box = boxes_list[max_class_id]
        start_x_pt = box[0]
        start_y_pt = box[1]
        box_width = box[2]
        box_height = box[3]
        
        #get the predicted class id and label
        predicted_class_id = class_ids_list[max_class_id]
        predicted_class_label = class_labels[predicted_class_id]
        prediction_confidence = confidences_list[max_class_id]
    ############## NMS Change 3 END ########### 
            
        end_x_pt = start_x_pt + box_width
        end_y_pt = start_y_pt + box_height
        
        #get a random mask color from the numpy array of colors
        box_color = class_colors[predicted_class_id]
        
        #convert the color numpy array as a list and apply to text and box
        box_color = [int(c) for c in box_color]
        predicted_list.append(predicted_class_label)

        # print the prediction in console
        predicted_class_label_msg = "{}: {:.2f}%".format(predicted_class_label, prediction_confidence * 100)
        # print("predicted object {}".format(predicted_class_label_msg))
        
        # draw rectangle and text in the image
        cv2.rectangle(img_to_detect, (start_x_pt, start_y_pt), (end_x_pt, end_y_pt), box_color, 1)
        cv2.putText(img_to_detect, predicted_class_label_msg, (start_x_pt, start_y_pt-5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, box_color, 1)


    predicted_set_list = list(set(predicted_list))
# print(predicted_set_list)

    #lt.jsonifier(predicted_set_list, json_path_for_save_data)
    jsonifier(predicted_set_list, json_path_for_save_data)



    # # 사진 확인하고 싶을 때 아래 주석 풀어주세요 : 이곳2
    # resized_img = cv2.resize(img_to_detect, (800, 800))
    # cv2.imshow("Detection Output", resized_img)
    # cv2.waitKey()
