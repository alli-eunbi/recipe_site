import predict_ver2_os as pv2
import cv2

# 예측할 이미지 파일의 경로
img_path = './demo_detector_65/img_test/test.jpg'

# 저장할 json 파일의 경로
json_path = './demo_detector_65/result/predicted_result.json'

pv2.img_predictor(img_path, json_path)

