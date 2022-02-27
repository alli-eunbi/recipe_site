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

translated_dict = {'scallop': '가리비', 'eggplant': '가지', 'crabstick': '게맛살', 'sweetpotato': '고구마', 'mackerel': '고등어', 'chili': '고추', 
                    'gochujang': '고추장', 'greenolive': '그린올리브', 'koreangim': '김', 'cockle': '꼬막', 'greenbellpepper': '녹색피망', 'oystermushroom': 
                    '느타리버섯', 'kelp': '다시마', 'sweetpumpkin': '단호박', 'egg': '달걀', 'carrot': '당근', 'koreanleek': '대파', 'tofu': '두부', 
                    'peanutbutter': '땅콩버터', 'lobster': '랍스타', 'lemon': '레몬', 'romaine': '로메인상추', 'ricottacheese': '리코타치즈', 
                    'garlic': '마늘', 'mayonnaise': '마요네즈', 'dumpling': '만두', 'saltedpollackroe': '명란젓', 'mozzarellacheese': '모짜렐라치즈', 
                    'radish': '무우', 'octopus': '문어', 'seaweed': '물미역', 'baquette': '바게트', 'steamedrice': '밥', 'cherrytomato': '방울토마토', 
                    'napacabbage': '배추', 'napacabbagekimchi': '배추김치', 'mushroom': '버섯', 'butter': '버터', 'bagel': '베이글', 'broccoli': '브로콜리', 
                    'boiledegg': '삶은달걀', 'shrimp': '새우', 'salary': '샐러리', 'freshcream': '생크림', 'plainnoodles': '소면', 'spaghettinoodles': '스파게티면', 
                    'cabbage': '양배추', 'lotusroot': '연근', 'waffle': '와플', 'milk': '우유', 'cerealbread': '잡곡식빵', 'redcabbage': '적양배추', 
                    'earsheel': '전복', 'cheddarcheese': '체다치즈', 'chicory': '치커리', 'chilisauce': '칠리소스', 'kale': '케일', 'ketchup': '케첩', 
                    'tomato': '토마토', 'tomatopastasauce': '토마토파스타소스', 'parsley': '파슬리', 'pineapple': '파인애플', 'paprika': '파프리카', 
                    'enokimushroom': '팽이버섯', 'shiitakemushroom': '표고버섯'}

kor_labeler = {'가리비': 0, '가지': 1, '게맛살': 2, '고구마': 3, '고등어': 4, '고추': 5, '고추장': 6, '그린올리브': 7, '김': 8, '꼬막': 9, '녹색피망': 10, 
                '느타리버섯': 11, '다시마': 12, '단호박': 13, '달걀': 14, '당근': 15, '대파': 16, '두부': 17, '땅콩버터': 18, '랍스타': 19, '레몬': 20, 
                '로메인상추': 21, '리코타치즈': 22, '마늘': 23, '마요네즈': 24, '만두': 25, '명란젓': 26, '모짜렐라치즈': 27, '무우': 28, '문어': 29, 
                '물미역': 30, '바게트': 31, '밥': 32, '방울토마토': 33, '배추': 34, '배추김치': 35, '버섯': 36, '버터': 37, '베이글': 38, '브로콜리': 39, 
                '삶은달걀': 40, '새우': 41, '샐러리': 42, '생크림': 43, '소면': 44, '스파게티면': 45, '양배추': 46, '연근': 47, '와플': 48, '우유': 49, 
                '잡곡식빵': 50, '적양배추': 51, '전복': 52, '체다치즈': 53, '치커리': 54, '칠리소스': 55, '케일': 56, '케첩': 57, '토마토': 58, 
                '토마토파스타소스': 59, '파슬리': 60, '파인애플': 61, '파프리카': 62, '팽이버섯': 63, '표고버섯': 64}


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
        translated_label_list.append(translated_dict[label])

    data = {}
    data['predicted_objects'] = []
    for object in translated_label_list:
        data['predicted_objects'].append({
            int(f'{kor_labeler[object]}'): f'{list(kor_labeler.keys())[kor_labeler[object]]}'
        })
    # print(data)
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

    class_labels = ['scallop', 'eggplant', 'crabstick', 'sweetpotato', 'mackerel', 'chili', 'gochujang', 'greenolive', 'koreangim', 
                'cockle', 'greenbellpepper', 'oystermushroom', 'kelp', 'sweetpumpkin', 'egg', 'carrot', 'koreanleek', 'tofu', 
                'peanutbutter', 'lobster', 'lemon', 'romaine', 'ricottacheese', 'garlic', 'mayonnaise', 'dumpling', 'saltedpollackroe', 
                'mozzarellacheese', 'radish', 'octopus', 'seaweed', 'baquette', 'steamedrice', 'cherrytomato', 'napacabbage', 
                'napacabbagekimchi', 'mushroom', 'butter', 'bagel', 'broccoli', 'boiledegg', 'shrimp', 'salary', 'freshcream', 'plainnoodles', 
                'spaghettinoodles', 'cabbage', 'lotusroot', 'waffle', 'milk', 'cerealbread', 'redcabbage', 'earsheel', 'cheddarcheese', 'chicory', 
                'chilisauce', 'kale', 'ketchup', 'tomato', 'tomatopastasauce', 'parsley', 'pineapple', 'paprika', 'enokimushroom', 'shiitakemushroom']



    #Declare only a single color
    class_colors = ["0,255,0", "255, 0, 0", "0, 0, 255", "255, 200, 0", "0, 255, 255", "255, 0, 255"]
    class_colors = [np.array(every_color.split(",")).astype("int") for every_color in class_colors]
    class_colors = np.array(class_colors)
    class_colors = np.tile(class_colors,(16,1))

    # input preprocessed blob into model and pass through the model
    # obtain the detection predictions by the model using forward() method
    yolo_model = cv2.dnn.readNetFromDarknet(f'{dir_name}/cfg/yolov4-tiny_65_classes_64_4.cfg', f'{dir_name}/cfg/yolov4-tiny_64_4_last_81300.weights')


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